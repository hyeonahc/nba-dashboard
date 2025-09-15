import { Trophy } from "lucide-react"
import type { TransformedTeamRanking } from "../../types"
import Card from "../ui/Card"
import SectionHeader from "../ui/SectionHeader"

interface TeamRankingsConferenceProps {
  teams: TransformedTeamRanking[]
  conference: "Eastern Conference" | "Western Conference"
  isLoading?: boolean
  error?: Error | null
  maxTeams?: number
}

const TeamRankingsConference = ({
  teams,
  conference,
  isLoading,
  error,
  maxTeams = 15,
}: TeamRankingsConferenceProps) => {
  // Filter teams for the specified conference only
  const conferenceTeams = teams
    .filter(team => team.conference === conference)
    .map((team, index) => ({
      ...team,
      position: index + 1, // Reassign positions sequentially within conference
    }))
    .slice(0, maxTeams) // Limit to maxTeams (default 15, but can be overridden)

  const conferenceName =
    conference === "Eastern Conference" ? "Eastern" : "Western"

  return (
    <Card>
      <SectionHeader
        icon={<Trophy className="h-5 w-5 text-orange-500 mr-2" />}
        title={`${conferenceName} Conference Standings`}
      />

      {/* TODO: Display season information in SectionHeader rightSlot */}
      {/* TODO: Remove game info */}
      {/* Subtle games played indicator */}
      {!isLoading && !error && conferenceTeams.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 text-right">
            {conferenceTeams[0]?.gamesPlayed ?? 82} games
          </p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading standings...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Failed to load standings
              </h3>
              <p className="text-sm text-red-700 mt-1">
                {error.message ||
                  "Unable to fetch team standings. Please try again later."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Standings List */}
      {!isLoading && !error && conferenceTeams.length > 0 && (
        <div className="space-y-3">
          {/* Team Rankings */}
          {conferenceTeams.map((team, index) => {
            const pointDiff = team.pointDifference ?? 0
            const isPositiveDiff = pointDiff > 0

            return (
              <div
                key={`${team.team}-${team.position}-${index}`}
                className="hover:bg-gray-50 rounded-lg transition-colors p-3 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  {/* Position and Team Info */}
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-orange-600">
                          {team.position}
                        </span>
                      </div>
                    </div>

                    {/* Team Logo */}
                    {team.logo && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={team.logo}
                          alt={team.team}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {team.team}
                      </h3>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center space-x-6 text-sm">
                      {/* Win/Loss Record */}
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {team.wins ?? 0}-{team.losses ?? 0}
                        </div>
                        <div className="text-xs text-gray-500">Record</div>
                      </div>

                      {/* Win Percentage */}
                      <div className="text-center">
                        <div className="font-medium text-gray-900">
                          {((team.winPercentage ?? 0) * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">Win %</div>
                      </div>

                      {/* Point Difference */}
                      <div className="text-center">
                        <div
                          className={`font-medium ${
                            isPositiveDiff ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {isPositiveDiff ? "+" : ""}
                          {pointDiff.toFixed(0)}
                        </div>
                        <div className="text-xs text-gray-500">Diff</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && conferenceTeams.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-500">
            No {conferenceName} Conference standings available
          </p>
        </div>
      )}
    </Card>
  )
}

export default TeamRankingsConference
