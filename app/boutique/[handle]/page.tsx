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
  Share2,
  Calendar,
  Package,
  PackageCheck,
  Clock,
  CreditCard,
  HelpCircle,
  Camera,
  X,
  Settings
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
import ProductSchema from '@/app/productschema'

// Informations de livraison et garantie
const deliveryInfo = [
  {
    title: "Livraison standard",
    delay: "2-4 jours ouvrés",
    price: "Gratuite dès 50€ d'achat",
    description: "Livraison à domicile par transporteur",
    icon: <Truck className="h-5 w-5" />
  },
  {
    title: "Livraison express",
    delay: "24-48h ouvrées",
    price: "12.90€",
    description: "Réception le lendemain pour toute commande passée avant 13h",
    icon: <Package className="h-5 w-5" />
  },
  {
    title: "Retrait en magasin",
    delay: "Sous 2h",
    price: "Gratuit",
    description: "Disponible dans nos 3 boutiques Trott e Perf",
    icon: <Clock className="h-5 w-5" />
  }
]

// Exemples de caractéristiques produit
const productFeatures = [
  { name: "Autonomie", value: "Jusqu'à 65km", icon: <RefreshCw className="h-5 w-5" /> },
  { name: "Garantie", value: "2 ans", icon: <Shield className="h-5 w-5" /> },
  { name: "Paiement", value: "En 3x sans frais", icon: <CreditCard className="h-5 w-5" /> }
]

// Options de financement
const financingOptions = [
  {
    title: "Paiement en 3x sans frais",
    description: "Payez en 3 mensualités avec votre carte bancaire",
    provider: "Alma"
  },
  {
    title: "Crédit à la consommation",
    description: "Financez votre trottinette sur 10 à 36 mois",
    provider: "Sofinco"
  }
]

// Exemples d'avis clients
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
  const [activeTab, setActiveTab] = useState('description')
  const [showAllImages, setShowAllImages] = useState(false)
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

  // Extraire les caractéristiques techniques du produit (à partir des métadonnées ou description)
  const extractTechnicalFeatures = () => {
    // Dans un cas réel, cette fonction extrairait les caractéristiques à partir des métadonnées du produit
    // Ici nous utilisons des données fictives pour l'exemple
    return [
      { name: "Moteur", value: "500W nominal, 800W max" },
      { name: "Batterie", value: "48V 13Ah (624Wh)" },
      { name: "Vitesse max", value: "25 km/h (bridé) / 40 km/h (débridé)" },
      { name: "Charge max", value: "120 kg" },
      { name: "Poids", value: "16.5 kg" },
      { name: "Dimensions", value: "108 x 43 x 114 cm" },
      { name: "Pneus", value: "10 pouces, pneumatiques" },
      { name: "Suspension", value: "Avant et arrière" },
      { name: "Freins", value: "Disque avant et arrière" },
      { name: "Temps de charge", value: "5-6 heures" },
      { name: "Certification", value: "CE, RoHS, EN17128" }
    ];
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

  // Récupérer les caractéristiques techniques
  const technicalFeatures = extractTechnicalFeatures();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        {/* Fil d'Ariane */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <Link href="/boutique" className="hover:text-primary transition-colors">
              Boutique
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            {product.productType && (
              <>
                <Link href={`/boutique?categorie=${encodeURIComponent(product.productType)}`} className="hover:text-primary transition-colors">
                  {product.productType}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
              </>
            )}
            <span className="text-foreground font-medium truncate">{product.title}</span>
          </div>
        </div>

        {/* Informations produit principales */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Galerie photos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {/* Image principale */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted border border-muted">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                />

                {/* Bouton pour voir toutes les images */}
                {productImages.length > 1 && (
                  <button
                    onClick={() => setShowAllImages(true)}
                    className="absolute right-4 bottom-4 bg-black/70 text-white p-2 rounded-full hover:bg-black transition-colors"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Modal pour voir toutes les images */}
              <AnimatePresence>
                {showAllImages && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
                  >
                    <div className="max-w-5xl w-full bg-background rounded-xl overflow-hidden">
                      <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-medium">Galerie photos: {product.title}</h3>
                        <button onClick={() => setShowAllImages(false)} className="p-2 rounded-full hover:bg-muted">
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {productImages.map((image: any, index: number) => (
                            <div key={image.url} className="aspect-square relative rounded-md overflow-hidden cursor-pointer border">
                              <Image
                                src={image.url}
                                alt={`${product.title} - Image ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform"
                                onClick={() => {
                                  setActiveImageIndex(index);
                                  setShowAllImages(false);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Miniatures */}
              {productImages.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
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
            </motion.div>

            {/* Informations produit */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-8"
            >
              {/* En-tête du produit */}
              <div className="space-y-4">
                {/* Tags et état du stock */}
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
                  {selectedVariant?.availableForSale && (
                    <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-0">
                      <PackageCheck className="h-3.5 w-3.5 mr-1" />
                      En stock
                    </Badge>
                  )}
                </div>

                {/* Titre et évaluations */}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.title}</h1>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {renderStars(averageRating)}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reviews.length} avis
                  </span>
                </div>

                {/* Prix et vendeur */}
                <div className="flex flex-col md:flex-row md:items-end justify-between">
                  <div>
                    <p className="text-3xl font-medium">
                      {formatPrice(selectedVariant?.price.amount || '0', selectedVariant?.price.currencyCode || 'EUR')}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      TVA incluse
                    </p>
                  </div>
                  {product.vendor && (
                    <div className="mt-2 md:mt-0">
                      <p className="text-sm text-muted-foreground">
                        Vendu par <span className="font-medium text-foreground">{product.vendor}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Caractéristiques principales */}
              <div className="grid grid-cols-3 gap-3">
                {productFeatures.map((feature) => (
                  <div key={feature.name} className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg text-center">
                    <div className="mb-1.5 text-primary">{feature.icon}</div>
                    <span className="text-sm font-medium">{feature.name}</span>
                    <span className="text-xs text-muted-foreground">{feature.value}</span>
                  </div>
                ))}
              </div>

              {/* Description courte du produit */}
              <div className="text-sm text-muted-foreground border-l-4 border-muted pl-4 py-1">
                {product.description}
              </div>

              {/* Sélection des variantes */}
              {product.variants.edges.length > 1 && (
                <div className="space-y-4 bg-muted/30 p-4 rounded-xl">
                  <h3 className="font-medium flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Options de livraison
                  </h3>
                  <div className="space-y-3">
                    {deliveryInfo.map((option, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/70 transition-colors">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                          {option.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">{option.title}</p>
                            <Badge variant="outline" className="ml-2 px-1.5 py-0 text-xs">
                              {option.price}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {option.delay} - {option.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sélection de quantité et ajout au panier */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => changeQuantity(-1)}
                      className="p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center p-2 focus:outline-none border-x"
                      value={quantity}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={() => changeQuantity(1)}
                      className="p-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="ml-3 text-sm text-muted-foreground">
                    {selectedVariant?.availableForSale ? (
                      <>Produit en stock</>
                    ) : (
                      <>Produit en rupture de stock</>
                    )}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale || addingToCart}
                    className="flex-1 h-12"
                  >
                    {addingToCart ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Ajout en cours...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Ajouter au panier
                      </>
                    )}
                  </Button>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Partager ce produit</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                {/* Options de financement */}
                {financingOptions.length > 0 && (
                  <div className="bg-muted/30 p-3 rounded-lg mt-3">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <CreditCard className="mr-2 h-4 w-4 text-primary" />
                      Options de financement disponibles
                    </h4>
                    <div className="space-y-1">
                      {financingOptions.map((option, index) => (
                        <p key={index} className="text-xs text-muted-foreground flex items-start">
                          <ChevronRight className="h-3 w-3 mr-1 mt-0.5 text-primary" />
                          <span>
                            <span className="font-medium text-foreground">{option.title}</span> - {option.description}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Onglets d'information détaillée */}
        <section className="container mx-auto px-4 mt-16">
          <div className="border rounded-xl overflow-hidden bg-background">
            <div className="flex flex-col sm:flex-row">
              <Tab.Group>
                <Tab.List className="flex flex-row sm:flex-col sm:min-w-[200px] border-b sm:border-b-0 sm:border-r">
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`
                          flex items-center w-full px-5 py-4 text-left border-b sm:border-b-0 sm:border-r
                          ${selected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-transparent hover:bg-muted/50 text-muted-foreground'}
                          transition-colors focus:outline-none
                        `}
                      >
                        <Info className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Description détaillée</span>
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`
                          flex items-center w-full px-5 py-4 text-left border-b sm:border-b-0 sm:border-r
                          ${selected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-transparent hover:bg-muted/50 text-muted-foreground'}
                          transition-colors focus:outline-none
                        `}
                      >
                        <Settings className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Caractéristiques techniques</span>
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`
                          flex items-center w-full px-5 py-4 text-left border-b sm:border-b-0 sm:border-r
                          ${selected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-transparent hover:bg-muted/50 text-muted-foreground'}
                          transition-colors focus:outline-none
                        `}
                      >
                        <Shield className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Garantie et SAV</span>
                      </button>
                    )}
                  </Tab>
                  <Tab as={Fragment}>
                    {({ selected }) => (
                      <button
                        className={`
                          flex items-center w-full px-5 py-4 text-left
                          ${selected
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-transparent hover:bg-muted/50 text-muted-foreground'}
                          transition-colors focus:outline-none
                        `}
                      >
                        <HelpCircle className="h-4 w-4 mr-2 shrink-0" />
                        <span className="truncate">Foire aux questions</span>
                      </button>
                    )}
                  </Tab>
                </Tab.List>
                <Tab.Panels className="flex-1 p-6">
                  <Tab.Panel>
                    <div className="prose prose-sm max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-border">
                        <thead className="bg-muted/50">
                          <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Caractéristique
                            </th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Valeur
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-background divide-y divide-border">
                          {technicalFeatures.map((feature, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-muted/20' : ''}>
                              <td className="px-4 py-3 text-sm font-medium">
                                {feature.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-muted-foreground">
                                {feature.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Garantie constructeur</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Tous nos produits bénéficient d'une garantie constructeur de 2 ans pièces et main d'œuvre.
                          Cette garantie couvre tous les défauts de fabrication et les problèmes techniques non liés
                          à une utilisation inappropriée ou à un accident.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Ce qui est couvert</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li className="flex items-start">
                                <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5" />
                                <span>Défauts de fabrication</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5" />
                                <span>Dysfonctionnements électroniques</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5" />
                                <span>Problèmes de batterie (hors usure normale)</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5" />
                                <span>Problèmes de moteur</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h4 className="font-medium text-sm mb-2">Ce qui n'est pas couvert</h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              <li className="flex items-start">
                                <Minus className="h-3.5 w-3.5 text-red-500 mr-1.5 mt-0.5" />
                                <span>Usure normale des pneus et plaquettes de frein</span>
                              </li>
                              <li className="flex items-start">
                                <Minus className="h-3.5 w-3.5 text-red-500 mr-1.5 mt-0.5" />
                                <span>Dommages causés par accidents ou chutes</span>
                              </li>
                              <li className="flex items-start">
                                <Minus className="h-3.5 w-3.5 text-red-500 mr-1.5 mt-0.5" />
                                <span>Utilisation non conforme (compétition, sauts...)</span>
                              </li>
                              <li className="flex items-start">
                                <Minus className="h-3.5 w-3.5 text-red-500 mr-1.5 mt-0.5" />
                                <span>Modifications du produit</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Service après-vente</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Notre service après-vente est disponible pour vous accompagner en cas de problème avec votre produit.
                          Vous pouvez nous contacter par téléphone, email ou directement en boutique.
                        </p>
                        <Link href="/contact">
                          <Button variant="outline" className="mt-2">
                            Contacter le SAV
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="space-y-4">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="faq-1">
                          <AccordionTrigger className="text-base">
                            Quelle est l'autonomie réelle de cette trottinette ?
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            L'autonomie indiquée est mesurée dans des conditions optimales (poids du conducteur de 75kg,
                            terrain plat, vitesse modérée). Dans des conditions réelles d'utilisation, l'autonomie peut
                            être réduite de 20 à 30% selon le poids du conducteur, le dénivelé, la vitesse et la température extérieure.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-2">
                          <AccordionTrigger className="text-base">
                            Comment entretenir la batterie pour optimiser sa durée de vie ?
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            Pour maximiser la durée de vie de votre batterie, évitez de la décharger complètement,
                            rechargez-la régulièrement même après une utilisation courte, évitez de la laisser exposée
                            à des températures extrêmes, et utilisez toujours le chargeur d'origine fourni avec votre trottinette.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-3">
                          <AccordionTrigger className="text-base">
                            Cette trottinette est-elle étanche ?
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            Cette trottinette possède une certification IP54, ce qui signifie qu'elle est protégée
                            contre les projections d'eau de toutes directions et contre la poussière. Elle peut
                            être utilisée par temps légèrement pluvieux, mais n'est pas conçue pour rouler dans des
                            flaques d'eau ou sous forte pluie.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="faq-4">
                          <AccordionTrigger className="text-base">
                            Quelles sont les pièces d'usure à surveiller ?
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            Les principales pièces d'usure à surveiller sont les pneus, les plaquettes de frein,
                            les roulements et la batterie. Nous recommandons une vérification tous les 500km ou tous
                            les 3 mois pour assurer un fonctionnement optimal de votre trottinette.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </section>

        {/* Avis clients */}
        <section className="bg-muted/30 py-14 mt-16">
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
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4 relative border">
                    <Image
                      src={relatedProduct.images.edges[0]?.node.url || '/placeholder-product.png'}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {/* Badge promotionnel si nécessaire */}
                    {Math.random() > 0.7 && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary hover:bg-primary">Promo</Badge>
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium group-hover:text-primary transition-colors line-clamp-1">{relatedProduct.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatPrice(
                      relatedProduct.priceRange.minVariantPrice.amount,
                      relatedProduct.priceRange.minVariantPrice.currencyCode
                    )}
                  </p>
                  {/* Caractéristiques principales */}
                  <div className="mt-2 flex items-center text-xs text-muted-foreground">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    <span className="mr-3">Autonomie: 45km</span>
                    <Settings className="h-3 w-3 mr-1" />
                    <span>500W</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild>
                <Link href="/boutique">
                  Voir tous les produits
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* Structured data pour SEO */}
        <ProductSchema product={product} variants={product.variants.edges} />
      </main>
      <Footer />
    </div>
  )
}
