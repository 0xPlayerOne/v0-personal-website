import type { GameState, PongColors, Pixel, Particle } from "./types"
import {
  BALL_SPEED,
  BALL_SIZE,
  PADDLE_WIDTH,
  PADDLE_LENGTH,
  PADDLE_SPEED,
  LARGE_PIXEL_SIZE,
  SMALL_PIXEL_SIZE,
  LETTER_SPACING,
  TEXT_WIDTH_FACTOR,
  TEXT_SPACING_FACTOR,
  PIXEL_MAP,
  PARTICLE_COUNT,
  PARTICLE_LIFE,
  PARTICLE_DECAY,
} from "./constants"

export function createGame(width: number, height: number, colors: PongColors, headerText: string[]): GameState {
  const scale = Math.min(width / 1000, height / 600)
  const ballRadius = Math.max(3, BALL_SIZE * scale)
  const paddleWidth = Math.max(4, PADDLE_WIDTH * scale)
  const paddleLength = Math.max(20, PADDLE_LENGTH * scale)

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
      // Left paddle
      {
        x: 0,
        y: height / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetX: 0,
        targetY: height / 2 - paddleLength / 2,
        isVertical: true,
      },
      // Right paddle
      {
        x: width - paddleWidth,
        y: height / 2 - paddleLength / 2,
        width: paddleWidth,
        height: paddleLength,
        targetX: width - paddleWidth,
        targetY: height / 2 - paddleLength / 2,
        isVertical: true,
      },
      // Top paddle
      {
        x: width / 2 - paddleLength / 2,
        y: 0,
        width: paddleLength,
        height: paddleWidth,
        targetX: width / 2 - paddleLength / 2,
        targetY: 0,
        isVertical: false,
      },
      // Bottom paddle
      {
        x: width / 2 - paddleLength / 2,
        y: height - paddleWidth,
        width: paddleLength,
        height: paddleWidth,
        targetX: width / 2 - paddleLength / 2,
        targetY: height - paddleWidth,
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
      // Aim to hit ball with a position that's 1/3 from the center towards the ball's direction
      const paddleCenter = paddle.height / 2
      const offset = paddleCenter * 0.33 * (game.ball.dy > 0 ? 1 : -1)
      paddle.targetY = Math.max(0, Math.min(game.height - paddle.height, game.ball.y - paddleCenter - offset))
      paddle.y += (paddle.targetY - paddle.y) * PADDLE_SPEED
    } else {
      // Aim to hit ball with a position that's 1/3 from the center towards the ball's direction
      const paddleCenter = paddle.width / 2
      const offset = paddleCenter * 0.33 * (game.ball.dx > 0 ? 1 : -1)
      paddle.targetX = Math.max(0, Math.min(game.width - paddle.width, game.ball.x - paddleCenter - offset))
      paddle.x += (paddle.targetX - paddle.x) * PADDLE_SPEED
    }

    // Paddle collision - restore original collision detection
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
            ? paddle.x - game.ball.radius - 1
            : paddle.x + paddle.width + game.ball.radius + 1
      } else {
        game.ball.dy = game.ball.y < paddle.y + paddle.height / 2 ? -Math.abs(game.ball.dy) : Math.abs(game.ball.dy)
        game.ball.y =
          game.ball.y < paddle.y + paddle.height / 2
            ? paddle.y - game.ball.radius - 1
            : paddle.y + paddle.height + game.ball.radius + 1
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
  const scaleFactor = (width * TEXT_WIDTH_FACTOR) / maxWidth
  const adjustedLargePx = largePx * scaleFactor
  const adjustedSmallPx = smallPx * scaleFactor

  // Position text
  const largeHeight = TEXT_SPACING_FACTOR * adjustedLargePx * 5
  const spacing = TEXT_SPACING_FACTOR * adjustedLargePx
  const smallHeight = TEXT_SPACING_FACTOR * adjustedSmallPx * 5
  const totalHeight = largeHeight + spacing + smallHeight
  let y = (height - totalHeight) / 2

  // Add large text
  addText(largeText, width, y, adjustedLargePx, pixels)
  y += largeHeight + spacing

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
