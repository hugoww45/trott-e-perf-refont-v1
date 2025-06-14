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
  Wrench,
  Clock,
  Settings,
  Cog,
  Shield,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Droplets
} from 'lucide-react'

export default function MotorMaintenancePage() {
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
              <Wrench className="w-4 h-4 mr-1.5" />
              Guide d'entretien
            </div>
            <h1 className="text-4xl font-medium mb-4">Guide d'entretien du moteur</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Conseils et bonnes pratiques pour maintenir votre moteur en parfait état
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Maintenance régulière</h2>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-lg mb-4">
                        Un entretien régulier de votre moteur est essentiel pour maintenir ses performances
                        et prolonger sa durée de vie.
                      </p>
                      <div className="bg-neutral-100 dark:bg-neutral-700/50 rounded-lg p-4">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong>Note :</strong> Assurez-vous que la trottinette est éteinte et déconnectée
                          avant tout entretien.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Entretien périodique</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Vérifications mensuelles</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Nettoyage du moteur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Vérification des connexions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Contrôle des roulements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Inspection des câbles</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Cog className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Outils nécessaires</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Chiffon doux et sec</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Huile de lubrification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Tournevis adaptés</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Nettoyant spécialisé</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Procédures de nettoyage</h2>
                  <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                        <Droplets className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-lg font-medium">Étapes de nettoyage</h3>
                    </div>
                    <ol className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">1</div>
                        <span>Éteignez complètement la trottinette</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">2</div>
                        <span>Retirez la batterie si possible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">3</div>
                        <span>Nettoyez avec un chiffon légèrement humide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">4</div>
                        <span>Séchez complètement toutes les surfaces</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">5</div>
                        <span>Lubrifiez les pièces mobiles si nécessaire</span>
                      </li>
                    </ol>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Vérifications techniques</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Contrôles de sécurité</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Vérifiez les fixations du moteur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Contrôlez l'isolation électrique</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Testez les connexions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Inspectez l'état des câbles</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Optimisation des performances</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Calibrez le moteur</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Vérifiez les paramètres</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Testez la réponse</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Contrôlez la température</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Précautions importantes</h2>
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
                            <span>Ne jamais utiliser d'eau sous pression</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Éviter les produits chimiques abrasifs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Ne pas démonter le moteur sans expertise</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Respecter les intervalles de maintenance</span>
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
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Entretien mensuel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Contrôles de sécurité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Settings className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Optimisation des performances</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Quand faire appel à un professionnel</h3>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                      <strong>Contactez un technicien qualifié si :</strong>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Bruits anormaux persistants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Problèmes de performance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Réparations complexes nécessaires</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Maintenance majeure requise</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-medium mb-4">Articles connexes</h3>
                  <ul className="space-y-4">
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
