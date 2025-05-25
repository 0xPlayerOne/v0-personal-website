import type { Ball, GameState, Paddle } from "./types"
import { processPixelCollisions, updateAndFilterParticles } from "./pixels"
import { BALL_SPEED_FACTOR, PADDLE_FOLLOW_SPEED } from "./constants"

export function updateGameState(gameState: GameState): GameState {
  const { width, height, ball, paddles, pixels, particles, colors, scale } = gameState

  // Update ball physics
  updateBall(ball, width, height)

  // Update paddles and handle collisions
  updatePaddles(paddles, ball, width, height, scale)

  // Handle pixel collisions and create particles
  const newParticles = processPixelCollisions(ball, pixels, colors.pixel)

  // Update particles
  const activeParticles = updateAndFilterParticles([...particles, ...newParticles])

  return { ...gameState, particles: activeParticles }
}

function updateBall(ball: Ball, width: number, height: number): void {
  ball.x += ball.dx
  ball.y += ball.dy

  // Boundary collisions
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

function updatePaddles(paddles: Paddle[], ball: Ball, width: number, height: number, scale: number): void {
  for (const paddle of paddles) {
    // Check collision
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
      const speed = BALL_SPEED_FACTOR * scale
      if (paddle.isVertical) {
        if (ball.x < paddle.x + paddle.width / 2) {
          ball.x = paddle.x - ball.radius - 1
          ball.dx = -speed
        } else {
          ball.x = paddle.x + paddle.width + ball.radius + 1
          ball.dx = speed
        }
      } else {
        if (ball.y < paddle.y + paddle.height / 2) {
          ball.y = paddle.y - ball.radius - 1
          ball.dy = -speed
        } else {
          ball.y = paddle.y + paddle.height + ball.radius + 1
          ball.dy = speed
        }
      }
    }

    // Update paddle position
    if (paddle.isVertical) {
      paddle.targetY = Math.max(0, Math.min(height - paddle.height, ball.y - paddle.height / 2))
      paddle.y += (paddle.targetY - paddle.y) * PADDLE_FOLLOW_SPEED
    } else {
      paddle.targetY = Math.max(0, Math.min(width - paddle.width, ball.x - paddle.width / 2))
      paddle.x += (paddle.targetY - paddle.x) * PADDLE_FOLLOW_SPEED
    }
  }
}
