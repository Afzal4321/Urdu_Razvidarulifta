// next.config.js
module.exports = {
  reactStrictMode: true, // Enable React's strict mode
  swcMinify: true,       // Enable SWC minification for faster builds
  trailingSlash: true,   // Add trailing slashes to URLs
  output: 'export',      // 🔥 NEW: Enable static site export mode
  images: {
    unoptimized: true,   // Disable image optimization (required for static export)
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
};
