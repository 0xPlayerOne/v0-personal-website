"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number
  className?: string
}

export function ResponsiveGrid({
  children,
  cols = { default: 1, md: 2, lg: 3 },
  gap = 24,
  className = "",
}: ResponsiveGridProps) {
  const [gridCols, setGridCols] = useState(cols.default)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const updateCols = () => {
      const width = window.innerWidth

      if (width >= 1280 && cols.xl) {
        setGridCols(cols.xl)
      } else if (width >= 1024 && cols.lg) {
        setGridCols(cols.lg)
      } else if (width >= 768 && cols.md) {
        setGridCols(cols.md)
      } else if (width >= 640 && cols.sm) {
        setGridCols(cols.sm)
      } else {
        setGridCols(cols.default)
      }
    }

    updateCols()
    window.addEventListener("resize", updateCols)
    return () => window.removeEventListener("resize", updateCols)
  }, [cols])

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${isClient ? gridCols : cols.default}, 1fr)`,
    gap: `${gap}px`,
  }

  return (
    <div className={className} style={gridStyle}>
      {children}
    </div>
  )
}
