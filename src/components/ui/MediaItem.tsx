import { type ReactNode } from "react"

interface MediaItemProps {
  title: string
  subtitle?: string
  thumbnail?: ReactNode
  meta?: string
  category?: string
  time?: string
  onClick?: () => void
  className?: string
}

const MediaItem = ({
  title,
  subtitle,
  thumbnail,
  meta,
  category,
  time,
  onClick,
  className = "",
}: MediaItemProps) => {
  return (
    <div
      className={`hover:bg-gray-50 rounded-lg transition-colors cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Category and time header */}
      {(category || time) && (
        <div className="flex justify-between items-start mb-2">
          {category && (
            <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              {category}
            </span>
          )}
          {time && <span className="text-xs text-gray-500">{time}</span>}
        </div>
      )}

      {/* Content with optional thumbnail */}
      <div className="flex items-start space-x-3 p-3">
        {thumbnail && (
          <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
            {thumbnail}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-2">
              {subtitle}
            </p>
          )}
          {meta && (
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <span>{meta}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MediaItem
