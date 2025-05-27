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
    // Since GitHub API doesn't expose pinned repos, let's manually specify your pinned ones
    // You can update these repo names to match your actual pinned repositories
    const pinnedRepoNames = [
      "nifty-league-contracts", // Replace with your actual pinned repo names
      "nifty-league-app", // Replace with your actual pinned repo names
    ]

    const pinnedRepos = await fetchSpecificRepos(pinnedRepoNames, true)
    const popularRepos = await fetchPopularRepositories()

    // Filter out pinned repos from popular repos to avoid duplicates
    const filteredPopularRepos = popularRepos.filter(
      (repo) => !pinnedRepoNames.some((pinnedName) => repo.url.includes(pinnedName)),
    )

    // Combine pinned repos (first) with top 2 popular repos
    const neededPopular = Math.max(0, 4 - pinnedRepos.length)
    const selectedRepos = [...pinnedRepos, ...filteredPopularRepos.slice(0, neededPopular)].slice(0, 4)

    // Fetch languages for each repo
    const reposWithLanguages = await Promise.all(
      selectedRepos.map(async (repo) => {
        const repoName = repo.url.split("/").pop() || ""
        const languages = await fetchRepoLanguages(repoName)
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

async function fetchSpecificRepos(repoNames: string[], isPinned: boolean): Promise<Omit<PinnedRepo, "languages">[]> {
  const repos: Omit<PinnedRepo, "languages">[] = []

  for (const repoName of repoNames) {
    try {
      const response = await fetch(`https://api.github.com/repos/0xPlayerOne/${repoName}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "AndrewMF-Portfolio",
        },
      })

      if (response.ok) {
        const repo: GitHubRepo = await response.json()
        repos.push({
          title: formatRepoName(repo.name),
          description: repo.description || "No description available",
          tech: repo.topics.slice(0, 4),
          url: repo.html_url,
          homepage: repo.homepage || undefined,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          isPinned,
        })
      }
    } catch (error) {
      console.error(`Error fetching repo ${repoName}:`, error)
    }
  }

  return repos
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
      tech: repo.topics.slice(0, 4),
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
      title: "Nifty League Contracts",
      description: "Smart contracts powering the Nifty League ecosystem. ERC-721 NFTs, staking, and game mechanics.",
      tech: ["smart-contracts", "nft", "gaming"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "Solidity", percentage: 85 },
        { name: "JavaScript", percentage: 15 },
      ],
      isPinned: true,
    },
    {
      title: "Nifty League App",
      description: "Frontend application for Nifty League. React-based gaming platform with Web3 integration.",
      tech: ["react", "web3", "gaming"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "TypeScript", percentage: 70 },
        { name: "JavaScript", percentage: 20 },
        { name: "CSS", percentage: 10 },
      ],
      isPinned: true,
    },
    {
      title: "Portfolio Website",
      description: "Personal portfolio website with retro gaming aesthetics and interactive elements.",
      tech: ["nextjs", "typescript", "portfolio"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "TypeScript", percentage: 80 },
        { name: "CSS", percentage: 15 },
        { name: "HTML", percentage: 5 },
      ],
      isPinned: false,
    },
    {
      title: "Web3 Utils",
      description: "Collection of utilities and helpers for Web3 development and blockchain interactions.",
      tech: ["web3", "utilities", "blockchain"],
      url: "https://github.com/0xPlayerOne",
      stars: 0,
      forks: 0,
      languages: [
        { name: "JavaScript", percentage: 60 },
        { name: "TypeScript", percentage: 40 },
      ],
      isPinned: false,
    },
  ]
}
