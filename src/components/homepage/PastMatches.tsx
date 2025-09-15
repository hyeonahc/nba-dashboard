import { TrendingUp } from "lucide-react"
import { useRecentGameResultsWithCache } from "../../hooks/games/useRecentGameResultsWithCache"
import Card from "../ui/Card"
import MatchItem from "../ui/MatchItem"
import SectionHeader from "../ui/SectionHeader"

const PastMatches = () => {
  const {
    data: games,
    isLoading: loading,
    error,
  } = useRecentGameResultsWithCache()

  if (loading) {
    return (
      <Card>
        <SectionHeader
          icon={<TrendingUp className="h-5 w-5 text-orange-500 mr-2" />}
          title="Results"
        />
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-center flex-1">
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-8 mx-auto"></div>
                </div>
                <div className="text-gray-400 text-xl mx-4">vs</div>
                <div className="text-center flex-1">
                  <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-8 mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <SectionHeader
          icon={<TrendingUp className="h-5 w-5 text-orange-500 mr-2" />}
          title="Results"
        />
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Failed to load recent results</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </Card>
    )
  }

  if (games.length === 0) {
    return (
      <Card>
        <SectionHeader
          icon={<TrendingUp className="h-5 w-5 text-orange-500 mr-2" />}
          title="Results"
        />
        <div className="text-center py-8">
          <p className="text-gray-500">No recent games found</p>
        </div>
      </Card>
    )
  }

  // Get season info from the first game (all games should have the same season)
  const seasonInfo = games.length > 0 ? games[0].season : ""

  return (
    <Card>
      <SectionHeader
        icon={<TrendingUp className="h-5 w-5 text-orange-500 mr-2" />}
        title="Results"
        rightSlot={
          seasonInfo && (
            <span className="text-sm text-gray-500 font-medium">
              {seasonInfo}
            </span>
          )
        }
      />
      <div className="space-y-3">
        {games.slice(0, 3).map(game => (
          <MatchItem
            key={game.id}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            homeTeamLogo={game.homeTeamLogo}
            awayTeamLogo={game.awayTeamLogo}
            homeScore={game.homeScore}
            awayScore={game.awayScore}
            date={game.date}
          />
        ))}
      </div>
    </Card>
  )
}

export default PastMatches
