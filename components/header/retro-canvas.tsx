"use client"

import { useRef, useState, useEffect } from "react"
import { usePongGame } from "@/lib/games/pong"
import { CANVAS_COLOR, BALL_COLOR, PIXEL_COLOR, HIT_COLOR, PADDLE_COLOR } from "@/constants/colors"
import type { RetroCanvasProps } from "@/types/components"

export function RetroCanvas({ navbarHeight }: RetroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, scale: 1 })
  const [canvasHeight, setCanvasHeight] = useState(0)

  // Setup canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateDimensions = () => {
      const width = Math.max(100, window.innerWidth)
      const height = Math.max(100, window.innerHeight - navbarHeight)
      const scale = Math.max(0.1, Math.min(width / 1000, height / 600))

      canvas.width = width
      canvas.height = height

      setDimensions({ width, height, scale })
      setCanvasHeight(height)
    }

    const timeoutId = setTimeout(updateDimensions, 0)
    const handleResize = () => updateDimensions()
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [navbarHeight])

  // Initialize pong game
  usePongGame(canvasRef, dimensions, {
    background: CANVAS_COLOR,
    pixel: PIXEL_COLOR,
    hitPixel: HIT_COLOR,
    ball: BALL_COLOR,
    paddle: PADDLE_COLOR,
  })

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
