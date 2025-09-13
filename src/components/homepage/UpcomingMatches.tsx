import { Clock } from "lucide-react"
import Card from "../ui/Card"
import MatchItem from "../ui/MatchItem"
import SectionHeader from "../ui/SectionHeader"

interface Match {
  id: number
  homeTeam: string
  awayTeam: string
  time: string
  date: string
  homeScore: number | null
  awayScore: number | null
}

interface UpcomingMatchesProps {
  matches: Match[]
}

const UpcomingMatches = ({ matches }: UpcomingMatchesProps) => {
  return (
    <Card>
      <SectionHeader
        icon={<Clock className="h-5 w-5 text-orange-500 mr-2" />}
        title="Upcoming Matches"
      />
      <div className="space-y-4">
        {matches.map(match => (
          <MatchItem
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            date={match.date}
            time={match.time}
          />
        ))}
      </div>
    </Card>
  )
}

export default UpcomingMatches
