import { Section } from "./section"
import { TextHeader } from "@/components/ui/text-header"
import { TextSubheader } from "@/components/ui/text-subheader"
import { SITE_TEXT_COLOR, SITE_BORDER_COLOR } from "@/constants/colors"

export function AboutSection() {
  return (
    <Section id="about">
      <TextHeader>About Me</TextHeader>
      <div className="max-w-4xl mx-auto" style={{ color: SITE_TEXT_COLOR }}>
        <p className="text-base sm:text-lg mb-6 text-center">
          I'm a passionate developer and entrepreneur with a focus on blockchain technology, gaming, and innovative
          digital experiences. As the CEO of Nifty League, I'm building the future of gaming and NFTs.
        </p>
        <p className="text-base sm:text-lg mb-6 text-center">
          My journey combines technical expertise with business acumen, creating products that push the boundaries of
          what's possible in the digital space.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12">
          <div className="text-center p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <TextSubheader className="text-center">Innovation</TextSubheader>
            <p className="text-sm sm:text-base">
              Constantly exploring new technologies and pushing creative boundaries.
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <TextSubheader className="text-center">Leadership</TextSubheader>
            <p className="text-sm sm:text-base">
              Building and leading teams to create exceptional digital experiences.
            </p>
          </div>
          <div className="text-center p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <TextSubheader className="text-center">Vision</TextSubheader>
            <p className="text-sm sm:text-base">
              Focused on the future of gaming, blockchain, and interactive entertainment.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}
