// TODO: Refactor to keep data fetching inside each component (LatestNews, TrendingVideos, UpcomingGames)
// Homepage should only handle layout and shared data (standings)
import { useUpcomingGamesWithCache } from "../hooks/games/useUpcomingGamesWithCache"
import { useLatestNewsWithCache } from "../hooks/news/useLatestNewsWithCache"
import { useStandingsWithCache } from "../hooks/standings/useStandingsWithCache"
import { useTrendingVideosWithCache } from "../hooks/video/useTrendingVideosWithCache"

import LatestNews from "./homepage/LatestNews"
import PastMatches from "./homepage/PastMatches"
import TeamRankingsConference from "./homepage/TeamRankingsConference"
import TrendingVideos from "./homepage/TrendingVideos"
import UpcomingGames from "./homepage/UpcomingGames"
import UpcomingMatches from "./homepage/UpcomingMatches"

const Homepage = () => {
  // Fetch all data at the Homepage level to show loading one time
  const { data: news = [], isLoading: newsLoading } = useLatestNewsWithCache()
  const {
    data: trendingVideos = [],
    isLoading: videosLoading,
    error: videosError,
  } = useTrendingVideosWithCache()
  const {
    data: standings = [],
    isLoading: standingsLoading,
    error: standingsError,
  } = useStandingsWithCache()
  const {
    games: upcomingGames = [],
    loading: gamesLoading,
    error: gamesError,
  } = useUpcomingGamesWithCache()

  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      time: "8:00 PM",
      date: "Today",
      homeScore: null,
      awayScore: null,
    },
    {
      id: 2,
      homeTeam: "Celtics",
      awayTeam: "Heat",
      time: "7:30 PM",
      date: "Tomorrow",
      homeScore: null,
      awayScore: null,
    },
  ]

  // Show loading state until all data is ready
  if (newsLoading || videosLoading || standingsLoading || gamesLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading content...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <PastMatches />
          <UpcomingMatches matches={upcomingMatches} />
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-6 space-y-6">
          <UpcomingGames
            games={upcomingGames}
            loading={gamesLoading}
            error={gamesError}
          />
          <TeamRankingsConference
            teams={standings}
            conference="Eastern Conference"
            isLoading={standingsLoading}
            error={standingsError}
            maxTeams={6}
          />
          <TeamRankingsConference
            teams={standings}
            conference="Western Conference"
            isLoading={standingsLoading}
            error={standingsError}
            maxTeams={6}
          />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-6">
          <TrendingVideos
            videos={trendingVideos}
            isLoading={videosLoading}
            error={videosError}
          />
          <LatestNews articles={news} />
        </div>
      </div>
    </div>
  )
}

export default Homepage
