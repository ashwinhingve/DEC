/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "connect-src 'self' https://demploymentcorner.com https://dec-azure.vercel.app",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "form-action 'self'"
            ].join('; ')
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'   
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ];
  },
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
