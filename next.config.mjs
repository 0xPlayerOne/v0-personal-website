/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable src directory support
  experimental: {
    appDir: true,
  },
  // Ensure Next.js recognizes the src directory structure
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  // Explicitly tell Next.js to look in src for the app directory
  distDir: '.next',
}

export default nextConfig
