import { TrendingUp } from "lucide-react"
import Card from "../ui/Card"
import MatchItem from "../ui/MatchItem"
import SectionHeader from "../ui/SectionHeader"

interface PastMatch {
  id: number
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  date: string
}

interface PastMatchesProps {
  matches: PastMatch[]
}

const PastMatches = ({ matches }: PastMatchesProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<TrendingUp className="h-5 w-5 text-orange-500 mr-2" />}
        title="Recent Results"
      />
      <div className="space-y-3">
        {matches.map(match => (
          <MatchItem
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            date={match.date}
          />
        ))}
      </div>
    </Card>
  )
}

export default PastMatches
