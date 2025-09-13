import { type ReactNode } from "react"

interface MatchItemProps {
  homeTeam: string
  awayTeam: string
  homeScore?: number | null
  awayScore?: number | null
  date?: string
  time?: string
  quarter?: string
  timeLeft?: string
  isLive?: boolean
  children?: ReactNode
  className?: string
}

const MatchItem = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  date,
  time,
  quarter,
  timeLeft,
  isLive = false,
  children,
  className = "",
}: MatchItemProps) => {
  const hasScores = homeScore !== null && awayScore !== null

  return (
    <div
      className={`border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors ${className}`}
    >
      {/* Header with date/time info */}
      {(date || time || quarter || timeLeft) && (
        <div className="flex justify-between items-center mb-2">
          {date && <span className="text-sm text-gray-500">{date}</span>}
          {time && (
            <span className="text-sm font-medium text-orange-600">{time}</span>
          )}
          {quarter && timeLeft && (
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                {quarter} Quarter
              </div>
              <div className="text-2xl font-bold text-gray-900">{timeLeft}</div>
            </div>
          )}
        </div>
      )}

      {/* Live indicator */}
      {isLive && (
        <div className="flex justify-center mb-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm text-red-600 font-medium">LIVE</span>
          </div>
        </div>
      )}

      {/* Teams and scores */}
      <div className="flex justify-between items-center">
        <div className="text-center flex-1">
          <div className="font-medium text-gray-900">{homeTeam}</div>
          {hasScores && (
            <div
              className={`text-2xl font-bold text-orange-600 ${
                isLive ? "text-3xl" : ""
              }`}
            >
              {homeScore}
            </div>
          )}
        </div>

        <div className="text-gray-400 text-xl mx-4">{isLive ? "-" : "vs"}</div>

        <div className="text-center flex-1">
          <div className="font-medium text-gray-900">{awayTeam}</div>
          {hasScores && (
            <div
              className={`text-2xl font-bold text-orange-600 ${
                isLive ? "text-3xl" : ""
              }`}
            >
              {awayScore}
            </div>
          )}
        </div>
      </div>

      {/* Custom content */}
      {children}
    </div>
  )
}

export default MatchItem
