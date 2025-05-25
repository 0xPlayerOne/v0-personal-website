"use client"

import { useEffect, useRef } from "react"
import { CANVAS_COLOR, BALL_COLOR, PIXEL_COLOR, HIT_COLOR, PADDLE_COLOR } from "@/constants/colors"
import type { GameState } from "@/types/pong"
import type { RetroCanvasProps } from "@/types/components"
import { renderGame } from "@/helpers/pong-canvas"
import { createGameState, updateGameState } from "@/helpers/pong-game"
import { useCanvasSetup } from "@/hooks/use-canvas-setup"

export function RetroCanvas({ navbarHeight }: RetroCanvasProps) {
  const { canvasRef, dimensions, canvasHeight } = useCanvasSetup(navbarHeight)
  const gameStateRef = useRef<GameState | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !dimensions.width) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Create game state with all objects
    gameStateRef.current = createGameState(dimensions.width, dimensions.height, dimensions.scale, {
      background: CANVAS_COLOR,
      pixel: PIXEL_COLOR,
      hitPixel: HIT_COLOR,
      ball: BALL_COLOR,
      paddle: PADDLE_COLOR,
    })

    // Game loop
    const gameLoop = () => {
      if (gameStateRef.current) {
        gameStateRef.current = updateGameState(gameStateRef.current)
        renderGame(ctx, gameStateRef.current)
      }
      requestAnimationFrame(gameLoop)
    }

    gameLoop()
  }, [dimensions, navbarHeight])

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
