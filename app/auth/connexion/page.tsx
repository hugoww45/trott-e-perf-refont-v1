"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from '@/stores/auth'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_QUERY } from '@/lib/shopify/queries'
import Link from 'next/link'
import { toast } from 'sonner'
import { Mail, Lock, ArrowRight } from 'lucide-react'

// Fonction utilitaire pour gérer les requêtes API en toute sécurité
const safelyParseResponse = async (response: Response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error('Error parsing JSON:', e, 'Raw response:', text);
    throw new Error('Failed to parse server response');
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { setAccessToken, setCustomer } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const storedToken = localStorage.getItem('accessToken')
    const storedCustomer = localStorage.getItem('customer')

    if (storedToken && storedCustomer) {
      try {
        setAccessToken(storedToken)
        setCustomer(JSON.parse(storedCustomer))
        router.push('/compte')
      } catch (err) {
        console.error('Error parsing stored customer data:', err)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('customer')
      }
    }
  }, [router, setAccessToken, setCustomer])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Get access token
      const tokenResponse = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_ACCESS_TOKEN_CREATE,
          variables: {
            input: {
              email,
              password,
            },
          },
        }),
      })

      const jsonResponse = await safelyParseResponse(tokenResponse)
      const { data: tokenData, errors } = jsonResponse

      if (errors && errors.length > 0) {
        setError(errors[0].message || 'Erreur lors de la connexion')
        toast.error(errors[0].message || 'Erreur lors de la connexion')
        setLoading(false)
        return
      }

      if (tokenData?.customerAccessTokenCreate?.customerAccessToken?.accessToken) {
        const accessToken = tokenData.customerAccessTokenCreate.customerAccessToken.accessToken

        // Get customer data
        const customerResponse = await fetch(getStorefrontApiUrl(), {
          method: 'POST',
          headers: getPublicTokenHeaders(),
          body: JSON.stringify({
            query: CUSTOMER_QUERY,
            variables: {
              customerAccessToken: accessToken,
            },
          }),
        })

        const customerJsonResponse = await safelyParseResponse(customerResponse)
        const { data: customerData, errors: customerErrors } = customerJsonResponse

        if (customerErrors && customerErrors.length > 0) {
          setError(customerErrors[0].message || 'Erreur lors de la récupération des données utilisateur')
          toast.error(customerErrors[0].message || 'Erreur lors de la récupération des données utilisateur')
          setLoading(false)
          return
        }

        if (customerData?.customer) {
          setAccessToken(accessToken)
          setCustomer(customerData.customer)
          toast.success('Connexion réussie')
          router.push('/compte')
        } else {
          setError('Impossible de récupérer les informations utilisateur')
          toast.error('Impossible de récupérer les informations utilisateur')
        }
      } else {
        const customerErrors = tokenData?.customerAccessTokenCreate?.customerUserErrors
        if (customerErrors && customerErrors.length > 0) {
          setError(customerErrors[0].message || 'Email ou mot de passe incorrect')
          toast.error(customerErrors[0].message || 'Email ou mot de passe incorrect')
        } else {
          setError('Email ou mot de passe incorrect')
          toast.error('Email ou mot de passe incorrect')
        }
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Une erreur est survenue lors de la connexion')
      toast.error('Une erreur est survenue lors de la connexion')
    } finally {
      setLoading(false)
    }
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
            <h1 className="text-4xl font-bold mb-4">Bienvenue</h1>
            <p className="text-gray-400">Connectez-vous à votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                'Connexion...'
              ) : (
                <>
                  Se connecter
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>

            <div className="text-center space-y-4">
              <p className="text-sm text-gray-400">
                Pas encore de compte ?{' '}
                <Link
                  href="/auth/inscription"
                  className="text-primary hover:underline font-medium"
                >
                  S'inscrire
                </Link>
              </p>
              <Link
                href="/auth/mot-de-passe-oublie"
                className="text-sm text-gray-400 hover:text-primary block"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
