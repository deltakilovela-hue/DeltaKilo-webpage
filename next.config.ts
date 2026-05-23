import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.cdn.filesafe.space',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'delta-kilo-webpage.vercel.app' }],
        destination: 'https://deltakilo.com.mx/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
