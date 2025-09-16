// Import React hooks
import { useCallback, useEffect, useState } from "react"

// Pexels API types
interface PexelsImage {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

interface PexelsResponse {
  total_results: number
  page: number
  per_page: number
  photos: PexelsImage[]
  next_page: string
}

// Basketball-related search terms for variety
const BASKETBALL_TERMS = [
  "basketball player",
  "basketball game",
  "basketball team",
  "basketball arena",
  "basketball dunk",
  "basketball shot",
]

/**
 * Fetches a random image from Pexels based on search term
 * @param width - Desired width of the image (default: 400)
 * @param height - Desired height of the image (default: 300)
 * @param searchTerm - Specific search term (optional, will use random basketball term if not provided)
 * @returns Promise<string> - URL of the random image
 */
export const getRandomImageFromPexels = async (
  width: number = 400,
  height: number = 300,
  searchTerm?: string
): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY

    if (!apiKey) {
      console.warn("Pexels API key not found. Using fallback image.")
      return getFallbackBasketballImage(width, height)
    }

    // Use provided search term or get a random one
    const term =
      searchTerm ||
      BASKETBALL_TERMS[Math.floor(Math.random() * BASKETBALL_TERMS.length)]

    // Random page to get variety (Pexels allows up to 8000 results, 80 pages with 100 per page)
    const randomPage = Math.floor(Math.random() * 10) + 1

    const baseUrl =
      import.meta.env.VITE_PEXELS_API_URL || "https://api.pexels.com/v1"
    const apiUrl = `${baseUrl}/search?query=${encodeURIComponent(
      term
    )}&per_page=80&page=${randomPage}`

    console.log(
      `🔍 Fetching Pexels images for: "${term}" from page ${randomPage}`
    )

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: apiKey,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Pexels API error: ${response.status} ${response.statusText}`
      )
    }

    const data: PexelsResponse = await response.json()

    console.log(
      `📊 Pexels API response: ${data.photos?.length || 0} images found`
    )

    if (!data.photos || data.photos.length === 0) {
      throw new Error("No images found for the search term")
    }

    // Get a random image from the results
    const randomImage =
      data.photos[Math.floor(Math.random() * data.photos.length)]

    console.log(`🎯 Selected image: ${randomImage.alt} (ID: ${randomImage.id})`)

    // Return the appropriate size image URL with custom dimensions
    let imageUrl = randomImage.src.medium

    // Choose the best size based on requested dimensions
    if (width > 1280 || height > 1280) {
      imageUrl = randomImage.src.large2x
    } else if (width > 640 || height > 640) {
      imageUrl = randomImage.src.large
    } else if (width > 350 || height > 350) {
      imageUrl = randomImage.src.medium
    } else {
      imageUrl = randomImage.src.small
    }

    // Add custom dimensions as query parameters
    return `${imageUrl}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
  } catch (error) {
    console.error("Error fetching image from Pexels:", error)
    return getFallbackBasketballImage(width, height)
  }
}

/**
 * Fetches multiple random basketball images from Pexels
 * @param count - Number of images to fetch (default: 1)
 * @param width - Desired width of the images (default: 400)
 * @param height - Desired height of the images (default: 300)
 * @returns Promise<string[]> - Array of image URLs
 */
export const getMultipleBasketballImagesFromPexels = async (
  count: number = 1,
  width: number = 400,
  height: number = 300
): Promise<string[]> => {
  try {
    const promises = Array.from({ length: count }, () =>
      getRandomImageFromPexels(width, height)
    )

    return await Promise.all(promises)
  } catch (error) {
    console.error("Error fetching multiple images from Pexels:", error)
    // Return fallback images
    return Array.from({ length: count }, () =>
      getFallbackBasketballImage(width, height)
    )
  }
}

/**
 * Searches for specific basketball-related images on Pexels
 * @param searchTerm - Specific search term
 * @param width - Desired width of the image (default: 400)
 * @param height - Desired height of the image (default: 300)
 * @returns Promise<string> - URL of the image
 */
// Basketball-specific wrapper for backward compatibility
export const getRandomBasketballImageFromPexels = async (
  width: number = 400,
  height: number = 300,
  searchTerm?: string
): Promise<string> => {
  return getRandomImageFromPexels(width, height, searchTerm)
}

export const searchBasketballImageOnPexels = async (
  searchTerm: string,
  width: number = 400,
  height: number = 300
): Promise<string> => {
  return getRandomImageFromPexels(width, height, searchTerm)
}

/**
 * Returns a fallback basketball image when Pexels API fails
 * @param width - Desired width of the image
 * @param height - Desired height of the image
 * @returns string - Fallback image URL
 */
const getFallbackBasketballImage = (width: number, height: number): string => {
  // High-quality fallback basketball images from Unsplash
  const fallbackImage =
    "https://images.unsplash.com/photo-1546519638-68e109498ffc" // 농구 코트

  return `${fallbackImage}?w=${width}&h=${height}&fit=crop&auto=format&q=80`
}

/**
 * React hook for fetching random basketball images from Pexels
 * @param width - Desired width of the image (default: 400)
 * @param height - Desired height of the image (default: 300)
 * @param searchTerm - Specific search term (optional)
 * @returns Object with imageUrl, loading, error, and refetch function
 */
export const usePexelsBasketballImage = (
  width: number = 400,
  height: number = 300,
  searchTerm?: string
) => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImage = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const url = await getRandomImageFromPexels(width, height, searchTerm)
      setImageUrl(url)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch image"
      setError(errorMessage)
      console.error("Error in usePexelsBasketballImage:", err)
    } finally {
      setLoading(false)
    }
  }, [width, height, searchTerm])

  useEffect(() => {
    fetchImage()
  }, [fetchImage])

  return {
    imageUrl,
    loading,
    error,
    refetch: fetchImage,
  }
}

/**
 * React hook for fetching multiple basketball images from Pexels
 * @param count - Number of images to fetch (default: 1)
 * @param width - Desired width of the images (default: 400)
 * @param height - Desired height of the images (default: 300)
 * @returns Object with imageUrls, loading, error, and refetch function
 */
export const useMultiplePexelsBasketballImages = (
  count: number = 1,
  width: number = 400,
  height: number = 300
) => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const urls = await getMultipleBasketballImagesFromPexels(
        count,
        width,
        height
      )
      setImageUrls(urls)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch images"
      setError(errorMessage)
      console.error("Error in useMultiplePexelsBasketballImages:", err)
    } finally {
      setLoading(false)
    }
  }, [count, width, height])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  return {
    imageUrls,
    loading,
    error,
    refetch: fetchImages,
  }
}

/**
 * Utility function to get a random basketball search term
 * @returns string - Random basketball search term
 */
export const getRandomBasketballTerm = (): string => {
  return BASKETBALL_TERMS[Math.floor(Math.random() * BASKETBALL_TERMS.length)]
}

/**
 * Get all available basketball search terms
 * @returns string[] - Array of all basketball search terms
 */
export const getAllBasketballTerms = (): string[] => {
  return [...BASKETBALL_TERMS]
}
