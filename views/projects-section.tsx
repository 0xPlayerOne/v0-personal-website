import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR } from "@/constants/colors"

export function ProjectsSection() {
  return (
    <Section id="projects">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        Projects
      </Typography>
      <div className="max-w-6xl mx-auto">
        <ResponsiveGrid cols={{ default: 1, lg: 2 }} gap={24}>
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
            <div key={index} className="p-6 sm:p-8 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" color="secondary" gutterBottom>
                {project.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {project.description}
              </Typography>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 rounded text-xs sm:text-sm font-semibold"
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
        </ResponsiveGrid>
      </div>
    </Section>
  )
}
