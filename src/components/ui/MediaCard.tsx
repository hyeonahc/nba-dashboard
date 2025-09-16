import { Clock, ExternalLink } from "lucide-react"
import { useEffect, useState } from "react"

interface MediaCardProps {
  id: string | number
  title: string
  thumbnail?: string
  thumbnailFallback?: string
  publishedAt?: string
  time?: string
  source?: string
  onClick?: () => void
  showHoverEffects?: boolean
  hoverStyle?: "video" | "news"
  className?: string
}

const MediaCard = ({
  id,
  title,
  thumbnail,
  thumbnailFallback = "📰",
  publishedAt,
  time,
  source,
  onClick,
  showHoverEffects = false,
  hoverStyle = "video",
  className = "",
}: MediaCardProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  // Reset loading state when thumbnail changes
  useEffect(() => {
    if (thumbnail) {
      setImageLoading(true)
      setImageError(false)
    }
  }, [thumbnail])

  const displayTime =
    time ||
    (publishedAt
      ? new Date(publishedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year:
            new Date(publishedAt).getFullYear() !== new Date().getFullYear()
              ? "numeric"
              : undefined,
        })
      : undefined)

  const getCardClasses = () => {
    if (!showHoverEffects) {
      return "relative bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer"
    }

    // Same hover effects for both video and news
    return "group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-orange-200 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
  }

  return (
    <div
      key={id}
      className={`${getCardClasses()} ${className}`}
      onClick={handleClick}
    >
      {/* Thumbnail Container - Full Width */}
      <div className="relative w-full h-32 bg-gray-100 overflow-hidden">
        {thumbnail && !imageError ? (
          <>
            {/* Loading State */}
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="text-center">
                  <div className="relative w-6 h-6 mx-auto mb-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-200"></div>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent absolute top-0 left-0"></div>
                  </div>
                  <p className="text-xs text-gray-500">Loading image...</p>
                </div>
              </div>
            )}

            <img
              src={thumbnail}
              alt={title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              } ${
                showHoverEffects
                  ? "group-hover:scale-105 transition-transform duration-300"
                  : ""
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {/* Play Button Overlay - Only for video hover effects */}
            {showHoverEffects && hoverStyle === "video" && !imageLoading && (
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="bg-white bg-opacity-0 group-hover:bg-opacity-90 rounded-full p-2 transform scale-75 group-hover:scale-100 transition-all duration-300">
                  <svg
                    className="h-6 w-6 text-gray-600 group-hover:text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl bg-gradient-to-br from-orange-100 to-orange-200">
            {thumbnailFallback}
          </div>
        )}

        {/* Source Badge */}
        {source && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded text-[10px] font-medium">
            {source}
          </div>
        )}
      </div>

      {/* Content - Full Width */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-2">
            <h3
              className={`font-semibold text-gray-900 text-sm line-clamp-2 mb-2 ${
                showHoverEffects
                  ? "group-hover:text-orange-600 transition-colors duration-200"
                  : ""
              }`}
            >
              {title}
            </h3>

            {/* Time */}
            {displayTime && (
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1.5" />
                {displayTime}
              </div>
            )}
          </div>

          {/* External Link Icon */}
          <div
            className={`flex-shrink-0 ${
              showHoverEffects
                ? "opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                : ""
            }`}
          >
            <ExternalLink
              className={`h-4 w-4 ${
                showHoverEffects
                  ? "text-gray-400 group-hover:text-orange-500"
                  : "text-gray-400"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Hover Border Effect - Only for hover effects */}
      {showHoverEffects && (
        <div className="absolute inset-0 border-2 border-orange-400 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      )}
    </div>
  )
}

export default MediaCard
