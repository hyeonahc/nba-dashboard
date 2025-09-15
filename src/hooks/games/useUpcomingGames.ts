import { useEffect, useState } from "react"
import { ballDontLieApiServiceWithCache } from "../../api/ballDontLieApiWithCache"
import type { UpcomingGameData } from "../../types"

interface UseUpcomingGamesReturn {
  games: UpcomingGameData[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useUpcomingGames = (): UseUpcomingGamesReturn => {
  const [games, setGames] = useState<UpcomingGameData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGames = async () => {
    try {
      setLoading(true)
      setError(null)
      const upcomingGames =
        await ballDontLieApiServiceWithCache.getUpcomingGames()
      setGames(upcomingGames)
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
