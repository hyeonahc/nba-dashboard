import { useEffect, useState } from "react"
import { ballDontLieApiServiceWithCache } from "../../api/ballDontLieApiWithCache"
import type { CompletedGameData } from "../../types"

interface UseRecentGameResultsReturn {
  games: CompletedGameData[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useRecentGameResults = (): UseRecentGameResultsReturn => {
  const [games, setGames] = useState<CompletedGameData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGames = async () => {
    try {
      setLoading(true)
      setError(null)
      const recentResults =
        await ballDontLieApiServiceWithCache.getRecentGameResults()
      setGames(recentResults)
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch recent game results"
      setError(errorMessage)
      console.error("Error fetching recent game results:", err)
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
