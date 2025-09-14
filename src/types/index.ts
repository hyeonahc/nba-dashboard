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

// Common UI Props
export interface BaseItemProps {
  id: string | number
  title: string
  className?: string
}
