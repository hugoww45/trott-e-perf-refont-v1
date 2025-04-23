"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_QUERY } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import { Package, ArrowLeft } from 'lucide-react'

interface Order {
  id: string
  orderNumber: string
  processedAt: string
  financialStatus: string
  fulfillmentStatus: string
  currentTotalPrice: {
    amount: string
    currencyCode: string
  }
  lineItems: {
    edges: Array<{
      node: {
        title: string
        quantity: number
        variant: {
          price: {
            amount: string
          }
        }
      }
    }>
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { accessToken } = useAuthStore()

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (!storedToken) {
      router.push('/auth/connexion')
      return
    }
    fetchOrders(storedToken)
  }, [router])

  const fetchOrders = async (token: string) => {
    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_QUERY,
          variables: {
            customerAccessToken: token,
          },
        }),
      })

      const { data } = await response.json()
      if (data?.customer?.orders?.edges) {
        setOrders(data.customer.orders.edges.map((edge: any) => edge.node))
      }
    } catch (err) {
      console.error('Error fetching orders:', err)
      setError('Erreur lors du chargement des commandes')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 flex-grow flex flex-col">
          <div className="text-center">Chargement...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <main className="container mx-auto px-4 pt-24 flex-grow flex flex-col">
        <div className="max-w-7xl mx-auto w-full py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Mes commandes</h2>
                    <p className="text-sm text-gray-400">Historique des commandes</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link
                    href="/compte"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Retour au compte</span>
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              <section className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Historique des commandes</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-400">Aucune commande pour le moment</p>
                    <Link
                      href="/boutique"
                      className="text-primary hover:underline mt-4 inline-block"
                    >
                      Découvrir notre boutique
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <Link href={`/compte/commandes/${encodeURIComponent(order.id)}`} className="block">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="font-medium">Commande #{order.orderNumber}</p>
                              <p className="text-sm text-gray-400">
                                {new Date(order.processedAt).toLocaleDateString('fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {parseFloat(order.currentTotalPrice.amount).toFixed(2)} €
                              </p>
                              <p className="text-sm text-gray-400">
                                {order.fulfillmentStatus === 'SUCCESS'
                                  ? 'Livré'
                                  : order.fulfillmentStatus === 'IN_PROGRESS'
                                  ? 'En cours'
                                  : 'En attente'}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            {order.lineItems.edges.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.node.title} x {item.node.quantity}
                                </span>
                                <span>
                                  {item.node.variant
                                    ? `${parseFloat(item.node.variant.price.amount).toFixed(2)} €`
                                    : 'Prix indisponible'}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
