"use client"

import { motion } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from 'next/link'
import { ArrowLeft, Shield, Cookie, Settings, Eye, Megaphone } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white">
      <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
        <Navigation />
      </div>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Fil d'Ariane */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <Cookie className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
              </div>
              <h1 className="text-4xl font-medium">Politique de cookies</h1>
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          {/* Contenu principal */}
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2>Qu'est-ce que les cookies ?</h2>
              <p>
                Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez notre site web.
                Ils nous permettent de vous offrir une meilleure expérience de navigation et de comprendre comment vous
                utilisez notre site.
              </p>
            </motion.section>

            {/* Types de cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-medium">Types de cookies utilisés</h2>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-medium">Cookies de mesure d'audience</h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Ces cookies nous permettent d'analyser l'utilisation du site et d'améliorer ses performances.
                    Ils collectent des informations anonymes sur les pages visitées et le temps passé sur le site.
                  </p>
                </div>

                <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Megaphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium">Cookies marketing</h3>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Ces cookies sont utilisés pour vous proposer des publicités personnalisées en fonction de vos
                    centres d'intérêt et de votre navigation sur notre site.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Gestion des cookies */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="prose dark:prose-invert max-w-none"
            >
              <h2>Comment gérer vos cookies ?</h2>
              <p>
                Vous pouvez à tout moment modifier vos préférences en matière de cookies en utilisant notre
                panneau de gestion des cookies accessible depuis le bouton "Paramétrer" de la bannière de cookies.
              </p>
              <p>
                Vous pouvez également configurer votre navigateur pour refuser tous les cookies ou être informé
                lorsqu'un cookie est envoyé. Cependant, certaines fonctionnalités du site pourraient ne plus
                fonctionner correctement.
              </p>
            </motion.section>

            {/* Protection des données */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-neutral-50 dark:bg-neutral-900/50 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-medium">Protection de vos données</h2>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                Nous nous engageons à protéger vos données personnelles. Les informations collectées via les cookies
                sont traitées conformément à notre politique de confidentialité et aux réglementations en vigueur.
              </p>
              <Link
                href="/legal/confidentialite"
                className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                Consulter notre politique de confidentialité
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
