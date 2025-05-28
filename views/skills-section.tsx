"use client"

import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { SITE_TEXT_COLOR, SITE_CARD_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { SKILLS_DATA } from "@/constants/content"
import { Code2, Gamepad2, Users, Briefcase, Palette, Blocks } from "lucide-react"

const SKILL_ICONS = {
  "Web & Full-Stack": Code2,
  "Game Development": Gamepad2,
  "Blockchain / Web3": Blocks,
  Business: Briefcase,
  Leadership: Users,
  Product: Palette,
} as const

export function SkillsSection() {
  return (
    <Section id="skills">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        Skills & Expertise
      </Typography>
      <div className="max-w-6xl mx-auto mt-8">
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8")}>
          {SKILLS_DATA.map((skillGroup, index) => {
            const IconComponent = SKILL_ICONS[skillGroup.category as keyof typeof SKILL_ICONS]
            const avgLevel = Math.round(
              skillGroup.skills.reduce((sum, skill) => sum + skill.level, 0) / skillGroup.skills.length,
            )

            return (
              <Card
                key={index}
                className={cn(
                  "group transition-all duration-300 hover:scale-105 cursor-pointer border-0",
                  `bg-[${SITE_CARD_COLOR}]`,
                  `shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_10px_${SITE_BORDER_COLOR}66]`, // 40% opacity
                  `hover:shadow-[0_0_0_1px_${SITE_BORDER_COLOR},0_0_20px_${SITE_BTN_COLOR}66]` // 40% opacity
                )}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {IconComponent && (
                      <div
                        className={cn(
                          "p-2 rounded-lg transition-colors duration-300 group-hover:scale-110",
                          `bg-[${SITE_BTN_COLOR}33]` // 20% opacity
                        )}
                      >
                        <IconComponent
                          size={24}
                          className={cn(
                            "transition-transform duration-300 group-hover:rotate-12",
                            `text-[${SITE_BTN_COLOR}]`
                          )}
                        />
                      </div>
                    )}
                    <Typography variant="h3" color="secondary">
                      {skillGroup.category}
                    </Typography>
                  </div>

                  <div className="space-y-3">
                    {skillGroup.skills.map((skill, skillIndex) => {
                      const filledDots = Math.round((skill.level / 100) * 5)
                      return (
                        <div key={skillIndex} className="group/skill">
                          <div className={cn("flex items-center justify-between mb-1")}>
                            <Typography variant="body2" className="font-medium">
                              {skill.name}
                            </Typography>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    i < filledDots ? `bg-[${SITE_BTN_COLOR}]` : `bg-[${SITE_TEXT_COLOR}4D]` // 30% opacity
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <div
                            className={cn(
                              "h-1 rounded-full transition-all duration-500 group-hover/skill:h-2",
                              `bg-[${SITE_TEXT_COLOR}33]` // 20% opacity
                            )}
                          >
                            <div
                              className={cn(
                                "h-full rounded-full transition-all duration-700 ease-out",
                                `bg-[${SITE_BTN_COLOR}]`,
                                `shadow-[0_0_8px_${SITE_BTN_COLOR}99]` // 60% opacity
                              )}
                              style={{
                                width: `${skill.level}%`, // Dynamic width must stay inline
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className={cn("mt-4 pt-4 border-t", `border-[${SITE_BORDER_COLOR}66]`)}> {/* 40% opacity */}
                    <div className="flex items-center justify-between text-xs">
                      <span className={`text-[${SITE_TEXT_COLOR}]`}>{skillGroup.skills.length} core skills</span>
                      <span
                        className={cn(
                          "px-2 py-1 rounded font-mono",
                          `bg-[${SITE_BTN_COLOR}33]`, // 20% opacity
                          `text-[${SITE_BTN_COLOR}]`
                        )}
                      >
                        LVL {avgLevel}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
