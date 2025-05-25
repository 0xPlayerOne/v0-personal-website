import type { GameState } from "./types"

export function renderGame(ctx: CanvasRenderingContext2D, gameState: GameState): void {
  const { width, height, pixels, ball, paddles, particles, backgroundColor, colors } = gameState

  // Clear canvas
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Render pixels
  for (const pixel of pixels) {
    const pixelSize = Math.max(1, pixel.size)
    ctx.shadowColor = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.shadowBlur = pixelSize * (pixel.hit ? 0.8 : 0.5)
    ctx.fillStyle = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize)
  }

  // Render particles
  for (const particle of particles) {
    const particleSize = Math.max(1, particle.size)
    ctx.globalAlpha = particle.alpha
    ctx.fillStyle = particle.color
    ctx.fillRect(particle.x - particleSize / 2, particle.y - particleSize / 2, particleSize, particleSize)
  }

  // Render ball
  const radius = Math.max(1, ball.radius)
  ctx.globalAlpha = 1
  ctx.shadowColor = colors.ball
  ctx.shadowBlur = radius * 1.5
  ctx.fillStyle = colors.ball
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2)
  ctx.fill()

  // Render paddles
  ctx.shadowColor = colors.paddle
  ctx.shadowBlur = 10
  ctx.fillStyle = colors.paddle
  for (const paddle of paddles) {
    const width = Math.max(1, paddle.width)
    const height = Math.max(1, paddle.height)
    ctx.fillRect(paddle.x, paddle.y, width, height)
  }

  // Reset context
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}
