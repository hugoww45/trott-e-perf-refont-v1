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
  AlertTriangle,
  Thermometer,
  Zap,
  Clock,
  ChevronRight,
  CheckCircle2,
  Settings,
  Shield,
  Wrench
} from 'lucide-react'

export default function BatteryDiagnosticPage() {
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
              <AlertTriangle className="w-4 h-4 mr-1.5" />
              Guide de diagnostic
            </div>
            <h1 className="text-4xl font-medium mb-4">Comment diagnostiquer les problèmes de batterie</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Guide étape par étape pour identifier et résoudre les problèmes courants de batterie
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="prose dark:prose-invert max-w-none">
                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Symptômes courants</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Problèmes de température</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Batterie anormalement chaude</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Chauffe excessive pendant la charge</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Refroidissement rapide de la batterie</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Variations de température importantes</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Problèmes de performance</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Autonomie réduite soudainement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Décharge rapide de la batterie</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Problèmes de charge intermittents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                          <span>Indicateur de niveau instable</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Vérifications préliminaires</h2>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Liste de contrôle</h3>
                      <div className="bg-neutral-100 dark:bg-neutral-700/50 rounded-lg p-4">
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <span>Vérifiez le chargeur et le câble</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <span>Inspectez les connecteurs de la batterie</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <span>Vérifiez les voyants d'état</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                            <span>Testez sur une autre prise électrique</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Tests de diagnostic</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Test de charge</h3>
                      </div>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">1</div>
                          <span>Déchargez complètement la batterie</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">2</div>
                          <span>Chargez pendant 4-6 heures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">3</div>
                          <span>Vérifiez le temps de charge</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">4</div>
                          <span>Notez la température pendant la charge</span>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-neutral-50 dark:bg-neutral-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                          <BatteryCharging className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-medium">Test de décharge</h3>
                      </div>
                      <ol className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">1</div>
                          <span>Chargez à 100%</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">2</div>
                          <span>Utilisez en mode normal</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">3</div>
                          <span>Mesurez le temps jusqu'à décharge</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded text-xs font-medium text-blue-600 dark:text-blue-400 min-w-[20px] h-5 flex items-center justify-center">4</div>
                          <span>Vérifiez la courbe de décharge</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </section>

                <section className="mb-12 bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-6">Solutions recommandées</h2>
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Actions à entreprendre</h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Calibrez la batterie si nécessaire</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Mettez à jour le firmware</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Nettoyez les contacts</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                            <span>Contactez le support si les problèmes persistent</span>
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
                        <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Diagnostic systématique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Tests de performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded">
                        <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Sécurité avant tout</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg mb-6">
                  <h3 className="text-lg font-medium mb-4">Quand contacter le support</h3>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <p className="text-sm text-red-600 dark:text-red-400 mb-3">
                      <strong>Contactez notre service technique si vous observez :</strong>
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Une baisse soudaine de plus de 30% de l'autonomie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Des problèmes de charge persistants</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Une surchauffe anormale</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                        <span>Des messages d'erreur répétés</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-medium mb-4">Articles connexes</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link href="/support/batterie/entretien" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Guide d'entretien
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/batterie/optimisation" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Optimiser l'autonomie
                      </Link>
                    </li>
                    <li>
                      <Link href="/support/batterie/durabilite" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <ChevronRight className="w-4 h-4" />
                        Maximiser la durée de vie
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
