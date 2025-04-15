"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { PRODUCT_QUERY } from '@/lib/shopify/queries'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import { Loader2, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
  const { addToCart, isAuthenticated, fetchCart } = useCartStore()
  const router = useRouter()

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
      await addToCart(selectedVariant.id, 1)
      // Assurer la mise à jour du panier après ajout
      await fetchCart()
      toast.success('Produit ajouté au panier')
    } catch (error) {
      toast.error("Erreur lors de l'ajout au panier")
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="flex items-center justify-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
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
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const productImage = product.images?.edges?.[0]?.node?.url || '/placeholder-product.png'

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Fil d'Ariane */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <a href="/boutique" className="hover:text-foreground transition-colors">
            Boutique
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
              <Image
                src={productImage}
                alt={product.title}
                width={800}
                height={800}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {product.images?.edges?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.edges.map(({ node: image }: any, index: number) => (
                  <button
                    key={image.url}
                    className="aspect-square overflow-hidden rounded-lg bg-muted"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} - Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="lg:sticky lg:top-24 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{product.title}</h1>
              <div className="flex items-center justify-between">
                <p className="text-3xl font-medium">
                  {formatPrice(selectedVariant?.price.amount || '0', selectedVariant?.price.currencyCode || 'EUR')}
                </p>
              </div>
            </div>

            <div className="prose prose-sm">
              <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            </div>

            {/* Sélection des variantes */}
            {product.variants.edges.length > 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Variante</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.edges.map(({ node: variant }: any) => (
                    <Button
                      key={variant.id}
                      variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Bouton d'ajout au panier */}
            <Button
              size="lg"
              className="w-full h-14 text-lg"
              onClick={handleAddToCart}
              disabled={addingToCart || !selectedVariant}
            >
              {addingToCart ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Ajout en cours...
                </>
              ) : (
                'Ajouter au panier'
              )}
            </Button>

            {/* Informations supplémentaires */}
            <div className="space-y-4 border-t pt-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Livraison</p>
                  <p className="text-muted-foreground">2-4 jours ouvrés</p>
                </div>
                <div>
                  <p className="font-medium">Retours</p>
                  <p className="text-muted-foreground">30 jours gratuits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
