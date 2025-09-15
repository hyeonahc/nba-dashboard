// NBA Ranking Helper Utilities

export type RankingMode = "all" | "east" | "west"

export interface TeamStanding {
  position: number
  stage: string
  group: {
    name: string
    points: number
  }
  team: {
    id: number
    name: string
    logo: string
  }
  league: {
    id: number
    name: string
    type: string
    season: string
    logo: string
  }
  country: {
    id: number
    name: string
    code: string
    flag: string
  }
  games: {
    played: number
    win: {
      total: number
      percentage: string
    }
    lose: {
      total: number
      percentage: string
    }
  }
  points: {
    for: number
    against: number
  }
  form: string | null
  description: string
}

export interface StandingsApiResponse {
  get: string
  parameters: {
    league: string
    season: string
  }
  errors: string[]
  results: number
  response: TeamStanding[][]
}

export interface RankedTeam {
  position: number
  team: string
  logo: string
  wins: number
  losses: number
  winPercentage: number
  pointsFor: number
  pointsAgainst: number
  pointDifferential: number
  conference: string
}

/**
 * Generates NBA league rankings from API response
 * @param apiResponse - The raw API response from the standings endpoint
 * @param mode - Ranking mode: "all" for overall, "east" for Eastern Conference, "west" for Western Conference
 * @returns Array of ranked teams with new positions
 */
export function generateNbaRankings(
  apiResponse: StandingsApiResponse,
  mode: RankingMode = "all"
): RankedTeam[] {
  // Flatten all teams from all conferences and deduplicate by team ID
  // The API includes teams multiple times (in both Conference and Division groups)
  const teamMap = new Map<number, TeamStanding>()

  apiResponse.response.forEach(conference => {
    conference.forEach(team => {
      // Use team ID as key to ensure uniqueness
      // If team already exists, keep the first occurrence (preserves original order)
      if (!teamMap.has(team.team.id)) {
        teamMap.set(team.team.id, team)
      }
    })
  })

  // Convert Map values back to array
  const allTeams: TeamStanding[] = Array.from(teamMap.values())

  // Filter teams based on mode
  let filteredTeams: TeamStanding[]

  switch (mode) {
    case "east":
      filteredTeams = allTeams.filter(
        team => team.group.name === "Eastern Conference"
      )
      break
    case "west":
      filteredTeams = allTeams.filter(
        team => team.group.name === "Western Conference"
      )
      break
    case "all":
    default:
      filteredTeams = allTeams
      break
  }

  // Sort teams using the specified logic
  filteredTeams.sort((a, b) => {
    // Primary: Sort by win percentage (descending)
    const aWinPercentage = parseFloat(a.games.win.percentage)
    const bWinPercentage = parseFloat(b.games.win.percentage)

    if (aWinPercentage !== bWinPercentage) {
      return bWinPercentage - aWinPercentage
    }

    // Secondary: Sort by total wins (descending)
    if (a.games.win.total !== b.games.win.total) {
      return b.games.win.total - a.games.win.total
    }

    // Tertiary: Sort by point differential (descending)
    const aPointDiff = a.points.for - a.points.against
    const bPointDiff = b.points.for - b.points.against

    return bPointDiff - aPointDiff
  })

  // Assign new sequential positions and transform data
  const rankedTeams: RankedTeam[] = filteredTeams.map((team, index) => {
    const pointDifferential = team.points.for - team.points.against

    return {
      position: index + 1,
      team: team.team.name,
      logo: team.team.logo,
      wins: team.games.win.total,
      losses: team.games.lose.total,
      winPercentage: parseFloat(team.games.win.percentage),
      pointsFor: team.points.for,
      pointsAgainst: team.points.against,
      pointDifferential,
      conference: team.group.name,
    }
  })

  return rankedTeams
}

/**
 * Helper function to get overall league rankings (all teams)
 */
export function getOverallRankings(
  apiResponse: StandingsApiResponse
): RankedTeam[] {
  return generateNbaRankings(apiResponse, "all")
}

/**
 * Helper function to get Eastern Conference rankings
 */
export function getEasternRankings(
  apiResponse: StandingsApiResponse
): RankedTeam[] {
  return generateNbaRankings(apiResponse, "east")
}

/**
 * Helper function to get Western Conference rankings
 */
export function getWesternRankings(
  apiResponse: StandingsApiResponse
): RankedTeam[] {
  return generateNbaRankings(apiResponse, "west")
}
