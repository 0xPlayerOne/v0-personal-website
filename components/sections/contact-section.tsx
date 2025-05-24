import { Section } from "./section"
import { SITE_HEADER_COLOR, SITE_TEXT_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"

export function ContactSection() {
  return (
    <Section id="contact">
      <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: SITE_HEADER_COLOR }}>
        Get In Touch
      </h2>
      <div className="max-w-4xl mx-auto text-center" style={{ color: SITE_TEXT_COLOR }}>
        <p className="text-lg mb-8">
          Interested in collaborating, discussing opportunities, or just want to connect? I'd love to hear from you.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
              Twitter
            </h3>
            <p>@0xPlayerOne</p>
          </div>
          <div className="p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
              GitHub
            </h3>
            <p>@0xPlayerOne</p>
          </div>
          <div className="p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
              LinkedIn
            </h3>
            <p>@AMahoneyFernandes</p>
          </div>
        </div>
        <button
          className="font-bold py-4 px-8 rounded-lg text-lg transition-colors hover:opacity-80"
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
