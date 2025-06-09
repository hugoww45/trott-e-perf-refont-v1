"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Link from 'next/link'
import { toast } from 'sonner'
import { Mail, ArrowRight } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    setSuccess(false)

    try {
      const response = await fetch('/api/reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Une erreur est survenue')
      }

      if (data.success) {
        setSuccess(true)
        toast.success(data.message || 'Instructions envoyées par email')
        setEmail('')
      } else {
        throw new Error(data.error || 'Une erreur est survenue')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setError(errorMessage)
      toast.error(errorMessage)
      console.error('Password recovery error:', err)
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
            <h1 className="text-4xl font-bold mb-4">Mot de passe oublié</h1>
            <p className="text-gray-400">Entrez votre email pour réinitialiser votre mot de passe</p>
          </div>

          {success ? (
            <div className="text-center space-y-4">
              <p className="text-green-500">
                Si un compte existe avec cet email, vous recevrez les instructions pour réinitialiser votre mot de passe.
              </p>
              <Link
                href="/auth/connexion"
                className="text-primary hover:underline font-medium inline-block"
              >
                Retour à la connexion
              </Link>
            </div>
          ) : (
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

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full group"
                disabled={loading}
              >
                {loading ? (
                  'Envoi...'
                ) : (
                  <>
                    Envoyer les instructions
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
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
