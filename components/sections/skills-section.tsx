import { Section } from "./section"
import { SITE_HEADER_COLOR, SITE_TEXT_COLOR, SITE_BORDER_COLOR } from "@/constants/colors"

export function SkillsSection() {
  return (
    <Section id="skills">
      <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: SITE_HEADER_COLOR }}>
        Skills & Expertise
      </h2>
      <div className="max-w-6xl mx-auto" style={{ color: SITE_TEXT_COLOR }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { category: "Blockchain", skills: ["Solidity", "Web3", "NFTs", "DeFi", "Smart Contracts"] },
            { category: "Development", skills: ["React", "TypeScript", "Node.js", "Python", "Next.js"] },
            { category: "Gaming", skills: ["Unity", "Game Design", "Tokenomics", "P2E", "Metaverse"] },
            { category: "Leadership", skills: ["Team Building", "Strategy", "Product Management", "Vision"] },
            { category: "Business", skills: ["Fundraising", "Partnerships", "Marketing", "Operations"] },
            { category: "Design", skills: ["UI/UX", "Pixel Art", "Branding", "Creative Direction"] },
          ].map((skillGroup, index) => (
            <div key={index} className="p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: SITE_HEADER_COLOR }}>
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <span className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: SITE_TEXT_COLOR }}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
