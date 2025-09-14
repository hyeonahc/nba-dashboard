import { useQuery } from "@tanstack/react-query"
import { newsApiService } from "../../api/newsApi"

export const useLatestNews = () => {
  return useQuery({
    queryKey: ["latestNews"],
    queryFn: newsApiService.getLatestNews,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - news doesn't change frequently
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days - keep in cache much longer
    retry: 0, // No retries to avoid API limits
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false, // Never refetch automatically
  })
}
