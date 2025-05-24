import type React from "react"
import { SITE_SUBHEADER_COLOR } from "@/constants/colors"

interface TextSubheaderProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function TextSubheader({ children, className = "", style = {} }: TextSubheaderProps) {
  return (
    <h3
      className={`text-lg sm:text-xl font-semibold mb-4 ${className}`}
      style={{
        color: SITE_SUBHEADER_COLOR,
        ...style,
      }}
    >
      {children}
    </h3>
  )
}
