import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { SITE_TEXT_COLOR, SITE_CARD_COLOR, SITE_BORDER_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { SKILLS_DATA } from "@/constants/content"

export function SkillsSection() {
  return (
    <Section id="skills">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        Skills & Expertise
      </Typography>
      <div className="max-w-6xl mx-auto">
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8")}>
          {SKILLS_DATA.map((skillGroup, index) => (
            <Card key={index} style={{ backgroundColor: SITE_CARD_COLOR, borderColor: SITE_BORDER_COLOR }}>
              <CardContent className="p-4 sm:p-6">
                <Typography variant="h3" color="secondary" gutterBottom>
                  {skillGroup.category}
                </Typography>
                <ul className={cn("space-y-2")}>
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className={cn("flex items-center")}>
                      <span
                        className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                        style={{ backgroundColor: SITE_TEXT_COLOR }}
                      ></span>
                      <Typography variant="body2">{skill}</Typography>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
