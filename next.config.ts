import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Mantemos o modo estrito
  reactStrictMode: true,

  // Suas configurações de imagem originais
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  
  // AQUI É O PULO DO GATO
  // Isso funciona tanto em 'npm run dev' quanto em prod
  async rewrites() {
    // Endereço interno do container Django no Easypanel
    const DJANGO_API_URL = 'http://app_backend:8000';

    return [
      {
        source: '/api/:path*',
        destination: `${DJANGO_API_URL}/api/:path*`,
      },
      {
        source: '/admin/:path*',
        destination: `${DJANGO_API_URL}/admin/:path*`,
      },
      {
        source: '/static/:path*',
        destination: `${DJANGO_API_URL}/static/:path*`,
      },
      {
        source: '/media/:path*',
        destination: `${DJANGO_API_URL}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;