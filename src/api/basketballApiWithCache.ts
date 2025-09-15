import {
  basketballApiService,
  type TransformedTeamRanking,
} from "./basketballApi"

// Cache interface for storing API responses
interface CacheEntry<T> {
  data: T
  timestamp: number
  expiry: number
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>()

// Cache duration: 6 hours (to stay well under 100 requests/day limit)
const CACHE_DURATION = 6 * 60 * 60 * 1000 // 6 hours in milliseconds

// Daily request tracking
let dailyRequestCount = 0
let lastResetDate = new Date().toDateString()
const MAX_REQUESTS_PER_DAY = 90 // Use 90 to be safe (leave 10 buffer)

/**
 * Check if we can make a request without exceeding daily limits
 */
const canMakeRequest = (): boolean => {
  const today = new Date().toDateString()

  // Reset counter if it's a new day
  if (today !== lastResetDate) {
    dailyRequestCount = 0
    lastResetDate = today
    console.log("🔄 Daily request counter reset for new day")
  }

  return dailyRequestCount < MAX_REQUESTS_PER_DAY
}

/**
 * Track a request for daily rate limiting
 */
const trackRequest = (): void => {
  dailyRequestCount++
  console.log(
    `📊 Daily requests used: ${dailyRequestCount}/${MAX_REQUESTS_PER_DAY}`
  )
}

/**
 * Validate that the data is a valid team rankings array
 */
const isValidTeamRankingsData = (
  data: any
): data is TransformedTeamRanking[] => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return false
  }

  // Check if the first item has required properties
  const firstItem = data[0]
  return (
    firstItem &&
    typeof firstItem === "object" &&
    "position" in firstItem &&
    "team" in firstItem &&
    "wins" in firstItem &&
    "losses" in firstItem &&
    "conference" in firstItem
  )
}

/**
 * Get cached data if available and not expired
 */
const getCachedData = <T>(key: string): T | null => {
  const entry = cache.get(key)
  if (!entry) return null

  const now = Date.now()
  if (now > entry.expiry) {
    cache.delete(key)
    return null
  }

  console.log(`🏆 Using cached data for ${key}`)
  return entry.data
}

/**
 * Set cached data with expiry
 */
const setCachedData = <T>(key: string, data: T): void => {
  const now = Date.now()
  cache.set(key, {
    data,
    timestamp: now,
    expiry: now + CACHE_DURATION,
  })
  console.log(
    `💾 Cached data for ${key} (expires in ${
      CACHE_DURATION / 1000 / 60 / 60
    } hours)`
  )
}

/**
 * Cached Basketball API service
 * Handles daily rate limiting and intelligent caching
 */
export const basketballApiServiceWithCache = {
  /**
   * Get team rankings with caching
   */
  getTeamRankings: async (): Promise<TransformedTeamRanking[]> => {
    const cacheKey = "team-rankings"

    // Try to get from cache first
    const cachedData = getCachedData<TransformedTeamRanking[]>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    // Check daily rate limiting
    if (!canMakeRequest()) {
      console.warn(
        "⚠️ Daily rate limit reached, using stale cache or returning empty array"
      )
      // Try to get any cached data, even if expired
      const staleEntry = cache.get(cacheKey)
      if (staleEntry) {
        console.log("🔄 Using stale cached data due to daily rate limiting")
        return staleEntry.data
      }
      return []
    }

    try {
      console.log("🌐 Fetching fresh team rankings from API")
      trackRequest()
      const data = await basketballApiService.getTeamRankings()

      // Only cache if we have valid data structure
      if (isValidTeamRankingsData(data)) {
        console.log(`✅ Valid data received: ${data.length} teams`)
        setCachedData(cacheKey, data)
        return data
      } else {
        console.warn(
          "⚠️ API returned invalid or empty data structure, not caching"
        )
        // Try to return stale cache instead of empty data
        const staleEntry = cache.get(cacheKey)
        if (staleEntry) {
          console.log("🔄 Returning stale cache due to invalid API response")
          return staleEntry.data
        }
        return []
      }
    } catch (error) {
      console.error("❌ Error fetching team rankings:", error)
      // Try to return stale cache on error
      const staleEntry = cache.get(cacheKey)
      if (staleEntry) {
        console.log("🔄 Returning stale cache due to API error")
        return staleEntry.data
      }
      throw error
    }
  },

  /**
   * Get current daily rate limit status
   */
  getDailyRateLimitStatus: () => {
    const today = new Date().toDateString()
    const isNewDay = today !== lastResetDate

    if (isNewDay) {
      dailyRequestCount = 0
      lastResetDate = today
    }

    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const hoursUntilReset = Math.ceil(
      (tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60)
    )

    return {
      requestsUsed: dailyRequestCount,
      requestsRemaining: MAX_REQUESTS_PER_DAY - dailyRequestCount,
      hoursUntilReset,
      canMakeRequest: canMakeRequest(),
      isNewDay,
    }
  },

  /**
   * Clear all cached data
   */
  clearCache: () => {
    cache.clear()
    dailyRequestCount = 0
    lastResetDate = new Date().toDateString()
    console.log("🗑️ Basketball API cache cleared")
  },

  /**
   * Clear only invalid cache entries
   */
  clearInvalidCache: () => {
    const entriesToDelete: string[] = []

    for (const [key, entry] of cache.entries()) {
      if (!isValidTeamRankingsData(entry.data)) {
        entriesToDelete.push(key)
      }
    }

    entriesToDelete.forEach(key => {
      cache.delete(key)
      console.log(`🗑️ Removed invalid cache entry: ${key}`)
    })

    if (entriesToDelete.length > 0) {
      console.log(`🧹 Cleaned ${entriesToDelete.length} invalid cache entries`)
    } else {
      console.log("✅ No invalid cache entries found")
    }
  },

  /**
   * Get cache statistics
   */
  getCacheStats: () => {
    const now = Date.now()
    const entries = Array.from(cache.entries()).map(([key, entry]) => ({
      key,
      age: Math.floor((now - entry.timestamp) / 1000 / 60 / 60), // hours
      expiresIn: Math.floor((entry.expiry - now) / 1000 / 60 / 60), // hours
    }))

    return {
      totalEntries: cache.size,
      entries,
      dailyRateLimitStatus:
        basketballApiServiceWithCache.getDailyRateLimitStatus(),
    }
  },
}

export default basketballApiServiceWithCache
