import { Calendar } from "lucide-react"
import Card from "../ui/Card"
import SectionHeader from "../ui/SectionHeader"

interface UpcomingGameData {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamFullName: string
  awayTeamFullName: string
  homeTeamLogo?: string
  awayTeamLogo?: string
  date: string
  time: string
  season: string
}

interface UpcomingGamesProps {
  games: UpcomingGameData[]
}

const UpcomingGames = ({ games }: UpcomingGamesProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<Calendar className="h-5 w-5 text-orange-500 mr-2" />}
        title="Upcoming Games"
        rightSlot={
          <div className="text-sm text-gray-600">
            {games[0]?.season || "2023-24 Season"}
          </div>
        }
      />
      {games.length > 0 && (
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50 border border-orange-200 rounded-xl p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-orange-200 rounded-full translate-y-8 -translate-x-8 opacity-30"></div>

          {/* Game date and time - centered */}
          <div className="text-center mb-6 relative z-10">
            <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mb-2">
              <Calendar className="w-3 h-3 mr-1" />
              {games[0].date}
            </div>
            <div className="text-xl font-bold text-gray-900 bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
              {games[0].time}
            </div>
          </div>

          {/* Teams */}
          <div className="flex items-center justify-between relative z-10">
            {/* Home team */}
            <div className="flex flex-col items-center space-y-3 flex-1 group-hover:scale-105 transition-transform duration-300">
              <div className="text-xs text-orange-600 uppercase tracking-wide font-semibold bg-orange-100 px-2 py-1 rounded-full">
                Home
              </div>
              {games[0].homeTeamLogo && (
                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-full p-2 shadow-lg border-2 border-orange-200 group-hover:border-orange-300 transition-colors duration-300">
                  <img
                    src={games[0].homeTeamLogo}
                    alt={games[0].homeTeamFullName}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <span className="font-semibold text-gray-900 text-center text-sm leading-tight">
                {games[0].homeTeamFullName}
              </span>
            </div>

            {/* VS - centered between logos */}
            <div className="flex flex-col items-center space-y-2 px-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">VS</span>
              </div>
              <div className="w-1 h-8 bg-gradient-to-b from-orange-300 to-orange-500 rounded-full"></div>
            </div>

            {/* Away team */}
            <div className="flex flex-col items-center space-y-3 flex-1 group-hover:scale-105 transition-transform duration-300">
              <div className="text-xs text-orange-600 uppercase tracking-wide font-semibold bg-orange-100 px-2 py-1 rounded-full">
                Visitor
              </div>
              {games[0].awayTeamLogo && (
                <div className="w-20 h-20 flex-shrink-0 bg-white rounded-full p-2 shadow-lg border-2 border-orange-200 group-hover:border-orange-300 transition-colors duration-300">
                  <img
                    src={games[0].awayTeamLogo}
                    alt={games[0].awayTeamFullName}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <span className="font-semibold text-gray-900 text-center text-sm leading-tight">
                {games[0].awayTeamFullName}
              </span>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-b-xl"></div>
        </div>
      )}
    </Card>
  )
}

export default UpcomingGames
