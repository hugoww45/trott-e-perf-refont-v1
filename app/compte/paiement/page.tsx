"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import {
  CUSTOMER_PAYMENT_METHODS_QUERY,
  CUSTOMER_PAYMENT_METHOD_CREATE_MUTATION,
  CUSTOMER_PAYMENT_METHOD_DELETE_MUTATION
} from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import { CreditCard, Plus, Trash2 } from 'lucide-react'

interface PaymentMethod {
  id: string
  last4: string
  brand: string
  expiryMonth: number
  expiryYear: number
}

export default function PaymentPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: '',
  })
  const router = useRouter()
  const { accessToken } = useAuthStore()

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (!storedToken) {
      router.push('/auth/connexion')
      return
    }
    fetchPaymentMethods(storedToken)
  }, [router])

  const fetchPaymentMethods = async (token: string) => {
    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_PAYMENT_METHODS_QUERY,
          variables: {
            customerAccessToken: token,
          },
        }),
      })

      const { data } = await response.json()
      if (data?.customer?.paymentMethods) {
        setPaymentMethods(data.customer.paymentMethods)
      }
    } catch (err) {
      console.error('Error fetching payment methods:', err)
      setError('Erreur lors du chargement des moyens de paiement')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_PAYMENT_METHOD_CREATE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            paymentMethod: {
              number: formData.number,
              expiryMonth: parseInt(formData.expiryMonth),
              expiryYear: parseInt(formData.expiryYear),
              cvc: formData.cvc,
            },
          },
        }),
      })

      const { data } = await response.json()

      if (data?.customerPaymentMethodCreate?.customerPaymentMethod) {
        toast.success('Moyen de paiement ajouté')
        setIsAdding(false)
        setFormData({
          number: '',
          expiryMonth: '',
          expiryYear: '',
          cvc: '',
        })
        fetchPaymentMethods(accessToken)
      } else if (data?.customerPaymentMethodCreate?.customerUserErrors?.length > 0) {
        setError(data.customerPaymentMethodCreate.customerUserErrors[0].message)
        toast.error(data.customerPaymentMethodCreate.customerUserErrors[0].message)
      }
    } catch (err) {
      console.error('Error adding payment method:', err)
      setError('Erreur lors de l\'ajout')
      toast.error('Erreur lors de l\'ajout')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce moyen de paiement ?')) return

    setLoading(true)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_PAYMENT_METHOD_DELETE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            id,
          },
        }),
      })

      const { data } = await response.json()

      if (data?.customerPaymentMethodDelete?.deletedPaymentMethodId) {
        toast.success('Moyen de paiement supprimé')
        fetchPaymentMethods(accessToken)
      } else if (data?.customerPaymentMethodDelete?.customerUserErrors?.length > 0) {
        setError(data.customerPaymentMethodDelete.customerUserErrors[0].message)
        toast.error(data.customerPaymentMethodDelete.customerUserErrors[0].message)
      }
    } catch (err) {
      console.error('Error deleting payment method:', err)
      setError('Erreur lors de la suppression')
      toast.error('Erreur lors de la suppression')
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
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Moyens de paiement</h2>
                    <p className="text-sm text-gray-400">Gérez vos cartes bancaires</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <a
                    href="/compte"
                    className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span>Retour au compte</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Add Payment Method */}
              <section className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Ajouter une carte</h2>
                  {isAdding && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAdding(false)
                        setFormData({
                          number: '',
                          expiryMonth: '',
                          expiryYear: '',
                          cvc: '',
                        })
                      }}
                    >
                      Annuler
                    </Button>
                  )}
                </div>

                {!isAdding ? (
                  <Button
                    onClick={() => setIsAdding(true)}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une carte
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Numéro de carte</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                        required
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Mois</Label>
                        <Input
                          id="expiryMonth"
                          value={formData.expiryMonth}
                          onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                          required
                          placeholder="MM"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Année</Label>
                        <Input
                          id="expiryYear"
                          value={formData.expiryYear}
                          onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                          required
                          placeholder="AA"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          value={formData.cvc}
                          onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                          required
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Ajout en cours...' : 'Ajouter'}
                    </Button>
                  </form>
                )}
              </section>

              {/* Payment Methods List */}
              <section className="bg-card rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Mes cartes enregistrées</h2>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-400">Aucune carte enregistrée</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4">
                            <CreditCard className="w-6 h-6 text-gray-400" />
                            <div>
                              <p className="font-medium">
                                {method.brand} •••• {method.last4}
                              </p>
                              <p className="text-sm text-gray-400">
                                Expire le {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(method.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
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
