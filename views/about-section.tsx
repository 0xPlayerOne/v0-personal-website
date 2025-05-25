import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { SITE_BORDER_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { ABOUT_CONTENT } from "@/constants/content"

export function AboutSection() {
  return (
    <Section id="about">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        About Me
      </Typography>
      <div className="max-w-4xl mx-auto">
        <Typography variant="body1" align="center" gutterBottom>
          {ABOUT_CONTENT.intro}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {ABOUT_CONTENT.mission}
        </Typography>
        <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12")}>
          <div className={cn("text-center p-4 sm:p-6 rounded-lg")} style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <Typography variant="h3" align="center" color="secondary" gutterBottom>
              {ABOUT_CONTENT.values.innovation.title}
            </Typography>
            <Typography variant="body2" align="center">
              {ABOUT_CONTENT.values.innovation.description}
            </Typography>
          </div>
          <div className={cn("text-center p-4 sm:p-6 rounded-lg")} style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <Typography variant="h3" align="center" color="secondary" gutterBottom>
              {ABOUT_CONTENT.values.leadership.title}
            </Typography>
            <Typography variant="body2" align="center">
              {ABOUT_CONTENT.values.leadership.description}
            </Typography>
          </div>
          <div className={cn("text-center p-4 sm:p-6 rounded-lg")} style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <Typography variant="h3" align="center" color="secondary" gutterBottom>
              {ABOUT_CONTENT.values.vision.title}
            </Typography>
            <Typography variant="body2" align="center">
              {ABOUT_CONTENT.values.vision.description}
            </Typography>
          </div>
        </div>
      </div>
    </Section>
  )
}
