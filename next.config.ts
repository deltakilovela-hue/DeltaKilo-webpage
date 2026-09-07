import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets proxy.ts fully control trailing-slash behavior for /propuestas/*
  // and the propuestas.* subdomain, without Next's default redirect fighting it.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      {
        source: '/blog',
        destination: 'https://blog.deltakilo.com.mx',
        permanent: false,
      },
      {
        source: '/blog/:path*',
        destination: 'https://blog.deltakilo.com.mx/:path*',
        permanent: false,
      },
    ];
  },
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
};

export default nextConfig;
