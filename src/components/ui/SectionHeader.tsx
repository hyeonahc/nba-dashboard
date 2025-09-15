import { type ReactNode } from "react"

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  rightSlot?: ReactNode
  className?: string
}

const SectionHeader = ({
  icon,
  title,
  rightSlot,
  className = "",
}: SectionHeaderProps) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <div className="flex items-center">
        {icon}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      {rightSlot && <div className="flex-shrink-0 ml-2">{rightSlot}</div>}
    </div>
  )
}

export default SectionHeader
