import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PROJECTS_DATA } from "@/constants/content"

export function ProjectsSection() {
  return (
    <Section id="projects">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        Projects
      </Typography>
      <div className="max-w-6xl mx-auto">
        <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8")}>
          {PROJECTS_DATA.map((project, index) => (
            <Card key={index}>
              <CardContent className="p-6 sm:p-8">
                <Typography variant="h3" color="secondary" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {project.description}
                </Typography>
                <div className={cn("flex flex-wrap gap-2")}>
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
