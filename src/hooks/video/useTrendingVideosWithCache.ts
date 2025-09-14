import { useQuery } from "@tanstack/react-query"
import { youtubeApiService } from "../../api/youtubeApi"

const CACHE_KEY = "nba-dashboard-youtube-cache"
const CACHE_EXPIRY_KEY = "nba-dashboard-youtube-cache-expiry"
// TODO: Before deployment, replace this entire hook with useTrendingVideos.ts
// This hook uses localStorage caching which is only needed for development

// Consider: 5-15 minutes for production to show fresh videos on user refresh
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

// Helper functions for localStorage caching
const getCachedVideos = (): any[] | null => {
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
    if (parsedCache.length > 0 && !parsedCache[0].hasOwnProperty("id")) {
      console.log("🗑️ Old cached data detected (no id), clearing cache")
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_EXPIRY_KEY)
      return null
    }

    return parsedCache
  } catch (error) {
    console.error("Error reading cached videos:", error)
    return null
  }
}

const setCachedVideos = (videos: any[]) => {
  try {
    const expiry = Date.now() + CACHE_DURATION
    localStorage.setItem(CACHE_KEY, JSON.stringify(videos))
    localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString())
  } catch (error) {
    console.error("Error caching videos:", error)
  }
}

export const useTrendingVideosWithCache = () => {
  return useQuery({
    queryKey: ["trendingVideos"],
    queryFn: async () => {
      // First check if we have valid cached data
      const cachedVideos = getCachedVideos()
      if (cachedVideos) {
        console.log(
          "📦 Using cached YouTube videos for development (no API call)"
        )
        return cachedVideos
      }

      // If no cache, fetch from API
      console.log("🌐 Fetching fresh YouTube videos from API")
      const freshVideos = await youtubeApiService.getTrendingVideos()

      // Cache the fresh data
      setCachedVideos(freshVideos)
      console.log(
        "💾 YouTube videos cached for 24 hours (TODO: Reduce for production)"
      )

      return freshVideos
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
export const clearVideosCache = () => {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(CACHE_EXPIRY_KEY)
  console.log("🗑️ YouTube videos cache cleared")
}

// One-time cache clear to force fresh data
if (
  typeof window !== "undefined" &&
  !localStorage.getItem("youtube-cache-cleared-v1")
) {
  clearVideosCache()
  localStorage.setItem("youtube-cache-cleared-v1", "true")
  console.log("🔄 YouTube cache cleared to force fresh data")
}
