"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getStorefrontApiUrl, getPublicTokenHeaders } from '@/lib/shopify/client'
import { CUSTOMER_CREATE_MUTATION } from '@/lib/shopify/queries'
import { useAuthStore } from '@/stores/auth'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { AlertCircle } from 'lucide-react'
import { formatPhoneNumber } from '@/lib/utils'

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
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { setAccessToken, setCustomer } = useAuthStore()

  useEffect(() => {
    setMounted(true)

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
      // Formatage du numéro de téléphone avant l'envoi
      const formattedData = {
        ...formData,
        phone: formData.phone ? formatPhoneNumber(formData.phone) : '',
      }

      const response = await fetch(getStorefrontApiUrl(), {
        method: 'POST',
        headers: getPublicTokenHeaders(),
        body: JSON.stringify({
          query: CUSTOMER_CREATE_MUTATION,
          variables: {
            input: formattedData,
          },
        }),
      })

      const { data } = await response.json()

      if (data?.customerCreate?.customer) {
        // Animation de succès avant redirection
        setSuccess(true)
        toast.success('Compte créé avec succès')

        setTimeout(() => {
          router.push('/auth/connexion')
        }, 1500)
      } else if (data?.customerCreate?.customerUserErrors?.length > 0) {
        const errorMessage = data.customerCreate.customerUserErrors[0].message
        // Gérer spécifiquement les erreurs liées au numéro de téléphone
        if (errorMessage.toLowerCase().includes('phone')) {
          setError('Format de numéro de téléphone invalide. Utilisez le format international (ex: +33612345678)')
          toast.error('Format de numéro de téléphone invalide')
        } else {
          setError(errorMessage)
          toast.error(errorMessage)
        }
      }
    } catch (err) {
      setError('Une erreur est survenue')
      toast.error('Une erreur est survenue')
      console.error('Registration error:', err)
    } finally {
      if (!success) setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
              key="register-container"
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
                    src="/logo.png"
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
                <h1 className="text-3xl font-medium mb-3">Créer un compte</h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                  Rejoignez notre communauté
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
                      <p className="text-xl font-medium mb-1">Compte créé avec succès</p>
                      <p className="text-neutral-500 dark:text-neutral-400">Redirection vers la page de connexion...</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="register-form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Prénom</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="rounded-xl h-12 px-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:ring-0 text-base"
                              placeholder="Prénom"
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Nom</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="rounded-xl h-12 px-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:ring-0 text-base"
                              placeholder="Nom"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="rounded-xl h-12 px-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:ring-0 text-base"
                            placeholder="votre@email.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Téléphone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="rounded-xl h-12 px-4 bg-neutral-100 dark:bg-neutral-800 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 focus:ring-0 text-base"
                            placeholder="+33 6 12 34 56 78"
                          />
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 ml-1">Format: +33612345678 ou 0612345678</p>
                        </div>

                        <div>
                          <Label htmlFor="password" className="text-sm font-normal ml-1 mb-1.5 block text-neutral-600 dark:text-neutral-400">Mot de passe</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
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
                        {loading ? 'Inscription en cours...' : 'Créer un compte'}
                      </Button>

                      <div className="flex items-center gap-2 pt-1">
                        <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-grow"></div>
                        <span className="text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-medium">ou</span>
                        <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-grow"></div>
                      </div>

                      <div className="text-center">
                        <Link
                          href="/auth/connexion"
                          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors inline-block"
                        >
                          Déjà un compte ? Se connecter
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
                  En créant un compte, vous acceptez nos{' '}
                  <Link href="/conditions-generales" className="text-black dark:text-white underline underline-offset-2">
                    Conditions d'utilisation
                  </Link>{' '}
                  et notre{' '}
                  <Link href="/politique-confidentialite" className="text-black dark:text-white underline underline-offset-2">
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
