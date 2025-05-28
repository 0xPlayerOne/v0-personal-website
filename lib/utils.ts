import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SITE_BTN_COLOR } from "@/constants/colors" // Assuming SITE_BTN_COLOR can be imported

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLanguageColor = (language: string): string => {
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

export const getPlatformUrl = (platform: string, handle: string): string => {
  const sanitizedHandle = handle.replace("@", "")
  switch (platform.toLowerCase()) {
    case "twitter":
      return `https://twitter.com/${sanitizedHandle}`
    case "github":
      return `https://github.com/${sanitizedHandle}`
    case "linkedin":
      return `https://linkedin.com/in/${sanitizedHandle}`
    default:
      return "#"
  }
}
