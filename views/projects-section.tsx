"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SITE_CARD_COLOR, SITE_BORDER_COLOR, SITE_BTN_COLOR, CANVAS_COLOR, SITE_TEXT_COLOR } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { fetchPinnedRepos } from "@/lib/github"
import { ExternalLink, Star, GitFork, RefreshCw, Github, Pin } from "lucide-react"

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

export function ProjectsSection() {
  const [projects, setProjects] = useState<PinnedRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const repos = await fetchPinnedRepos()
      setProjects(repos)
      setLastUpdated(new Date())
    } catch (err) {
      setError("Failed to load projects")
      console.error("Error loading projects:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Solidity: "#AA6746",
      Go: "#00ADD8",
      Rust: "#dea584",
      "C#": "#239120",
      Java: "#b07219",
      "C++": "#f34b7d",
      HTML: "#e34c26",
      CSS: "#1572B6",
      Vue: "#4FC08D",
      React: "#61DAFB",
      Swift: "#FA7343",
      Kotlin: "#A97BFF",
      Dart: "#00B4AB",
      PHP: "#777BB4",
      Ruby: "#701516",
      Shell: "#89e051",
    }
    return colors[language] || SITE_BTN_COLOR
  }

  return (
    <Section id="projects">
      <div className="flex items-center justify-center gap-4 mb-8">
        <Typography variant="h2" align="center" color="primary">
          Projects
        </Typography>
        <Button
          variant="outline"
          size="sm"
          onClick={loadProjects}
          disabled={loading}
          className="border-0"
          style={{
            backgroundColor: `${SITE_BTN_COLOR}20`,
            color: SITE_BTN_COLOR,
            borderColor: SITE_BTN_COLOR,
          }}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </Button>
      </div>

      {error && (
        <div className="text-center mb-6">
          <Typography variant="body2" style={{ color: "#ff6b6b" }}>
            {error} - Showing fallback projects
          </Typography>
        </div>
      )}

      {lastUpdated && (
        <div className="text-center mb-6">
          <Typography variant="caption" color="textSecondary">
            Last updated: {lastUpdated.toLocaleTimeString()} • Pinned repos shown first
          </Typography>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8")}>
            {[...Array(4)].map((_, index) => (
              <Card
                key={index}
                className="border-0 animate-pulse"
                style={{
                  backgroundColor: SITE_CARD_COLOR,
                  boxShadow: `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`,
                }}
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="h-6 bg-gray-600 rounded mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded mb-4 w-3/4"></div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-600 rounded w-16"></div>
                    <div className="h-6 bg-gray-600 rounded w-20"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8")}>
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group transition-all duration-300 hover:scale-105 cursor-pointer border-0 relative"
                style={{
                  backgroundColor: SITE_CARD_COLOR,
                  boxShadow: `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 20px ${SITE_BTN_COLOR}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px ${SITE_BORDER_COLOR}, 0 0 10px ${SITE_BORDER_COLOR}40`
                }}
              >
                {project.isPinned && (
                  <div className="absolute top-3 left-3 z-10">
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: `${SITE_BTN_COLOR}20`,
                        color: SITE_BTN_COLOR,
                        border: `1px solid ${SITE_BTN_COLOR}40`,
                      }}
                    >
                      <Pin size={12} />
                      <span>Pinned</span>
                    </div>
                  </div>
                )}

                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 pr-4">
                      <Typography variant="h3" color="secondary" className="mb-2">
                        {project.title}
                      </Typography>
                    </div>

                    {/* Languages display - fixed layout */}
                    {project.languages.length > 0 && (
                      <div className="flex flex-col gap-1 min-w-[120px] max-w-[140px]">
                        {project.languages.slice(0, 3).map((lang, langIndex) => (
                          <div key={langIndex} className="flex items-center gap-2 text-xs">
                            <div
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: getLanguageColor(lang.name) }}
                            />
                            <span className="truncate flex-1 text-xs" style={{ color: SITE_TEXT_COLOR }}>
                              {lang.name}
                            </span>
                            <span className="text-xs flex-shrink-0" style={{ color: SITE_TEXT_COLOR }}>
                              {lang.percentage}%
                            </span>
                          </div>
                        ))}
                        {project.languages.length > 3 && (
                          <div className="text-xs text-center" style={{ color: SITE_TEXT_COLOR }}>
                            +{project.languages.length - 3} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <Typography variant="body1" gutterBottom className="mb-4">
                    {project.description}
                  </Typography>

                  <div className="flex items-center gap-4 mb-4">
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1">
                        <Star size={14} style={{ color: SITE_BTN_COLOR }} />
                        <Typography variant="caption" style={{ color: SITE_TEXT_COLOR }}>
                          {project.stars}
                        </Typography>
                      </div>
                    )}
                    {project.forks > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork size={14} style={{ color: SITE_BTN_COLOR }} />
                        <Typography variant="caption" style={{ color: SITE_TEXT_COLOR }}>
                          {project.forks}
                        </Typography>
                      </div>
                    )}
                  </div>

                  {project.tech.length > 0 && (
                    <div className={cn("flex flex-wrap gap-2 mb-6")}>
                      {project.tech.slice(0, 4).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          style={{ backgroundColor: SITE_BTN_COLOR, color: CANVAS_COLOR }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 border-0"
                      style={{
                        backgroundColor: `${SITE_BTN_COLOR}20`,
                        color: SITE_BTN_COLOR,
                        borderColor: SITE_BTN_COLOR,
                      }}
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    {project.homepage && (
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="flex-1"
                        style={{ backgroundColor: SITE_BTN_COLOR, color: CANVAS_COLOR }}
                      >
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Live
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Button
          variant="outline"
          asChild
          className="border-0"
          style={{
            backgroundColor: `${SITE_BTN_COLOR}20`,
            color: SITE_BTN_COLOR,
            borderColor: SITE_BTN_COLOR,
          }}
        >
          <a href="https://github.com/0xPlayerOne" target="_blank" rel="noopener noreferrer">
            <Github size={16} className="mr-2" />
            View All Projects on GitHub
          </a>
        </Button>
      </div>
    </Section>
  )
}
