import { NextResponse } from 'next/server'
import { Product } from '@/lib/shopify/types'
import { PRODUCTS_QUERY } from '@/lib/shopify/queries'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'

// Liste des pages statiques du site
const staticPages = [
  {
    url: '/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    url: '/boutique',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 0.9
  },
  {
    url: '/a-propos',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: '/contact',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.7
  },
  {
    url: '/services',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    url: '/faq',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: 0.5
  },
  {
    url: '/mentions-legales',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    url: '/politique-de-confidentialite',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    url: '/conditions-generales-de-vente',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'yearly',
    priority: 0.3
  }
]

// Liste des catégories de produits
const categories = [
  {
    url: '/boutique?category=trottinettes-electriques',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/boutique?category=pieces-detachees',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/boutique?category=batteries',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    url: '/boutique?category=accessoires',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 0.8
  }
]

// Fonction pour récupérer tous les produits
async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch(getStorefrontApiUrl(), {
      method: 'POST',
      headers: getPublicTokenHeaders(),
      body: JSON.stringify({
        query: PRODUCTS_QUERY,
        variables: {
          first: 250 // Récupérer jusqu'à 250 produits
        }
      }),
      next: { revalidate: 3600 } // Revalider toutes les heures
    })

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`)
    }

    const { data } = await response.json()

    if (!data?.products?.edges) {
      return []
    }

    return data.products.edges.map((edge: any) => edge.node)
  } catch (error) {
    console.error('Erreur lors de la récupération des produits pour le sitemap:', error)
    return [] // Retourner un tableau vide en cas d'erreur
  }
}

// Générer le sitemap XML
export async function GET() {
  try {
    // Récupérer tous les produits
    const products = await fetchAllProducts()

    // Construire le sitemap XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    // Ajouter les pages statiques
    staticPages.forEach(page => {
      xml += '  <url>\n'
      xml += `    <loc>https://trott-e-perf.fr${page.url}</loc>\n`
      xml += `    <lastmod>${page.lastmod}</lastmod>\n`
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`
      xml += `    <priority>${page.priority}</priority>\n`
      xml += '  </url>\n'
    })

    // Ajouter les catégories
    categories.forEach(category => {
      xml += '  <url>\n'
      xml += `    <loc>https://trott-e-perf.fr${category.url}</loc>\n`
      xml += `    <lastmod>${category.lastmod}</lastmod>\n`
      xml += `    <changefreq>${category.changefreq}</changefreq>\n`
      xml += `    <priority>${category.priority}</priority>\n`
      xml += '  </url>\n'
    })

    // Ajouter les produits
    products.forEach(product => {
      // Utiliser createdAt ou la date actuelle si non disponible
      const lastmod = product.createdAt
        ? new Date(product.createdAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]

      xml += '  <url>\n'
      xml += `    <loc>https://trott-e-perf.fr/boutique/${product.handle}</loc>\n`
      xml += `    <lastmod>${lastmod}</lastmod>\n`
      xml += '    <changefreq>weekly</changefreq>\n'
      xml += '    <priority>0.7</priority>\n'
      xml += '  </url>\n'
    })

    xml += '</urlset>'

    // Renvoyer le sitemap XML
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération du sitemap' },
      { status: 500 }
    )
  }
}
