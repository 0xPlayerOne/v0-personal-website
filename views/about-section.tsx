import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
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
          <Card>
            <CardContent className="text-center p-4 sm:p-6">
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                {ABOUT_CONTENT.values.innovation.title}
              </Typography>
              <Typography variant="body2" align="center">
                {ABOUT_CONTENT.values.innovation.description}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-4 sm:p-6">
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                {ABOUT_CONTENT.values.leadership.title}
              </Typography>
              <Typography variant="body2" align="center">
                {ABOUT_CONTENT.values.leadership.description}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center p-4 sm:p-6">
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                {ABOUT_CONTENT.values.vision.title}
              </Typography>
              <Typography variant="body2" align="center">
                {ABOUT_CONTENT.values.vision.description}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  )
}
