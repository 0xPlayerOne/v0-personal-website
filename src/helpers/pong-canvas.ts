import type { GameState, Pixel, Particle } from "@/types/pong"
import { CANVAS_WIDTH_REFERENCE, CANVAS_HEIGHT_REFERENCE } from "@/constants/config"

export function setupCanvas(canvas: HTMLCanvasElement, navbarHeight: number) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight - navbarHeight
  return {
    width: canvas.width,
    height: canvas.height,
    scale: Math.max(0.1, Math.min(canvas.width / CANVAS_WIDTH_REFERENCE, canvas.height / CANVAS_HEIGHT_REFERENCE)),
  }
}

export function renderGame(ctx: CanvasRenderingContext2D, gameState: GameState): void {
  const { width, height, pixels, ball, paddles, particles, backgroundColor, colors } = gameState

  // Clear canvas
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Render all elements
  renderPixels(ctx, pixels, colors)
  renderParticles(ctx, particles)
  renderBall(ctx, ball, colors.ball)
  renderPaddles(ctx, paddles, colors.paddle)

  // Reset context state
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}

function renderPixels(ctx: CanvasRenderingContext2D, pixels: Pixel[], colors: GameState["colors"]): void {
  for (const pixel of pixels) {
    const pixelSize = Math.max(1, pixel.size) // Ensure minimum size
    ctx.shadowColor = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.shadowBlur = pixelSize * (pixel.hit ? 0.8 : 0.5)
    ctx.fillStyle = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize)
  }
  ctx.shadowBlur = 0
}

function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
  for (const particle of particles) {
    const particleSize = Math.max(1, particle.size) // Ensure minimum size
    ctx.globalAlpha = particle.alpha
    ctx.fillStyle = particle.color
    ctx.fillRect(particle.x - particleSize / 2, particle.y - particleSize / 2, particleSize, particleSize)
  }
  ctx.globalAlpha = 1
}

function renderBall(ctx: CanvasRenderingContext2D, ball: GameState["ball"], color: string): void {
  const radius = Math.max(1, ball.radius) // Ensure minimum radius of 1
  ctx.shadowColor = color
  ctx.shadowBlur = radius * 1.5
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
  ctx.fill()
}

function renderPaddles(ctx: CanvasRenderingContext2D, paddles: GameState["paddles"], color: string): void {
  ctx.shadowColor = color
  ctx.shadowBlur = 10
  ctx.fillStyle = color
  for (const paddle of paddles) {
    const width = Math.max(1, paddle.width) // Ensure minimum width
    const height = Math.max(1, paddle.height) // Ensure minimum height
    ctx.fillRect(paddle.x, paddle.y, width, height)
  }
}
