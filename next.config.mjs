/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  images: {
    domains: ['localhost', 'demploymentcorner.com'],
    unoptimized: true,
    remotePatterns: [{
      protocol: 'https',
      hostname: 'pagedone.io',
    },
    {
      protocol: 'https',
      hostname: 'dummyimage.com',
    },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
