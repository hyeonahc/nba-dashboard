import { useQuery } from "@tanstack/react-query"
import { basketballApiService } from "../../api/basketballApi"

const CACHE_KEY = "nba-dashboard-standings-cache"
const CACHE_EXPIRY_KEY = "nba-dashboard-standings-cache-expiry"
// TODO: Before deployment, replace this entire hook with useStandings.ts
// This hook uses localStorage caching which is only needed for development

// Consider: 5-15 minutes for production to show fresh standings on user refresh
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

// Helper functions for localStorage caching
const getCachedStandings = (): unknown[] | null => {
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY)

    if (!cached || !expiry) return null

    const now = Date.now()
    const cacheTime = parseInt(expiry, 10)

    if (now > cacheTime) {
      // Cache expired, remove it
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_EXPIRY_KEY)
      return null
    }

    const parsedCache = JSON.parse(cached)

    // Check if cached data has required fields (new format validation)
    // If not, it's old cached data, so invalidate cache
    if (
      parsedCache.length > 0 &&
      !Object.prototype.hasOwnProperty.call(parsedCache[0], "position")
    ) {
      console.log("🗑️ Old cached data detected (no position), clearing cache")
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_EXPIRY_KEY)
      return null
    }

    return parsedCache
  } catch (error) {
    console.error("Error reading cached standings:", error)
    return null
  }
}

const setCachedStandings = (standings: unknown[]) => {
  try {
    const expiry = Date.now() + CACHE_DURATION
    localStorage.setItem(CACHE_KEY, JSON.stringify(standings))
    localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString())
  } catch (error) {
    console.error("Error caching standings:", error)
  }
}

export const useStandingsWithCache = () => {
  return useQuery({
    queryKey: ["standings"],
    queryFn: async () => {
      // First check if we have valid cached data
      const cachedStandings = getCachedStandings()
      if (cachedStandings) {
        console.log("🏆 Using cached standings for development (no API call)")
        console.log("📊 Sample cached team data:", cachedStandings[0])
        return cachedStandings
      }

      // If no cache, fetch from API
      console.log("🌐 Fetching fresh standings from API")
      const freshStandings = await basketballApiService.getTeamRankings()
      console.log("📊 Sample fresh team data:", freshStandings[0])

      // Cache the fresh data
      setCachedStandings(freshStandings)
      console.log(
        "💾 Standings cached for 24 hours (TODO: Reduce for production)"
      )

      return freshStandings
    },
    staleTime: Infinity, // Never consider data stale
    gcTime: Infinity, // Never garbage collect
    retry: 0, // No retries to avoid API limits
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  })
}

// Helper function to manually clear cache (for testing)
export const clearStandingsCache = () => {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(CACHE_EXPIRY_KEY)
  console.log("🗑️ Standings cache cleared")
}

// One-time cache clear to force fresh data
if (
  typeof window !== "undefined" &&
  !localStorage.getItem("standings-cache-cleared-v2")
) {
  clearStandingsCache()
  localStorage.setItem("standings-cache-cleared-v2", "true")
  console.log(
    "🔄 Standings cache cleared to force fresh data (v2 - point difference fix)"
  )
}
