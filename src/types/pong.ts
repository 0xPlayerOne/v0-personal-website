// Pong-related type definitions
export interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

export interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

export interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

export interface Particle {
  x: number
  y: number
  size: number
  dx: number
  dy: number
  alpha: number
  color: string
  life: number
  maxLife: number
}

export interface GameState {
  width: number
  height: number
  scale: number
  pixels: Pixel[]
  ball: Ball
  paddles: Paddle[]
  particles: Particle[]
  backgroundColor: string
  colors: {
    background: string
    pixel: string
    hitPixel: string
    ball: string
    paddle: string
  }
}
