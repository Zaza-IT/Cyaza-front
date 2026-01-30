/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ativa o Strict Mode para ajudar a detetar problemas no ciclo de vida do React
  reactStrictMode: true,

  // Configuração de Imagens
  // Necessária para permitir o carregamento de imagens de domínios externos 
  // caso uses o componente 'next/image' (altamente recomendado para produção)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com', // Para os avatares dos utilizadores
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Caso uses fotos de stock
        pathname: '/**',
      },
    ],
  },
  
  // Se precisares de desativar o linting durante a build (útil em MVPs rápidos)
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;