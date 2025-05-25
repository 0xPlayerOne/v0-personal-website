"use client"

import { useState } from "react"
import { NAV_BG_COLOR, NAV_BORDER_COLOR, NAV_TEXT_COLOR, NAV_HOVER_COLOR } from "@/constants/colors"
import { smoothScrollToSection } from "@/lib/utils"
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
      className="flex items-center"
      style={{
        height: `${height}px`,
        backgroundColor: isSticky ? `${NAV_BG_COLOR}f8` : NAV_BG_COLOR,
        borderTop: `1px solid ${NAV_BORDER_COLOR}`,
        borderBottom: `1px solid ${NAV_BORDER_COLOR}`,
        backdropFilter: isSticky ? "blur(4px)" : "none",
        WebkitBackdropFilter: isSticky ? "blur(4px)" : "none",
        boxShadow: isSticky ? "0 2px 8px rgba(0, 0, 0, 0.2)" : "none",
      }}
    >
      <div className="container mx-auto px-2 sm:px-4 w-full">
        <ul className="flex justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 font-['Press_Start_2P'] text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
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
                  paddingTop: "6px",
                  paddingBottom: "12px",
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
