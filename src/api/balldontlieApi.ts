import axios from "axios"
import type {
  BallDontLieGame,
  BallDontLieGamesResponse,
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
}

export default ballDontLieApi
