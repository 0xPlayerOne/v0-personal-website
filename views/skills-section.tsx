import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"
import { SITE_TEXT_COLOR, SITE_BORDER_COLOR } from "@/constants/colors"

export function SkillsSection() {
  return (
    <Section id="skills">
      <Typography variant="h2" align="center" color="primary" gutterBottom>
        Skills & Expertise
      </Typography>
      <div className="max-w-6xl mx-auto">
        <ResponsiveGrid cols={{ default: 1, sm: 2, lg: 3 }} gap={24}>
          {[
            { category: "Blockchain", skills: ["Solidity", "Web3", "NFTs", "DeFi", "Smart Contracts"] },
            { category: "Development", skills: ["React", "TypeScript", "Node.js", "Python", "Next.js"] },
            { category: "Gaming", skills: ["Unity", "Game Design", "Tokenomics", "P2E", "Metaverse"] },
            { category: "Leadership", skills: ["Team Building", "Strategy", "Product Management", "Vision"] },
            { category: "Business", skills: ["Fundraising", "Partnerships", "Marketing", "Operations"] },
            { category: "Design", skills: ["UI/UX", "Pixel Art", "Branding", "Creative Direction"] },
          ].map((skillGroup, index) => (
            <div key={index} className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <Typography variant="h3" color="secondary" gutterBottom>
                {skillGroup.category}
              </Typography>
              <ul className="space-y-2">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <span
                      className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: SITE_TEXT_COLOR }}
                    ></span>
                    <Typography variant="body2">{skill}</Typography>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ResponsiveGrid>
      </div>
    </Section>
  )
}
