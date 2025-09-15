// TODO: Using cached hooks to reduce API calls during development.
//       Replace with real-time hooks (no localStorage cache) before production deployment.
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
  // TODO: Using cached hooks to reduce API calls during development.
  //       Replace with real-time hooks (no localStorage cache) before production deployment.
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

  const upcomingGames = [
    {
      id: "1",
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      homeTeamFullName: "Los Angeles Lakers",
      awayTeamFullName: "Golden State Warriors",
      homeTeamLogo:
        "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg",
      awayTeamLogo:
        "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg",
      date: "Today",
      time: "8:00 PM",
      season: "2023-24 Season",
    },
    {
      id: "2",
      homeTeam: "Celtics",
      awayTeam: "Heat",
      homeTeamFullName: "Boston Celtics",
      awayTeamFullName: "Miami Heat",
      homeTeamLogo:
        "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg",
      awayTeamLogo:
        "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg",
      date: "Tomorrow",
      time: "7:30 PM",
      season: "2023-24 Season",
    },
  ]

  const pastMatches = [
    {
      id: 1,
      homeTeam: "Celtics",
      awayTeam: "Heat",
      homeScore: 112,
      awayScore: 108,
      date: "Yesterday",
    },
    {
      id: 2,
      homeTeam: "Nuggets",
      awayTeam: "Lakers",
      homeScore: 120,
      awayScore: 115,
      date: "2 days ago",
    },
    {
      id: 3,
      homeTeam: "Thunder",
      awayTeam: "Warriors",
      homeScore: 128,
      awayScore: 120,
      date: "3 days ago",
    },
  ]

  // Show loading state for news, videos, or standings
  if (newsLoading || videosLoading || standingsLoading) {
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
          <UpcomingMatches matches={upcomingMatches} />
          <PastMatches matches={pastMatches} />
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-6 space-y-6">
          <UpcomingGames games={upcomingGames} />
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
