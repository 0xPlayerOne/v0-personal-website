import { Section } from "./section"
import { TextHeader } from "@/components/ui/text-header"
import { TextSubheader } from "@/components/ui/text-subheader"
import { SITE_TEXT_COLOR, SITE_BORDER_COLOR } from "@/constants/colors"

export function SkillsSection() {
  return (
    <Section id="skills">
      <TextHeader>Skills & Expertise</TextHeader>
      <div className="max-w-6xl mx-auto" style={{ color: SITE_TEXT_COLOR }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            { category: "Blockchain", skills: ["Solidity", "Web3", "NFTs", "DeFi", "Smart Contracts"] },
            { category: "Development", skills: ["React", "TypeScript", "Node.js", "Python", "Next.js"] },
            { category: "Gaming", skills: ["Unity", "Game Design", "Tokenomics", "P2E", "Metaverse"] },
            { category: "Leadership", skills: ["Team Building", "Strategy", "Product Management", "Vision"] },
            { category: "Business", skills: ["Fundraising", "Partnerships", "Marketing", "Operations"] },
            { category: "Design", skills: ["UI/UX", "Pixel Art", "Branding", "Creative Direction"] },
          ].map((skillGroup, index) => (
            <div key={index} className="p-4 sm:p-6 rounded-lg" style={{ border: `1px solid ${SITE_BORDER_COLOR}` }}>
              <TextSubheader>{skillGroup.category}</TextSubheader>
              <ul className="space-y-2">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center text-sm sm:text-base">
                    <span
                      className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: SITE_TEXT_COLOR }}
                    ></span>
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
