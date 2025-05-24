"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { NAVBAR_HEIGHT } from "@/constants/config"
import { SITE_BG_COLOR, SITE_TEXT_COLOR } from "@/constants/colors"

interface SectionProps {
  id: string
  children: React.ReactNode
}

export function Section({ id, children }: SectionProps) {
  const [isClient, setIsClient] = useState(false)
  const [sectionHeight, setSectionHeight] = useState("100vh")

  useEffect(() => {
    setIsClient(true)

    const updateHeight = () => {
      if (typeof window !== "undefined") {
        const minHeight = Math.max(600, window.innerHeight - NAVBAR_HEIGHT)
        setSectionHeight(`${minHeight}px`)
      }
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <section
      id={id}
      className="flex items-center justify-center py-8 sm:py-12 md:py-16"
      style={{
        minHeight: isClient ? sectionHeight : "100vh",
        backgroundColor: SITE_BG_COLOR,
        color: SITE_TEXT_COLOR,
      }}
    >
      <div className="container mx-auto px-4 w-full">{children}</div>
    </section>
  )
}
