import { useEffect, useState } from "react"
import { ballDontLieApiService } from "../../api/ballDontLieApi"
import type { CompletedGameData } from "../../types"

interface UseRecentGameResultsWithCacheReturn {
  data: CompletedGameData[]
  isLoading: boolean
  error: string | null
  refetch: () => void
}

// Cache for storing recent game results
let cache: {
  data: CompletedGameData[]
  timestamp: number
} | null = null

const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds (for 5 requests/minute limit)

export const useRecentGameResultsWithCache =
  (): UseRecentGameResultsWithCacheReturn => {
    const [data, setData] = useState<CompletedGameData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Check if we have valid cached data
        if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
          console.log("🏀 Using cached recent game results")
          setData(cache.data)
          setIsLoading(false)
          return
        }

        console.log("🏀 Fetching fresh recent game results")
        const recentResults = await ballDontLieApiService.getRecentGameResults()

        // Update cache
        cache = {
          data: recentResults,
          timestamp: Date.now(),
        }

        setData(recentResults)
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to fetch recent game results"
        setError(errorMessage)
        console.error("Error fetching recent game results:", err)
      } finally {
        setIsLoading(false)
      }
    }

    const refetch = () => {
      // Clear cache to force fresh data
      cache = null
      fetchData()
    }

    useEffect(() => {
      fetchData()
    }, [])

    return {
      data,
      isLoading,
      error,
      refetch,
    }
  }
