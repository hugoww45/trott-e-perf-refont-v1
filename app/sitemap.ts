import { MetadataRoute } from 'next'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { PRODUCTS_QUERY } from '@/lib/shopify/queries'

// Fonction pour obtenir les données des produits
async function getProducts() {
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://trott-e-perf.fr'
  const currentDate = new Date().toISOString()

  // Pages statiques
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/boutique`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
    {
      url: `${baseUrl}/politique-de-confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3
    },
    {
      url: `${baseUrl}/conditions-generales-de-vente`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3
    }
  ]

  // Catégories de produits
  const categories = [
    {
      url: `${baseUrl}/boutique?category=trottinettes-electriques`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/boutique?category=pieces-detachees`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/boutique?category=batteries`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/boutique?category=accessoires`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }
  ]

  // Récupérer les produits dynamiquement
  const products = await getProducts()

  // Créer des entrées de sitemap pour chaque produit
  const productPages = products.map((product: any) => ({
    url: `${baseUrl}/boutique/${product.handle}`,
    lastModified: product.createdAt || currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  // Combiner toutes les entrées
  return [...staticPages, ...categories, ...productPages]
}
