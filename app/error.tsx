"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Home, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log l'erreur à votre service de monitoring
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Icône d'erreur animée */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative inline-block"
          >
            <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full"
            />
          </motion.div>

          {/* Message d'erreur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-medium">Une erreur est survenue</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Désolé, une erreur inattendue s'est produite. Notre équipe technique a été notifiée.
            </p>
            {error.digest && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                ID d'erreur : {error.digest}
              </p>
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => reset()}
              variant="outline"
              className="h-12 px-6"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer
            </Button>
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="h-12 px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <Link href="/">
              <Button className="h-12 px-6">
                <Home className="w-4 h-4 mr-2" />
                Accueil
              </Button>
            </Link>
          </motion.div>

          {/* Message d'aide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-8 text-sm text-neutral-500 dark:text-neutral-400"
          >
            <p>Le problème persiste ? Contactez notre support</p>
            <Link
              href="/contact"
              className="text-neutral-900 dark:text-white hover:underline"
            >
              Nous contacter
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
