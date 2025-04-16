"use client"

import { useEffect, useState, Fragment } from 'react'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { PRODUCT_QUERY, PRODUCT_RECOMMENDATIONS_QUERY } from '@/lib/shopify/queries'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  ChevronRight,
  ShoppingBag,
  ChevronLeft,
  ChevronDown,
  Plus,
  Minus,
  Check,
  Info,
  Truck,
  Shield,
  RefreshCw,
  Star,
  Share2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

// Exemples de caractéristiques produit à personnaliser selon vos produits
const productFeatures = [
  { name: "Autonomie", value: "Jusqu'à 65km", icon: <RefreshCw className="h-5 w-5" /> },
  { name: "Garantie", value: "1 an", icon: <Shield className="h-5 w-5" /> },
  { name: "Livraison", value: "2-4 jours", icon: <Truck className="h-5 w-5" /> }
]

// Exemples d'avis clients (à remplacer par de vrais avis)
const reviews = [
  {
    id: 1,
    rating: 5,
    content: "Je suis vraiment satisfait de cet achat. La trottinette est puissante et l'autonomie correspond à ce qui est annoncé.",
    author: "Thomas R.",
    date: "15/04/2023",
  },
  {
    id: 2,
    rating: 4,
    content: "Très bonne trottinette, robuste et confortable. Je retire une étoile pour le délai de livraison un peu long.",
    author: "Sophie M.",
    date: "28/03/2023",
  },
  {
    id: 3,
    rating: 5,
    content: "Le service est impeccable et le produit est à la hauteur de mes attentes. Je recommande vivement !",
    author: "Lucas D.",
    date: "10/05/2023",
  },
]

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const { addToCart, isAuthenticated, fetchCart } = useCartStore()
  const router = useRouter()

  // Récupérer le produit depuis l'API Shopify
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(getStorefrontApiUrl(), {
          method: 'POST',
          headers: getPublicTokenHeaders(),
          body: JSON.stringify({
            query: PRODUCT_QUERY,
            variables: {
              handle: params.handle
            }
          })
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await response.text();
        let data;

        try {
          const jsonData = JSON.parse(responseText);
          data = jsonData.data;
        } catch (parseError) {
          console.error('JSON parsing error:', parseError, 'Response text:', responseText);
          throw new Error('Erreur de format dans la réponse du serveur');
        }

        if (data?.product) {
          setProduct(data.product)
          if (data.product.variants.edges.length > 0) {
            setSelectedVariant(data.product.variants.edges[0].node)
          }

          // Une fois que nous avons le produit, on récupère les recommandations
          fetchRelatedProducts(data.product.id);
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error("Erreur lors du chargement du produit")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.handle])

  // Récupérer les produits recommandés
  const fetchRelatedProducts = async (productId: string) => {
    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: PRODUCT_RECOMMENDATIONS_QUERY,
          variables: {
            productId
          }
        })
      });

      const { data } = await response.json();

      if (data?.productRecommendations) {
        setRelatedProducts(data.productRecommendations);
      }
    } catch (error) {
      console.error('Error fetching product recommendations:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return

    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour ajouter des produits au panier')
      // Rediriger vers la page de connexion après un court délai
      setTimeout(() => {
        router.push('/auth/connexion')
      }, 1500)
      return
    }

    setAddingToCart(true)
    try {
      await addToCart(selectedVariant.id, quantity)
      // Assurer la mise à jour du panier après ajout
      await fetchCart()
      toast.success('Produit ajouté au panier')
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier")
    } finally {
      setAddingToCart(false)
    }
  }

  const changeQuantity = (amount: number) => {
    setQuantity(prev => {
      const newValue = prev + amount;
      return newValue < 1 ? 1 : newValue;
    });
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Chargement du produit...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Produit non trouvé</h1>
            <p className="text-muted-foreground mt-2 mb-8">Nous n'avons pas pu trouver le produit que vous recherchez.</p>
            <Button asChild>
              <Link href="/boutique">
                Retour à la boutique
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const productImages = product.images?.edges?.map((edge: any) => edge.node) || []
  const activeImage = productImages[activeImageIndex]?.url || '/placeholder-product.png'

  // Calculer la note moyenne
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Fil d'Ariane */}
        <div className="container mx-auto px-4 mb-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/boutique" className="hover:text-foreground transition-colors">
              Boutique
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {product.title}
            </span>
          </nav>
        </div>

        {/* Section principale du produit */}
        <section className="container mx-auto px-4 mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Galerie d'images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Contrôles de navigation pour la galerie */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev - 1 + productImages.length) % productImages.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground z-10 hover:bg-background transition-colors"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex(prev => (prev + 1) % productImages.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground z-10 hover:bg-background transition-colors"
                      aria-label="Image suivante"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Miniatures des images */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {productImages.map((image: any, index: number) => (
                    <button
                      key={image.url}
                      className={`aspect-square overflow-hidden rounded-md ${
                        index === activeImageIndex
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                          : 'border border-border hover:border-primary/50 transition-colors'
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={image.url}
                        alt={`${product.title} - Image ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informations produit */}
            <div className="space-y-8">
              {/* En-tête du produit */}
              <div className="space-y-4">
                <div className="flex gap-3 flex-wrap">
                  {product.tags?.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-primary/5 text-primary">
                      {tag}
                    </Badge>
                  ))}
                  {selectedVariant?.availableForSale === false && (
                    <Badge variant="destructive">
                      Rupture de stock
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.title}</h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reviews.length} avis
                  </span>
                </div>

                <p className="text-3xl font-medium">
                  {formatPrice(selectedVariant?.price.amount || '0', selectedVariant?.price.currencyCode || 'EUR')}
                </p>
              </div>

              {/* Caractéristiques principales */}
              <div className="grid grid-cols-3 gap-4">
                {productFeatures.map((feature) => (
                  <div key={feature.name} className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg text-center">
                    <div className="mb-2 text-primary">{feature.icon}</div>
                    <span className="text-sm font-medium">{feature.name}</span>
                    <span className="text-sm text-muted-foreground">{feature.value}</span>
                  </div>
                ))}
              </div>

              {/* Description du produit */}
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>

              {/* Sélection des variantes */}
              {product.variants.edges.length > 1 && (
                <div className="space-y-4">
                  <h3 className="font-medium">Variantes</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {product.variants.edges.map(({ node: variant }: any) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                        className="w-full justify-start h-auto py-3 flex items-center"
                        onClick={() => setSelectedVariant(variant)}
                        disabled={!variant.availableForSale}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span>{variant.title}</span>
                          {selectedVariant?.id === variant.id && (
                            <Check className="h-4 w-4 ml-2" />
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sélection de quantité et ajout au panier */}
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Quantité</span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 rounded-none rounded-l-md"
                      onClick={() => changeQuantity(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <div className="w-12 text-center">{quantity}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 rounded-none rounded-r-md"
                      onClick={() => changeQuantity(1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex sm:flex-row flex-col gap-4">
                  <Button
                    size="lg"
                    className="flex-1 h-12"
                    onClick={handleAddToCart}
                    disabled={addingToCart || !selectedVariant?.availableForSale}
                  >
                    {addingToCart ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Ajout en cours...
                      </>
                    ) : !selectedVariant?.availableForSale ? (
                      'Produit indisponible'
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Ajouter au panier
                      </>
                    )}
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12"
                    asChild
                  >
                    <a href={`mailto:?subject=Regarde ce produit: ${product.title}&body=J'ai trouvé ce produit sur Trott-E-Perf et je pense qu'il pourrait t'intéresser: ${typeof window !== 'undefined' ? window.location.href : ''}`}>
                      <Share2 className="mr-2 h-5 w-5" />
                      Partager
                    </a>
                  </Button>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="shipping">
                  <AccordionTrigger>Livraison et retours</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">Livraison standard en 2-4 jours ouvrés.</p>
                      <p className="text-sm">Livraison express disponible (24h).</p>
                      <p className="text-sm">Retours gratuits sous 30 jours.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="warranty">
                  <AccordionTrigger>Garantie</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p className="text-sm">Garantie constructeur: 1 an pièces et main d'œuvre.</p>
                      <p className="text-sm">Extension de garantie disponible jusqu'à 3 ans.</p>
                      <p className="text-sm">Support technique dédié 7j/7.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="specifications">
                  <AccordionTrigger>Spécifications techniques</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      <div className="text-sm font-medium">Moteur</div>
                      <div className="text-sm">1000W</div>
                      <div className="text-sm font-medium">Batterie</div>
                      <div className="text-sm">48V 15Ah</div>
                      <div className="text-sm font-medium">Autonomie</div>
                      <div className="text-sm">Jusqu'à 65km</div>
                      <div className="text-sm font-medium">Vitesse max</div>
                      <div className="text-sm">25 km/h (bridée)</div>
                      <div className="text-sm font-medium">Temps de charge</div>
                      <div className="text-sm">4-5 heures</div>
                      <div className="text-sm font-medium">Poids</div>
                      <div className="text-sm">25 kg</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Section Avis Clients */}
        <section className="bg-muted/30 py-14">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10 text-center">Avis clients</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-background p-6 rounded-lg shadow-sm border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-medium">{review.author}</p>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-sm">{review.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline">
                Voir tous les avis
              </Button>
            </div>
          </div>
        </section>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct: any) => (
                <Link
                  key={relatedProduct.id}
                  href={`/boutique/${relatedProduct.handle}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4 relative">
                    <Image
                      src={relatedProduct.images.edges[0]?.node.url || '/placeholder-product.png'}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors">{relatedProduct.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(
                      relatedProduct.priceRange.minVariantPrice.amount,
                      relatedProduct.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
