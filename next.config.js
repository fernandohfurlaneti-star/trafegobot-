/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Otimizações de build
  swcMinify: true,
  
  // Compressão automática
  compress: true,
  
  // Remove header "Powered by Next.js" (segurança)
  poweredByHeader: false,
  
  // Configuração de imagens (se usar next/image)
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp']
  },
  
  // Variáveis de ambiente públicas
  env: {
    SITE_NAME: 'TrafegoBot',
    TOTAL_NICHES: '50'
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },
  
  // Redirecionamentos (exemplo)
  async redirects() {
    return [
      // Exemplo: redirecionar /home para /
      // {
      //   source: '/home',
      //   destination: '/',
      //   permanent: true
      // }
    ];
  }
};

module.exports = nextConfig;
