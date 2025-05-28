"use client"

import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SITE_CARD_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"
import { cn, getPlatformUrl } from "@/lib/utils"
import { CONTACT_LINKS, CONTACT_CONTENT } from "@/constants/content"
import { Twitter, Github, Linkedin, Mail } from "lucide-react"

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
          {CONTACT_LINKS.map((contact, index) => {
            const getIcon = (platform: string) => {
              const iconCn = `text-[${SITE_BTN_COLOR}]`
              switch (platform.toLowerCase()) {
                case "twitter":
                  return <Twitter size={24} className={iconCn} />
                case "github":
                  return <Github size={24} className={iconCn} />
                case "linkedin":
                  return <Linkedin size={24} className={iconCn} />
                default:
                  return null
              }
            }

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
                  <a
                    href={getPlatformUrl(contact.platform, contact.handle)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center"
                  >
                    <div className="mb-3 flex justify-center">
                      <div
                        className={cn(
                          "p-3 rounded-lg group-hover:scale-110 transition-transform duration-300",
                          `bg-[${SITE_BTN_COLOR}33]` // 20% opacity
                        )}
                      >
                        {getIcon(contact.platform)}
                      </div>
                    </div>
                    <Typography variant="h3" align="center" color="secondary" gutterBottom>
                      {contact.platform}
                    </Typography>
                    <Typography variant="body2" align="center">
                      {contact.handle}
                    </Typography>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Button
          size="lg"
          className={cn(
            "text-base sm:text-lg group",
            `bg-[${SITE_BTN_COLOR}] text-[${CANVAS_COLOR}] hover:bg-[${SITE_BTN_COLOR}]/90`
          )}
          onClick={() => {
            // Anti-spam email encoding
            const user = "contact"
            const domain = "andrewmf.com"
            const email = user + "@" + domain
            const subject = encodeURIComponent("Hello from your website!")
            const body = encodeURIComponent(
              "Hi Andrew,\n\nI found your website and would like to connect.\n\nBest regards,",
            )
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
          }}
        >
          <Mail size={20} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
          {CONTACT_CONTENT.buttonText}
        </Button>
      </div>
    </Section>
  )
}
