"use client"

import { useState, useEffect } from "react"
import { RetroCanvas } from "./retro-canvas"
import { RetroNavbar } from "./retro-navbar"
import { NAVBAR_HEIGHT } from "@/constants/header"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { NAVIGATION_SECTIONS } from "@/constants/navigation"

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
      <header className="w-full h-screen flex flex-col">
        <RetroCanvas navbarHeight={NAVBAR_HEIGHT} />
        {!isSticky && <RetroNavbar height={NAVBAR_HEIGHT} isSticky={false} activeSection={activeSection || ""} />}
      </header>

      {isSticky && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <RetroNavbar height={NAVBAR_HEIGHT} isSticky={true} activeSection={activeSection || ""} />
        </div>
      )}
    </>
  )
}
