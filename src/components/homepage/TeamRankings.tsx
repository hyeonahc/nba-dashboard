import { Trophy } from "lucide-react"
import Card from "../ui/Card"
import RankingItem from "../ui/RankingItem"
import SectionHeader from "../ui/SectionHeader"

interface Team {
  position: number
  team: string
  wins: number
  losses: number
  winPercentage: number
}

interface TeamRankingsProps {
  teams: Team[]
}

const TeamRankings = ({ teams }: TeamRankingsProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<Trophy className="h-5 w-5 text-orange-500 mr-2" />}
        title="Team Rankings"
      />
      <div className="space-y-3">
        {teams.map(team => (
          <RankingItem
            key={team.position}
            position={team.position}
            primaryText={team.team}
            secondaryText={`${team.wins}-${team.losses}`}
            rightValue={`${(team.winPercentage * 100).toFixed(1)}%`}
          />
        ))}
      </div>
    </Card>
  )
}

export default TeamRankings
