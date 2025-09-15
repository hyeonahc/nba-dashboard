import axios from "axios"
import {
  getOverallRankings,
  type StandingsApiResponse,
} from "../utils/nbaRankingUtils"
import { getAvailableSeasons } from "../utils/seasonUtils"

// Transformed data format for components (legacy compatibility)
interface TransformedTeamRanking {
  position: number
  team: string
  wins: number
  losses: number
  winPercentage: number
  logo?: string
  conference: string
  gamesPlayed: number
  pointsFor: number
  pointsAgainst: number
  pointDifference: number
  stage: string
  description: string
}

// Create axios instance with base configuration
const basketballApi = axios.create({
  baseURL: import.meta.env.VITE_BASKETBALL_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding API key
basketballApi.interceptors.request.use(
  config => {
    const apiKey = import.meta.env.VITE_BASKETBALL_API_KEY
    if (apiKey) {
      config.headers["x-apisports-key"] = apiKey
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
basketballApi.interceptors.response.use(
  response => response,
  error => {
    console.error("Basketball API Error:", error)
    return Promise.reject(error)
  }
)

// Basketball API functions
export const basketballApiService = {
  // Get team rankings
  getTeamRankings: async (): Promise<TransformedTeamRanking[]> => {
    const league = "12" // NBA league ID
    const availableSeasons = getAvailableSeasons()

    console.log("🏆 Available seasons to try:", availableSeasons)

    // Try each season until we get valid data
    for (const season of availableSeasons) {
      try {
        console.log(`🏆 Trying season: ${season}`)

        const response = await basketballApi.get<StandingsApiResponse>(
          "/standings",
          {
            params: {
              league,
              season,
            },
          }
        )

        // Use the ranking helper to get overall rankings
        const rankedTeams = getOverallRankings(response.data)

        // Check if we got valid data
        if (rankedTeams && rankedTeams.length > 0) {
          console.log(
            `✅ Found valid data for season ${season}: ${rankedTeams.length} teams`
          )

          // Transform to legacy format for compatibility
          const transformedRankings: TransformedTeamRanking[] = rankedTeams.map(
            team => ({
              position: team.position,
              team: team.team,
              wins: team.wins,
              losses: team.losses,
              winPercentage: team.winPercentage,
              logo: team.logo,
              conference: team.conference,
              gamesPlayed: team.wins + team.losses, // Calculate from wins + losses
              pointsFor: team.pointsFor,
              pointsAgainst: team.pointsAgainst,
              pointDifference: team.pointDifferential,
              stage: "NBA - Regular Season", // Default stage
              description: "Regular Season", // Default description
            })
          )

          console.log("🏆 Fetched team rankings from API:", transformedRankings)
          return transformedRankings
        } else {
          console.log(
            `⚠️ No valid data for season ${season}, trying next season...`
          )
        }
      } catch (error) {
        console.log(`❌ Error fetching data for season ${season}:`, error)
        // Continue to next season
      }
    }

    // If we get here, no season had valid data
    console.error("❌ No valid data found for any available season")
    throw new Error("No standings data available for any season")
  },
}

// Export types for use in other parts of the application
export type { TransformedTeamRanking }

export default basketballApi
