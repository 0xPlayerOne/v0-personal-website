export const SKILLS_DATA = [
  {
    category: "Blockchain",
    skills: [
      { name: "Solidity", level: 95 },
      { name: "Web3", level: 90 },
      { name: "NFTs", level: 98 },
      { name: "DeFi", level: 85 },
      { name: "Smart Contracts", level: 92 },
    ],
  },
  {
    category: "Development",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Python", level: 75 },
      { name: "Next.js", level: 90 },
    ],
  },
  {
    category: "Gaming",
    skills: [
      { name: "Unity", level: 80 },
      { name: "Game Design", level: 95 },
      { name: "Tokenomics", level: 92 },
      { name: "P2E", level: 98 },
      { name: "Metaverse", level: 85 },
    ],
  },
  {
    category: "Leadership",
    skills: [
      { name: "Team Building", level: 95 },
      { name: "Strategy", level: 90 },
      { name: "Product Management", level: 88 },
      { name: "Vision", level: 98 },
    ],
  },
  {
    category: "Business",
    skills: [
      { name: "Fundraising", level: 92 },
      { name: "Partnerships", level: 88 },
      { name: "Marketing", level: 75 },
      { name: "Operations", level: 80 },
    ],
  },
  {
    category: "Design",
    skills: [
      { name: "UI/UX", level: 85 },
      { name: "Pixel Art", level: 90 },
      { name: "Branding", level: 80 },
      { name: "Creative Direction", level: 92 },
    ],
  },
] as const

export const PROJECTS_DATA = [
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
    description: "Decentralized finance protocol enabling innovative yield farming and liquidity provision mechanisms.",
    tech: ["Solidity", "DeFi", "Smart Contracts", "Web3"],
  },
  {
    title: "Metaverse Platform",
    description: "Virtual world platform where users can create, explore, and monetize digital experiences and assets.",
    tech: ["Unity", "Blockchain", "VR", "Metaverse"],
  },
] as const

export const CONTACT_LINKS = [
  { platform: "Twitter", handle: "@0xPlayerOne" },
  { platform: "GitHub", handle: "@0xPlayerOne" },
  { platform: "LinkedIn", handle: "@AMahoneyFernandes" },
] as const

export const ABOUT_CONTENT = {
  intro:
    "I'm a passionate developer and entrepreneur with a focus on blockchain technology, gaming, and innovative digital experiences. As the CEO of Nifty League, I'm building the future of gaming and NFTs.",
  mission:
    "My journey combines technical expertise with business acumen, creating products that push the boundaries of what's possible in the digital space.",
  values: {
    innovation: {
      title: "Innovation",
      description: "Constantly exploring new technologies and pushing creative boundaries.",
    },
    leadership: {
      title: "Leadership",
      description: "Building and leading teams to create exceptional digital experiences.",
    },
    vision: {
      title: "Vision",
      description: "Focused on the future of gaming, blockchain, and interactive entertainment.",
    },
  },
} as const

export const CONTACT_CONTENT = {
  title: "Get In Touch",
  description:
    "Interested in collaborating, discussing opportunities, or just want to connect? I'd love to hear from you.",
  buttonText: "Let's Connect",
} as const
