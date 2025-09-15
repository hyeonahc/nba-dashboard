// Date Utilities

/**
 * Get today's date in YYYY-MM-DD format
 * @returns Today's date as a string in YYYY-MM-DD format
 */
export const getTodayDate = (): string => {
  const today = new Date()
  return today.toISOString().split("T")[0]
}

/**
 * Format a date string for display (Today, Tomorrow, or formatted date)
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string for display
 */
export const formatDisplayDate = (dateString: string): string => {
  // Parse the date string as local date to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day) // month is 0-indexed

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Reset time to compare only dates
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )
  const tomorrowOnly = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate()
  )

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return "Today"
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return "Tomorrow"
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })
  }
}

/**
 * Format a datetime string for display in local timezone
 * @param datetime - ISO datetime string
 * @returns Formatted time string (e.g., "7:30 PM")
 */
export const formatDisplayTime = (datetime: string): string => {
  const date = new Date(datetime)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    // No timeZone specified - uses user's local timezone
  })
}
