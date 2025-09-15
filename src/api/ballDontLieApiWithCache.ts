import type { CompletedGameData, UpcomingGameData } from "../types"
import { ballDontLieApiService } from "./balldontlieApi"

// Cache interface for storing API responses
interface CacheEntry<T> {
  data: T
  timestamp: number
  expiry: number
}

// Cache storage
const cache = new Map<string, CacheEntry<any>>()

// Cache duration: 12 minutes (to stay well under 5 requests/minute limit)
const CACHE_DURATION = 12 * 60 * 1000 // 12 minutes in milliseconds

// Request tracking for rate limiting
let requestCount = 0
let requestWindowStart = Date.now()
const REQUEST_WINDOW = 60 * 1000 // 1 minute window
const MAX_REQUESTS_PER_MINUTE = 4 // Use 4 to be safe (leave 1 buffer)

/**
 * Check if we can make a request without exceeding rate limits
 */
const canMakeRequest = (): boolean => {
  const now = Date.now()

  // Reset counter if we're in a new minute window
  if (now - requestWindowStart >= REQUEST_WINDOW) {
    requestCount = 0
    requestWindowStart = now
  }

  return requestCount < MAX_REQUESTS_PER_MINUTE
}

/**
 * Track a request for rate limiting
 */
const trackRequest = (): void => {
  requestCount++
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

  console.log(`🏀 Using cached data for ${key}`)
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
      CACHE_DURATION / 1000 / 60
    } minutes)`
  )
}

/**
 * Cached Ball Don't Lie API service
 * Handles rate limiting and intelligent caching
 */
export const ballDontLieApiServiceWithCache = {
  /**
   * Get upcoming games with caching
   */
  getUpcomingGames: async (): Promise<UpcomingGameData[]> => {
    const cacheKey = "upcoming-games"

    // Try to get from cache first
    const cachedData = getCachedData<UpcomingGameData[]>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    // Check rate limiting
    if (!canMakeRequest()) {
      console.warn(
        "⚠️ Rate limit reached, using stale cache or returning empty array"
      )
      // Try to get any cached data, even if expired
      const staleEntry = cache.get(cacheKey)
      if (staleEntry) {
        console.log("🔄 Using stale cached data due to rate limiting")
        return staleEntry.data
      }
      return []
    }

    try {
      console.log("🌐 Fetching fresh upcoming games from API")
      trackRequest()
      const data = await ballDontLieApiService.getUpcomingGames()
      setCachedData(cacheKey, data)
      return data
    } catch (error) {
      console.error("❌ Error fetching upcoming games:", error)
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
   * Get recent game results with caching
   */
  getRecentGameResults: async (): Promise<CompletedGameData[]> => {
    const cacheKey = "recent-game-results"

    // Try to get from cache first
    const cachedData = getCachedData<CompletedGameData[]>(cacheKey)
    if (cachedData) {
      return cachedData
    }

    // Check rate limiting
    if (!canMakeRequest()) {
      console.warn(
        "⚠️ Rate limit reached, using stale cache or returning empty array"
      )
      // Try to get any cached data, even if expired
      const staleEntry = cache.get(cacheKey)
      if (staleEntry) {
        console.log("🔄 Using stale cached data due to rate limiting")
        return staleEntry.data
      }
      return []
    }

    try {
      console.log("🌐 Fetching fresh recent game results from API")
      trackRequest()
      const data = await ballDontLieApiService.getRecentGameResults()
      setCachedData(cacheKey, data)
      return data
    } catch (error) {
      console.error("❌ Error fetching recent game results:", error)
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
   * Get current rate limit status
   */
  getRateLimitStatus: () => {
    const now = Date.now()
    const timeSinceWindowStart = now - requestWindowStart
    const remainingTime = Math.max(0, REQUEST_WINDOW - timeSinceWindowStart)

    return {
      requestsUsed: requestCount,
      requestsRemaining: MAX_REQUESTS_PER_MINUTE - requestCount,
      windowResetIn: Math.ceil(remainingTime / 1000), // seconds
      canMakeRequest: canMakeRequest(),
    }
  },

  /**
   * Clear all cached data
   */
  clearCache: () => {
    cache.clear()
    requestCount = 0
    requestWindowStart = Date.now()
    console.log("🗑️ Ball Don't Lie API cache cleared")
  },

  /**
   * Get cache statistics
   */
  getCacheStats: () => {
    const now = Date.now()
    const entries = Array.from(cache.entries()).map(([key, entry]) => ({
      key,
      age: Math.floor((now - entry.timestamp) / 1000 / 60), // minutes
      expiresIn: Math.floor((entry.expiry - now) / 1000 / 60), // minutes
    }))

    return {
      totalEntries: cache.size,
      entries,
      rateLimitStatus: ballDontLieApiServiceWithCache.getRateLimitStatus(),
    }
  },
}

export default ballDontLieApiServiceWithCache
