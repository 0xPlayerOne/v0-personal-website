import type { GameState, Pixel, Particle } from "@/types/pong"
import { CANVAS_WIDTH_REFERENCE, CANVAS_HEIGHT_REFERENCE } from "@/constants/config"

export function setupCanvas(canvas: HTMLCanvasElement, navbarHeight: number) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight - navbarHeight
  return {
    width: canvas.width,
    height: canvas.height,
    scale: Math.min(canvas.width / CANVAS_WIDTH_REFERENCE, canvas.height / CANVAS_HEIGHT_REFERENCE),
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
    ctx.shadowColor = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.shadowBlur = pixel.size * (pixel.hit ? 0.8 : 0.5)
    ctx.fillStyle = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
  }
  ctx.shadowBlur = 0
}

function renderParticles(ctx: CanvasRenderingContext2D, particles: Particle[]): void {
  for (const particle of particles) {
    ctx.globalAlpha = particle.alpha
    ctx.fillStyle = particle.color
    ctx.fillRect(particle.x - particle.size / 2, particle.y - particle.size / 2, particle.size, particle.size)
  }
  ctx.globalAlpha = 1
}

function renderBall(ctx: CanvasRenderingContext2D, ball: GameState["ball"], color: string): void {
  ctx.shadowColor = color
  ctx.shadowBlur = ball.radius * 1.5
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fill()
}

function renderPaddles(ctx: CanvasRenderingContext2D, paddles: GameState["paddles"], color: string): void {
  ctx.shadowColor = color
  ctx.shadowBlur = 10
  ctx.fillStyle = color
  for (const paddle of paddles) {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
  }
}
