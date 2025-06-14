"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from '@/stores/auth'
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_ACCESS_TOKEN_CREATE, CUSTOMER_QUERY } from '@/lib/shopify/queries'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { ArrowRight, AlertCircle } from 'lucide-react'

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
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { setAccessToken, setCustomer } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

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

          // Animation de succès avant redirection
          setSuccess(true)
          toast.success('Connexion réussie')

          setTimeout(() => {
            router.push('/compte')
          }, 800)
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
      if (!success) setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex flex-col">
      <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
        <Navigation />
      </div>

      <main className="flex-grow flex items-center justify-center z-10 px-4 pt-24 pb-12">
        <AnimatePresence mode="wait">
          {!mounted ? (
            <div className="w-full h-[70vh] flex items-center justify-center">
              <span className="sr-only">Chargement...</span>
            </div>
          ) : (
            <motion.div
              key="login-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 flex justify-center"
              >
                <div className="relative w-12 h-12">
                  <Image
                    src="/static/logo.png"
                    alt="Trott e Perf"
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-medium mb-3">Connexion</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                  Accédez à votre espace personnel
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8 rounded-2xl bg-white dark:bg-neutral-900 shadow-[0_2px_10px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)] px-6 py-8 border border-neutral-200/50 dark:border-neutral-800/50"
              >
                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="py-6 text-center"
                    >
                      <svg className="w-12 h-12 text-green-500 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" strokeWidth="1.5" stroke="currentColor" />
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="text-xl font-medium mb-1">Connexion réussie</p>
                      <p className="text-neutral-500 dark:text-neutral-400">Redirection en cours...</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="login-form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-xl h-12 px-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:ring-0 text-base"
                            placeholder="votre@email.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="password" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Mot de passe</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="rounded-xl h-12 px-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:ring-0 text-base"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-3 flex items-start gap-2 text-red-600 dark:text-red-400"
                          >
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <p className="text-sm">{error}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        type="submit"
                        className={`w-full h-12 rounded-xl text-base font-medium transition-all duration-300 ${
                          loading
                            ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
                            : 'bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200'
                        }`}
                        disabled={loading}
                      >
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                      </Button>

                      <div className="flex items-center gap-2 pt-1">
                        <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-grow"></div>
                        <span className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-medium">ou</span>
                        <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-grow"></div>
                      </div>

                      <div>
                        <Link href="/auth/inscription" passHref>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full h-12 rounded-xl text-base border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black dark:text-white font-medium"
                          >
                            Créer un compte
                          </Button>
                        </Link>
                      </div>

                      <div className="text-center">
                        <Link
                          href="/auth/mot-de-passe-oublie"
                          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors inline-block"
                        >
                          Mot de passe oublié ?
                        </Link>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  En vous connectant, vous acceptez nos{' '}
                  <Link href="/conditions-generales-vente" className="text-black dark:text-white underline underline-offset-2">
                    Conditions d'utilisation
                  </Link>{' '}
                  et notre{' '}
                  <Link href="/politique-de-confidentialite" className="text-black dark:text-white underline underline-offset-2">
                    Politique de confidentialité
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
