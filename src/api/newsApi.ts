import axios from "axios"
import type { NewsApiArticle } from "../types"

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
      return (
        response.data?.map((article: NewsApiArticle, index: number) => ({
          id: index + 1,
          title: article.title,
          time: "Recently",
          source: article.source.toUpperCase(),
          url: article.url,
        })) || []
      )
    } catch (error) {
      console.error("Error fetching news:", error)
      // Return fallback data in case of API error
      return [
        {
          id: 1,
          title:
            "Miami Heat guard earns brutal mention among “NBA’s All-Overpaid Team”",
          time: "Recently",
          source: "Miami Heat",
          url: "https://www.si.com/nba/heat/news/miami-heat-guard-earns-brutal-mention-among-nba-s-all-overpaid-team-01k52bh1983z",
        },
        {
          id: 2,
          title:
            "Richard Jefferson denounces 'cowardly' NBA rule change as failed last-second heaves become team shot attempts",
          time: "Recently",
          source: "CBS Sports",
          url: "https://www.cbssports.com/nba/news/richard-jefferson-denounces-cowardly-nba-rule-change-as-failed-last-second-heaves-become-team-shot-attempts/",
        },
        {
          id: 3,
          title:
            "NBA center gets his jersey ripped during an intense EuroBasket final",
          time: "Recently",
          source: "Basket News",
          url: "https://basketnews.com/news-231423-nba-center-gets-his-jersey-ripped-during-an-intense-eurobasket-final.html",
        },
      ]
    }
  },
}

export default newsApi
