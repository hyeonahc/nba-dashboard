import { useQuery } from "@tanstack/react-query"
import { newsApiService } from "../../api/newsApi"

export const useLatestNews = () => {
  return useQuery({
    queryKey: ["latestNews"],
    queryFn: newsApiService.getLatestNews,
    staleTime: 1000 * 60 * 60, // 1 hour - news doesn't change frequently
    gcTime: 1000 * 60 * 60 * 2, // 2 hours - keep in cache longer
    retry: 0, // No retries to avoid API limits
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}
