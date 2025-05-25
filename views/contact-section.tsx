import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CONTACT_LINKS, CONTACT_CONTENT } from "@/constants/content"

export function ContactSection() {
  return (
    <Section id="contact">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        {CONTACT_CONTENT.title}
      </Typography>
      <div className="max-w-4xl mx-auto text-center">
        <Typography variant="body1" align="center" gutterBottom>
          {CONTACT_CONTENT.description}
        </Typography>
        <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12")}>
          {CONTACT_LINKS.map((contact, index) => (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <Typography variant="h3" align="center" color="secondary" gutterBottom>
                  {contact.platform}
                </Typography>
                <Typography variant="body2" align="center">
                  {contact.handle}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button size="lg" className="text-base sm:text-lg">
          {CONTACT_CONTENT.buttonText}
        </Button>
      </div>
    </Section>
  )
}
