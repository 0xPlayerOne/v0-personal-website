import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"

export function ContactSection() {
  return (
    <Section id="contact">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        Get In Touch
      </Typography>
      <div className="max-w-4xl mx-auto text-center">
        <Typography variant="body1" align="center" gutterBottom>
          Interested in collaborating, discussing opportunities, or just want to connect? I'd love to hear from you.
        </Typography>
        <div className="mb-8 sm:mb-12">
          <ResponsiveGrid cols={{ default: 1, sm: 3 }} gap={24}>
            <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                Twitter
              </Typography>
              <Typography variant="body2" align="center">
                @0xPlayerOne
              </Typography>
            </div>
            <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                GitHub
              </Typography>
              <Typography variant="body2" align="center">
                @0xPlayerOne
              </Typography>
            </div>
            <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                LinkedIn
              </Typography>
              <Typography variant="body2" align="center">
                @AMahoneyFernandes
              </Typography>
            </div>
          </ResponsiveGrid>
        </div>
        <button
          className="font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-colors hover:opacity-80"
          style={{
            backgroundColor: SITE_BTN_COLOR,
            color: CANVAS_COLOR,
          }}
        >
          Let's Connect
        </button>
      </div>
    </Section>
  )
}
