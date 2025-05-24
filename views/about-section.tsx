import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { ClientWrapper } from "@/components/ui/client-wrapper"
import { SITE_BORDER_COLOR } from "@/constants/colors"

export function AboutSection() {
  return (
    <Section id="about">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        About Me
      </Typography>
      <div className="max-w-4xl mx-auto">
        <Typography variant="body1" align="center" gutterBottom>
          I'm a passionate developer and entrepreneur with a focus on blockchain technology, gaming, and innovative
          digital experiences. As the CEO of Nifty League, I'm building the future of gaming and NFTs.
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          My journey combines technical expertise with business acumen, creating products that push the boundaries of
          what's possible in the digital space.
        </Typography>
        <ClientWrapper
          fallback={
            <div className="grid grid-cols-1 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="text-center p-4 rounded-lg"
                  style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}
                >
                  <Typography variant="h3" align="center" color="secondary" gutterBottom>
                    Loading...
                  </Typography>
                </div>
              ))}
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
            <div className="text-center p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                Innovation
              </Typography>
              <Typography variant="body2" align="center">
                Constantly exploring new technologies and pushing creative boundaries.
              </Typography>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                Leadership
              </Typography>
              <Typography variant="body2" align="center">
                Building and leading teams to create exceptional digital experiences.
              </Typography>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" align="center" color="secondary" gutterBottom>
                Vision
              </Typography>
              <Typography variant="body2" align="center">
                Focused on the future of gaming, blockchain, and interactive entertainment.
              </Typography>
            </div>
          </div>
        </ClientWrapper>
      </div>
    </Section>
  )
}
