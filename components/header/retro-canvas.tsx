"use client"

import { useEffect, useRef, useState } from "react"
import { CANVAS_COLOR, BALL_COLOR, PIXEL_COLOR, HIT_COLOR, PADDLE_COLOR } from "@/constants/colors"
import type { GameState } from "@/types/pong"
import type { RetroCanvasProps } from "@/types/components"
import { setupCanvas, renderGame } from "@/helpers/pong-canvas"
import { createGameState, updateGameState } from "@/helpers/pong-game"

export function RetroCanvas({ navbarHeight }: RetroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [canvasHeight, setCanvasHeight] = useState(0)

  useEffect(() => {
    setIsClient(true)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize the game
    const initializeGame = () => {
      const dimensions = setupCanvas(canvas, navbarHeight)
      setCanvasHeight(dimensions.height)

      // Create game state with all objects
      gameStateRef.current = createGameState(dimensions.width, dimensions.height, dimensions.scale, {
        background: CANVAS_COLOR,
        pixel: PIXEL_COLOR,
        hitPixel: HIT_COLOR,
        ball: BALL_COLOR,
        paddle: PADDLE_COLOR,
      })
    }

    // Game loop
    const gameLoop = () => {
      if (gameStateRef.current) {
        // Update game state
        gameStateRef.current = updateGameState(gameStateRef.current)

        // Render the updated state
        renderGame(ctx, gameStateRef.current)
      }
      requestAnimationFrame(gameLoop)
    }

    // Handle window resize
    const handleResize = () => {
      initializeGame()
    }

    // Initialize after client-side hydration
    initializeGame()
    gameLoop()

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [navbarHeight])

  if (!isClient) {
    return (
      <div className="relative w-full h-full bg-gray-900">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-green-400 font-mono">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          height: canvasHeight > 0 ? `${canvasHeight}px` : "100%",
          display: "block",
        }}
        aria-label="Retro pong header with pixel art"
      />
    </div>
  )
}
