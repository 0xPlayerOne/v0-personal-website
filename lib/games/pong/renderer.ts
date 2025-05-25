import type { GameState } from "./types"

export function render(ctx: CanvasRenderingContext2D, game: GameState): void {
  const { width, height, pixels, ball, paddles, particles, colors } = game

  // Clear canvas
  ctx.fillStyle = colors.background
  ctx.fillRect(0, 0, width, height)

  // Render pixels
  for (const pixel of pixels) {
    ctx.shadowColor = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.shadowBlur = pixel.size * 0.5
    ctx.fillStyle = pixel.hit ? colors.hitPixel : colors.pixel
    ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
  }

  // Render particles
  for (const particle of particles) {
    ctx.globalAlpha = particle.alpha
    ctx.fillStyle = colors.pixel
    ctx.fillRect(particle.x - 1, particle.y - 1, 2, 2)
  }

  // Render ball
  ctx.globalAlpha = 1
  ctx.shadowColor = colors.ball
  ctx.shadowBlur = ball.radius * 1.5
  ctx.fillStyle = colors.ball
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fill()

  // Render paddles
  ctx.shadowColor = colors.paddle
  ctx.shadowBlur = 8
  ctx.fillStyle = colors.paddle
  for (const paddle of paddles) {
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
  }

  // Reset context
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
}
