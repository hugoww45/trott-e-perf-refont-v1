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
  const { items, removeItem, updateQuantity, total } = useCartStore()

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
                  <div key={item.variant.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                      <Image
                        src={item.variant.image?.url || ''}
                        alt={item.variant.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.variant.title}</h4>
                      <p className="text-sm text-gray-400">
                        {formatPrice(item.variant.price.amount, item.variant.price.currencyCode)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.variant.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.variant.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total().toString(), 'EUR')}</span>
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