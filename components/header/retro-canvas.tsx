"use client"

import { PongGame } from "@/lib/games/pong"
import { CANVAS_COLOR, BALL_COLOR, PIXEL_COLOR, HIT_COLOR, PADDLE_COLOR } from "@/constants/colors"
import { HEADER_TEXT } from "@/constants/content"

interface RetroCanvasProps {
  navbarHeight: number
}

export function RetroCanvas({ navbarHeight }: RetroCanvasProps) {
  return (
    <div className="flex-1">
      <PongGame
        navbarHeight={navbarHeight}
        headerText={HEADER_TEXT}
        colors={{
          background: CANVAS_COLOR,
          ball: BALL_COLOR,
          paddle: PADDLE_COLOR,
          pixel: PIXEL_COLOR,
          hitPixel: HIT_COLOR,
        }}
      />
    </div>
  )
}
