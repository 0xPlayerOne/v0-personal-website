"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { RetroCanvas } from "./retro-canvas"
import { RetroNavbar } from "./retro-navbar"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { NAVBAR_HEIGHT, NAVIGATION_SECTIONS } from "@/constants/navigation"

export function PongHeader() {
  const [isSticky, setIsSticky] = useState(false)
  
  // Memoize section IDs to prevent unnecessary recalculations
  const sectionIds = useMemo(() => NAVIGATION_SECTIONS.map((section) => section.id), [])
  
  // Use the optimized scroll spy hook
  const activeSection = useScrollSpy({
    sectionIds,
    offset: NAVBAR_HEIGHT + 50,
  })

  // Optimize scroll handler with throttling and useCallback
  const handleScroll = useCallback(() => {
    if (!window.requestAnimationFrame) {
      checkStickyState()
      return
    }
    
    window.requestAnimationFrame(checkStickyState)
  }, [])
  
  // Separate function to check sticky state
  const checkStickyState = useCallback(() => {
    const scrollPosition = window.scrollY
    const headerHeight = window.innerHeight - NAVBAR_HEIGHT
    const shouldBeSticky = scrollPosition > headerHeight
    
    // Only update state if the sticky state has changed
    if (shouldBeSticky !== isSticky) {
      setIsSticky(shouldBeSticky)
    }
  }, [isSticky])

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Initial check on mount
    handleScroll()
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  // Memoize the active section string to prevent unnecessary re-renders
  const activeSectionString = useMemo(() => activeSection || "", [activeSection])

  return (
    <>
      <header className="w-full h-dvh flex flex-col">
        <RetroCanvas navbarHeight={NAVBAR_HEIGHT} />
        {!isSticky && <RetroNavbar height={NAVBAR_HEIGHT} isSticky={false} activeSection={activeSectionString} />}
      </header>

      {isSticky && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <RetroNavbar height={NAVBAR_HEIGHT} isSticky={true} activeSection={activeSectionString} />
        </div>
      )}
    </>
  )
}
