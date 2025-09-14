import { useQuery } from "@tanstack/react-query"
import { newsApiService } from "../../api/newsApi"

const CACHE_KEY = "nba-dashboard-news-cache"
const CACHE_EXPIRY_KEY = "nba-dashboard-news-cache-expiry"
// TODO: Before deployment, replace this entire hook with useLatestNews.ts
// This hook uses localStorage caching which is only needed for development

// Consider: 5-15 minutes for production to show fresh articles on user refresh
const CACHE_DURATION = 1000 * 60 * 60 * 24 // 24 hours

// Helper functions for localStorage caching
const getCachedNews = (): any[] | null => {
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

    // Check if cached data has imageUrl (new format)
    // If not, it's old cached data without images, so invalidate cache
    if (parsedCache.length > 0 && !parsedCache[0].hasOwnProperty("imageUrl")) {
      console.log("🗑️ Old cached data detected (no imageUrl), clearing cache")
      localStorage.removeItem(CACHE_KEY)
      localStorage.removeItem(CACHE_EXPIRY_KEY)
      return null
    }

    return parsedCache
  } catch (error) {
    console.error("Error reading cached news:", error)
    return null
  }
}

const setCachedNews = (news: any[]) => {
  try {
    const expiry = Date.now() + CACHE_DURATION
    localStorage.setItem(CACHE_KEY, JSON.stringify(news))
    localStorage.setItem(CACHE_EXPIRY_KEY, expiry.toString())
  } catch (error) {
    console.error("Error caching news:", error)
  }
}

export const useLatestNewsWithCache = () => {
  return useQuery({
    queryKey: ["latestNews"],
    queryFn: async () => {
      // First check if we have valid cached data
      const cachedNews = getCachedNews()
      if (cachedNews) {
        console.log("📰 Using cached news data for development (no API call)")
        return cachedNews
      }

      // If no cache, fetch from API
      console.log("🌐 Fetching fresh news data from API")
      const freshNews = await newsApiService.getLatestNews()

      // Cache the fresh data
      setCachedNews(freshNews)
      console.log(
        "💾 News data cached for 24 hours (TODO: Reduce for production)"
      )

      return freshNews
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
export const clearNewsCache = () => {
  localStorage.removeItem(CACHE_KEY)
  localStorage.removeItem(CACHE_EXPIRY_KEY)
  console.log("🗑️ News cache cleared")
}

// One-time cache clear to force fresh data with images
if (
  typeof window !== "undefined" &&
  !localStorage.getItem("cache-cleared-v3")
) {
  clearNewsCache()
  localStorage.setItem("cache-cleared-v3", "true")
  console.log("🔄 Cache cleared to force fresh data with Pexels images")
}
