import { ballDontLieApiServiceWithCache } from "../api/ballDontLieApiWithCache"
import { basketballApiServiceWithCache } from "../api/basketballApiWithCache"

/**
 * Utility functions for monitoring and managing API caches
 */

/**
 * Get current cache and rate limit status for all APIs
 */
export const getCacheStatus = () => {
  return {
    ballDontLie: ballDontLieApiServiceWithCache.getCacheStats(),
    basketball: basketballApiServiceWithCache.getCacheStats(),
  }
}

/**
 * Clear all cached data
 */
export const clearAllCaches = () => {
  ballDontLieApiServiceWithCache.clearCache()
  basketballApiServiceWithCache.clearCache()
}

/**
 * Clear only invalid cached data
 */
export const clearInvalidCaches = () => {
  basketballApiServiceWithCache.clearInvalidCache()
  console.log("🧹 Invalid cache entries cleared")
}

/**
 * Log current cache status to console
 */
export const logCacheStatus = () => {
  const stats = getCacheStatus()
  console.log("📊 API Cache Status:", stats)

  // Ball Don't Lie API status
  const ballDontLieStatus = stats.ballDontLie.rateLimitStatus
  if (ballDontLieStatus.canMakeRequest) {
    console.log(
      `🏀 Ball Don't Lie: ✅ Can make ${ballDontLieStatus.requestsRemaining} more requests`
    )
  } else {
    console.log(
      `🏀 Ball Don't Lie: ⚠️ Rate limited - ${ballDontLieStatus.windowResetIn}s until reset`
    )
  }

  // Basketball API status
  const basketballStatus = stats.basketball.dailyRateLimitStatus
  if (basketballStatus.canMakeRequest) {
    console.log(
      `🏆 Basketball API: ✅ Can make ${basketballStatus.requestsRemaining} more requests today`
    )
  } else {
    console.log(
      `🏆 Basketball API: ⚠️ Daily limit reached - ${basketballStatus.hoursUntilReset}h until reset`
    )
  }
}

/**
 * Make cache status available globally for debugging
 */
if (typeof window !== "undefined") {
  ;(window as any).nbaDashboardCache = {
    getStatus: getCacheStatus,
    clearCache: clearAllCaches,
    clearInvalidCache: clearInvalidCaches,
    logStatus: logCacheStatus,
  }

  console.log(
    "🔧 Cache utilities available globally as window.nbaDashboardCache"
  )
}
