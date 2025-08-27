/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization settings
  images: {
    domains: ['localhost'],
    unoptimized: true, // Required for Netlify deployment
  },
  
  // Netlify deployment settings
  trailingSlash: false,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig
