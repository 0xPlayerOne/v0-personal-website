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

    const updateCanvasSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight - navbarHeight

      canvas.width = width
      canvas.height = height
      canvas.style.height = `${height}px`

      // Only create new game if it doesn't exist
      if (!gameRef.current) {
        gameRef.current = createGame(width, height, colors, headerText)
      } else {
        // Update existing game dimensions without resetting state
        const oldWidth = gameRef.current.width
        const oldHeight = gameRef.current.height
        const scaleX = width / oldWidth
        const scaleY = height / oldHeight

        // Update game dimensions
        gameRef.current.width = width
        gameRef.current.height = height
        gameRef.current.scale = Math.min(width / 1000, height / 600)

        // Scale ball position
        gameRef.current.ball.x *= scaleX
        gameRef.current.ball.y *= scaleY

        // Scale paddle positions
        for (const paddle of gameRef.current.paddles) {
          paddle.x *= scaleX
          paddle.y *= scaleY
          paddle.targetX *= scaleX
          paddle.targetY *= scaleY

          // Update paddle sizes based on new scale
          const newScale = gameRef.current.scale
          if (paddle.isVertical) {
            paddle.width = Math.max(4, 10 * newScale)
            paddle.height = Math.max(20, 100 * newScale)
          } else {
            paddle.width = Math.max(20, 100 * newScale)
            paddle.height = Math.max(4, 10 * newScale)
          }
        }

        // Scale pixel positions and sizes
        for (const pixel of gameRef.current.pixels) {
          pixel.x *= scaleX
          pixel.y *= scaleY
          pixel.size *= Math.min(scaleX, scaleY)
        }

        // Scale particle positions
        for (const particle of gameRef.current.particles) {
          particle.x *= scaleX
          particle.y *= scaleY
        }
      }
    }

    // Initial setup
    updateCanvasSize()

    let animationId: number
    const loop = () => {
      if (gameRef.current) {
        gameRef.current = updateGame(gameRef.current)
        render(ctx, gameRef.current)
      }
      animationId = requestAnimationFrame(loop)
    }
    loop()

    // Handle resize without recreating the game
    window.addEventListener("resize", updateCanvasSize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", updateCanvasSize)
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
