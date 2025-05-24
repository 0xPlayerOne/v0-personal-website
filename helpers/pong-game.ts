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
  const baseSize = LARGE_PIXEL_SIZE_FACTOR * scale

  return {
    width,
    height,
    scale,
    pixels: generatePixelsFromText(width, height, scale),
    ball: createBall(width, height, scale, baseSize),
    paddles: createPaddles(width, height, baseSize),
    particles: [],
    backgroundColor: colors.background,
    colors,
  }
}

function createBall(width: number, height: number, scale: number, baseSize: number): Ball {
  const baseSpeed = BALL_SPEED_FACTOR * scale
  return {
    x: width * 0.9,
    y: height * 0.3,
    dx: -baseSpeed,
    dy: baseSpeed,
    radius: baseSize * BALL_SIZE_FACTOR,
  }
}

function createPaddles(width: number, height: number, baseSize: number): Paddle[] {
  const paddleWidth = baseSize * PADDLE_WIDTH_FACTOR
  const paddleLength = baseSize * PADDLE_LENGTH_FACTOR
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

  // Normalize ball speed before any updates
  normalizeBallSpeed(ball, scale)

  // Update ball physics
  updateBall(ball, width, height)

  // Update paddles and handle collisions
  updatePaddles(paddles, ball, width, height)

  // Handle pixel collisions and create particles
  const newParticles = processPixelCollisions(ball, pixels, colors.pixel)

  // Normalize speed again after collisions
  normalizeBallSpeed(ball, scale)

  // Update particles with filtering
  const activeParticles = updateAndFilterParticles([...particles, ...newParticles])

  return { ...gameState, particles: activeParticles }
}

function normalizeBallSpeed(ball: Ball, scale: number): void {
  const targetSpeed = BALL_SPEED_FACTOR * scale
  const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)

  // If speed is too different from target, normalize it
  if (currentSpeed < targetSpeed * 0.5 || currentSpeed > targetSpeed * 1.5) {
    const ratio = targetSpeed / currentSpeed
    ball.dx *= ratio
    ball.dy *= ratio
  }
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

function updatePaddles(paddles: Paddle[], ball: Ball, width: number, height: number): void {
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
        // Move ball out of paddle and reverse direction
        if (ball.x < paddle.x + paddle.width / 2) {
          ball.x = paddle.x - ball.radius - 1 // Extra pixel to prevent re-collision
          ball.dx = -Math.abs(ball.dx)
        } else {
          ball.x = paddle.x + paddle.width + ball.radius + 1 // Extra pixel to prevent re-collision
          ball.dx = Math.abs(ball.dx)
        }
      } else {
        // Move ball out of paddle and reverse direction
        if (ball.y < paddle.y + paddle.height / 2) {
          ball.y = paddle.y - ball.radius - 1 // Extra pixel to prevent re-collision
          ball.dy = -Math.abs(ball.dy)
        } else {
          ball.y = paddle.y + paddle.height + ball.radius + 1 // Extra pixel to prevent re-collision
          ball.dy = Math.abs(ball.dy)
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
