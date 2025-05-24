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
  const [sectionHeight, setSectionHeight] = useState("100vh")

  useEffect(() => {
    const updateHeight = () => {
      const height = Math.max(600, window.innerHeight - NAVBAR_HEIGHT)
      setSectionHeight(`${height}px`)
    }

    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  return (
    <section
      id={id}
      className="flex items-center justify-center"
      style={{
        height: sectionHeight,
        backgroundColor: SITE_BG_COLOR,
        color: SITE_TEXT_COLOR,
      }}
    >
      <div className="container mx-auto px-4 w-full">{children}</div>
    </section>
  )
}
