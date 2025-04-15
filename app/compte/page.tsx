"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_QUERY, CUSTOMER_UPDATE_MUTATION } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import { formatPhoneNumber } from '@/lib/utils'
import { User, Mail, Phone, MapPin, Package, Clock, CreditCard, Settings, LogOut } from 'lucide-react'

interface Order {
  id: string
  name: string
  processedAt: string
  currentTotalPrice: {
    amount: string
    currencyCode: string
  }
  fulfillmentStatus: string
  financialStatus: string
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

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { accessToken, customer, setAccessToken, setCustomer, logout } = useAuthStore()

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    const storedCustomer = localStorage.getItem('customer')

    if (!storedToken || !storedCustomer) {
      router.push('/auth/connexion')
      return
    }

    setAccessToken(storedToken)
    setCustomer(JSON.parse(storedCustomer))
    fetchCustomerData(storedToken)
  }, [router, setAccessToken, setCustomer])

  const fetchCustomerData = async (token: string) => {
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

      if (data?.customer) {
        setFormData({
          firstName: data.customer.firstName || '',
          lastName: data.customer.lastName || '',
          email: data.customer.email || '',
          phone: data.customer.phone || '',
        })
        setOrders(data.customer.orders.edges.map((edge: any) => edge.node))
      }
    } catch (err) {
      console.error('Error fetching customer data:', err)
      setError('Erreur lors du chargement des données')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    localStorage.removeItem('accessToken')
    localStorage.removeItem('customer')
    router.push('/auth/connexion')
  }

  const openEditModal = () => {
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || '',
      })
    }
    setIsEditing(true)
  }

  const closeEditModal = () => {
    setIsEditing(false)
    if (customer) {
      setFormData({
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || '',
      })
    }
  }

  const updateCustomerDirectly = async () => {
    if (!accessToken) {
      toast.error('Session expirée, veuillez vous reconnecter')
      router.push('/auth/connexion')
      return
    }

    setLoading(true)

    try {
      // Formatage du numéro de téléphone
      const formattedPhone = formatPhoneNumber(formData.phone)
      console.log('Numéro formaté:', formattedPhone)

      // Utilisation directe du fetch avec l'API Shopify
      const apiUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql`
      const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || ''

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            customer: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formattedPhone, // Utiliser le numéro formaté
            },
          },
        }),
      })

      const result = await response.json()
      console.log('Réponse mise à jour:', result)

      if (result.data?.customerUpdate?.customer) {
        // Mise à jour réussie
        const updatedCustomer = {
          ...customer,
          ...result.data.customerUpdate.customer
        }

        // Mise à jour du state et du localStorage
        setCustomer(updatedCustomer)
        localStorage.setItem('customer', JSON.stringify(updatedCustomer))

        // Message de succès
        toast.success('Informations mises à jour avec succès')

        // Fermer la modal
        setIsEditing(false)
        return true
      } else if (result.data?.customerUpdate?.customerUserErrors?.length > 0) {
        // Erreur utilisateur
        const error = result.data.customerUpdate.customerUserErrors[0]
        console.error('Erreur mise à jour:', error)
        toast.error(error.message)
      } else if (result.errors) {
        // Erreur GraphQL
        console.error('Erreurs GraphQL:', result.errors)
        toast.error("Une erreur s'est produite lors de la mise à jour")
      } else {
        // Autre erreur
        console.error('Réponse inattendue:', result)
        toast.error("Une erreur inattendue s'est produite")
      }
    } catch (err) {
      // Erreur réseau ou autre
      console.error('Erreur lors de la mise à jour:', err)
      toast.error("Impossible de communiquer avec le serveur")
    } finally {
      setLoading(false)
    }

    return false
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {customer?.firstName} {customer?.lastName}
                    </h2>
                    <p className="text-sm text-gray-400">{customer?.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <Link
                    href="/compte"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Profil</span>
                  </Link>
                  <Link
                    href="/compte/commandes"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Package className="w-5 h-5" />
                    <span>Commandes</span>
                  </Link>
                  <Link
                    href="/compte/adresses"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Adresses</span>
                  </Link>
                  <Link
                    href="/compte/paiement"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Paiement</span>
                  </Link>
                  <Link
                    href="/compte/parametres"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Paramètres</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-red-500 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                  </button>
                </nav>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Profile Section */}
              <motion.section
                id="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Informations personnelles</h2>
                  <Button
                    variant="outline"
                    onClick={openEditModal}
                  >
                    Modifier
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Prénom</p>
                      <p className="font-medium">{customer?.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Nom</p>
                      <p className="font-medium">{customer?.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium">{customer?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Téléphone</p>
                    <p className="font-medium">{customer?.phone || 'Non renseigné'}</p>
                  </div>
                </div>
              </motion.section>

              {/* Orders Section */}
              <motion.section
                id="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-lg p-6 shadow-sm"
              >
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
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-medium">Commande #{order.name}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(order.processedAt).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.currentTotalPrice.amount} €</p>
                            <p className="text-sm text-gray-400">
                              {order.fulfillmentStatus === 'SUCCESS' ? 'Livré' : 'En cours'}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {order.lineItems.edges.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>
                                {item.node.title} x {item.node.quantity}
                              </span>
                              <span>{item.node.variant.price.amount} €</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.section>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Edit Modal */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => {
          if (!open && !loading) {
            closeEditModal()
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier vos informations</DialogTitle>
            <DialogDescription>
              Modifiez vos informations personnelles ci-dessous.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => {
                  // Nettoyage basique pour faciliter la saisie
                  const input = e.target.value
                  setFormData({ ...formData, phone: input })
                }}
                placeholder="+33612345678 ou 0612345678"
                disabled={loading}
              />
              <p className="text-xs text-gray-500">
                Format international (ex: +33612345678) ou français (ex: 0612345678)
              </p>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={closeEditModal}
                disabled={loading}
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={updateCustomerDirectly}
                disabled={loading}
                className="min-w-[100px]"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Enregistrement...
                  </div>
                ) : (
                  'Enregistrer'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
