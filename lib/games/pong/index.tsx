"use client"

import { useEffect, useRef } from "react"
import type { GameState, PongColors } from "./types"
import { createGame, updateGame } from "./game"
import { render } from "./renderer"

export type { PongColors } from "./types"

interface PongGameProps {
  navbarHeight: number
  colors: PongColors
  headerText: string[]
  className?: string
}

export function PongGame({ navbarHeight, colors, headerText, className }: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<GameState | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight - navbarHeight

      canvas.width = width
      canvas.height = height
      canvas.style.height = `${height}px`

      gameRef.current = createGame(width, height, colors, headerText)
    }

    resize()

    let animationId: number
    const loop = () => {
      if (gameRef.current) {
        gameRef.current = updateGame(gameRef.current)
        render(ctx, gameRef.current)
      }
      animationId = requestAnimationFrame(loop)
    }
    loop()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [navbarHeight, colors, headerText])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className || ""}`}
      aria-label="Retro pong header with pixel art"
    />
  )
}
