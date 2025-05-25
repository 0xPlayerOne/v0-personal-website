"use client"

import { useState, useEffect } from "react"
import { RetroCanvas } from "./retro-canvas"
import { RetroNavbar } from "./retro-navbar"
import { NAVBAR_HEIGHT } from "@/constants/config"

export function PongHeader() {
  const [isSticky, setIsSticky] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const headerHeight = window.innerHeight - NAVBAR_HEIGHT

      setIsSticky(scrollPosition > headerHeight)

      // Update active section based on scroll position
      const sections = ["about", "skills", "projects", "contact"]
      const sectionElements = sections.map((id) => document.getElementById(id)).filter(Boolean)

      // If we're in the header area, no section should be active
      if (scrollPosition <= headerHeight) {
        setActiveSection("")
        return
      }

      // Find which section is currently in view
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i]
        if (element) {
          const elementTop = element.offsetTop - NAVBAR_HEIGHT - 50
          if (scrollPosition >= elementTop) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="w-full h-screen flex flex-col">
        <div className="flex-1">
          <RetroCanvas navbarHeight={NAVBAR_HEIGHT} />
        </div>
        <RetroNavbar height={NAVBAR_HEIGHT} isSticky={false} activeSection={activeSection} />
      </header>

      {isSticky && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <RetroNavbar height={NAVBAR_HEIGHT} isSticky={true} activeSection={activeSection} />
        </div>
      )}
    </>
  )
}
