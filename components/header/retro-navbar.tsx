"use client"

import { useState } from "react"
import { NAV_BG_COLOR, NAV_BORDER_COLOR, NAV_TEXT_COLOR, NAV_HOVER_COLOR } from "@/constants/colors"
import { smoothScrollToSection } from "@/lib/smooth-scroll"
import { NAVIGATION_SECTIONS } from "@/constants/navigation"
import { cn } from "@/lib/utils"

interface RetroNavbarProps {
  height: number
  isSticky?: boolean
  activeSection?: string
}

export function RetroNavbar({ height = 100, isSticky = false, activeSection = "" }: RetroNavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    smoothScrollToSection(sectionId, height)
  }

  return (
    <nav
      className={cn(
        "flex items-center border-0 mt-px", // Added flex from inline, mt-px for marginTop: 1px
        `shadow-[0_0_0_1px_${NAV_BORDER_COLOR},0_0_10px_${NAV_BORDER_COLOR}60]`,
        isSticky ? `bg-[${NAV_BG_COLOR}f8] backdrop-blur-sm` : `bg-[${NAV_BG_COLOR}]` // backdrop-blur-sm for blur(4px)
      )}
      style={{
        height: `${height}px`, // Dynamic height remains inline
        // textRendering, WebkitFontSmoothing, MozOsxFontSmoothing are very specific,
        // better kept for direct button styling or global CSS if widely applicable.
      }}
    >
      <div className="container mx-auto px-2 sm:px-4 w-full">
        <ul className="flex justify-evenly sm:justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 font-['Press_Start_2P'] text-xs sm:text-sm md:text-base lg:text-lg">
          {NAVIGATION_SECTIONS.map((item) => (
            <li key={item.id} className="flex-shrink-0">
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "transition-colors block whitespace-nowrap px-1 sm:px-2",
                  "border-b align-baseline m-0 py-[10px] leading-none", // Converted styles
                  hoveredItem === item.id ? `text-[${NAV_HOVER_COLOR}]` : `text-[${NAV_TEXT_COLOR}]`,
                  activeSection === item.id ? `border-[${NAV_BORDER_COLOR}]` : "border-transparent"
                )}
                style={{
                  // Specific text rendering/smoothing properties remain inline if necessary
                  textRendering: "optimizeSpeed",
                  WebkitFontSmoothing: "none",
                  MozOsxFontSmoothing: "unset",
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
