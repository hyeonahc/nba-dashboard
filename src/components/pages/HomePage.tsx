// Homepage handles layout and shared data (standings, games)
import { useUpcomingGames } from "../../hooks/games/useUpcomingGames"
import { useStandings } from "../../hooks/standings/useStandings"

import {
  GameSchedule,
  LatestNews,
  PastMatches,
  TeamRankingsConference,
  TrendingVideos,
  UpcomingGames,
} from "../features"

const Homepage = () => {
  // Fetch shared data at the Homepage level
  const {
    data: standings = [],
    isLoading: standingsLoading,
    error: standingsError,
  } = useStandings()
  const {
    games: upcomingGames = [],
    loading: gamesLoading,
    error: gamesError,
  } = useUpcomingGames()

  // Show loading state until shared data is ready
  if (standingsLoading || gamesLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            {/* Basketball Icon with Jumping Animation */}
            <div className="mb-6">
              <div className="text-6xl animate-bounce">🏀</div>
            </div>
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
          <GameSchedule
            games={upcomingGames}
            loading={gamesLoading}
            error={gamesError}
          />
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
          <TrendingVideos />
          <LatestNews />
        </div>
      </div>
    </div>
  )
}

export default Homepage
