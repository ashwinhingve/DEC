/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
