"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { SITE_BG_COLOR, SITE_TEXT_COLOR, SITE_BORDER_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  children: React.ReactNode
}

export function Section({ id, children }: SectionProps) {
  const [sectionHeight, setSectionHeight] = useState("auto")

  useEffect(() => {
    const updateHeight = () => {
      // Use viewport height for better scroll snap behavior
      const height = window.innerHeight
      setSectionHeight(`${height}px`)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <section
      id={id}
      className={cn("flex items-center justify-center py-8 sm:py-12 md:py-16 border-0")}
      style={{
        height: sectionHeight,
        backgroundColor: SITE_BG_COLOR,
        color: SITE_TEXT_COLOR,
        boxShadow: `0 0 0 1px ${SITE_BORDER_COLOR}20, 0 0 5px ${SITE_BORDER_COLOR}30`,
      }}
    >
      <div className="container mx-auto px-4 w-full max-h-full overflow-y-auto">{children}</div>
    </section>
  )
}
