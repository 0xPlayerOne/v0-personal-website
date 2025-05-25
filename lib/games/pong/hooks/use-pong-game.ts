"use client"

import { useEffect, useRef, type RefObject } from "react"
import type { GameState, PongColors, PongDimensions } from "../types"
import { createGameState } from "../game-state"
import { updateGameState } from "../physics"
import { renderGame } from "../renderer"

export function usePongGame(canvasRef: RefObject<HTMLCanvasElement>, dimensions: PongDimensions, colors: PongColors) {
  const gameStateRef = useRef<GameState | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !dimensions.width) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create game state
    gameStateRef.current = createGameState(dimensions, colors)

    // Game loop
    const gameLoop = () => {
      if (gameStateRef.current) {
        gameStateRef.current = updateGameState(gameStateRef.current)
        renderGame(ctx, gameStateRef.current)
      }
      requestAnimationFrame(gameLoop)
    }

    gameLoop()
  }, [dimensions, colors])
}
