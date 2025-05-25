"use client"
import { RetroCanvas } from "./retro-canvas"
import { RetroNavbar } from "./retro-navbar"
import { NAVBAR_HEIGHT } from "@/constants/config"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { NAVIGATION_SECTIONS } from "@/constants/navigation"

export function PongHeader() {
  const sectionIds = NAVIGATION_SECTIONS.map((section) => section.id)
  const { activeSection, isSticky } = useScrollSpy({
    sectionIds,
    headerHeight: window.innerHeight - NAVBAR_HEIGHT,
    offset: 50,
  })

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
