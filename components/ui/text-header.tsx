import type React from "react"
import { SITE_HEADER_COLOR } from "@/constants/colors"

interface TextHeaderProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function TextHeader({ children, className = "", style = {} }: TextHeaderProps) {
  return (
    <h2
      className={`text-3xl sm:text-4xl font-bold mb-8 text-center ${className}`}
      style={{
        color: SITE_HEADER_COLOR,
        ...style,
      }}
    >
      {children}
    </h2>
  )
}
