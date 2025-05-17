// Next.js configuration for multi-language support

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true
  },
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  
  unstable_runtimeJS: false,
  
  // We don't use the i18n config from next-i18next.config.js in App Router
  // The App Router handles i18n through the [lan] folder structure
};

module.exports = nextConfig;