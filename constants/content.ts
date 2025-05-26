export const SKILLS_DATA = [
  {
    category: "Web & Full-Stack",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript / JavaScript", level: 95 },
      { name: "Node.js (Express/Fastify)", level: 80 },
      { name: "Python (FastAPI/Django)", level: 65 },
    ],
  },
  {
    category: "Game Development",
    skills: [
      { name: "Unity & C#", level: 65 },
      { name: "Game UI/UX", level: 80 },
      { name: "DevOps / LiveOps", level: 69 },
      { name: "Systems & Economy Design", level: 78 },
    ],
  },
  {
    category: "Blockchain / Web3",
    skills: [
      { name: "Solidity (Smart Contracts)", level: 82 },
      { name: "NFTs & Digital Assets", level: 90 },
      { name: "DeFi & Tokenomics", level: 75 },
      { name: "DAOs & Governance", level: 85 },
    ],
  },
  {
    category: "Business",
    skills: [
      { name: "Operations", level: 90 },
      { name: "Fundraising", level: 84 },
      { name: "Partnerships", level: 75 },
      { name: "Marketing", level: 60 },
    ],
  },
  {
    category: "Leadership",
    skills: [
      { name: "Team Building", level: 70 },
      { name: "Engineering Management", level: 78 },
      { name: "Strategy", level: 84 },
      { name: "Startup Scaling", level: 75 },
    ],
  },
  {
    category: "Product",
    skills: [
      { name: "Product Management", level: 65 },
      { name: "UI/UX Design", level: 69 },
      { name: "Agile & Scrum", level: 85 },
      { name: "User Research & Testing", level: 68 },
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
  stats: [
    { label: "Years Experience", value: "8+", icon: "⚡" },
    { label: "Projects Shipped", value: "50+", icon: "🚀" },
    { label: "Team Members Led", value: "25+", icon: "👥" },
    { label: "Lines of Code", value: "500K+", icon: "💻" },
  ],
  journey: [
    {
      year: "2016",
      title: "Started Coding",
      description: "Began my journey with web development and fell in love with creating digital experiences.",
    },
    {
      year: "2019",
      title: "First Startup",
      description: "Co-founded my first tech startup, learning the ropes of entrepreneurship and product development.",
    },
    {
      year: "2021",
      title: "Entered Web3",
      description: "Dove deep into blockchain technology and discovered the potential of decentralized gaming.",
    },
    {
      year: "2022",
      title: "Founded Nifty League",
      description: "Launched Nifty League, combining my passion for gaming with cutting-edge blockchain technology.",
    },
  ],
  values: {
    innovation: {
      title: "Innovation",
      description: "Constantly exploring new technologies and pushing creative boundaries.",
      icon: "🔬",
    },
    leadership: {
      title: "Leadership",
      description: "Building and leading teams to create exceptional digital experiences.",
      icon: "🎯",
    },
    vision: {
      title: "Vision",
      description: "Focused on the future of gaming, blockchain, and interactive entertainment.",
      icon: "🔮",
    },
  },
} as const

export const CONTACT_CONTENT = {
  title: "Get In Touch",
  description:
    "Interested in collaborating, discussing opportunities, or just want to connect? I'd love to hear from you.",
  buttonText: "Let's Connect",
} as const
