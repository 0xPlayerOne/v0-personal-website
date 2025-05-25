import type { Ball, GameState, Paddle, PongColors, PongDimensions } from "./types"
import { generatePixelsFromText } from "./pixels"
import {
  BALL_SPEED_FACTOR,
  BALL_SIZE_FACTOR,
  PADDLE_WIDTH_FACTOR,
  PADDLE_LENGTH_FACTOR,
  LARGE_PIXEL_SIZE_FACTOR,
} from "./constants"

export function createGameState(dimensions: PongDimensions, colors: PongColors, headerText: string[]): GameState {
  const { width, height, scale } = dimensions
  const safeScale = Math.max(0.1, scale)
  const safeWidth = Math.max(100, width)
  const safeHeight = Math.max(100, height)
  const baseSize = LARGE_PIXEL_SIZE_FACTOR * safeScale

  return {
    width: safeWidth,
    height: safeHeight,
    scale: safeScale,
    pixels: generatePixelsFromText(safeWidth, safeHeight, safeScale, headerText),
    ball: createBall(safeWidth, safeHeight, safeScale),
    paddles: createPaddles(safeWidth, safeHeight, baseSize),
    particles: [],
    backgroundColor: colors.background,
    colors,
  }
}

function createBall(width: number, height: number, scale: number): Ball {
  const baseSpeed = Math.max(0.5, BALL_SPEED_FACTOR * scale)
  const radius = Math.max(1, LARGE_PIXEL_SIZE_FACTOR * scale * BALL_SIZE_FACTOR)

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
    {
      x: 0,
      y: height / 2 - halfLength,
      width: paddleWidth,
      height: paddleLength,
      targetY: height / 2 - halfLength,
      isVertical: true,
    },
    {
      x: width - paddleWidth,
      y: height / 2 - halfLength,
      width: paddleWidth,
      height: paddleLength,
      targetY: height / 2 - halfLength,
      isVertical: true,
    },
    {
      x: width / 2 - halfLength,
      y: 0,
      width: paddleLength,
      height: paddleWidth,
      targetY: width / 2 - halfLength,
      isVertical: false,
    },
    {
      x: width / 2 - halfLength,
      y: height - paddleWidth,
      width: paddleLength,
      height: paddleWidth,
      targetY: width / 2 - halfLength,
      isVertical: false,
    },
  ]
}
