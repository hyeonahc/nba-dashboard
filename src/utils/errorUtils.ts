/**
 * Utility functions for handling user-friendly error messages
 */

/**
 * Get a user-friendly error message based on the error
 * @param error - The error object from API calls
 * @param context - The context of what was being loaded (e.g., "news", "games", "standings")
 * @returns A user-friendly error message
 */
export const getUserFriendlyErrorMessage = (
  error: any,
  context: string
): string => {
  // Check if it's a 429 (rate limit) error
  if (error?.response?.status === 429 || error?.message?.includes("429")) {
    return "We've hit our data limit for now. Please wait a moment and try refreshing the page. Thanks for your patience!"
  }

  // Check if it's a network error
  if (
    error?.code === "NETWORK_ERROR" ||
    error?.message?.includes("Network Error")
  ) {
    return "Having trouble connecting to our data source. Please check your internet connection and try again."
  }

  // Check if it's a timeout error
  if (error?.code === "ECONNABORTED" || error?.message?.includes("timeout")) {
    return "The request is taking longer than expected. Please try again in a moment."
  }

  // Default friendly message based on context
  const contextMessages: { [key: string]: string } = {
    news: "We're having trouble loading the latest news. Please try refreshing the page.",
    games:
      "We're having trouble loading game information. Please try refreshing the page.",
    standings:
      "We're having trouble loading team standings. Please try refreshing the page.",
    videos:
      "We're having trouble loading videos. Please try refreshing the page.",
    default:
      "Something went wrong while loading the data. Please try refreshing the page.",
  }

  return contextMessages[context] || contextMessages.default
}

/**
 * Get a user-friendly empty state message
 * @param context - The context of what was being loaded
 * @returns A user-friendly empty state message
 */
export const getEmptyStateMessage = (context: string): string => {
  const emptyMessages: { [key: string]: string } = {
    news: "No news articles available at the moment. Check back later for the latest updates!",
    games:
      "No games scheduled at the moment. Check back later for upcoming matches!",
    standings:
      "No standings data available at the moment. Check back later for updated rankings!",
    videos:
      "No videos available at the moment. Check back later for new content!",
    default: "No data available at the moment. Check back later!",
  }

  return emptyMessages[context] || emptyMessages.default
}
