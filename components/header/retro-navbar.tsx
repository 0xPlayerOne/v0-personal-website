"use client"

import { useState } from "react"
import { NAV_BG_COLOR, NAV_BORDER_COLOR, NAV_TEXT_COLOR, NAV_HOVER_COLOR } from "@/constants/colors"
import { smoothScrollToSection } from "@/lib/smooth-scroll"
import { NAVIGATION_SECTIONS } from "@/constants/navigation"

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
      className="flex items-center border-0"
      style={{
        height: `${height}px`,
        backgroundColor: isSticky ? `${NAV_BG_COLOR}f8` : NAV_BG_COLOR,
        boxShadow: `0 0 0 1px ${NAV_BORDER_COLOR}, 0 0 10px ${NAV_BORDER_COLOR}60`,
        backdropFilter: isSticky ? "blur(4px)" : "none",
        WebkitBackdropFilter: isSticky ? "blur(4px)" : "none",
        display: "flex",
      }}
    >
      <div className="container mx-auto px-2 sm:px-4 w-full">
        <ul className="flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 font-['Press_Start_2P'] text-xs sm:text-sm md:text-base lg:text-lg">
          {NAVIGATION_SECTIONS.map((item) => (
            <li key={item.id} className="flex-shrink-0">
              <button
                onClick={() => scrollToSection(item.id)}
                className="transition-colors block whitespace-nowrap px-1 sm:px-2"
                style={{
                  color: hoveredItem === item.id ? NAV_HOVER_COLOR : NAV_TEXT_COLOR,
                  borderColor: activeSection === item.id ? NAV_BORDER_COLOR : "transparent",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  lineHeight: "1",
                  padding: "10px 0",
                  margin: "0",
                  verticalAlign: "baseline",
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
