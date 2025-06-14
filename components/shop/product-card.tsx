"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Product } from '@/lib/shopify/types'
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Eye } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Détermine s'il y a un prix promotionnel
  const hasDiscount = product.variants.edges.some(
    edge => edge.node.compareAtPrice &&
    parseFloat(edge.node.compareAtPrice.amount) > parseFloat(edge.node.price.amount)
  )

  // Calcule la réduction la plus élevée parmi les variantes
  const discountPercentage = hasDiscount ? Math.max(
    ...product.variants.edges
      .filter(edge => edge.node.compareAtPrice)
      .map(edge => {
        const originalPrice = parseFloat(edge.node.compareAtPrice!.amount)
        const discountedPrice = parseFloat(edge.node.price.amount)
        return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      })
  ) : 0

  // Vérifie si le produit est nouveau (moins de 30 jours)
  const isNew = new Date(product.createdAt || '').getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000

  const firstVariant = product.variants.edges[0]?.node
  const price = firstVariant.price ? parseFloat(firstVariant.price.amount) : 0
  const compareAtPrice = firstVariant.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null
  const currency = firstVariant.price?.currencyCode || 'EUR'

  // Vérifie si le produit est en stock
  const isAvailable = product.availableForSale || product.variants.edges.some(edge => edge.node.availableForSale)

  // Obtient l'URL de l'image principale ou une image par défaut
  const imageUrl = product.images?.edges?.[0]?.node?.url || '/placeholder-product.png'
  const imageAlt = product.images?.edges?.[0]?.node?.altText || product.title

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative overflow-hidden rounded-lg bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {hasDiscount && (
          <Badge variant="destructive" className="rounded-full px-2 py-1 text-xs sm:text-sm font-medium">
            -{discountPercentage}%
          </Badge>
        )}
        {isNew && (
          <Badge variant="default" className="rounded-full px-2 py-1 text-xs sm:text-sm font-medium bg-blue-600">
            Nouveau
          </Badge>
        )}
        {!isAvailable && (
          <Badge variant="outline" className="rounded-full px-2 py-1 text-xs sm:text-sm font-medium bg-black/60 border-yellow-500 text-yellow-500">
            Rupture
          </Badge>
        )}
      </div>

      <Link href={`/boutique/${product.handle}`} passHref className="relative overflow-hidden">
        <AspectRatio ratio={1} className="bg-neutral-950/50 relative">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`transition-transform duration-500 group-hover:scale-105 ${
                imageUrl === '/placeholder-product.png'
                  ? 'object-contain p-4'
                  : 'object-cover'
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </AspectRatio>
      </Link>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-base sm:text-lg line-clamp-2 leading-tight">
            {product.title}
          </h3>
        </div>

        <div className="mb-2 text-sm text-neutral-400 line-clamp-1">
          {product.vendor || product.productType || "Trottinette électrique"}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              {compareAtPrice && (
                <span className="text-sm text-neutral-500 line-through">
                  {formatPrice(compareAtPrice.toString(), currency)}
                </span>
              )}
              <span className="font-semibold text-base sm:text-lg">
                {formatPrice(price.toString(), currency)}
              </span>
            </div>
          </div>

          <div className="flex gap-1">
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
            >
              <Link href={`/boutique/${product.handle}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Voir le produit</span>
              </Link>
            </Button>

            <Button
              variant="default"
              size="icon"
              disabled={!isAvailable}
              className="h-8 w-8 rounded-full"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Ajouter au panier</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
