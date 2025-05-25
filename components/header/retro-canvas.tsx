"use client"

import { PongGame } from "@/lib/games/pong"
import { CANVAS_COLOR, BALL_COLOR, PIXEL_COLOR, HIT_COLOR, PADDLE_COLOR } from "@/constants/colors"
import type { RetroCanvasProps } from "@/types/components"

export function RetroCanvas({ navbarHeight }: RetroCanvasProps) {
  return (
    <div className="relative w-full h-full">
      <PongGame
        navbarHeight={navbarHeight}
        colors={{
          background: CANVAS_COLOR,
          pixel: PIXEL_COLOR,
          hitPixel: HIT_COLOR,
          ball: BALL_COLOR,
          paddle: PADDLE_COLOR,
        }}
      />
    </div>
  )
}
