import axios from "axios"
import type { NewsApiArticle, NewsArticle } from "../types"
import { getRandomBasketballImageFromPexels } from "../utils/pexelsImageUtils"

// NBA-related search terms for more relevant images
const NBA_SEARCH_TERMS = [
  "NBA basketball",
  "NBA player",
  "NBA game",
  "NBA arena",
  "NBA team",
  "basketball court",
  "basketball player",
  "basketball game",
  "basketball dunk",
  "basketball shot",
  "basketball training",
  "basketball practice",
]

/**
 * Extract NBA-related search terms from article title
 * @param title - Article title
 * @returns string - Relevant search term for Pexels
 */
const extractNBASearchTerm = (title: string): string => {
  const lowerTitle = title.toLowerCase()

  // Check for specific NBA terms in the title
  if (lowerTitle.includes("nba") || lowerTitle.includes("basketball")) {
    return "NBA basketball"
  }
  if (
    lowerTitle.includes("player") ||
    lowerTitle.includes("guard") ||
    lowerTitle.includes("center")
  ) {
    return "NBA player"
  }
  if (
    lowerTitle.includes("game") ||
    lowerTitle.includes("match") ||
    lowerTitle.includes("final")
  ) {
    return "NBA game"
  }
  if (
    lowerTitle.includes("team") ||
    lowerTitle.includes("heat") ||
    lowerTitle.includes("lakers") ||
    lowerTitle.includes("warriors") ||
    lowerTitle.includes("celtics") ||
    lowerTitle.includes("clippers")
  ) {
    return "NBA team"
  }
  if (
    lowerTitle.includes("court") ||
    lowerTitle.includes("arena") ||
    lowerTitle.includes("stadium")
  ) {
    return "NBA arena"
  }
  if (
    lowerTitle.includes("dunk") ||
    lowerTitle.includes("shot") ||
    lowerTitle.includes("training")
  ) {
    return "basketball training"
  }

  // Default to a random NBA term if no specific match
  return NBA_SEARCH_TERMS[Math.floor(Math.random() * NBA_SEARCH_TERMS.length)]
}

// Create axios instance for news API
const newsApi = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-RapidAPI-Key": import.meta.env.VITE_NEWS_API_KEY || "",
    "X-RapidAPI-Host": import.meta.env.VITE_NEWS_API_HOST || "",
  },
})

// Request interceptor
newsApi.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
newsApi.interceptors.response.use(
  response => response,
  error => {
    console.error("News API Error:", error)
    return Promise.reject(error)
  }
)

// News API functions
export const newsApiService = {
  getLatestNews: async () => {
    try {
      const response = await newsApi.get("/articles")

      // Transform the API response to match our expected format
      const articles =
        response.data?.map((article: NewsApiArticle, index: number) => ({
          id: index + 1,
          title: article.title,
          time: "Recently",
          source: article.source.toUpperCase(),
          url: article.url,
          imageUrl: "", // Will be populated with Pexels image
        })) || []

      // Generate Pexels images for each article with NBA-specific search terms
      const articlesWithImages = await Promise.all(
        articles.map(async (article: NewsArticle, index: number) => {
          try {
            // Extract NBA-related search terms from article title
            const searchTerm = extractNBASearchTerm(article.title)
            const imageUrl = await getRandomBasketballImageFromPexels(
              400,
              300,
              searchTerm
            )
            return { ...article, imageUrl }
          } catch (error) {
            console.error(
              `Failed to fetch image for article ${index + 1}:`,
              error
            )
            return article // Return article without image if Pexels fails
          }
        })
      )

      return articlesWithImages
    } catch (error) {
      console.error("Error fetching news:", error)
      // Return fallback data in case of API error
      const fallbackArticles = [
        {
          id: 1,
          title:
            "Miami Heat guard earns brutal mention among NBA's All-Overpaid Team",
          time: "Recently",
          source: "Miami Heat",
          url: "https://www.si.com/nba/heat/news/miami-heat-guard-earns-brutal-mention-among-nba-s-all-overpaid-team-01k52bh1983z",
          imageUrl: "",
        },
        {
          id: 2,
          title:
            "Richard Jefferson denounces 'cowardly' NBA rule change as failed last-second heaves become team shot attempts",
          time: "Recently",
          source: "CBS Sports",
          url: "https://www.cbssports.com/nba/news/richard-jefferson-denounces-cowardly-nba-rule-change-as-failed-last-second-heaves-become-team-shot-attempts/",
          imageUrl: "",
        },
        {
          id: 3,
          title:
            "NBA center gets his jersey ripped during an intense EuroBasket final",
          time: "Recently",
          source: "Basket News",
          url: "https://basketnews.com/news-231423-nba-center-gets-his-jersey-ripped-during-an-intense-eurobasket-final.html",
          imageUrl: "",
        },
        {
          id: 4,
          title: "Kaleb Johnson kickoff blunder helps Seahawks down Steelers",
          time: "Recently",
          source: "ESPN",
          url: "https://www.espn.com/nba/story/_/id/example-lakers-sign-point-guard",
          imageUrl: "",
        },
        {
          id: 5,
          title:
            "Kawhi Leonard Scandal: How Clippers' Ownership Ties Could Spark League-Wide Collective Bargaining Reform",
          time: "Recently",
          source: "The Playoffs",
          url: "https://theplayoffs.news/en/kawhi-leonard-scandal-how-clippers-ownership-ties-could-spark-league-wide-collective-bargaining-reform/",
          imageUrl: "",
        },
      ]

      // Generate Pexels images for fallback articles too with NBA-specific search terms
      const fallbackArticlesWithImages = await Promise.all(
        fallbackArticles.map(async (article: NewsArticle, index: number) => {
          try {
            // Extract NBA-related search terms from article title
            const searchTerm = extractNBASearchTerm(article.title)
            const imageUrl = await getRandomBasketballImageFromPexels(
              400,
              300,
              searchTerm
            )
            return { ...article, imageUrl }
          } catch (error) {
            console.error(
              `Failed to fetch fallback image for article ${index + 1}:`,
              error
            )
            return article // Return article without image if Pexels fails
          }
        })
      )

      return fallbackArticlesWithImages
    }
  },
}

export default newsApi
