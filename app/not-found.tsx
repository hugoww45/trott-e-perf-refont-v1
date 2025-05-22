"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Numéro d'erreur animé */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <h1 className="text-[120px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400">
              404
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full"
            />
          </motion.div>

          {/* Message d'erreur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-medium">Page non trouvée</h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
              Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              className="h-12 px-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="h-12 px-6"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
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
            <p>Besoin d'aide ? Contactez notre support</p>
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
