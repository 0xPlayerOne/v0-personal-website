"use client"

import { useState, useEffect } from "react"

interface UseScrollSpyProps {
  sectionIds: readonly string[]
  offset?: number
}

export const useScrollSpy = ({ sectionIds, offset = 0 }: UseScrollSpyProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      let currentSection: string | null = null

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)

        if (section) {
          const sectionTop = section.offsetTop - offset

          if (window.scrollY >= sectionTop) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [sectionIds, offset])

  return activeSection
}
