"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Gauge,
  Zap,
  Settings,
  TrendingUp,
  Wind,
  Mountain,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Thermometer
} from 'lucide-react'

export default function MotorPerformancePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex flex-col">
      <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
        <Navigation />
      </div>

      <main className="flex-grow pt-24 z-10">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/support/moteur"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux problèmes de moteur
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full">
              <TrendingUp className="w-4 h-4 mr-1.5" />
              Guide d'optimisation
            </div>
            <h1 className="text-4xl font-medium mb-4">Optimiser les performances du moteur</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Conseils d'experts pour maintenir votre moteur au maximum de ses capacités
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Facteurs de performance</h2>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Gauge className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg mb-4">
                        Les performances de votre moteur dépendent de plusieurs facteurs que vous pouvez
                        optimiser pour obtenir le meilleur rendement possible.
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-700/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Note :</strong> Une optimisation régulière peut améliorer les performances
                          jusqu'à 15% et prolonger la durée de vie du moteur.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Paramètres d'utilisation</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Gestion de la puissance</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Utilisez le mode approprié selon le terrain</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Évitez les accélérations brusques</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Maintenez une vitesse constante</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Anticipez les arrêts</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Wind className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Conditions environnementales</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Adaptez votre conduite au vent</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Évitez les températures extrêmes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Protégez le moteur de l'humidité</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Nettoyez régulièrement</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Optimisations techniques</h2>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium">Réglages avancés</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Calibrez régulièrement le contrôleur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Mettez à jour le firmware</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Vérifiez les paramètres de couple</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>Optimisez les courbes d'accélération</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Gestion thermique</h2>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                        <Thermometer className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Contrôle de la température</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Surveillez la température du moteur</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Laissez refroidir après usage intensif</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Évitez la surcharge prolongée</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Assurez une ventilation adéquate</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Points clés</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Gauge className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Gestion de la puissance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Réglages techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Thermometer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Contrôle thermique</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Conseils d'utilisation</h3>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                      <strong>Pour des performances optimales :</strong>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Effectuez un rodage de 100 km</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Maintenez une charge optimale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Adaptez votre style de conduite</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                        <span>Entretenez régulièrement</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-medium mb-4">Articles connexes</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/support/moteur/entretien" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Guide d'entretien
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/moteur/problemes" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Problèmes courants
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/moteur/diagnostic" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Diagnostic des pannes
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
