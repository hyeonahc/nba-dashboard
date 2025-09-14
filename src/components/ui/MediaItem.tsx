import { useState } from "react"
import type { NewsArticle } from "../../types"

interface MediaItemProps extends NewsArticle {
  onClick?: () => void
  className?: string
}

const MediaItem = ({
  title,
  time,
  source,
  url,
  imageUrl,
  onClick,
  className = "",
}: MediaItemProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const handleClick = () => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleClick()
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  return (
    <div
      className={`hover:bg-gray-50 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title}${source ? ` from ${source}` : ""}${
        time ? ` published ${time}` : ""
      }`}
    >
      {/* Time and source header */}
      {(time || source) && (
        <div className="flex justify-between items-center mb-2 px-3 pt-3">
          {time && (
            <span className="text-xs text-gray-500 font-medium">{time}</span>
          )}
          {source && (
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full font-medium">
              {source}
            </span>
          )}
        </div>
      )}

      {/* Content with optional image */}
      <div className="flex items-start space-x-3 p-3">
        {imageUrl && (
          <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden relative">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!imageError ? (
              <img
                src={imageUrl}
                alt={title}
                className={`w-full h-full object-cover rounded-lg transition-opacity duration-200 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                📰
              </div>
            )}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
            {title}
          </h3>
        </div>
      </div>
    </div>
  )
}

export default MediaItem
