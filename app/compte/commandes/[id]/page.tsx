"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { ORDER_DETAILS_QUERY } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import {
  Package,
  ArrowLeft,
  Truck,
  CreditCard,
  FileText,
  Phone,
  Clock,
  ChevronRight,
  MapPin,
  CheckCircle,
  AlertCircle,
  LucideLoader2
} from 'lucide-react'

interface OrderDetails {
  id: string
  name: string
  orderNumber: string
  processedAt: string
  fulfillmentStatus: string
  financialStatus: string
  canceledAt?: string
  edited?: boolean
  statusUrl: string
  orderStatus?: string
  currentTotalPrice: {
    amount: string
    currencyCode: string
  }
  subtotalPrice: {
    amount: string
    currencyCode: string
  }
  totalShippingPrice: {
    amount: string
    currencyCode: string
  }
  totalTax: {
    amount: string
    currencyCode: string
  }
  lineItems: {
    edges: Array<{
      node: {
        title: string
        quantity: number
        variant?: {
          image?: {
            url: string
            altText: string
          }
          title: string
          price: {
            amount: string
            currencyCode: string
          }
          product?: {
            handle: string
          }
        }
        originalTotalPrice: {
          amount: string
          currencyCode: string
        }
      }
    }>
  }
  shippingAddress?: {
    firstName: string
    lastName: string
    address1: string
    address2?: string
    city: string
    province: string
    country: string
    zip: string
    phone: string
  }
  billingAddress?: {
    firstName: string
    lastName: string
    address1: string
    address2?: string
    city: string
    province: string
    country: string
    zip: string
    phone: string
  }
  discountApplications: {
    edges: Array<{
      node: {
        value: {
          amount?: string
          currencyCode?: string
          percentage?: number
        }
      }
    }>
  }
  successfulFulfillments?: Array<{
    trackingInfo?: Array<{
      number: string
      url: string
    }>
  }>
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { accessToken } = useAuthStore()
  const orderId = decodeURIComponent(params.id)

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (!storedToken) {
      router.push('/auth/connexion')
      return
    }
    fetchOrderDetails(storedToken, orderId)
  }, [router, orderId])

  const fetchOrderDetails = async (token: string, orderId: string) => {
    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: ORDER_DETAILS_QUERY,
          variables: {
            orderId,
            customerAccessToken: token,
          },
        }),
      })

      const { data, errors } = await response.json()

      if (errors) {
        console.error('GraphQL errors:', errors)
        setError('Erreur lors du chargement des détails de la commande')
        setLoading(false)
        return
      }

      if (data?.node) {
        // Déterminer le statut global de la commande
        const orderData = data.node
        const orderStatus = determineOrderStatus(orderData)
        setOrder({
          ...orderData,
          orderStatus
        })
      } else {
        setError('Commande introuvable ou accès non autorisé')
      }
    } catch (err) {
      console.error('Error fetching order details:', err)
      setError('Erreur lors du chargement des détails de la commande')
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour déterminer le statut global de la commande
  const determineOrderStatus = (order: any): string => {
    if (order.canceledAt) {
      return 'CANCELED'
    }

    // Puisque closed n'est pas disponible, nous allons considérer toutes les commandes non-annulées comme OPEN
    return 'OPEN'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusClass = (status: string) => {
    // Couleurs pour les statuts de paiement
    switch (status) {
      // Statuts positifs (vert)
      case 'PAID':
      case 'FULFILLED':
      case 'DELIVERED':
        return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'

      // Statuts neutres ou en attente (ambre/orange)
      case 'PARTIALLY_PAID':
      case 'PARTIALLY_FULFILLED':
      case 'AUTHORIZED':
      case 'IN_TRANSIT':
      case 'READY_FOR_PICKUP':
      case 'OPEN':
      case 'IN_PROGRESS':
      case 'AWAITING_SHIPMENT':
      case 'SCHEDULED':
        return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'

      // Statuts en attente ou neutres (gris)
      case 'PENDING':
      case 'UNFULFILLED':
      case 'ARCHIVED':
      case 'ON_HOLD':
      case 'EXPIRING':
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900/30'

      // Statuts négatifs ou problématiques (rouge)
      case 'REFUNDED':
      case 'PARTIALLY_REFUNDED':
      case 'CANCELED':
      case 'EXPIRED':
      case 'OVERDUE':
      case 'VOIDED':
      case 'DELIVERY_FAILED':
        return 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30'

      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-900/30'
    }
  }

  const getStatusLabel = (status: string, type: 'payment' | 'fulfillment' | 'order' | 'delivery') => {
    switch (type) {
      case 'payment':
        switch (status) {
          case 'PAID': return 'Payé'
          case 'PARTIALLY_PAID': return 'Partiellement payé'
          case 'PARTIALLY_REFUNDED': return 'Partiellement remboursé'
          case 'PENDING': return 'Paiement en attente'
          case 'REFUNDED': return 'Remboursé'
          case 'VOIDED': return 'Annulé'
          case 'AUTHORIZED': return 'Autorisé'
          case 'OVERDUE': return 'En retard'
          case 'EXPIRING': return 'Expirant'
          case 'EXPIRED': return 'Expiré'
          default: return status
        }

      case 'fulfillment':
        switch (status) {
          case 'FULFILLED': return 'Traité'
          case 'UNFULFILLED': return 'Non traité'
          case 'PARTIALLY_FULFILLED': return 'Partiellement traité'
          case 'SCHEDULED': return 'Planifié'
          case 'ON_HOLD': return 'En attente'
          case 'AWAITING_SHIPMENT': return 'Prêt pour expédition'
          case 'IN_PROGRESS': return 'En cours'
          default: return status
        }

      case 'order':
        switch (status) {
          case 'OPEN': return 'Ouverte'
          case 'ARCHIVED': return 'Archivée'
          case 'CANCELED': return 'Annulée'
          default: return status
        }

      case 'delivery':
        switch (status) {
          case 'IN_TRANSIT': return 'En transit'
          case 'DELIVERED': return 'Livrée'
          case 'DELIVERY_FAILED': return 'Échec de livraison'
          case 'READY_FOR_PICKUP': return 'Prête pour le ramassage'
          default: return status
        }

      default:
        return status
    }
  }

  const formatAddress = (address: any) => {
    if (!address) return 'Non disponible'

    return (
      <div className="space-y-1 text-sm">
        <p className="font-medium">{address.firstName} {address.lastName}</p>
        <p>{address.address1}</p>
        {address.address2 && <p>{address.address2}</p>}
        <p>{address.zip} {address.city}</p>
        <p>{address.province}, {address.country}</p>
        {address.phone && <p className="flex items-center mt-2 text-gray-500"><Phone className="w-3 h-3 mr-1" /> {address.phone}</p>}
      </div>
    )
  }

  const handleContactSupport = () => {
    toast.success('Votre demande a été envoyée au support client')
  }

  const generateInvoiceUrl = (orderId: string) => {
    // Si nous avons déjà l'URL de statut de la commande, l'utiliser directement
    if (order?.statusUrl) {
      return order.statusUrl;
    }

    // Construction fallback si statusUrl n'est pas disponible
    const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '9ece60-13.myshopify.com';

    // Extraire l'ID numérique de la commande du format gid://shopify/Order/1234567890
    const orderIdNumeric = orderId.split('/').pop();

    return `https://${shopDomain}/account/orders/${orderIdNumeric}`;
  }

  const downloadInvoice = () => {
    try {
      // Vérifier si l'URL de statut est disponible
      if (order?.statusUrl) {
        // Rediriger vers la page de statut de la commande qui contient généralement l'option de téléchargement
        window.open(order.statusUrl, '_blank');
        toast.success('Redirection vers la page de votre commande');
      } else if (order) {
        // Si pas d'URL de statut, utiliser notre construction d'URL de fallback
        const url = generateInvoiceUrl(order.id);
        window.open(url, '_blank');
        toast.success('Redirection vers la page de votre commande');
      } else {
        toast.error('Impossible d\'accéder aux détails de la commande');
      }
    } catch (error) {
      console.error('Erreur lors de la génération de la facture:', error);
      toast.error('Impossible de générer la facture pour le moment');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex flex-col">
        <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
          <Navigation />
        </div>
        <main className="container mx-auto px-4 pt-24 flex-grow flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <LucideLoader2 className="w-10 h-10 text-neutral-400 animate-spin mb-4" />
            <p className="text-neutral-500">Chargement des détails de la commande...</p>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex flex-col">
        <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
          <Navigation />
        </div>
        <main className="container mx-auto px-4 pt-24 flex-grow flex flex-col items-center justify-center">
          <div className="max-w-md w-full text-center p-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-medium mb-2">Commande introuvable</h2>
            <p className="text-neutral-500 mb-6">{error || "Impossible d'accéder aux détails de cette commande"}</p>
            <Link href="/compte/commandes">
              <Button className="bg-black text-white dark:bg-white dark:text-black">
                Retour à mes commandes
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex flex-col">
      <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
        <Navigation />
      </div>

      <main className="container mx-auto px-4 pt-24 pb-12 flex-grow">
        <div className="max-w-7xl mx-auto w-full py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/compte/commandes"
              className="flex items-center text-sm font-medium hover:text-neutral-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à mes commandes
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* En-tête de la commande */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl font-medium mb-1">Commande #{order.orderNumber}</h1>
                    <p className="text-neutral-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(order.processedAt)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    {order.orderStatus && (
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getStatusClass(order.orderStatus)}`}>
                        <Package className="w-3.5 h-3.5 mr-1.5" />
                        {getStatusLabel(order.orderStatus, 'order')}
                      </div>
                    )}
                    {/* Statut de paiement */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getStatusClass(order.financialStatus)}`}>
                      <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                      {getStatusLabel(order.financialStatus, 'payment')}
                    </div>
                    {/* Statut de traitement */}
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${getStatusClass(order.fulfillmentStatus)}`}>
                      <Truck className="w-3.5 h-3.5 mr-1.5" />
                      {getStatusLabel(order.fulfillmentStatus, 'fulfillment')}
                    </div>
                  </div>
                </div>

                {order.successfulFulfillments &&
                 order.successfulFulfillments.length > 0 &&
                 order.successfulFulfillments[0]?.trackingInfo &&
                 order.successfulFulfillments[0].trackingInfo.length > 0 && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30 flex items-start">
                    <Truck className="w-5 h-5 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5 mr-3" />
                    <div>
                      <p className="font-medium text-blue-700 dark:text-blue-400 mb-1">Suivi de livraison</p>
                      <p className="text-sm text-blue-600 dark:text-blue-300">
                        Numéro de suivi: {order.successfulFulfillments[0].trackingInfo[0].number}
                      </p>
                      {order.fulfillmentStatus && (
                        <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
                          Statut: {getStatusLabel(order.fulfillmentStatus, 'fulfillment')}
                        </p>
                      )}
                      <a
                        href={order.successfulFulfillments[0].trackingInfo[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm flex items-center mt-2 text-blue-700 dark:text-blue-300 hover:underline"
                      >
                        Suivre mon colis <ChevronRight className="w-3 h-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </motion.section>

              {/* Détails des articles */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <h2 className="text-lg font-medium mb-4">Articles commandés</h2>
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {order.lineItems.edges.map((edge, index) => (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 relative bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden flex-shrink-0">
                          {edge.node.variant?.image ? (
                            <Image
                              src={edge.node.variant.image.url}
                              alt={edge.node.variant.image.altText || edge.node.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full text-neutral-400">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-wrap justify-between gap-2">
                            <div>
                              <h3 className="font-medium">{edge.node.title}</h3>
                              {edge.node.variant?.title !== "Default Title" && (
                                <p className="text-sm text-neutral-500">{edge.node.variant?.title}</p>
                              )}
                              <p className="text-sm mt-1">Quantité: <span className="font-medium">{edge.node.quantity}</span></p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                {parseFloat(edge.node.originalTotalPrice.amount).toFixed(2)} €
                              </p>
                              {edge.node.variant && (
                                <p className="text-sm text-neutral-500">
                                  {parseFloat(edge.node.variant.price.amount).toFixed(2)} € par unité
                                </p>
                              )}
                            </div>
                          </div>
                          {edge.node.variant?.product?.handle && (
                            <Link
                              href={`/boutique/${edge.node.variant.product.handle}`}
                              className="text-sm mt-2 text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center"
                            >
                              Voir le produit <ChevronRight className="w-3 h-3 ml-1" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* Seulement mobile: résumé de commande */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:hidden bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <h2 className="text-lg font-medium mb-4">Résumé</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Sous-total</span>
                    <span>{parseFloat(order.subtotalPrice.amount).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Frais de livraison</span>
                    <span>{parseFloat(order.totalShippingPrice.amount).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Taxes</span>
                    <span>{parseFloat(order.totalTax.amount).toFixed(2)} €</span>
                  </div>

                  {order.discountApplications.edges.length > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Remises</span>
                      <span>
                        {order.discountApplications.edges[0].node.value.amount
                          ? `-${parseFloat(order.discountApplications.edges[0].node.value.amount).toFixed(2)} €`
                          : `-${order.discountApplications.edges[0].node.value.percentage}%`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{parseFloat(order.currentTotalPrice.amount).toFixed(2)} €</span>
                </div>
              </motion.section>

              {/* Adresses */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <h2 className="text-lg font-medium mb-4">Adresses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4" />
                      <h3 className="font-medium">Adresse de livraison</h3>
                    </div>
                    {formatAddress(order.shippingAddress)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-4 h-4" />
                      <h3 className="font-medium">Adresse de facturation</h3>
                    </div>
                    {formatAddress(order.billingAddress)}
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Résumé de la commande */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden lg:block bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <h2 className="text-lg font-medium mb-4">Récapitulatif</h2>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Sous-total</span>
                    <span>{parseFloat(order.subtotalPrice.amount).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Frais de livraison</span>
                    <span>{parseFloat(order.totalShippingPrice.amount).toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Taxes</span>
                    <span>{parseFloat(order.totalTax.amount).toFixed(2)} €</span>
                  </div>

                  {order.discountApplications.edges.length > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Remises</span>
                      <span>
                        {order.discountApplications.edges[0].node.value.amount
                          ? `-${parseFloat(order.discountApplications.edges[0].node.value.amount).toFixed(2)} €`
                          : `-${order.discountApplications.edges[0].node.value.percentage}%`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{parseFloat(order.currentTotalPrice.amount).toFixed(2)} €</span>
                </div>
              </motion.section>

              {/* Actions */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <h2 className="text-lg font-medium mb-4">Actions</h2>
                <div className="space-y-3">
                  <Button
                    className="w-full bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 flex items-center justify-center gap-2 h-12"
                    onClick={handleContactSupport}
                  >
                    <Phone className="w-4 h-4" />
                    Contacter le support
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-neutral-200 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-800 flex items-center justify-center gap-2 h-12"
                    onClick={downloadInvoice}
                  >
                    <FileText className="w-4 h-4" />
                    Voir la commande
                  </Button>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
