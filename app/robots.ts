import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/debug/',
        '/_next/'
      ],
    },
    sitemap: 'https://trott-e-perf.fr/sitemap.xml',
  }
}
