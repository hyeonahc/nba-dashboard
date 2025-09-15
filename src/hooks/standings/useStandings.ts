import { useQuery } from "@tanstack/react-query"
import { basketballApiServiceWithCache } from "../../api/basketballApiWithCache"

// TODO: This is the production-ready hook (no localStorage caching)
// Replace useStandingsWithCache with this before deployment

export const useStandings = () => {
  return useQuery({
    queryKey: ["standings"],
    queryFn: basketballApiServiceWithCache.getTeamRankings,
    staleTime: 1000 * 60 * 30, // 30 minutes - standings change daily
    gcTime: 1000 * 60 * 60, // 1 hour
    retry: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false, // Never refetch automatically
  })
}
