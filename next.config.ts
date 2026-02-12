import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

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

  // AQUI A MÁGICA ACONTECE
  async rewrites() {
    // URL interna do Easypanel (nome do serviço:porta)
    const DJANGO_API_URL = 'http://app_backend:8000';

    return [
      {
        // Roteia chamadas de API
        source: '/api/:path*',
        destination: `${DJANGO_API_URL}/api/:path*`,
      },
      {
        // Roteia o painel administrativo do Django
        source: '/admin/:path*',
        destination: `${DJANGO_API_URL}/admin/:path*`,
      },
      {
        // Necessário para o CSS/JS do Django Admin e DRF
        source: '/static/:path*',
        destination: `${DJANGO_API_URL}/static/:path*`,
      },
      {
        // Caso use upload de mídia local
        source: '/media/:path*',
        destination: `${DJANGO_API_URL}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;