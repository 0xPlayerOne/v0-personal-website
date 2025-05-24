import { Section } from "./section"
import { SITE_HEADER_COLOR, SITE_TEXT_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"

export function ProjectsSection() {
  return (
    <Section id="projects">
      <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: SITE_HEADER_COLOR }}>
        Projects
      </h2>
      <div className="max-w-6xl mx-auto" style={{ color: SITE_TEXT_COLOR }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Nifty League",
              description:
                "A blockchain-based gaming platform combining NFTs with competitive gameplay. Building the future of play-to-earn gaming.",
              tech: ["Blockchain", "Gaming", "NFTs", "React"],
            },
            {
              title: "Retro Pong Header",
              description:
                "An interactive retro-style header with pixel art and physics-based animations. Showcasing creative web development.",
              tech: ["Canvas", "TypeScript", "Animation", "Pixel Art"],
            },
            {
              title: "DeFi Protocol",
              description:
                "Decentralized finance protocol enabling innovative yield farming and liquidity provision mechanisms.",
              tech: ["Solidity", "DeFi", "Smart Contracts", "Web3"],
            },
            {
              title: "Metaverse Platform",
              description:
                "Virtual world platform where users can create, explore, and monetize digital experiences and assets.",
              tech: ["Unity", "Blockchain", "VR", "Metaverse"],
            },
          ].map((project, index) => (
            <div key={index} className="p-8 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
                {project.title}
              </h3>
              <p className="mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 rounded text-sm font-semibold"
                    style={{
                      backgroundColor: SITE_BTN_COLOR,
                      color: CANVAS_COLOR,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
