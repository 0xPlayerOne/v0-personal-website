"use client"

import { useState } from "react"
import { NAV_BG_COLOR, NAV_BORDER_COLOR, NAV_TEXT_COLOR, NAV_HOVER_COLOR } from "@/constants/colors"
import type { RetroNavbarProps } from "@/types/components"

export function RetroNavbar({ height = 100, isSticky = false, activeSection = "" }: RetroNavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const elementPosition = element.offsetTop - height
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
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
      <div className="container mx-auto px-4 w-full">
        <ul className="flex flex-wrap justify-center space-x-8 md:space-x-12 font-['Press_Start_2P'] text-lg">
          {[
            { id: "about", label: "ABOUT" },
            { id: "skills", label: "SKILLS" },
            { id: "projects", label: "PROJECTS" },
            { id: "contact", label: "CONTACT" },
          ].map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="transition-colors block"
                style={{
                  color: hoveredItem === item.id ? NAV_HOVER_COLOR : NAV_TEXT_COLOR,
                  borderColor: activeSection === item.id ? NAV_BORDER_COLOR : "transparent",
                  borderBottomWidth: "1px",
                  borderBottomStyle: "solid",
                  lineHeight: "1",
                  paddingTop: "6px",
                  paddingLeft: "0",
                  paddingRight: "0",
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
