"use client"

import { useState, useEffect, useRef } from "react"

interface CanvasDimensions {
  width: number
  height: number
  scale: number
}

export function useCanvasSetup(navbarHeight: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState<CanvasDimensions>({ width: 0, height: 0, scale: 1 })
  const [canvasHeight, setCanvasHeight] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const updateDimensions = () => {
      const width = Math.max(100, window.innerWidth) // Ensure minimum width
      const height = Math.max(100, window.innerHeight - navbarHeight) // Ensure minimum height
      const scale = Math.max(0.1, Math.min(width / 1000, height / 600)) // Ensure minimum scale

      canvas.width = width
      canvas.height = height

      const newDimensions = { width, height, scale }
      setDimensions(newDimensions)
      setCanvasHeight(height)

      return newDimensions
    }

    // Initial setup with timeout to ensure proper mounting
    const timeoutId = setTimeout(updateDimensions, 0)

    const handleResize = () => updateDimensions()
    window.addEventListener("resize", handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [navbarHeight])

  return { canvasRef, dimensions, canvasHeight }
}
