import { Play } from "lucide-react"
import Card from "../ui/Card"
import SectionHeader from "../ui/SectionHeader"

interface LiveMatchData {
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  quarter: string
  timeLeft: string
  isLive: boolean
}

interface LiveMatchProps {
  match: LiveMatchData
}

const LiveMatch = ({ match }: LiveMatchProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<Play className="h-5 w-5 text-red-500 mr-2" />}
        title="Live Match"
        rightSlot={
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-red-600 font-medium">LIVE</span>
          </div>
        }
      />
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4">
        <div className="text-center mb-4">
          <div className="text-sm text-gray-600 mb-1">
            {match.quarter} Quarter
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {match.timeLeft}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900">
              {match.homeTeam}
            </div>
            <div className="text-3xl font-bold text-orange-600">
              {match.homeScore}
            </div>
          </div>
          <div className="text-gray-400 text-2xl">-</div>
          <div className="text-center">
            <div className="font-bold text-lg text-gray-900">
              {match.awayTeam}
            </div>
            <div className="text-3xl font-bold text-orange-600">
              {match.awayScore}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default LiveMatch
