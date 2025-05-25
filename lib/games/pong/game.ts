import type { GameState, PongColors } from "./types"
import {
  BALL_SPEED,
  BALL_SIZE,
  PADDLE_SIZE,
  PADDLE_SPEED,
  LARGE_PIXEL_SIZE,
  SMALL_PIXEL_SIZE,
  LETTER_SPACING,
  PIXEL_MAP,
  PARTICLE_COUNT,
  PARTICLE_LIFE,
  PARTICLE_DECAY,
} from "./constants"

export interface Particle {
  x: number
  y: number
  dx: number
  dy: number
  alpha: number
  life: number
}

export interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

export function createGame(width: number, height: number, colors: PongColors, headerText: string[]): GameState {
  const scale = Math.min(width / 1000, height / 600)
  const ballRadius = Math.max(2, BALL_SIZE * scale)
  const paddleSize = Math.max(4, PADDLE_SIZE * scale)

  return {
    width,
    height,
    scale,
    pixels: generateText(width, height, scale, headerText),
    ball: {
      x: width * 0.8,
      y: height * 0.3,
      dx: -BALL_SPEED * scale,
      dy: BALL_SPEED * scale,
      radius: ballRadius,
    },
    paddles: [
      {
        x: 0,
        y: height / 2 - paddleSize,
        width: paddleSize / 3,
        height: paddleSize * 2,
        targetX: 0,
        targetY: height / 2 - paddleSize,
        isVertical: true,
      },
      {
        x: width - paddleSize / 3,
        y: height / 2 - paddleSize,
        width: paddleSize / 3,
        height: paddleSize * 2,
        targetX: width - paddleSize / 3,
        targetY: height / 2 - paddleSize,
        isVertical: true,
      },
      {
        x: width / 2 - paddleSize,
        y: 0,
        width: paddleSize * 2,
        height: paddleSize / 3,
        targetX: width / 2 - paddleSize,
        targetY: 0,
        isVertical: false,
      },
      {
        x: width / 2 - paddleSize,
        y: height - paddleSize / 3,
        width: paddleSize * 2,
        height: paddleSize / 3,
        targetX: width / 2 - paddleSize,
        targetY: height - paddleSize / 3,
        isVertical: false,
      },
    ],
    particles: [],
    colors,
  }
}

export function updateGame(game: GameState): GameState {
  // Update ball
  game.ball.x += game.ball.dx
  game.ball.y += game.ball.dy

  // Boundary collisions - keep speed constant
  if (game.ball.y <= game.ball.radius) {
    game.ball.y = game.ball.radius
    game.ball.dy = Math.abs(game.ball.dy)
  }
  if (game.ball.y >= game.height - game.ball.radius) {
    game.ball.y = game.height - game.ball.radius
    game.ball.dy = -Math.abs(game.ball.dy)
  }
  if (game.ball.x <= game.ball.radius) {
    game.ball.x = game.ball.radius
    game.ball.dx = Math.abs(game.ball.dx)
  }
  if (game.ball.x >= game.width - game.ball.radius) {
    game.ball.x = game.width - game.ball.radius
    game.ball.dx = -Math.abs(game.ball.dx)
  }

  // Update paddles
  for (const paddle of game.paddles) {
    if (paddle.isVertical) {
      paddle.targetY = Math.max(0, Math.min(game.height - paddle.height, game.ball.y - paddle.height / 2))
      paddle.y += (paddle.targetY - paddle.y) * PADDLE_SPEED
    } else {
      paddle.targetX = Math.max(0, Math.min(game.width - paddle.width, game.ball.x - paddle.width / 2))
      paddle.x += (paddle.targetX - paddle.x) * PADDLE_SPEED
    }

    // Paddle collision - just reverse direction, keep speed
    if (
      game.ball.x + game.ball.radius > paddle.x &&
      game.ball.x - game.ball.radius < paddle.x + paddle.width &&
      game.ball.y + game.ball.radius > paddle.y &&
      game.ball.y - game.ball.radius < paddle.y + paddle.height
    ) {
      if (paddle.isVertical) {
        game.ball.dx = game.ball.x < paddle.x + paddle.width / 2 ? -Math.abs(game.ball.dx) : Math.abs(game.ball.dx)
        game.ball.x =
          game.ball.x < paddle.x + paddle.width / 2
            ? paddle.x - game.ball.radius
            : paddle.x + paddle.width + game.ball.radius
      } else {
        game.ball.dy = game.ball.y < paddle.y + paddle.height / 2 ? -Math.abs(game.ball.dy) : Math.abs(game.ball.dy)
        game.ball.y =
          game.ball.y < paddle.y + paddle.height / 2
            ? paddle.y - game.ball.radius
            : paddle.y + paddle.height + game.ball.radius
      }
    }
  }

  // Pixel collisions
  const newParticles: Particle[] = []
  for (const pixel of game.pixels) {
    if (
      !pixel.hit &&
      game.ball.x + game.ball.radius > pixel.x &&
      game.ball.x - game.ball.radius < pixel.x + pixel.size &&
      game.ball.y + game.ball.radius > pixel.y &&
      game.ball.y - game.ball.radius < pixel.y + pixel.size
    ) {
      pixel.hit = true

      // Create particles
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.5 + Math.random() * 1.5
        newParticles.push({
          x: pixel.x + pixel.size / 2,
          y: pixel.y + pixel.size / 2,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          alpha: 1,
          life: 0,
        })
      }

      // Simple bounce - just reverse direction based on collision side
      const centerX = pixel.x + pixel.size / 2
      const centerY = pixel.y + pixel.size / 2
      if (Math.abs(game.ball.x - centerX) > Math.abs(game.ball.y - centerY)) {
        game.ball.dx = -game.ball.dx
      } else {
        game.ball.dy = -game.ball.dy
      }
    }
  }

  // Update particles
  game.particles = [...game.particles, ...newParticles].filter((p) => {
    p.x += p.dx
    p.y += p.dy
    p.life++
    p.alpha = 1 - p.life / PARTICLE_LIFE
    p.dx *= PARTICLE_DECAY
    p.dy *= PARTICLE_DECAY
    return p.life < PARTICLE_LIFE
  })

  return game
}

function generateText(width: number, height: number, scale: number, headerText: string[]): Pixel[] {
  const pixels: Pixel[] = []
  const [largeText, smallText] = headerText

  const largePx = LARGE_PIXEL_SIZE * scale
  const smallPx = SMALL_PIXEL_SIZE * scale

  // Calculate text dimensions
  const largeWidth = getTextWidth(largeText, largePx)
  const smallWidth = getTextWidth(smallText, smallPx)
  const maxWidth = Math.max(largeWidth, smallWidth)

  // Scale to fit
  const scaleFactor = (width * 0.8) / maxWidth
  const adjustedLargePx = largePx * scaleFactor
  const adjustedSmallPx = smallPx * scaleFactor

  // Position text
  let y = (height - (adjustedLargePx * 5 + adjustedSmallPx * 5 + adjustedLargePx * 2)) / 2

  // Add large text
  addText(largeText, width, y, adjustedLargePx, pixels)
  y += adjustedLargePx * 7

  // Add small text
  addText(smallText, width, y, adjustedSmallPx, pixels)

  return pixels
}

function addText(text: string, canvasWidth: number, startY: number, pixelSize: number, pixels: Pixel[]): void {
  const textWidth = getTextWidth(text, pixelSize)
  let x = (canvasWidth - textWidth) / 2

  for (const char of text) {
    const map = PIXEL_MAP[char as keyof typeof PIXEL_MAP]
    if (map) {
      map.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (cell) {
            pixels.push({
              x: x + j * pixelSize,
              y: startY + i * pixelSize,
              size: pixelSize,
              hit: false,
            })
          }
        })
      })
      x += (map[0].length + LETTER_SPACING) * pixelSize
    }
  }
}

function getTextWidth(text: string, pixelSize: number): number {
  let width = 0
  for (const char of text) {
    const charWidth = PIXEL_MAP[char as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
    width += (charWidth + LETTER_SPACING) * pixelSize
  }
  return width - LETTER_SPACING * pixelSize
}
