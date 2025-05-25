import type { Ball, GameState, Paddle } from "@/types/pong"
import {
  BALL_SPEED_FACTOR,
  BALL_SIZE_FACTOR,
  PADDLE_WIDTH_FACTOR,
  PADDLE_LENGTH_FACTOR,
  PADDLE_FOLLOW_SPEED,
  LARGE_PIXEL_SIZE_FACTOR,
} from "@/constants/config"
import { generatePixelsFromText, processPixelCollisions, updateAndFilterParticles } from "./pong-pixels"

export function createGameState(width: number, height: number, scale: number, colors: GameState["colors"]): GameState {
  // Ensure minimum scale and dimensions
  const safeScale = Math.max(0.1, scale)
  const safeWidth = Math.max(100, width)
  const safeHeight = Math.max(100, height)
  const baseSize = LARGE_PIXEL_SIZE_FACTOR * safeScale

  return {
    width: safeWidth,
    height: safeHeight,
    scale: safeScale,
    pixels: generatePixelsFromText(safeWidth, safeHeight, safeScale),
    ball: createBall(safeWidth, safeHeight, safeScale, baseSize),
    paddles: createPaddles(safeWidth, safeHeight, baseSize),
    particles: [],
    backgroundColor: colors.background,
    colors,
  }
}

function createBall(width: number, height: number, scale: number, baseSize: number): Ball {
  const baseSpeed = Math.max(0.5, BALL_SPEED_FACTOR * scale)
  const radius = Math.max(1, baseSize * BALL_SIZE_FACTOR)

  return {
    x: width * 0.9,
    y: height * 0.3,
    dx: -baseSpeed,
    dy: baseSpeed,
    radius,
  }
}

function createPaddles(width: number, height: number, baseSize: number): Paddle[] {
  const paddleWidth = Math.max(2, baseSize * PADDLE_WIDTH_FACTOR)
  const paddleLength = Math.max(10, baseSize * PADDLE_LENGTH_FACTOR)
  const halfLength = paddleLength / 2

  return [
    // Vertical paddles (left, right)
    createPaddle(0, height / 2 - halfLength, paddleWidth, paddleLength, true),
    createPaddle(width - paddleWidth, height / 2 - halfLength, paddleWidth, paddleLength, true),
    // Horizontal paddles (top, bottom)
    createPaddle(width / 2 - halfLength, 0, paddleLength, paddleWidth, false),
    createPaddle(width / 2 - halfLength, height - paddleWidth, paddleLength, paddleWidth, false),
  ]
}

function createPaddle(x: number, y: number, width: number, height: number, isVertical: boolean): Paddle {
  return { x, y, width, height, targetY: isVertical ? y : x, isVertical }
}

export function updateGameState(gameState: GameState): GameState {
  const { width, height, ball, paddles, pixels, particles, colors, scale } = gameState

  // Update ball physics
  updateBall(ball, width, height)

  // Update paddles and handle collisions
  updatePaddles(paddles, ball, width, height, gameState)

  // Handle pixel collisions and create particles
  const newParticles = processPixelCollisions(ball, pixels, colors.pixel)

  // Update particles with filtering
  const activeParticles = updateAndFilterParticles([...particles, ...newParticles])

  return { ...gameState, particles: activeParticles }
}

function updateBall(ball: Ball, width: number, height: number): void {
  ball.x += ball.dx
  ball.y += ball.dy

  // Boundary collisions with proper positioning
  if (ball.y - ball.radius <= 0) {
    ball.y = ball.radius
    ball.dy = Math.abs(ball.dy)
  } else if (ball.y + ball.radius >= height) {
    ball.y = height - ball.radius
    ball.dy = -Math.abs(ball.dy)
  }

  if (ball.x - ball.radius <= 0) {
    ball.x = ball.radius
    ball.dx = Math.abs(ball.dx)
  } else if (ball.x + ball.radius >= width) {
    ball.x = width - ball.radius
    ball.dx = -Math.abs(ball.dx)
  }
}

function updatePaddles(paddles: Paddle[], ball: Ball, width: number, height: number, gameState: GameState): void {
  for (const paddle of paddles) {
    // Check collision with optimized bounds checking
    const hasCollision = paddle.isVertical
      ? ball.x - ball.radius < paddle.x + paddle.width &&
        ball.x + ball.radius > paddle.x &&
        ball.y > paddle.y &&
        ball.y < paddle.y + paddle.height
      : ball.y - ball.radius < paddle.y + paddle.height &&
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width

    if (hasCollision) {
      if (paddle.isVertical) {
        // Move ball out of paddle and set consistent speed
        if (ball.x < paddle.x + paddle.width / 2) {
          ball.x = paddle.x - ball.radius - 1
          ball.dx = -Math.abs(BALL_SPEED_FACTOR * gameState.scale)
        } else {
          ball.x = paddle.x + paddle.width + ball.radius + 1
          ball.dx = Math.abs(BALL_SPEED_FACTOR * gameState.scale)
        }
      } else {
        // Move ball out of paddle and set consistent speed
        if (ball.y < paddle.y + paddle.height / 2) {
          ball.y = paddle.y - ball.radius - 1
          ball.dy = -Math.abs(BALL_SPEED_FACTOR * gameState.scale)
        } else {
          ball.y = paddle.y + paddle.height + ball.radius + 1
          ball.dy = Math.abs(BALL_SPEED_FACTOR * gameState.scale)
        }
      }
    }

    // Update paddle position with clamping
    if (paddle.isVertical) {
      paddle.targetY = Math.max(0, Math.min(height - paddle.height, ball.y - paddle.height / 2))
      paddle.y += (paddle.targetY - paddle.y) * PADDLE_FOLLOW_SPEED
    } else {
      paddle.targetY = Math.max(0, Math.min(width - paddle.width, ball.x - paddle.width / 2))
      paddle.x += (paddle.targetY - paddle.x) * PADDLE_FOLLOW_SPEED
    }
  }
}
