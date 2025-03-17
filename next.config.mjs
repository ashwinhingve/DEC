/** @type {import('next').NextConfig} */
const nextConfig = { 
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  distDir: "out",
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
};

export default nextConfig;
