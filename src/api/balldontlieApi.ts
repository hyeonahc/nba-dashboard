import axios from "axios"
import type {
  BallDontLieGame,
  BallDontLieGamesResponse,
  CompletedGameData,
  UpcomingGameData,
} from "../types"
import {
  formatDisplayDate,
  formatDisplayTime,
  getTodayDate,
} from "../utils/dateUtils"
import { getTeamLogoUrl } from "../utils/nbaTeamUtils"

// Create axios instance for BallDontLie API
const ballDontLieApi = axios.create({
  baseURL: import.meta.env.VITE_BALLDONTLIE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding API key
ballDontLieApi.interceptors.request.use(
  config => {
    const apiKey = import.meta.env.VITE_BALLDONTLIE_API_KEY
    if (apiKey) {
      config.headers["Authorization"] = `Bearer ${apiKey}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
ballDontLieApi.interceptors.response.use(
  response => response,
  error => {
    console.error("BallDontLie API Error:", error)
    return Promise.reject(error)
  }
)

// Transform API game data to UI format
const transformGameData = (game: BallDontLieGame): UpcomingGameData => {
  return {
    id: game.id.toString(),
    homeTeam: game.home_team.abbreviation,
    awayTeam: game.visitor_team.abbreviation,
    homeTeamFullName: game.home_team.full_name,
    awayTeamFullName: game.visitor_team.full_name,
    homeTeamLogo: getTeamLogoUrl(game.home_team.abbreviation),
    awayTeamLogo: getTeamLogoUrl(game.visitor_team.abbreviation),
    date: formatDisplayDate(game.date),
    time: formatDisplayTime(game.datetime),
    season: `${game.season}-${(game.season + 1).toString().slice(-2)} Season`,
  }
}

// Transform completed game data to UI format
const transformCompletedGameData = (
  game: BallDontLieGame
): CompletedGameData => {
  return {
    id: game.id.toString(),
    homeTeam: game.home_team.abbreviation,
    awayTeam: game.visitor_team.abbreviation,
    homeTeamFullName: game.home_team.full_name,
    awayTeamFullName: game.visitor_team.full_name,
    homeTeamLogo: getTeamLogoUrl(game.home_team.abbreviation),
    awayTeamLogo: getTeamLogoUrl(game.visitor_team.abbreviation),
    homeScore: game.home_team_score,
    awayScore: game.visitor_team_score,
    date: formatDisplayDate(game.date),
    season: `${game.season}-${(game.season + 1).toString().slice(-2)} Season`,
    status: game.status,
  }
}

// BallDontLie API service
export const ballDontLieApiService = {
  // Get upcoming games
  getUpcomingGames: async (): Promise<UpcomingGameData[]> => {
    try {
      const today = getTodayDate()
      console.log(`🏀 Fetching upcoming games from ${today}`)

      const response = await ballDontLieApi.get<BallDontLieGamesResponse>(
        "/games",
        {
          params: {
            start_date: today,
          },
        }
      )

      // Transform the data for UI consumption
      const upcomingGames = response.data.data.map(transformGameData)

      console.log("🏀 Fetched upcoming games:", upcomingGames)
      return upcomingGames
    } catch (error) {
      console.error("❌ Error fetching upcoming games:", error)
      throw error
    }
  },

  // Get 5 most recent completed games (optimized for NBA off-season)
  getRecentGameResults: async (): Promise<CompletedGameData[]> => {
    try {
      const today = new Date()
      const currentMonth = today.getMonth() + 1 // getMonth() returns 0-11, so add 1

      let startDate: Date
      let endDate: Date
      let dateRangeDescription: string

      // Check if we're in NBA off-season months (July=7, August=8, September=9)
      if (currentMonth >= 7 && currentMonth <= 9) {
        // During off-season, search from June 1st to June 30th
        startDate = new Date(today.getFullYear(), 5, 1) // Month 5 = June (0-indexed), day 1
        endDate = new Date(today.getFullYear(), 5, 30) // Month 5 = June (0-indexed), day 30
        dateRangeDescription = `June 1-30, ${today.getFullYear()} (off-season)`
      } else {
        // During regular season, use 7 days back
        startDate = new Date(today)
        startDate.setDate(today.getDate() - 7)
        endDate = today
        dateRangeDescription = "7 days"
      }

      const startDateStr = startDate.toISOString().split("T")[0]
      const endDateStr = endDate.toISOString().split("T")[0]

      console.log(
        `🏀 Fetching recent game results from ${startDateStr} to ${endDateStr} (${dateRangeDescription})`
      )

      const response = await ballDontLieApi.get<BallDontLieGamesResponse>(
        "/games",
        {
          params: {
            start_date: startDateStr,
            end_date: endDateStr,
            per_page: currentMonth >= 7 && currentMonth <= 9 ? 30 : 50, // 30 for off-season, 50 for regular season
          },
        }
      )

      // Filter for completed games and sort by date (most recent first)
      const completedGames = response.data.data
        .filter(game => game.status === "Final")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      // Return up to 5 most recent games
      const recentResults = completedGames
        .slice(0, 5)
        .map(transformCompletedGameData)

      console.log(
        `🏀 Found ${completedGames.length} completed games in ${dateRangeDescription}, returning up to 5:`,
        recentResults
      )
      return recentResults
    } catch (error) {
      console.error("❌ Error fetching recent game results:", error)
      throw error
    }
  },
}

export default ballDontLieApi
