import type { Pixel, Particle, Ball } from "./types"
import { PIXEL_MAP } from "./pixel-map"
import {
  HEADER_TEXT,
  LETTER_SPACING,
  WORD_SPACING,
  TEXT_WIDTH_FACTOR,
  LARGE_PIXEL_SIZE_FACTOR,
  SMALL_PIXEL_SIZE_FACTOR,
  TEXT_SPACING_FACTOR,
  PARTICLE_DECAY,
  PARTICLE_COUNT_MIN,
  PARTICLE_COUNT_MAX,
  PARTICLE_SPEED_MIN,
  PARTICLE_SPEED_MAX,
  PARTICLE_SIZE_MIN,
  PARTICLE_SIZE_MAX,
  PARTICLE_LIFE_MIN,
  PARTICLE_LIFE_MAX,
} from "./constants"

export function generatePixelsFromText(canvasWidth: number, canvasHeight: number, scale: number): Pixel[] {
  const pixels: Pixel[] = []
  const [largeText, smallText] = HEADER_TEXT

  const largePx = LARGE_PIXEL_SIZE_FACTOR * scale
  const smallPx = SMALL_PIXEL_SIZE_FACTOR * scale
  const largeWidth = getTextWidth(largeText, largePx)
  const smallWords = smallText.split(" ")
  const smallWidth = smallWords.reduce(
    (w, word, i) => w + getTextWidth(word, smallPx) + (i > 0 ? WORD_SPACING * smallPx : 0),
    0,
  )

  const scaleFactor = (canvasWidth * TEXT_WIDTH_FACTOR) / Math.max(largeWidth, smallWidth)
  const adjustedLargePx = largePx * scaleFactor
  const adjustedSmallPx = smallPx * scaleFactor

  const largeHeight = TEXT_SPACING_FACTOR * adjustedLargePx
  const spacing = TEXT_SPACING_FACTOR * adjustedLargePx
  const totalHeight = largeHeight + spacing + TEXT_SPACING_FACTOR * adjustedSmallPx
  let y = (canvasHeight - totalHeight) / 2

  // Generate large text
  addTextPixels(largeText, canvasWidth, y, adjustedLargePx, pixels)
  y += largeHeight + spacing

  // Generate small text
  const totalSmallWidth = smallWords.reduce(
    (w, word, i) => w + getTextWidth(word, adjustedSmallPx) + (i > 0 ? WORD_SPACING * adjustedSmallPx : 0),
    0,
  )
  let x = (canvasWidth - totalSmallWidth) / 2

  smallWords.forEach((word) => {
    addTextPixels(word, 0, y, adjustedSmallPx, pixels, x)
    x += getTextWidth(word, adjustedSmallPx) + WORD_SPACING * adjustedSmallPx
  })

  return pixels
}

export function processPixelCollisions(ball: Ball, pixels: Pixel[], pixelColor: string): Particle[] {
  const newParticles: Particle[] = []
  let collisionCount = 0

  for (const pixel of pixels) {
    if (pixel.hit || collisionCount > 0) continue

    if (
      ball.x + ball.radius > pixel.x &&
      ball.x - ball.radius < pixel.x + pixel.size &&
      ball.y + ball.radius > pixel.y &&
      ball.y - ball.radius < pixel.y + pixel.size
    ) {
      pixel.hit = true
      collisionCount++
      createExplosionParticles(pixel, pixelColor, newParticles)

      const centerX = pixel.x + pixel.size / 2
      const centerY = pixel.y + pixel.size / 2
      const deltaX = ball.x - centerX
      const deltaY = ball.y - centerY
      const currentSpeed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy)

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        ball.dx = deltaX > 0 ? currentSpeed : -currentSpeed
        ball.x = deltaX > 0 ? pixel.x + pixel.size + ball.radius : pixel.x - ball.radius
      } else {
        ball.dy = deltaY > 0 ? currentSpeed : -currentSpeed
        ball.y = deltaY > 0 ? pixel.y + pixel.size + ball.radius : pixel.y - ball.radius
      }
    }
  }

  return newParticles
}

export function updateAndFilterParticles(particles: Particle[]): Particle[] {
  return particles.filter((particle) => {
    particle.x += particle.dx
    particle.y += particle.dy
    particle.life++
    particle.alpha = 1 - particle.life / particle.maxLife
    particle.dx *= PARTICLE_DECAY
    particle.dy *= PARTICLE_DECAY
    return particle.life < particle.maxLife
  })
}

function createExplosionParticles(pixel: Pixel, color: string, particles: Particle[]): void {
  const count = PARTICLE_COUNT_MIN + Math.random() * (PARTICLE_COUNT_MAX - PARTICLE_COUNT_MIN)
  const baseSpeed = pixel.size / 10
  const centerX = pixel.x + pixel.size / 2
  const centerY = pixel.y + pixel.size / 2

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = baseSpeed * (PARTICLE_SPEED_MIN + Math.random() * (PARTICLE_SPEED_MAX - PARTICLE_SPEED_MIN))

    particles.push({
      x: centerX,
      y: centerY,
      size: pixel.size * (PARTICLE_SIZE_MIN + Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN)),
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      life: 0,
      maxLife: PARTICLE_LIFE_MIN + Math.random() * (PARTICLE_LIFE_MAX - PARTICLE_LIFE_MIN),
    })
  }
}

function addTextPixels(
  text: string,
  canvasWidth: number,
  startY: number,
  pixelSize: number,
  pixels: Pixel[],
  offsetX = 0,
): void {
  const textWidth = getTextWidth(text, pixelSize)
  let x = offsetX || (canvasWidth - textWidth) / 2

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
