import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    deviceSizes: [320, 480, 640, 968, 1024, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "build.l8.digital",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.l8.digital",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      // Cache para imagens
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Security Headers
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },

          // 🔥 CONTENT SECURITY POLICY CORRIGIDA
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",

              // 🔥 permite GTM e GA
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",

              // estilos
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",

              // imagens
              "img-src 'self' data: blob: https:",

              // fontes
              "font-src 'self' data: https://fonts.gstatic.com",

              // conexões (Xhr, fetch, websockets)
              "connect-src 'self' https://build.l8.digital https://image.l8.digital https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",

              // mídia
              "media-src 'self' https:",

              // iframes permitidos
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://open.spotify.com https://player.spotify.com https://www.google.com https://www.gstatic.com https://www.recaptcha.net",

              // quem pode incorporar seu site
              "frame-ancestors 'self'",

              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join("; "),
          },

          // Permissions
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=(self)",
              "interest-cohort=()",
            ].join(", "),
          },

          // DNS Prefetch
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
