"use client"

import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SITE_CARD_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { ABOUT_CONTENT } from "@/constants/content"
import { useState } from "react"
import {
  Zap,
  Rocket,
  Users,
  Building,
  Code,
  Blocks,
  Lightbulb,
  Gamepad2,
  FlaskRoundIcon as Flask,
  BarChartIcon as ChartNoAxesCombined,
  Eye,
} from "lucide-react"

const ICON_MAP = {
  zap: Zap,
  rocket: Rocket,
  users: Users,
  building: Building,
  code: Code,
  blocks: Blocks,
  lightbulb: Lightbulb,
  gamepad2: Gamepad2,
  flask: Flask,
  "chart-no-axes-combined": ChartNoAxesCombined,
  eye: Eye,
} as const

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "journey" | "stats">("overview")

  return (
    <Section id="about">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        About Me
      </Typography>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-4">
        <div className="flex gap-2 p-1 rounded-lg" style={{ backgroundColor: `${SITE_CARD_COLOR}80` }}>
          {[
            { id: "overview", label: "Overview" },
            { id: "journey", label: "Journey" },
            { id: "stats", label: "Stats" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 border-0",
                activeTab === tab.id ? "scale-105" : "hover:scale-102",
              )}
              style={{
                backgroundColor: activeTab === tab.id ? SITE_BTN_COLOR : "transparent",
                color: activeTab === tab.id ? SITE_CARD_COLOR : SITE_BTN_COLOR,
                border: activeTab === tab.id ? "none" : `1px solid ${SITE_BTN_COLOR}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="text-center max-w-4xl mx-auto">
              <Typography variant="body1" align="center" gutterBottom>
                {ABOUT_CONTENT.intro}
              </Typography>
              {ABOUT_CONTENT.mission ? (
                <Typography variant="body1" align="center" gutterBottom>
                  {ABOUT_CONTENT.mission}
                </Typography>
              ) : null}
            </div>

            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8")}>
              {Object.entries(ABOUT_CONTENT.values).map(([key, value]) => {
                const IconComponent = ICON_MAP[value.icon as keyof typeof ICON_MAP]
                return (
                  <Card
                    key={key}
                    className="group transition-all duration-300 hover:scale-105 cursor-pointer border-0"
                    style={{
                      backgroundColor: SITE_CARD_COLOR,
                      boxShadow: `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 20px ${SITE_BTN_COLOR}40`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`
                    }}
                  >
                    <CardContent className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <div
                          className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: `${SITE_BTN_COLOR}20` }}
                        >
                          <IconComponent
                            size={32}
                            style={{ color: SITE_BTN_COLOR }}
                            className="transition-transform duration-300 group-hover:rotate-12"
                          />
                        </div>
                      </div>
                      <Typography variant="h3" align="center" color="secondary" gutterBottom>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" align="center">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Journey Tab */}
        {activeTab === "journey" && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5" style={{ backgroundColor: SITE_BORDER_COLOR }} />

              <div className="space-y-8">
                {ABOUT_CONTENT.journey.map((item, index) => {
                  const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP]
                  return (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline dot with icon */}
                      <div
                        className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border-0"
                        style={{
                          backgroundColor: SITE_CARD_COLOR,
                          boxShadow: `0 0 0 2px ${SITE_BORDER_COLOR}, 0 0 15px ${SITE_BTN_COLOR}60`,
                        }}
                      >
                        <IconComponent size={24} style={{ color: SITE_BTN_COLOR }} />
                      </div>

                      <Card
                        className="flex-1 group transition-all duration-300 hover:scale-102 border-0"
                        style={{
                          backgroundColor: SITE_CARD_COLOR,
                          boxShadow: `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`,
                        }}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="secondary"
                              style={{ backgroundColor: SITE_BTN_COLOR, color: SITE_CARD_COLOR }}
                            >
                              {item.year}
                            </Badge>
                            <Typography variant="h3" color="secondary">
                              {item.title}
                            </Typography>
                          </div>
                          <Typography variant="body2">{item.description}</Typography>
                        </CardContent>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8")}>
            {ABOUT_CONTENT.stats.map((stat, index) => {
              const IconComponent = ICON_MAP[stat.icon as keyof typeof ICON_MAP]
              return (
                <Card
                  key={index}
                  className="group transition-all duration-300 hover:scale-110 cursor-pointer border-0"
                  style={{
                    backgroundColor: SITE_CARD_COLOR,
                    boxShadow: `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 25px ${SITE_BTN_COLOR}50`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`
                  }}
                >
                  <CardContent className="text-center p-6">
                    <div className="mb-4 flex justify-center">
                      <div
                        className="p-3 rounded-lg group-hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: `${SITE_BTN_COLOR}20` }}
                      >
                        <IconComponent
                          size={32}
                          style={{ color: SITE_BTN_COLOR }}
                          className="transition-transform duration-300 group-hover:rotate-12"
                        />
                      </div>
                    </div>
                    <Typography
                      variant="h2"
                      align="center"
                      color="primary"
                      className="mb-2 group-hover:text-glow transition-all duration-300"
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" align="center" color="secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </Section>
  )
}
