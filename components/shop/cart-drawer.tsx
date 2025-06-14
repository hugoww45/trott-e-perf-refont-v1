"use client"

import { useCartStore } from '@/stores/cart'
import { formatPrice } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateCartItem, subtotalAmount } = useCartStore()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Votre Panier</SheetTitle>
        </SheetHeader>

        <div className="mt-8">
          {items.length === 0 ? (
            <p className="text-center text-gray-400">Votre panier est vide</p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.merchandise.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={item.merchandise.product.images.edges[0]?.node.url || ''}
                        alt={item.merchandise.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.merchandise.product.title}</h4>
                      <p className="text-sm text-gray-400">
                        {formatPrice(item.merchandise.price.amount, item.merchandise.price.currencyCode || 'EUR')}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartItem(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatPrice(subtotalAmount, 'EUR')}</span>
                </div>
                <Button className="w-full" size="lg">
                  Passer la commande
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
