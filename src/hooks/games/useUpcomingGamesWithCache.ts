import { useEffect, useState } from "react"
import { ballDontLieApiService } from "../../api/ballDontLieApi"
import type { UpcomingGameData } from "../../types"

interface UseUpcomingGamesWithCacheReturn {
  games: UpcomingGameData[]
  loading: boolean
  error: string | null
  refetch: () => void
}

// Cache configuration
const CACHE_KEY = "upcoming_games_cache"
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

interface CacheData {
  data: UpcomingGameData[]
  timestamp: number
}

const getCachedData = (): UpcomingGameData[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null

    const { data, timestamp }: CacheData = JSON.parse(cached)
    const now = Date.now()

    // Check if cache is still valid
    if (now - timestamp < CACHE_DURATION) {
      console.log("🏀 Using cached upcoming games data")
      return data
    }

    // Cache expired, remove it
    localStorage.removeItem(CACHE_KEY)
    return null
  } catch (error) {
    console.error("Error reading cached upcoming games:", error)
    localStorage.removeItem(CACHE_KEY)
    return null
  }
}

const setCachedData = (data: UpcomingGameData[]): void => {
  try {
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    }
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    console.log("🏀 Cached upcoming games data")
  } catch (error) {
    console.error("Error caching upcoming games:", error)
  }
}

export const useUpcomingGamesWithCache =
  (): UseUpcomingGamesWithCacheReturn => {
    const [games, setGames] = useState<UpcomingGameData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchGames = async () => {
      try {
        setLoading(true)
        setError(null)

        // Try to get cached data first
        const cachedData = getCachedData()
        if (cachedData) {
          setGames(cachedData)
          setLoading(false)
          return
        }

        // If no cache, fetch from API
        const upcomingGames = await ballDontLieApiService.getUpcomingGames()
        setGames(upcomingGames)
        setCachedData(upcomingGames)
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch upcoming games"
        setError(errorMessage)
        console.error("Error fetching upcoming games:", err)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchGames()
    }, [])

    return {
      games,
      loading,
      error,
      refetch: fetchGames,
    }
  }
