'use client'

import { Product } from '@/lib/shopify/types'
import { useEffect } from 'react'

interface ProductSchemaProps {
  product: Product
  variants?: any
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  useEffect(() => {
    // Créer le schéma JSON-LD pour les moteurs de recherche
    if (!product) return

    const firstImage = product.images.edges[0]?.node
    const imageUrl = firstImage?.url || ''

    const firstVariant = product.variants.edges[0]?.node
    const price = firstVariant?.price.amount || (product.priceRange?.minVariantPrice?.amount || '0')
    const currency = firstVariant?.price.currencyCode || (product.priceRange?.minVariantPrice?.currencyCode || 'EUR')

    const inStock = product.availableForSale ||
                   product.variants.edges.some(edge => edge.node.availableForSale)

    const variants = product.variants.edges.map(edge => ({
      '@type': 'Offer',
      name: edge.node.title,
      price: edge.node.price.amount,
      priceCurrency: edge.node.price.currencyCode,
      availability: edge.node.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://trott-e-perf.fr/boutique/${product.handle}?variant=${edge.node.id}`
    }))

    // Calculer le prix minimum en vérifiant si priceRange existe
    const lowPrice = product.priceRange?.minVariantPrice?.amount ||
                    firstVariant?.price.amount ||
                    '0'

    // Définir le type avec un index signature pour permettre l'ajout de propriétés dynamiques
    interface ProductSchemaType {
      '@context': string;
      '@type': string;
      name: string;
      description: string;
      image: string;
      sku: string;
      mpn: string;
      brand: {
        '@type': string;
        name: string;
      };
      offers: {
        '@type': string;
        lowPrice: string;
        priceCurrency: string;
        availability: string;
        offerCount: number;
        offers: Array<any>;
      };
      url: string;
      [key: string]: any; // Permet d'ajouter des propriétés supplémentaires dynamiquement
    }

    const productSchema: ProductSchemaType = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: imageUrl,
      sku: product.id,
      mpn: product.id,
      brand: {
        '@type': 'Brand',
        name: product.vendor || 'TROTT\'e Perf'
      },
      offers: {
        '@type': 'AggregateOffer',
        lowPrice: lowPrice,
        priceCurrency: currency,
        availability: inStock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        offerCount: product.variants.edges.length,
        offers: variants
      },
      url: `https://trott-e-perf.fr/boutique/${product.handle}`
    }

    // Ajout de catégories si disponibles
    if (product.productType) {
      productSchema['category'] = product.productType;
    }

    // Ajout de mots-clés si disponibles
    if (product.tags && product.tags.length > 0) {
      productSchema['keywords'] = product.tags.join(',');
    }

    // Insérer le script JSON-LD dans le head
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(productSchema)
    script.id = 'product-schema'

    // Supprimer l'ancien script s'il existe
    const existing = document.getElementById('product-schema')
    if (existing && existing.parentNode) {
      existing.parentNode.removeChild(existing)
    }

    document.head.appendChild(script)

    // Nettoyer lors du démontage du composant
    return () => {
      const scriptToRemove = document.getElementById('product-schema')
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove)
      }
    }
  }, [product])

  // Ce composant ne rend rien visuellement
  return null
}
