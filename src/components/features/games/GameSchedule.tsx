import { Clock } from "lucide-react"
import type { UpcomingGameData } from "../../../types"
import Card from "../../ui/Card"
import MatchItem from "../../ui/MatchItem"
import SectionHeader from "../../ui/SectionHeader"

interface UpcomingGamesProps {
  games: UpcomingGameData[]
  loading: boolean
  error: string | null
}

const GameSchedule = ({ games, loading, error }: UpcomingGamesProps) => {
  if (loading) {
    return (
      <Card>
        <SectionHeader
          icon={<Clock className="h-5 w-5 text-orange-500 mr-2" />}
          title="Schedule"
        />
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
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
          icon={<Clock className="h-5 w-5 text-orange-500 mr-2" />}
          title="Schedule"
        />
        <div className="text-center py-8">
          <p className="text-red-500 mb-2">Failed to load upcoming games</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </Card>
    )
  }

  if (games.length === 0) {
    return (
      <Card>
        <SectionHeader
          icon={<Clock className="h-5 w-5 text-orange-500 mr-2" />}
          title="Schedule"
        />
        <div className="text-center py-8">
          <p className="text-gray-500">No upcoming games found</p>
        </div>
      </Card>
    )
  }

  // Get the next 5 games after the first one (which is displayed in the main UpcomingGames component)
  const moreGames = games.slice(1, 6)

  return (
    <Card>
      <SectionHeader
        icon={<Clock className="h-5 w-5 text-orange-500 mr-2" />}
        title="Schedule"
        rightSlot={
          games.length > 0 && (
            <span className="text-sm text-gray-500 font-medium">
              {games[0]?.season || ""}
            </span>
          )
        }
      />
      <div className="space-y-3">
        {moreGames.map(game => (
          <MatchItem
            key={game.id}
            homeTeam={game.homeTeam}
            awayTeam={game.awayTeam}
            homeTeamLogo={game.homeTeamLogo}
            awayTeamLogo={game.awayTeamLogo}
            date={game.date}
            time={game.time}
          />
        ))}
      </div>
    </Card>
  )
}

export default GameSchedule
