"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/shopify/types'
import { formatPrice } from '@/lib/utils'
import { Badge } from "@/components/ui/badge"
import { Tag, CheckCircle, XCircle } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Utiliser la première image du produit
  const firstImage = product.images.edges[0]?.node
  const productImageUrl = firstImage ? firstImage.url : null

  const minPrice = product.priceRange.minVariantPrice

  // Vérifier si le produit a du stock (soit au niveau du produit, soit au niveau des variantes)
  const isInStock = product.availableForSale ||
                    product.variants.edges.some(edge => edge.node.availableForSale)

  // Logo de l'entreprise comme image par défaut (fallback)
  const defaultImageUrl = '/placeholder-product.png'

  // Vérifiez si au moins une variante est en promotion
  const hasPromotion = product.variants.edges.some(
    edge => edge.node.compareAtPrice &&
    parseFloat(edge.node.compareAtPrice.amount) > parseFloat(edge.node.price.amount)
  )

  // Pour le debug
  useEffect(() => {
    if (!productImageUrl) {
      console.log('Produit sans image:', product.title, product.id)
    }

    if (!isInStock) {
      console.log('Produit hors stock:', product.title, product.id)
    }
  }, [product, productImageUrl, isInStock])

  const handleImageError = () => {
    console.log('Erreur de chargement d\'image pour:', product.title)
    setImageError(true)
  }

  return (
    <div className="group rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950/50 hover:border-neutral-700 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
      <Link href={`/boutique/${product.handle}`}>
        <div className="relative pt-[100%] bg-neutral-900/20">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {(productImageUrl && !imageError) ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={productImageUrl}
                  alt={firstImage?.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transition-all duration-300 group-hover:scale-110"
                  style={{
                    padding: '5%',
                    backgroundColor: 'transparent'
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={handleImageError}
                />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Image
                    src={defaultImageUrl}
                    alt="TROTT'e Perf logo"
                    fill
                    className="object-contain p-4 opacity-30 transition-opacity duration-300 group-hover:opacity-40"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-neutral-500 py-2">
                  {product.title}
                </div>
              </div>
            )}
          </div>

          {/* Badges pour stock et promotions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
            {hasPromotion && (
              <Badge className="bg-red-500 hover:bg-red-600">
                Promotion
              </Badge>
            )}

            {isInStock ? (
              <Badge variant="outline" className="bg-green-900/70 hover:bg-green-900">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                En stock
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-red-900/70 hover:bg-red-900">
                <XCircle className="h-3.5 w-3.5 mr-1" />
                Épuisé
              </Badge>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-neutral-800 transition-colors group-hover:bg-neutral-900/20">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium line-clamp-1">{product.title}</h3>
          </div>

          <p className="mt-1 text-lg font-medium text-primary">
            {formatPrice(minPrice.amount, minPrice.currencyCode)}
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {product.tags && product.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {product.productType && (!product.tags || !product.tags.includes(product.productType)) && (
              <Badge variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {product.productType}
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
