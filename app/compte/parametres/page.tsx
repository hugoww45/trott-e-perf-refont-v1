"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_QUERY, CUSTOMER_UPDATE_MUTATION } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'sonner'
import { Settings, ArrowLeft, Lock, Bell, Globe, User, CreditCard, Trash2, ShieldCheck, Loader2 } from 'lucide-react'

interface CustomerData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  acceptsMarketing: boolean;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [updatingUser, setUpdatingUser] = useState(false)
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [updatingPreferences, setUpdatingPreferences] = useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [marketingPreferences, setMarketingPreferences] = useState({
    email: false,
    sms: false
  })

  const [language, setLanguage] = useState('fr')
  const router = useRouter()
  const { accessToken, logout } = useAuthStore()

  // Récupération des données client depuis Shopify
  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true)

      // Vérifier si un token est disponible
      if (!accessToken) {
        router.push('/auth/connexion')
        return
      }

      try {
        const response = await fetch(getStorefrontApiUrl(), {
          method: 'POST',
          headers: getPublicTokenHeaders(),
          body: JSON.stringify({
            query: CUSTOMER_QUERY,
            variables: {
              customerAccessToken: accessToken
            }
          })
        })

        const { data, errors } = await response.json()

        if (errors) {
          console.error('GraphQL errors:', errors)
          throw new Error(errors[0].message)
        }

        if (data?.customer) {
          const customer = data.customer

          setCustomerData({
            id: customer.id,
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            email: customer.email || '',
            phone: customer.phone || '',
            acceptsMarketing: customer.acceptsMarketing || false
          })

          // Mettre à jour le formulaire avec les données récupérées
          setProfileData({
            firstName: customer.firstName || '',
            lastName: customer.lastName || '',
            email: customer.email || '',
            phone: customer.phone || '',
          })

          // Mettre à jour les préférences marketing
          setMarketingPreferences({
            email: customer.acceptsMarketing || false,
            sms: customer.acceptsMarketing || false
          })
        }
      } catch (err: any) {
        console.error('Error fetching customer data:', err)
        setError(err.message || 'Une erreur est survenue lors de la récupération de vos données')

        // Si l'erreur est liée à l'authentification, déconnecter l'utilisateur
        if (err.message?.includes('access token') || err.message?.includes('authentication')) {
          toast.error('Session expirée, veuillez vous reconnecter')
          logout()
          router.push('/auth/connexion')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchCustomerData()
  }, [accessToken, router, logout])

  // Mise à jour du profil
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdatingUser(true)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            customer: {
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              email: profileData.email,
              phone: profileData.phone || null
            }
          }
        })
      })

      const { data, errors } = await response.json()

      if (errors) {
        console.error('GraphQL errors:', errors)
        throw new Error(errors[0].message)
      }

      if (data?.customerUpdate?.customerUserErrors?.length > 0) {
        const error = data.customerUpdate.customerUserErrors[0]
        throw new Error(error.message)
      }

      if (data?.customerUpdate?.customer) {
        // Mettre à jour les données locales
        setCustomerData({
          ...customerData!,
          firstName: data.customerUpdate.customer.firstName || '',
          lastName: data.customerUpdate.customer.lastName || '',
          email: data.customerUpdate.customer.email || '',
          phone: data.customerUpdate.customer.phone || ''
        })

        setIsEditingProfile(false)
        toast.success('Profil mis à jour avec succès')
      }
    } catch (err: any) {
      console.error('Error updating profile:', err)
      setError(err.message || 'Erreur lors de la mise à jour du profil')
      toast.error(err.message || 'Erreur lors de la mise à jour du profil')
    } finally {
      setUpdatingUser(false)
    }
  }

  // Mise à jour du mot de passe
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    setUpdatingPassword(true)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            customer: {
              password: passwordData.newPassword
            }
          }
        })
      })

      const { data, errors } = await response.json()

      if (errors) {
        console.error('GraphQL errors:', errors)
        throw new Error(errors[0].message)
      }

      if (data?.customerUpdate?.customerUserErrors?.length > 0) {
        const error = data.customerUpdate.customerUserErrors[0]
        throw new Error(error.message)
      }

      if (data?.customerUpdate?.customer) {
        setIsEditingPassword(false)
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        toast.success('Mot de passe mis à jour avec succès')
      }
    } catch (err: any) {
      console.error('Error updating password:', err)
      setError(err.message || 'Erreur lors de la mise à jour du mot de passe')
      toast.error(err.message || 'Erreur lors de la mise à jour du mot de passe')
    } finally {
      setUpdatingPassword(false)
    }
  }

  // Mise à jour des préférences marketing
  const handleMarketingPreferencesUpdate = async (type: 'email' | 'sms', value: boolean) => {
    setUpdatingPreferences(true)

    // Si on active ou désactive les SMS, on met également à jour email pour garder la cohérence
    const updatedPreferences = {
      ...marketingPreferences,
      [type]: value,
      ...(type === 'email' && value === false ? { sms: false } : {})
    }

    setMarketingPreferences(updatedPreferences)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_UPDATE_MUTATION,
          variables: {
            customerAccessToken: accessToken,
            customer: {
              acceptsMarketing: updatedPreferences.email // Dans Shopify, acceptsMarketing est un boolean global
            }
          }
        })
      })

      const { data, errors } = await response.json()

      if (errors) {
        console.error('GraphQL errors:', errors)
        throw new Error(errors[0].message)
      }

      if (data?.customerUpdate?.customerUserErrors?.length > 0) {
        const error = data.customerUpdate.customerUserErrors[0]
        throw new Error(error.message)
      }

      if (data?.customerUpdate?.customer) {
        // Mettre à jour les données locales
        setCustomerData({
          ...customerData!,
          acceptsMarketing: updatedPreferences.email
        })

        toast.success('Préférences de notification mises à jour')
      }
    } catch (err: any) {
      console.error('Error updating marketing preferences:', err)
      setError(err.message || 'Erreur lors de la mise à jour des préférences')
      toast.error(err.message || 'Erreur lors de la mise à jour des préférences')

      // Restaurer l'état précédent en cas d'erreur
      setMarketingPreferences({
        ...marketingPreferences
      })
    } finally {
      setUpdatingPreferences(false)
    }
  }

  // Suppression du compte
  const handleDeleteAccount = async () => {
    // Afficher une confirmation avant de procéder
    setShowDeleteConfirm(true)
  }

  // Confirmation de suppression du compte
  const confirmDeleteAccount = async () => {
    setIsDeletingAccount(true)
    try {
      const response = await fetch('/api/customer/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': accessToken || ''
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression du compte')
      }

      // Succès de la suppression
      toast.success('Votre compte a été supprimé avec succès')

      // Déconnecter l'utilisateur
      logout()

      // Rediriger vers la page d'accueil
      router.push('/')
    } catch (err: any) {
      console.error('Error deleting account:', err)
      toast.error(err.message || 'Une erreur est survenue lors de la suppression de votre compte')
    } finally {
      setIsDeletingAccount(false)
      setShowDeleteConfirm(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="container mx-auto px-4 pt-24 flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Chargement de vos paramètres...</p>
          </div>
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

      <main className="container mx-auto px-4 pt-24 pb-10 flex-grow">
        <div className="max-w-4xl mx-auto w-full py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/compte"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au compte</span>
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold">Paramètres du compte</h1>
          </div>

          <Tabs defaultValue="profil" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profil" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Profil</span>
              </TabsTrigger>
              <TabsTrigger value="securite" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Sécurité</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span>Préférences</span>
              </TabsTrigger>
            </TabsList>

            {/* Onglet Profil */}
            <TabsContent value="profil" className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">Informations personnelles</h2>
                  {isEditingProfile ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditingProfile(false)
                        // Rétablir les données originales
                        if (customerData) {
                          setProfileData({
                            firstName: customerData.firstName,
                            lastName: customerData.lastName,
                            email: customerData.email,
                            phone: customerData.phone || '',
                          })
                        }
                      }}
                    >
                      Annuler
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditingProfile(true)}>
                      Modifier
                    </Button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={updatingUser}
                      className="w-full"
                    >
                      {updatingUser ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mise à jour...
                        </>
                      ) : (
                        'Enregistrer les modifications'
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Prénom</p>
                        <p className="font-medium">{customerData?.firstName || '-'}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Nom</p>
                        <p className="font-medium">{customerData?.lastName || '-'}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{customerData?.email || '-'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Téléphone</p>
                      <p className="font-medium">{customerData?.phone || '-'}</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Onglet Sécurité */}
            <TabsContent value="securite" className="space-y-6">
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                    <h2 className="text-xl font-medium">Mot de passe</h2>
                  </div>

                  {isEditingPassword ? (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditingPassword(false)
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        })
                      }}
                    >
                      Annuler
                    </Button>
                  ) : (
                    <Button onClick={() => setIsEditingPassword(true)}>
                      Modifier
                    </Button>
                  )}
                </div>

                {isEditingPassword ? (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Votre mot de passe doit contenir au moins 8 caractères
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={updatingPassword}
                      className="w-full"
                    >
                      {updatingPassword ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mise à jour...
                        </>
                      ) : (
                        'Mettre à jour le mot de passe'
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="flex gap-3 items-center">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <div>
                      <p className="font-medium">Mot de passe sécurisé</p>
                      <p className="text-sm text-muted-foreground">
                        Nous vous recommandons de changer votre mot de passe tous les 3 mois
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Onglet Préférences */}
            <TabsContent value="preferences" className="space-y-6">
              {/* Préférences de notification */}
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-xl font-medium">Notifications</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications par email</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des mises à jour sur vos commandes et nos offres
                      </p>
                    </div>
                    <Switch
                      checked={marketingPreferences.email}
                      onCheckedChange={(checked) => handleMarketingPreferencesUpdate('email', checked)}
                      disabled={updatingPreferences}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Recevez des alertes sur votre téléphone
                      </p>
                    </div>
                    <Switch
                      checked={marketingPreferences.sms}
                      onCheckedChange={(checked) => handleMarketingPreferencesUpdate('sms', checked)}
                      disabled={updatingPreferences || !marketingPreferences.email}
                    />
                  </div>
                </div>
              </div>

              {/* Préférences de langue */}
              <div className="bg-card rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <h2 className="text-xl font-medium">Langue et région</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="language" className="mb-2 block">Langue</Label>
                    <Select
                      value={language}
                      onValueChange={setLanguage}
                    >
                      <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="Sélectionner une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Supprimer le compte */}
              <div className="bg-card rounded-lg p-6 shadow-sm border border-destructive/20">
                <div className="flex items-center gap-3 mb-4">
                  <Trash2 className="w-5 h-5 text-destructive" />
                  <h2 className="text-xl font-medium text-destructive">Supprimer mon compte</h2>
                </div>

                <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 flex-shrink-0 mt-0.5">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Fonctionnalité en cours de développement</p>
                    <p>Cette fonctionnalité est actuellement en cours de développement et peut présenter des problèmes. Notre équipe travaille activement à la rendre pleinement opérationnelle.</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Cette action est irréversible. Toutes vos données personnelles, vos commandes et votre historique seront définitivement supprimés.
                </p>

                {showDeleteConfirm ? (
                  <div className="space-y-4 border p-4 rounded-lg bg-destructive/5">
                    <p className="font-medium text-destructive">Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                    <p className="text-sm text-muted-foreground">Cette action ne peut pas être annulée. Toutes vos données seront définitivement supprimées.</p>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(false)}
                        disabled={isDeletingAccount}
                      >
                        Annuler
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={confirmDeleteAccount}
                        disabled={isDeletingAccount}
                      >
                        {isDeletingAccount ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Suppression...
                          </>
                        ) : (
                          'Confirmer la suppression'
                        )}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="destructive"
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer mon compte
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
