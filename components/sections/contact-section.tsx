import { Section } from "./section"
import { TextHeader } from "@/components/ui/text-header"
import { TextSubheader } from "@/components/ui/text-subheader"
import { SITE_TEXT_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"

export function ContactSection() {
  return (
    <Section id="contact">
      <TextHeader>Get In Touch</TextHeader>
      <div className="max-w-4xl mx-auto text-center" style={{ color: SITE_TEXT_COLOR }}>
        <p className="text-base sm:text-lg mb-8">
          Interested in collaborating, discussing opportunities, or just want to connect? I'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <TextSubheader className="text-center">Twitter</TextSubheader>
            <p className="text-sm sm:text-base">@0xPlayerOne</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <TextSubheader className="text-center">GitHub</TextSubheader>
            <p className="text-sm sm:text-base">@0xPlayerOne</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <TextSubheader className="text-center">LinkedIn</TextSubheader>
            <p className="text-sm sm:text-base">@AMahoneyFernandes</p>
          </div>
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
