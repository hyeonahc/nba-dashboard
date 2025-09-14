import axios from "axios"

// YouTube API types
interface YouTubeVideo {
  id: {
    kind: string
    videoId: string
  }
  snippet: {
    title: string
    description: string
    thumbnails: {
      default: {
        url: string
        width: number
        height: number
      }
      medium: {
        url: string
        width: number
        height: number
      }
      high: {
        url: string
        width: number
        height: number
      }
    }
    publishedAt: string
    channelTitle: string
  }
}

interface YouTubeResponse {
  items: YouTubeVideo[]
  nextPageToken?: string
  pageInfo: {
    totalResults: number
    resultsPerPage: number
  }
}

// Create axios instance for YouTube API
const youtubeApi = axios.create({
  baseURL: import.meta.env.VITE_YOUTUBE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
youtubeApi.interceptors.request.use(
  config => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY

    config.params = {
      ...config.params,
      key: apiKey,
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Response interceptor
youtubeApi.interceptors.response.use(
  response => response,
  error => {
    console.error("YouTube API Error:", error)
    return Promise.reject(error)
  }
)

// YouTube API functions
export const youtubeApiService = {
  // Get recent NBA videos from NBA channel
  getRecentNBAVideos: async (): Promise<YouTubeVideo[]> => {
    try {
      const response = await youtubeApi.get<YouTubeResponse>("", {
        params: {
          channelId: "UCWJ2lWNubArHWmf3FIHbfcQ", // NBA channel ID
          order: "date",
          maxResults: 5,
          part: "snippet",
        },
      })

      return response.data.items
    } catch (error) {
      console.error("❌ Error fetching YouTube videos:", error)
      throw error
    }
  },

  // Get trending NBA videos (throw error if API fails)
  getTrendingVideos: async () => {
    const videos = await youtubeApiService.getRecentNBAVideos()

    // Transform YouTube API response to match expected format
    const transformedVideos = videos.map(video => ({
      id: video.id.videoId,
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.medium.url,
      publishedAt: video.snippet.publishedAt,
      channelTitle: video.snippet.channelTitle,
      description: video.snippet.description,
    }))

    console.log("🎬 Transformed videos:", transformedVideos)
    return transformedVideos
  },
}

export default youtubeApi
