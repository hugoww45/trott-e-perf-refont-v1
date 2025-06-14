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
  BatteryCharging,
  Clock,
  Thermometer,
  Shield,
  ChevronRight,
  AlertTriangle,
  Zap,
  Gauge,
  Settings,
  CheckCircle2
} from 'lucide-react'

export default function BatteryDurabilityPage() {
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
            href="/support/batterie"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux problèmes de batterie
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full">
              <BatteryCharging className="w-4 h-4 mr-1.5" />
              Guide d'entretien
            </div>
            <h1 className="text-4xl font-medium mb-4">Comment maximiser la durée de vie de votre batterie</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Conseils pratiques pour préserver les performances et prolonger la durée de vie de votre batterie
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Comprendre le cycle de vie de votre batterie</h2>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg mb-4">
                        La batterie de votre trottinette électrique est conçue pour durer entre 300 et 500 cycles de charge complets.
                        Un cycle complet correspond à une décharge de 100% suivie d'une charge complète.
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-700/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Note :</strong> Plusieurs facteurs peuvent influencer cette durée de vie, notamment la température,
                          la fréquence d'utilisation et les conditions de charge.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Meilleures pratiques de charge</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Fréquence de charge</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Chargez avant décharge complète</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Charge complète mensuelle</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Débranchez après charge</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Conditions de charge</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Température idéale : 15-25°C</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Évitez le soleil direct</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Utilisez le chargeur d'origine</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Conseils d'utilisation</h2>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Points d'attention</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Évitez les démarrages brusques</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Maintenez une vitesse constante</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Adaptez la vitesse au niveau de charge</span>
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
                      <span>300-500 cycles de charge</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Charge optimale : 40-80%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Thermometer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Température idéale : 15-25°C</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-medium mb-4">Articles connexes</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/support/batterie/optimisation" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Optimiser l'autonomie
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/batterie/diagnostic" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Diagnostic des problèmes
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/batterie/entretien" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Guide d'entretien
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
