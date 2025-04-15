/** @type {import('next').NextConfig} */
const nextConfig = {
  // Supprimer le mode export statique pour permettre la génération dynamique de pages
  // output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

module.exports = nextConfig;
