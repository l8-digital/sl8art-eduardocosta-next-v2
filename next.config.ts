import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 480, 640, 968, 1024, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'build.l8.digital',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "image.l8.digital",
        pathname: "/**",
      },
       {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      // Cache headers para imagens
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security headers para todas as rotas
      {
        source: '/:path*',
        headers: [
          // Previne ataques de clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Previne MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Habilita proteção XSS no browser
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Controla informações de referrer
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Força HTTPS (apenas em produção)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Controla quais recursos podem ser carregados
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com https://www.recaptcha.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",

              "connect-src 'self' https://build.l8.digital https://image.l8.digital https://www.google.com https://www.gstatic.com https://www.recaptcha.net",

              "media-src 'self' https:",

              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://open.spotify.com https://player.spotify.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",

              // 🔥 CORRIGIDO — NÃO PODE SER SOMENTE 'self'
              "frame-ancestors 'self' https://www.google.com https://www.gstatic.com https://www.recaptcha.net",

              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; ")



          },
          // Controla permissões de features do browser
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=(self)',
              'interest-cohort=()',
            ].join(', '),
          },
          // Habilita DNS prefetching
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  }
};

export default nextConfig;

