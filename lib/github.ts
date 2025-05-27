interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface PinnedRepo {
  title: string
  description: string
  tech: string[]
  url: string
  homepage?: string
  stars: number
  forks: number
  language: string | null
}

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  try {
    // GitHub doesn't have a direct API for pinned repos, so we'll use a workaround
    // This fetches your most recent public repos and filters by topics or popularity
    const response = await fetch("https://api.github.com/users/0xPlayerOne/repos?sort=updated&per_page=20", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "AndrewMF-Portfolio",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // Filter and sort repos to get the most relevant ones
    const filteredRepos = repos
      .filter(
        (repo) =>
          !repo.name.includes("0xPlayerOne") && // Exclude profile repo
          repo.description && // Must have description
          !repo.name.includes("fork"), // Exclude obvious forks
      )
      .sort((a, b) => {
        // Sort by stars + forks + recent activity
        const scoreA = a.stargazers_count + a.forks_count + new Date(a.updated_at).getTime() / 1000000000
        const scoreB = b.stargazers_count + b.forks_count + new Date(b.updated_at).getTime() / 1000000000
        return scoreB - scoreA
      })
      .slice(0, 4) // Take top 4

    return filteredRepos.map((repo) => ({
      title: formatRepoName(repo.name),
      description: repo.description || "No description available",
      tech: [
        ...(repo.language ? [repo.language] : []),
        ...repo.topics.slice(0, 3), // Add up to 3 topics
      ].filter(Boolean),
      url: repo.html_url,
      homepage: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
    }))
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    // Return fallback data if API fails
    return getFallbackProjects()
  }
}

function formatRepoName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getFallbackProjects(): PinnedRepo[] {
  return [
    {
      title: "Nifty League",
      description:
        "A blockchain-based gaming platform combining NFTs with competitive gameplay. Building the future of play-to-earn gaming.",
      tech: ["Blockchain", "Gaming", "NFTs", "React"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      language: "TypeScript",
    },
    {
      title: "Retro Pong Header",
      description:
        "An interactive retro-style header with pixel art and physics-based animations. Showcasing creative web development.",
      tech: ["Canvas", "TypeScript", "Animation", "Pixel Art"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      language: "TypeScript",
    },
    {
      title: "DeFi Protocol",
      description:
        "Decentralized finance protocol enabling innovative yield farming and liquidity provision mechanisms.",
      tech: ["Solidity", "DeFi", "Smart Contracts", "Web3"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      language: "Solidity",
    },
    {
      title: "Metaverse Platform",
      description:
        "Virtual world platform where users can create, explore, and monetize digital experiences and assets.",
      tech: ["Unity", "Blockchain", "VR", "Metaverse"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      language: "C#",
    },
  ]
}
