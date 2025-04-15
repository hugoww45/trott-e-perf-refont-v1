"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { PRODUCT_QUERY } from '@/lib/shopify/queries'
import { Product } from '@/lib/shopify/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import {
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Tag,
  Info,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  PanelLeft,
  Box
} from 'lucide-react'

interface ProductDetailsProps {
  handle: string
}

export function ProductDetails({ handle }: ProductDetailsProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)
  const defaultImageUrl = '/placeholder-product.png' // Image par défaut

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(getStorefrontApiUrl(), {
          method: 'POST',
          headers: getPublicTokenHeaders(),
          body: JSON.stringify({
            query: PRODUCT_QUERY,
            variables: { handle }
          })
        })

        const { data } = await response.json()

        if (!data || !data.product) {
          setError('Produit non trouvé')
          setLoading(false)
          return
        }

        setProduct(data.product)
        if (data.product.variants.edges.length > 0) {
          setSelectedVariant(data.product.variants.edges[0].node.id)
        }
        if (data.product.images.edges.length > 0) {
          setCurrentImage(data.product.images.edges[0].node.url)
        }
      } catch (err) {
        setError('Erreur lors du chargement du produit')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return
    const variant = product.variants.edges.find(
      (edge) => edge.node.id === selectedVariant
    )?.node
    if (variant) {
      addItem(variant, quantity)
    }
  }

  const getSelectedVariantInfo = () => {
    if (!product || !selectedVariant) return null
    return product.variants.edges.find(
      (edge) => edge.node.id === selectedVariant
    )?.node
  }

  const isInStock = () => {
    const variant = getSelectedVariantInfo()
    return variant ? variant.availableForSale : false
  }

  const handleImageClick = (url: string) => {
    setCurrentImage(url)
  }

  if (loading) {
    return (
      <div className="py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="animate-pulse">
            <div className="h-96 bg-neutral-900/50 rounded-lg mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-20 bg-neutral-900/50 rounded" />
              ))}
            </div>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-3/4 bg-neutral-900/50 rounded" />
            <div className="h-6 w-1/4 bg-neutral-900/50 rounded" />
            <div className="h-24 bg-neutral-900/50 rounded" />
            <div className="h-10 w-1/2 bg-neutral-900/50 rounded" />
            <div className="h-10 w-full bg-neutral-900/50 rounded" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Produit non disponible</h2>
        <p className="text-gray-500 mb-6">{error || "Ce produit n'a pas pu être chargé."}</p>
        <Button asChild>
          <Link href="/boutique">Retourner à la boutique</Link>
        </Button>
      </div>
    )
  }

  const variant = getSelectedVariantInfo()
  const hasPromotion = variant?.compareAtPrice && parseFloat(variant.compareAtPrice.amount) > parseFloat(variant.price.amount)

  return (
    <div className="py-12">
      {/* Fil d'Ariane */}
      <div className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-primary">Accueil</Link> {' / '}
        <Link href="/boutique" className="hover:text-primary">Boutique</Link> {' / '}
        <span className="text-foreground">{product.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Galerie d'images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          {/* Image principale */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-900/50 border border-border">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <Image
                src={defaultImageUrl}
                alt={product.title}
                fill
                className="object-cover"
              />
            )}

            {/* Badges pour stock et promotions */}
            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {hasPromotion && (
                <Badge className="bg-red-500 hover:bg-red-600">
                  Promotion
                </Badge>
              )}

              {isInStock() ? (
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

          {/* Miniatures */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.edges.length > 0 ? (
              product.images.edges.map((edge, index) => (
                <div
                  key={edge.node.url}
                  className={`relative aspect-square overflow-hidden rounded cursor-pointer border ${
                    currentImage === edge.node.url ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                  }`}
                  onClick={() => handleImageClick(edge.node.url)}
                >
                  <Image
                    src={edge.node.url}
                    alt={edge.node.altText || `${product.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))
            ) : (
              <div
                className="relative aspect-square overflow-hidden rounded cursor-pointer border border-border"
              >
                <Image
                  src={defaultImageUrl}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Information produit */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <div className="flex items-start justify-between">
              <h1 className="text-4xl font-bold">{product.title}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Tags et Catégories */}
            <div className="flex flex-wrap gap-1 mt-3">
              {product.productType && (
                <Badge variant="outline">
                  <PanelLeft className="h-3.5 w-3.5 mr-1" />
                  {product.productType}
                </Badge>
              )}
              {product.vendor && (
                <Badge variant="outline">
                  <Box className="h-3.5 w-3.5 mr-1" />
                  {product.vendor}
                </Badge>
              )}
              {product.tags && product.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Prix */}
            <div className="mt-3 flex items-baseline gap-2">
              <p className={`text-2xl font-medium ${hasPromotion ? 'text-red-500' : 'text-primary'}`}>
                {variant && formatPrice(variant.price.amount, variant.price.currencyCode)}
              </p>
              {hasPromotion && variant?.compareAtPrice && (
                <p className="text-lg line-through text-gray-500">
                  {formatPrice(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)}
                </p>
              )}
            </div>

            {/* Note produit */}
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">5.0 (12 avis)</span>
            </div>
          </div>

          {/* Disponibilité */}
          <div className="p-4 rounded-lg bg-background border border-border">
            <div className="flex items-center">
              {isInStock() ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">En stock</span>
                  <span className="ml-2 text-sm text-gray-500">
                    Expédition sous 24-48h
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="font-medium">Actuellement indisponible</span>
                </>
              )}
            </div>
            <div className="flex items-center mt-2">
              <Truck className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-500">
                Livraison gratuite à partir de 50€
              </span>
            </div>
          </div>

          {/* Variant Selector */}
          {product.options && product.options.map((option) => (
            <div key={option.name}>
              <label className="text-sm font-medium mb-2 block">
                {option.name}
              </label>
              <Select
                value={selectedVariant || undefined}
                onValueChange={setSelectedVariant}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Sélectionnez ${option.name.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.edges.map(edge => (
                    <SelectItem key={edge.node.id} value={edge.node.id}>
                      {edge.node.title}
                      {!edge.node.availableForSale && " - Épuisé"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          {/* Quantity Selector */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Quantité
            </label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!isInStock()}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!isInStock()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            size="lg"
            onClick={handleAddToCart}
            disabled={!selectedVariant || !isInStock()}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {isInStock() ? "Ajouter au panier" : "Indisponible"}
          </Button>

          {/* Informations détaillées */}
          <Tabs defaultValue="description" className="mt-8">
            <TabsList className="w-full">
              <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
              <TabsTrigger value="details" className="flex-1">Détails</TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">Livraison</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4">
              <div className="prose dark:prose-invert max-w-none text-gray-500">
                {product.description ? (
                  <p>{product.description}</p>
                ) : (
                  <p>Aucune description disponible pour ce produit.</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="details" className="pt-4">
              <ul className="space-y-2 text-sm text-gray-500">
                {product.vendor && (
                  <li className="flex justify-between">
                    <span className="font-medium">Marque</span>
                    <span>{product.vendor}</span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="font-medium">Type</span>
                  <span>{product.productType || "Non spécifié"}</span>
                </li>
                {product.options && product.options.map(option => (
                  <li key={option.name} className="flex justify-between">
                    <span className="font-medium">{option.name}</span>
                    <span>{option.values.join(", ")}</span>
                  </li>
                ))}
                <li className="flex justify-between">
                  <span className="font-medium">Disponibilité</span>
                  <span className={isInStock() ? "text-green-500" : "text-red-500"}>
                    {isInStock() ? "En stock" : "Épuisé"}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium">ID produit</span>
                  <span className="text-xs">{product.id.split("/").pop()}</span>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <ul className="space-y-3 text-sm text-gray-500">
                <li className="flex items-start">
                  <Truck className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Livraison standard</p>
                    <p>Livraison en 2-4 jours ouvrables. Frais de livraison offerts à partir de 50€ d'achat.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Retours faciles</p>
                    <p>Retours acceptés dans les 14 jours suivant la réception de votre commande.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Questions sur ce produit?</p>
                    <p>Contactez notre service client au 01 23 45 67 89 ou par email à support@boutique.com</p>
                  </div>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
