/** @type {import('next').NextConfig} */
const nextConfig = {
  // Supprimer le mode export statique pour permettre la génération dynamique de pages
  // output: 'export',
  images: {
    unoptimized: true,
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Configuration pour les headers HTTP
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400',
          },
        ],
      },
    ]
  },

  // Configuration pour rediriger les anciennes URLs
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      }
    ]
  }
};

module.exports = nextConfig;
