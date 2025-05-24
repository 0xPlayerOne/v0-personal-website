import { Section } from "./section"
import { SITE_HEADER_COLOR, SITE_TEXT_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"

export function ContactSection() {
  return (
    <Section id="contact">
      <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: SITE_HEADER_COLOR }}>
        Get In Touch
      </h2>
      <div className="max-w-4xl mx-auto text-center" style={{ color: SITE_TEXT_COLOR }}>
        <p className="text-base sm:text-lg mb-8">
          Interested in collaborating, discussing opportunities, or just want to connect? I'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
              Twitter
            </h3>
            <p className="text-sm sm:text-base">@0xPlayerOne</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
              GitHub
            </h3>
            <p className="text-sm sm:text-base">@0xPlayerOne</p>
          </div>
          <div className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <h3 className="text-lg sm:text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
              LinkedIn
            </h3>
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
