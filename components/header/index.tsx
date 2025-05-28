"use client"

import { useState, useEffect } from "react"
import { RetroCanvas } from "./retro-canvas"
import { RetroNavbar } from "./retro-navbar"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { NAVBAR_HEIGHT, NAVIGATION_SECTIONS } from "@/constants/navigation"

export function PongHeader() {
  const [isSticky, setIsSticky] = useState(false)
  const sectionIds = NAVIGATION_SECTIONS.map((section) => section.id)
  const activeSection = useScrollSpy({
    sectionIds,
    offset: NAVBAR_HEIGHT + 50,
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const headerHeight = window.innerHeight - NAVBAR_HEIGHT
      setIsSticky(scrollPosition > headerHeight)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header className="w-full h-dvh flex flex-col">
        <RetroCanvas navbarHeight={NAVBAR_HEIGHT} />
        {/* Conditionally apply styles for sticky and non-sticky states */}
        <div className={isSticky ? "fixed top-0 left-0 right-0 z-50" : ""}>
          <RetroNavbar height={NAVBAR_HEIGHT} isSticky={isSticky} activeSection={activeSection || ""} />
        </div>
      </header>
    </>
  )
}
