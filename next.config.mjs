/** @type {import('next').NextConfig} */
const nextConfig = { 
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB: process.env.MONGODB_DB,
  },
  distDir: "out",
    images: {
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
