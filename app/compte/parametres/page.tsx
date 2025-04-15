"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_UPDATE_MUTATION } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import { Settings, ArrowLeft, Lock, Bell, Globe } from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    marketing: false,
  })
  const [language, setLanguage] = useState('fr')
  const router = useRouter()
  const { accessToken } = useAuthStore()

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    if (!storedToken) {
      router.push('/auth/connexion')
      return
    }
    setLoading(false)
  }, [router])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            input: {
              password: formData.newPassword,
            },
          },
        }),
      })

      const { data } = await response.json()

      if (data?.customerUpdate?.customer) {
        setIsEditing(false)
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        toast.success('Mot de passe mis à jour')
      } else if (data?.customerUpdate?.customerUserErrors?.length > 0) {
        setError(data.customerUpdate.customerUserErrors[0].message)
        toast.error(data.customerUpdate.customerUserErrors[0].message)
      }
    } catch (err) {
      console.error('Error updating password:', err)
      setError('Erreur lors de la mise à jour')
      toast.error('Erreur lors de la mise à jour')
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
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">Paramètres</h2>
                    <p className="text-sm text-gray-400">Gérez vos préférences</p>
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
              {/* Password Section */}
              <section className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <h2 className="text-xl font-semibold">Mot de passe</h2>
                  </div>
                  {isEditing ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        setFormData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        })
                      }}
                    >
                      Annuler
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>
                      Modifier
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Mise à jour...' : 'Mettre à jour'}
                    </Button>
                  </form>
                ) : (
                  <p className="text-gray-400">
                    Changez votre mot de passe pour sécuriser votre compte
                  </p>
                )}
              </section>

              {/* Notifications Section */}
              <section className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <h2 className="text-xl font-semibold">Notifications</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-gray-400">
                        Recevez des mises à jour sur vos commandes
                      </p>
                    </div>
                    <Button
                      variant={notifications.email ? 'default' : 'outline'}
                      onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                    >
                      {notifications.email ? 'Activé' : 'Désactivé'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications SMS</p>
                      <p className="text-sm text-gray-400">
                        Recevez des alertes sur votre téléphone
                      </p>
                    </div>
                    <Button
                      variant={notifications.sms ? 'default' : 'outline'}
                      onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                    >
                      {notifications.sms ? 'Activé' : 'Désactivé'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-sm text-gray-400">
                        Recevez des offres et promotions
                      </p>
                    </div>
                    <Button
                      variant={notifications.marketing ? 'default' : 'outline'}
                      onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
                    >
                      {notifications.marketing ? 'Activé' : 'Désactivé'}
                    </Button>
                  </div>
                </div>
              </section>

              {/* Language Section */}
              <section className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <h2 className="text-xl font-semibold">Langue</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Langue du site</p>
                      <p className="text-sm text-gray-400">
                        Choisissez votre langue préférée
                      </p>
                    </div>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-background border rounded-md px-3 py-2"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
