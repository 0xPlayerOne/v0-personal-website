"use client"

import { useEffect, useRef } from "react"
import type { GameState, PongColors } from "./types"
import { createGameState } from "./game-state"
import { updateGameState } from "./physics"
import { renderGame } from "./renderer"

export type { PongColors, PongDimensions } from "./types"

interface PongGameProps {
  navbarHeight: number
  colors: PongColors
  headerText: string[]
  className?: string
}

export function PongGame({ navbarHeight, colors, headerText, className }: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateDimensions = () => {
      const width = Math.max(100, window.innerWidth)
      const height = Math.max(100, window.innerHeight - navbarHeight)
      const scale = Math.max(0.1, Math.min(width / 1000, height / 600))

      canvas.width = width
      canvas.height = height
      canvas.style.height = `${height}px`

      // Create/update game state
      gameStateRef.current = createGameState({ width, height, scale }, colors, headerText)
    }

    // Initial setup
    updateDimensions()

    // Game loop
    let animationId: number
    const gameLoop = () => {
      if (gameStateRef.current) {
        gameStateRef.current = updateGameState(gameStateRef.current)
        renderGame(ctx, gameStateRef.current)
      }
      animationId = requestAnimationFrame(gameLoop)
    }
    gameLoop()

    // Handle resize
    const handleResize = () => updateDimensions()
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
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
