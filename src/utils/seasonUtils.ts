/**
 * NBA Season utility functions
 *
 * NBA seasons typically run from October to June of the following year.
 * For example, the 2023-24 season starts in October 2023 and ends in June 2024.
 *
 * Since the free API only provides data from 2 years ago, we need to calculate
 * the most recent available season based on the current date.
 */

/**
 * Get the current NBA season based on today's date
 * Returns the most recent season that should be available in the free API
 *
 * @returns {string} Season in format "YYYY-YY" (e.g., "2023-24")
 */
export const getCurrentNBASeason = (): string => {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // getMonth() returns 0-11, so add 1

  // NBA season typically starts in October (month 10)
  // If we're before October, we're still in the previous season
  let seasonStartYear: number

  if (currentMonth < 10) {
    // Before October, we're still in the previous season
    seasonStartYear = currentYear - 1
  } else {
    // October or later, we're in the current season
    seasonStartYear = currentYear
  }

  // Since free API only provides data from 2 years ago,
  // we need to go back 2 years from the current season
  const availableSeasonStartYear = seasonStartYear - 2
  const availableSeasonEndYear = availableSeasonStartYear + 1

  // Format as "YYYY-YY" (e.g., "2023-24")
  const seasonEndYearShort = availableSeasonEndYear.toString().slice(-2)
  return `${availableSeasonStartYear}-${seasonEndYearShort}`
}

/**
 * Get the display name for a season
 *
 * @param season - Season in format "YYYY-YY" (e.g., "2023-24")
 * @returns {string} Display name (e.g., "2023-24 Season")
 */
export const getSeasonDisplayName = (season: string): string => {
  return `${season} Season`
}

/**
 * Get available seasons for the free API
 * Returns an array of the last 3 seasons that should be available
 *
 * @returns {string[]} Array of seasons in format "YYYY-YY"
 */
export const getAvailableSeasons = (): string[] => {
  const currentSeason = getCurrentNBASeason()
  const currentYear = parseInt(currentSeason.split("-")[0])

  return [
    `${currentYear - 2}-${(currentYear - 1).toString().slice(-2)}`,
    `${currentYear - 1}-${currentYear.toString().slice(-2)}`,
    currentSeason,
  ]
}
