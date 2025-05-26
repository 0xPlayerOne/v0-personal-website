export const SKILLS_DATA = [
  {
    category: "Web & Full-Stack",
    skills: [
      { name: "React / Next.js", level: 98 },
      { name: "TypeScript / JavaScript", level: 95 },
      { name: "Node.js (Express/Fastify)", level: 82 },
      { name: "Python (FastAPI/Django)", level: 70 },
    ],
  },
  {
    category: "Game Development",
    skills: [
      { name: "Unity / C#", level: 75 },
      { name: "Game UI/UX", level: 90 },
      { name: "DevOps / LiveOps", level: 83 },
      { name: "Systems & Economy Design", level: 86 },
    ],
  },
  {
    category: "Web3 & Blockchain",
    skills: [
      { name: "Solidity (Smart Contracts)", level: 84 },
      { name: "NFTs & Digital Assets", level: 92 },
      { name: "DeFi & Tokenomics", level: 78 },
      { name: "DAOs & Governance", level: 85 },
    ],
  },
  {
    category: "Business",
    skills: [
      { name: "Operations", level: 90 },
      { name: "Fundraising", level: 86 },
      { name: "Partnerships", level: 78 },
      { name: "Marketing", level: 60 },
    ],
  },
  {
    category: "Leadership",
    skills: [
      { name: "Engineering Management", level: 98 },
      { name: "Team Building", level: 95 },
      { name: "Strategy", level: 90 },
      { name: "Startup Scaling", level: 88 },
    ],
  },
  {
    category: "Product",
    skills: [
      { name: "UI/UX Design", level: 85 },
      { name: "Product Management", level: 90 },
      { name: "Agile/Scrum", level: 80 },
      { name: "User Research / Testing", level: 92 },
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
