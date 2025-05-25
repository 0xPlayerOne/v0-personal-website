import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"
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
            <div
              key={index}
              className={cn("p-4 sm:p-6 rounded-lg")}
              style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}
            >
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                {contact.platform}
              </Typography>
              <Typography variant="body2" align="center">
                {contact.handle}
              </Typography>
            </div>
          ))}
        </div>
        <button
          className={cn(
            "font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors hover:opacity-80",
          )}
          style={{
            backgroundColor: SITE_BTN_COLOR,
            color: CANVAS_COLOR,
          }}
        >
          {CONTACT_CONTENT.buttonText}
        </button>
      </div>
    </Section>
  )
}
