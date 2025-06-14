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
  AlertTriangle,
  Stethoscope,
  Zap,
  Thermometer,
  Settings,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Search,
  Wrench
} from 'lucide-react'

export default function MotorDiagnosticPage() {
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
              <Stethoscope className="w-4 h-4 mr-1.5" />
              Guide de diagnostic
            </div>
            <h1 className="text-4xl font-medium mb-4">Diagnostic des pannes moteur</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Guide complet pour identifier et diagnostiquer les problèmes de moteur
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Méthode de diagnostic</h2>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg mb-4">
                        Un diagnostic méthodique permet d'identifier rapidement la source des problèmes
                        et d'appliquer la solution appropriée.
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-700/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Important :</strong> Effectuez toujours les vérifications de sécurité
                          avant de commencer le diagnostic.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Symptômes et causes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <XCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Moteur ne démarre pas</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Vérifiez la charge de la batterie</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Contrôlez les connexions électriques</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Testez le contrôleur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Vérifiez les capteurs</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Perte de puissance</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Examinez l'état de la batterie</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Vérifiez les paramètres du contrôleur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Contrôlez la température</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Inspectez les bobinages</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Tests de diagnostic</h2>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium">Procédure de test</h3>
                    </div>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">1</div>
                        <span>Effectuez un test de continuité électrique</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">2</div>
                        <span>Mesurez la résistance des bobinages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">3</div>
                        <span>Vérifiez les signaux des capteurs Hall</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">4</div>
                        <span>Testez la réponse du contrôleur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">5</div>
                        <span>Analysez les codes d'erreur</span>
                      </li>
                    </ol>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Diagnostic sonore</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Bruits normaux</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Léger bourdonnement électrique</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Sifflement aigu à haute vitesse</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Clics légers lors des changements</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-lg font-medium">Bruits anormaux</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                          <span>Grincements métalliques</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                          <span>Claquements répétés</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                          <span>Vibrations excessives</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Codes d'erreur courants</h2>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Interprétation des codes</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-xs font-mono">E01</span>
                            <span>Surtension - Vérifiez la batterie</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-xs font-mono">E02</span>
                            <span>Sous-tension - Rechargez la batterie</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-xs font-mono">E03</span>
                            <span>Surchauffe - Laissez refroidir</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="bg-amber-100 dark:bg-amber-900/30 px-2 py-1 rounded text-xs font-mono">E04</span>
                            <span>Capteur Hall défaillant</span>
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
                        <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Diagnostic méthodique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Analyse sonore</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Tests électriques</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Outils nécessaires</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">
                      <strong>Pour un diagnostic complet :</strong>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span>Multimètre</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span>Testeur de continuité</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span>Oscilloscope (optionnel)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Wrench className="w-4 h-4 text-blue-500 mt-0.5" />
                        <span>Manuel technique</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Quand contacter un expert</h3>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                      <strong>Faites appel à un technicien si :</strong>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Problème électrique complexe</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Réparation des bobinages</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Remplacement du contrôleur</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Diagnostic avancé requis</span>
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
                      <Link href="/support/moteur/performance" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Optimiser les performances
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
