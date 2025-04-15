"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_CREATE_MUTATION } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import Link from 'next/link'
import { toast } from 'sonner'
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { setAccessToken, setCustomer } = useAuthStore()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedToken = localStorage.getItem('accessToken')
    const storedCustomer = localStorage.getItem('customer')

    if (storedToken && storedCustomer) {
      setAccessToken(storedToken)
      setCustomer(JSON.parse(storedCustomer))
      router.push('/compte')
    }
  }, [router, setAccessToken, setCustomer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_CREATE_MUTATION,
          variables: {
            input: formData,
          },
        }),
      })

      const { data } = await response.json()

      if (data?.customerCreate?.customer) {
        toast.success('Compte créé avec succès')
        router.push('/auth/connexion')
      } else if (data?.customerCreate?.customerUserErrors?.length > 0) {
        setError(data.customerCreate.customerUserErrors[0].message)
        toast.error(data.customerCreate.customerUserErrors[0].message)
      }
    } catch (err) {
      setError('Une erreur est survenue')
      toast.error('Une erreur est survenue')
      console.error('Registration error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <main className="container mx-auto px-4 pt-24 flex-grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto py-12 flex-grow flex flex-col"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Créer un compte</h1>
            <p className="text-gray-400">Rejoignez notre communauté</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    placeholder="Nom"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full group"
              disabled={loading}
            >
              {loading ? (
                'Inscription...'
              ) : (
                <>
                  S'inscrire
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Déjà un compte ?{' '}
                <Link
                  href="/auth/connexion"
                  className="text-primary hover:underline font-medium"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
