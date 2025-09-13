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
    <div className={`flex items-center mb-4 ${className}`}>
      {icon}
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {rightSlot && <div className="ml-auto">{rightSlot}</div>}
    </div>
  )
}

export default SectionHeader
