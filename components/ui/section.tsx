"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { NAVBAR_HEIGHT } from "@/constants/navigation"
import { SITE_BG_COLOR, SITE_TEXT_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  children: React.ReactNode
}

export function Section({ id, children }: SectionProps) {
  const [sectionHeight, setSectionHeight] = useState("auto")

  useEffect(() => {
    const updateHeight = () => {
      // Use min-height instead of fixed height for better mobile experience
      const minHeight = Math.max(600, window.innerHeight - NAVBAR_HEIGHT)
      setSectionHeight(`${minHeight}px`)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <section
      id={id}
      className={cn("flex items-center justify-center py-8 sm:py-12 md:py-16")}
      style={{
        minHeight: sectionHeight,
        backgroundColor: SITE_BG_COLOR,
        color: SITE_TEXT_COLOR,
      }}
    >
      <div className="container mx-auto px-4 w-full">{children}</div>
    </section>
  )
}
