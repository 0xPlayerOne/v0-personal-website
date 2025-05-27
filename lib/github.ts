// ===== CONFIGURATION =====
const MAX_PROJECTS = 6
const MAX_LANGUAGES_DISPLAYED = 5

const PINNED_REPO_CONFIGS: PinnedRepoConfig[] = [
  {
    owner: "NiftyLeague",
    repo: "nifty-fe-monorepo",
    displayName: "Nifty League Frontend",
  },
  {
    owner: "NiftyLeague",
    repo: "nifty-smart-contracts",
    displayName: "Nifty League Contracts",
  },
]

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

interface PinnedRepoConfig {
  owner: string
  repo: string
  displayName?: string // Optional custom display name
}

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  try {
    const pinnedRepos = await fetchSpecificRepos(PINNED_REPO_CONFIGS, true)
    const popularRepos = await fetchPopularRepositories()

    // Filter out pinned repos from popular repos to avoid duplicates
    const pinnedUrls = pinnedRepos.map((repo) => repo.url)
    const filteredPopularRepos = popularRepos.filter((repo) => !pinnedUrls.includes(repo.url))

    // Combine pinned repos (first) with popular repos to reach MAX_PROJECTS
    const neededPopular = Math.max(0, MAX_PROJECTS - pinnedRepos.length)
    const selectedRepos = [...pinnedRepos, ...filteredPopularRepos.slice(0, neededPopular)].slice(0, MAX_PROJECTS)

    // Fetch languages for each repo
    const reposWithLanguages = await Promise.all(
      selectedRepos.map(async (repo) => {
        const urlParts = repo.url.split("/")
        const owner = urlParts[urlParts.length - 2]
        const repoName = urlParts[urlParts.length - 1]
        const languages = await fetchRepoLanguages(owner, repoName)
        return {
          ...repo,
          languages,
        }
      }),
    )

    return reposWithLanguages
  } catch (error) {
    console.error("Error fetching GitHub repos:", error)
    return getFallbackPinnedProjects()
  }
}

async function fetchSpecificRepos(
  repoConfigs: PinnedRepoConfig[],
  isPinned: boolean,
): Promise<Omit<PinnedRepo, "languages">[]> {
  const repos: Omit<PinnedRepo, "languages">[] = []

  for (const config of repoConfigs) {
    try {
      const response = await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "AndrewMF-Portfolio",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      })

      if (response.status === 403) {
        console.warn(`Rate limited for ${config.owner}/${config.repo}`)
        continue
      }

      if (response.ok) {
        const repo: GitHubRepo = await response.json()
        repos.push({
          title: config.displayName || formatRepoName(repo.name),
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
      console.error(`Error fetching repo ${config.owner}/${config.repo}:`, error)
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
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (response.status === 403) {
      console.warn("GitHub API rate limited, using fallback projects")
      return []
    }

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
    return getFallbackPopularProjects()
  }
}

async function fetchRepoLanguages(owner: string, repoName: string): Promise<{ name: string; percentage: number }[]> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "AndrewMF-Portfolio",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (response.status === 403) {
      console.warn(`Rate limited for languages ${owner}/${repoName}`)
      return []
    }

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
      .slice(0, MAX_LANGUAGES_DISPLAYED)
  } catch (error) {
    console.error(`Error fetching languages for ${owner}/${repoName}:`, error)
    return []
  }
}

function formatRepoName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function getFallbackPinnedProjects(): PinnedRepo[] {
  return [
    {
      title: "Nifty League Frontend",
      description: "Monorepo for Nifty League frontend applications.",
      tech: ["next.js", "web3", "gaming", "monorepo"],
      url: "https://github.com/NiftyLeague/nifty-fe-monorepo",
      stars: 1,
      forks: 0,
      languages: [
        { name: "TypeScript", percentage: 95 },
        { name: "CSS", percentage: 3 },
        { name: "JavaScript", percentage: 1 },
      ],
      isPinned: true,
    },
    {
      title: "Nifty League Contracts",
      description: "Smart Contract repository for Nifty League.",
      tech: ["smart-contracts", "nft", "gaming", "solidity"],
      url: "https://github.com/NiftyLeague/nifty-smart-contracts",
      stars: 2,
      forks: 0,
      languages: [
        { name: "TypeScript", percentage: 88 },
        { name: "Solidity", percentage: 12 },
      ],
      isPinned: true,
    },
  ]
}

function getFallbackPopularProjects(): PinnedRepo[] {
  return [
    {
      title: "NowInStock Bot",
      description: "Bot to alert you when watched items are available in stock.",
      tech: ["scripting", "python"],
      url: "https://github.com/0xPlayerOne/NowInStock-bot",
      stars: 14,
      forks: 2,
      languages: [
        { name: "HTML", percentage: 80 },
        { name: "Python", percentage: 20 },
      ],
      isPinned: false,
    },
    {
      title: "Binance Us Cryptobot",
      description: "Terminal bot for auto trading on binance.us exchange.",
      tech: ["blockchain", "ethereum", "web3", "utilities"],
      url: "https://github.com/0xPlayerOne/binance-us-cryptobot",
      stars: 13,
      forks: 1,
      languages: [
        { name: "JavaScript", percentage: 98 },
        { name: "Dockerfile", percentage: 2 },
      ],
      isPinned: false,
    },
  ]
}
