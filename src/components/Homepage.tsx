import LatestNews from "./homepage/LatestNews"
import LiveMatch from "./homepage/LiveMatch"
import PastMatches from "./homepage/PastMatches"
import TeamRankings from "./homepage/TeamRankings"
import TrendingVideos from "./homepage/TrendingVideos"
import UpcomingMatches from "./homepage/UpcomingMatches"

const Homepage = () => {
  // Mock data - in a real app, this would come from an API
  const upcomingMatches = [
    {
      id: 1,
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      time: "8:00 PM",
      date: "Today",
      homeScore: null,
      awayScore: null,
    },
    {
      id: 2,
      homeTeam: "Celtics",
      awayTeam: "Heat",
      time: "7:30 PM",
      date: "Tomorrow",
      homeScore: null,
      awayScore: null,
    },
  ]

  const rankings = [
    { position: 1, team: "Celtics", wins: 25, losses: 6, winPercentage: 0.806 },
    {
      position: 2,
      team: "Timberwolves",
      wins: 24,
      losses: 7,
      winPercentage: 0.774,
    },
    { position: 3, team: "Thunder", wins: 23, losses: 8, winPercentage: 0.742 },
    { position: 4, team: "Nuggets", wins: 22, losses: 9, winPercentage: 0.71 },
    { position: 5, team: "Bucks", wins: 21, losses: 10, winPercentage: 0.677 },
  ]

  const liveMatch = {
    homeTeam: "Lakers",
    awayTeam: "Warriors",
    homeScore: 98,
    awayScore: 95,
    quarter: "4th",
    timeLeft: "2:34",
    isLive: true,
  }

  const pastMatches = [
    {
      id: 1,
      homeTeam: "Celtics",
      awayTeam: "Heat",
      homeScore: 112,
      awayScore: 108,
      date: "Yesterday",
    },
    {
      id: 2,
      homeTeam: "Nuggets",
      awayTeam: "Lakers",
      homeScore: 120,
      awayScore: 115,
      date: "2 days ago",
    },
    {
      id: 3,
      homeTeam: "Thunder",
      awayTeam: "Warriors",
      homeScore: 128,
      awayScore: 120,
      date: "3 days ago",
    },
  ]

  const trendingVideos = [
    {
      id: 1,
      title: "LeBron James 40-Point Performance",
      duration: "3:24",
      views: "2.1M",
      thumbnail: "🏀",
    },
    {
      id: 2,
      title: "Steph Curry Game-Winning Shot",
      duration: "2:15",
      views: "1.8M",
      thumbnail: "🏀",
    },
    {
      id: 3,
      title: "Giannis Antetokounmpo Dunk Compilation",
      duration: "4:12",
      views: "1.5M",
      thumbnail: "🏀",
    },
  ]

  const news = [
    {
      id: 1,
      title: "Lakers Sign New Point Guard",
      summary: "The Lakers have officially signed veteran point guard...",
      time: "2 hours ago",
      category: "Transactions",
    },
    {
      id: 2,
      title: "Injury Report: Key Players Out",
      summary:
        "Several star players are listed as questionable for tonight's games...",
      time: "4 hours ago",
      category: "Injuries",
    },
    {
      id: 3,
      title: "Trade Deadline Approaching",
      summary: "Teams are making final moves before the trade deadline...",
      time: "6 hours ago",
      category: "Trades",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <UpcomingMatches matches={upcomingMatches} />
          <TeamRankings teams={rankings} />
        </div>

        {/* Middle Column */}
        <div className="lg:col-span-6 space-y-6">
          <LiveMatch match={liveMatch} />
          <PastMatches matches={pastMatches} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-3 space-y-6">
          <TrendingVideos videos={trendingVideos} />
          <LatestNews articles={news} />
        </div>
      </div>
    </div>
  )
}

export default Homepage
