"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart, Plus, Minus, Trash2, Loader2, X, ArrowRight, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_QUERY } from '@/lib/shopify/queries'

export function Cart() {
  const {
    items,
    totalQuantity,
    subtotalAmount,
    totalAmount,
    checkoutUrl,
    isLoading,
    error,
    isAuthenticated,
    initialize,
    updateCartItem,
    removeFromCart,
    addToCart,
  } = useCartStore()

  const { accessToken, customer } = useAuthStore()
  const [customerFirstName, setCustomerFirstName] = useState<string | null>(null)

  // Initialiser le panier au chargement
  useEffect(() => {
    initialize()
  }, [initialize])

  // Utiliser les informations du client depuis le store d'authentification
  useEffect(() => {
    if (customer?.firstName) {
      setCustomerFirstName(customer.firstName)
    } else {
      setCustomerFirstName(null)
    }
  }, [customer])

  // Gérer les erreurs
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleQuantityChange = async (lineId: string, currentQuantity: number, change: number) => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour modifier votre panier')
      return
    }

    try {
      const newQuantity = currentQuantity + change
      if (newQuantity < 1) {
        await removeFromCart(lineId)
        toast.success('Produit supprimé du panier')
      } else {
        await updateCartItem(lineId, newQuantity)
        toast.success('Quantité mise à jour')
      }
    } catch (error) {
      // L'erreur est déjà gérée par le store
    }
  }

  const handleRemove = async (lineId: string) => {
    if (!isAuthenticated) {
      toast.error('Veuillez vous connecter pour modifier votre panier')
      return
    }

    try {
      await removeFromCart(lineId)
      toast.success('Produit supprimé du panier')
    } catch (error) {
      // L'erreur est déjà gérée par le store
    }
  }

  const getProductImage = (item: any) => {
    return item?.merchandise?.product?.images?.edges?.[0]?.node?.url || '/placeholder-product.png'
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {isAuthenticated && totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pb-6 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-semibold">
              {isAuthenticated && customerFirstName
                ? `Bonjour ${customerFirstName}, votre panier`
                : 'Votre panier'}
            </SheetTitle>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-5 w-5" />
              <span className="sr-only">Fermer</span>
            </SheetClose>
          </div>
          {isAuthenticated && totalQuantity > 0 && (
            <p className="text-sm text-muted-foreground">
              {totalQuantity} article{totalQuantity > 1 ? 's' : ''} dans votre panier
            </p>
          )}
        </SheetHeader>

        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="relative w-40 h-40 mb-8">
              <Image
                src="/empty-cart.png"
                alt="Connexion requise"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight mb-2">Veuillez vous connecter</h3>
            <p className="text-muted-foreground mb-8">
              Connectez-vous pour accéder à votre panier et effectuer vos achats
            </p>
            <SheetClose asChild>
              <Link href="/auth/connexion">
                <Button className="gap-2">
                  Se connecter
                  <LogIn className="h-4 w-4" />
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="relative w-40 h-40 mb-8">
              <Image
                src="/empty-cart.png"
                alt="Panier vide"
                fill
                className="object-contain"
              />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight mb-2">Votre panier est vide</h3>
            <p className="text-muted-foreground mb-8">
              Votre panier est vide, commencez vos achats ici !
            </p>
            <SheetClose asChild>
              <Link href="/boutique">
                <Button className="gap-2">
                  Découvrir la boutique
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative aspect-square h-24 w-24 overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src={getProductImage(item)}
                        alt={item.merchandise.product.title || 'Produit'}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-medium leading-none">
                            {item.merchandise.product.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.merchandise.title}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemove(item.id)}
                          disabled={!isAuthenticated}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center rounded-lg border bg-background">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none rounded-l-lg"
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            disabled={!isAuthenticated}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="w-12 text-center text-sm">
                            {item.quantity}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none rounded-r-lg"
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            disabled={!isAuthenticated}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(
                            (parseFloat(item.merchandise.price.amount) * item.quantity).toString(),
                            item.merchandise.price.currencyCode || 'EUR'
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t pt-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span>{formatPrice(subtotalAmount, 'EUR')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-muted-foreground">Calculée à l'étape suivante</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total estimé</span>
                  <span>{formatPrice(totalAmount, 'EUR')}</span>
                </div>
              </div>

              {checkoutUrl && isAuthenticated && (
                <Button
                  className="w-full h-11 text-base font-medium"
                  size="lg"
                  onClick={() => window.location.href = checkoutUrl}
                >
                  Procéder au paiement
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
