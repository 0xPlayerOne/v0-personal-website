import type React from "react"
import { Inter } from "next/font/google"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Prompting Is All You Need",
  description: "A website with a retro game-style header",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
