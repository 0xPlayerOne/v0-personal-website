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
  languages: { name: string; percentage: number }[]
  isPinned: boolean
}

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  try {
    const pinnedRepos = await fetchPinnedRepositories()
    const popularRepos = await fetchPopularRepositories()

    // Combine pinned repos (first) with top 2 popular repos
    const neededPopular = Math.max(0, 4 - pinnedRepos.length)
    const selectedRepos = [...pinnedRepos, ...popularRepos.slice(0, neededPopular)].slice(0, 4)

    // Fetch languages for each repo
    const reposWithLanguages = await Promise.all(
      selectedRepos.map(async (repo) => {
        const languages = await fetchRepoLanguages(repo.name)
        return {
          ...repo,
          languages,
        }
      }),
    )

    return reposWithLanguages
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return getFallbackProjects()
  }
}

async function fetchPinnedRepositories(): Promise<Omit<PinnedRepo, "languages">[]> {
  try {
    // GitHub doesn't have a direct API for pinned repos, but we can use GraphQL
    // For now, we'll use a workaround by checking for specific repos or topics
    const response = await fetch("https://api.github.com/users/0xPlayerOne/repos?sort=updated&per_page=50", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "AndrewMF-Portfolio",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    // Look for repos that are likely pinned based on:
    // 1. High star count relative to your other repos
    // 2. Recent activity
    // 3. Good descriptions
    // 4. Specific repo names you want to highlight
    const pinnedCandidates = repos
      .filter(
        (repo) =>
          !repo.name.includes("0xPlayerOne") && // Exclude profile repo
          repo.description && // Must have description
          !repo.name.toLowerCase().includes("fork"), // Exclude obvious forks
      )
      .sort((a, b) => {
        // Prioritize repos with more stars and recent activity
        const scoreA =
          a.stargazers_count * 2 +
          a.forks_count +
          (new Date(a.updated_at).getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000 ? 10 : 0)
        const scoreB =
          b.stargazers_count * 2 +
          b.forks_count +
          (new Date(b.updated_at).getTime() > Date.now() - 90 * 24 * 60 * 60 * 1000 ? 10 : 0)
        return scoreB - scoreA
      })
      .slice(0, 2) // Take top 2 as "pinned"

    return pinnedCandidates.map((repo) => ({
      title: formatRepoName(repo.name),
      description: repo.description || "No description available",
      tech: repo.topics.slice(0, 4), // Only use topics, not language
      url: repo.html_url,
      homepage: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isPinned: true,
    }))
  } catch (error) {
    console.error("Error fetching pinned repos:", error)
    return []
  }
}

async function fetchPopularRepositories(): Promise<Omit<PinnedRepo, "languages">[]> {
  try {
    const response = await fetch("https://api.github.com/users/0xPlayerOne/repos?sort=stars&per_page=20", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "AndrewMF-Portfolio",
      },
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const repos: GitHubRepo[] = await response.json()

    const popularRepos = repos
      .filter(
        (repo) =>
          !repo.name.includes("0xPlayerOne") && // Exclude profile repo
          repo.description && // Must have description
          !repo.name.toLowerCase().includes("fork"), // Exclude obvious forks
      )
      .sort((a, b) => {
        // Sort by popularity (stars + forks)
        const scoreA = a.stargazers_count + a.forks_count
        const scoreB = b.stargazers_count + b.forks_count
        return scoreB - scoreA
      })

    return popularRepos.map((repo) => ({
      title: formatRepoName(repo.name),
      description: repo.description || "No description available",
      tech: repo.topics.slice(0, 4), // Only use topics, not language
      url: repo.html_url,
      homepage: repo.homepage || undefined,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      isPinned: false,
    }))
  } catch (error) {
    console.error("Error fetching popular repos:", error)
    return []
  }
}

async function fetchRepoLanguages(repoName: string): Promise<{ name: string; percentage: number }[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/0xPlayerOne/${repoName}/languages`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "AndrewMF-Portfolio",
      },
    })

    if (!response.ok) {
      return []
    }

    const languages: Record<string, number> = await response.json()
    const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0)

    if (total === 0) return []

    return Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        percentage: Math.round((bytes / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5) // Show top 5 languages
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error)
    return []
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
      tech: ["Blockchain", "Gaming", "NFTs"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "TypeScript", percentage: 65 },
        { name: "Solidity", percentage: 25 },
        { name: "JavaScript", percentage: 10 },
      ],
      isPinned: true,
    },
    {
      title: "Retro Pong Header",
      description:
        "An interactive retro-style header with pixel art and physics-based animations. Showcasing creative web development.",
      tech: ["Canvas", "Animation", "Pixel Art"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "TypeScript", percentage: 80 },
        { name: "CSS", percentage: 15 },
        { name: "HTML", percentage: 5 },
      ],
      isPinned: true,
    },
    {
      title: "DeFi Protocol",
      description:
        "Decentralized finance protocol enabling innovative yield farming and liquidity provision mechanisms.",
      tech: ["DeFi", "Smart Contracts", "Web3"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "Solidity", percentage: 70 },
        { name: "JavaScript", percentage: 30 },
      ],
      isPinned: false,
    },
    {
      title: "Metaverse Platform",
      description:
        "Virtual world platform where users can create, explore, and monetize digital experiences and assets.",
      tech: ["VR", "Metaverse"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "C#", percentage: 85 },
        { name: "JavaScript", percentage: 15 },
      ],
      isPinned: false,
    },
  ]
}
