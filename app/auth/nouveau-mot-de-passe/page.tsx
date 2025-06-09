"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { toast } from 'sonner'
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PasswordStrength, usePasswordValidation } from '@/components/ui/password-strength'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Récupération des paramètres depuis l'URL
  const token = searchParams?.get('token')
  const customerId = searchParams?.get('id')

  // Validation du mot de passe
  const passwordValidation = usePasswordValidation(password)

  // Validation des paramètres
  useEffect(() => {
    console.log('URL Parameters:', { token, customerId })
    if (!token || !customerId) {
      setError('Lien de réinitialisation invalide ou expiré')
    } else {
      console.log('Token et customerId valides:', { token: token.substring(0, 8) + '...', customerId })
    }
  }, [token, customerId])

  // Validation du mot de passe
  const validatePassword = (pwd: string) => {
    if (pwd.length < 8) return false
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validations
    if (!token || !customerId) {
      setError('Lien de réinitialisation invalide')
      setLoading(false)
      return
    }

    if (!passwordValidation.isValid) {
      setError('Le mot de passe ne respecte pas les critères de sécurité')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          resetToken: token,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      if (data.success) {
        setSuccess(true)

        // Message différent selon l'environnement
        if (data.devNote) {
          toast.success('Réinitialisation simulée (mode développement)')
          console.warn('Mode développement:', data.devNote)
        } else {
          toast.success('Votre mot de passe a été réinitialisé avec succès')
        }

        // Redirection après 3 secondes (plus de temps pour lire le message de dev)
        setTimeout(() => {
          router.push('/auth/connexion')
        }, data.devNote ? 3000 : 2000)
      } else {
        throw new Error(data.error || 'Échec de la réinitialisation')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Password reset error:', err)
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
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Nouveau mot de passe</h1>
            <p className="text-gray-400">Entrez votre nouveau mot de passe</p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <p className="text-green-600 font-medium">
                Votre mot de passe a été réinitialisé avec succès !
              </p>
              <p className="text-gray-400 text-sm">
                Vous allez être redirigé vers la page de connexion...
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password">Nouveau mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 pr-12"
                    placeholder="Minimum 8 caractères"
                    disabled={!token || !customerId}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Indicateur de force du mot de passe */}
                <PasswordStrength password={password} className="mt-2" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-10 pr-12"
                    placeholder="Confirmez votre mot de passe"
                    disabled={!token || !customerId}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-md"
                >
                  <p className="text-red-600 text-sm">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading || !token || !customerId}
              >
                {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
              </Button>

              <div className="text-center">
                <Link
                  href="/auth/connexion"
                  className="text-sm text-gray-400 hover:text-primary"
                >
                  Retour à la connexion
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
