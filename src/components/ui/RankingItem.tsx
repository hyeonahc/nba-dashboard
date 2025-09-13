import { type ReactNode } from "react"

interface RankingItemProps {
  position: number
  primaryText: string
  secondaryText?: string
  rightValue?: string | number
  rightLabel?: string
  icon?: ReactNode
  className?: string
  positionColor?: string
  positionBgColor?: string
}

const RankingItem = ({
  position,
  primaryText,
  secondaryText,
  rightValue,
  rightLabel,
  icon,
  className = "",
  positionColor = "text-orange-600",
  positionBgColor = "bg-orange-100",
}: RankingItemProps) => {
  return (
    <div
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${className}`}
    >
      <div className="flex items-center">
        <div
          className={`w-8 h-8 ${positionBgColor} rounded-full flex items-center justify-center mr-3`}
        >
          {icon ? (
            icon
          ) : (
            <span className={`${positionColor} font-bold text-sm`}>
              {position}
            </span>
          )}
        </div>
        <div>
          <div className="font-medium text-gray-900">{primaryText}</div>
          {secondaryText && (
            <div className="text-sm text-gray-500">{secondaryText}</div>
          )}
        </div>
      </div>
      {(rightValue || rightLabel) && (
        <div className="text-right">
          {rightValue && (
            <div className="text-sm font-medium text-gray-900">
              {rightValue}
            </div>
          )}
          {rightLabel && (
            <div className="text-xs text-gray-500">{rightLabel}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default RankingItem
