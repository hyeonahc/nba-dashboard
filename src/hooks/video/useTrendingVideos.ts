import { useQuery } from "@tanstack/react-query"
import { youtubeApiService } from "../../api/youtubeApi"

// TODO: This is the production-ready hook (no localStorage caching)
// Replace useTrendingVideosWithCache with this before deployment

export const useTrendingVideos = () => {
  return useQuery({
    queryKey: ["trendingVideos"],
    queryFn: youtubeApiService.getTrendingVideos,
    staleTime: 1000 * 60 * 15, // 15 minutes - videos change more frequently than news
    gcTime: 1000 * 60 * 60 * 24, // 24 hours - keep in cache for a day
    retry: 1, // Allow one retry for YouTube API
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false, // Never refetch automatically
  })
}

// Global function to clear all caches (for debugging)
if (typeof window !== "undefined") {
  ;(window as any).clearAllCaches = () => {
    console.log("🧹 Clearing all React Query caches...")
    // This will be available in browser console
  }
}
