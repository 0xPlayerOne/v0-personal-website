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
        <div className={cn("flex gap-2 p-1 rounded-lg", `bg-[${SITE_CARD_COLOR}CC]`)}> {/* 80% opacity */}
          {[
            { id: "overview", label: "Overview" },
            { id: "journey", label: "Journey" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-300",
                activeTab === tab.id
                  ? `scale-105 bg-[${SITE_BTN_COLOR}] text-[${SITE_CARD_COLOR}] border-0`
                  : `hover:scale-102 bg-transparent text-[${SITE_BTN_COLOR}] border border-[${SITE_BTN_COLOR}]`,
              )}
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

            {/* Overview Cards - Hidden on small screens */}
            <div className={cn("hidden md:grid md:grid-cols-3 gap-6 sm:gap-8")}>
              {Object.entries(ABOUT_CONTENT.values).map(([key, value]) => {
                const IconComponent = ICON_MAP[value.icon as keyof typeof ICON_MAP]
                return (
                  <Card
                    key={key}
                    className={cn(
                      "group transition-all duration-300 hover:scale-105 cursor-pointer border-0",
                      `bg-[${SITE_CARD_COLOR}]`,
                      `shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_10px_${SITE_BORDER_COLOR}66]`, // 40% opacity
                      `hover:shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_20px_${SITE_BTN_COLOR}66]` // 40% opacity
                    )}
                  >
                    <CardContent className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <div
                          className={cn(
                            "p-3 rounded-lg group-hover:scale-110 transition-transform duration-300",
                            `bg-[${SITE_BTN_COLOR}33]` // 20% opacity
                          )}
                        >
                          <IconComponent
                            size={32}
                            className={cn(
                              "transition-transform duration-300 group-hover:rotate-12",
                              `text-[${SITE_BTN_COLOR}]`
                            )}
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

            {/* Stats Cards - Always visible */}
            <div className={cn("grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8")}>
              {ABOUT_CONTENT.stats.map((stat, index) => {
                const IconComponent = ICON_MAP[stat.icon as keyof typeof ICON_MAP]
                return (
                  <Card
                    key={index}
                    className={cn(
                      "group transition-all duration-300 hover:scale-110 cursor-pointer border-0",
                      `bg-[${SITE_CARD_COLOR}]`,
                      `shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_10px_${SITE_BORDER_COLOR}66]`, // 40% opacity
                      `hover:shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_25px_${SITE_BTN_COLOR}80]` // 50% opacity
                    )}
                  >
                    <CardContent className="text-center p-6">
                      <div className="mb-4 flex justify-center">
                        <div
                          className={cn(
                            "p-3 rounded-lg group-hover:scale-125 transition-transform duration-300",
                            `bg-[${SITE_BTN_COLOR}33]` // 20% opacity
                          )}
                        >
                          <IconComponent
                            size={32}
                            className={cn(
                              "transition-transform duration-300 group-hover:rotate-12",
                              `text-[${SITE_BTN_COLOR}]`
                            )}
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
          </div>
        )}

        {/* Journey Tab */}
        {activeTab === "journey" && (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className={cn("absolute left-8 top-0 bottom-0 w-0.5", `bg-[${SITE_BORDER_COLOR}]`)} />

              <div className="space-y-8">
                {ABOUT_CONTENT.journey.map((item, index) => {
                  const IconComponent = ICON_MAP[item.icon as keyof typeof ICON_MAP]
                  return (
                    <div key={index} className="relative flex items-start gap-6">
                      {/* Timeline dot with icon */}
                      <div
                        className={cn(
                          "w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border-0",
                          `bg-[${SITE_CARD_COLOR}]`,
                          `shadow-[0_0_0_2px_${SITE_BORDER_COLOR},0_0_15px_${SITE_BTN_COLOR}99]` // 60% opacity
                        )}
                      >
                        <IconComponent size={24} className={`text-[${SITE_BTN_COLOR}]`} />
                      </div>

                      <Card
                        className={cn(
                          "flex-1 group transition-all duration-300 hover:scale-102 border-0",
                          `bg-[${SITE_CARD_COLOR}]`,
                          `shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_10px_${SITE_BORDER_COLOR}66]` // 40% opacity
                          // No hover shadow change specified for these cards, keeping it simple
                        )}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="secondary"
                              className={cn(`bg-[${SITE_BTN_COLOR}] text-[${SITE_CARD_COLOR}]`)}
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
      </div>
    </Section>
  )
}
