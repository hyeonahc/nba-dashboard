// Global type definitions for the NBA Dashboard

// News Article Types
export interface NewsArticle {
  id: number
  title: string
  time: string
  source: string
  url: string
  imageUrl?: string
}

// API Response Types
export interface NewsApiArticle {
  title: string
  url: string
  source: string
}

// NBA Game Types
export interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  status: "scheduled" | "live" | "finished"
  date: string
  time?: string
}

// Team Types
export interface Team {
  id: string
  name: string
  city: string
  abbreviation: string
  logo?: string
  wins: number
  losses: number
  conference: "Eastern" | "Western"
  division: string
}

// Team Ranking Types (from API)
export interface TransformedTeamRanking {
  position: number
  team: string
  wins: number
  losses: number
  winPercentage: number
  logo?: string
  conference: string
  gamesPlayed: number
  pointsFor: number
  pointsAgainst: number
  pointDifference: number
  stage: string
  description: string
}

// Video Types
export interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  url: string
  publishedAt: string
}

// BallDontLie API Types
export interface BallDontLieTeam {
  id: number
  conference: string
  division: string
  city: string
  name: string
  full_name: string
  abbreviation: string
}

export interface BallDontLieGame {
  id: number
  date: string
  season: number
  status: string
  period: number
  time: string | null
  postseason: boolean
  home_team_score: number
  visitor_team_score: number
  datetime: string
  home_team: BallDontLieTeam
  visitor_team: BallDontLieTeam
}

export interface BallDontLieGamesResponse {
  data: BallDontLieGame[]
}

// Upcoming Game Types (transformed for UI)
export interface UpcomingGameData {
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

// Completed Game Types (transformed for UI)
export interface CompletedGameData {
  id: string
  homeTeam: string
  awayTeam: string
  homeTeamFullName: string
  awayTeamFullName: string
  homeTeamLogo?: string
  awayTeamLogo?: string
  homeScore: number
  awayScore: number
  date: string
  season: string
  status: string
}

// Common UI Props
export interface BaseItemProps {
  id: string | number
  title: string
  className?: string
}
