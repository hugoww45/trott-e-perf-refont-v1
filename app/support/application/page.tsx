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
  Wrench,
  Settings,
  Gauge,
  RotateCcw,
  Cog,
  Play,
  ChevronRight,
  HelpCircle,
  Smartphone
} from 'lucide-react'

// Solutions aux problèmes d'application
const appSolutions = [
  {
    id: 'connection-issues',
    title: 'Problèmes de connexion',
    icon: Smartphone,
    steps: [
      "Vérifiez que le Bluetooth est activé sur votre téléphone",
      "Assurez-vous que l'application est à jour",
      "Redémarrez l'application et la trottinette",
      "Vérifiez que vous êtes à portée de la trottinette",
      "Réinitialisez la connexion Bluetooth si nécessaire"
    ]
  },
  {
    id: 'app-performance',
    title: 'Performance de l\'application',
    icon: Gauge,
    steps: [
      "Fermez les autres applications en arrière-plan",
      "Vérifiez votre connexion internet",
      "Nettoyez le cache de l'application",
      "Mettez à jour l'application si disponible",
      "Redémarrez votre téléphone si les problèmes persistent"
    ]
  },
  {
    id: 'data-sync',
    title: 'Synchronisation des données',
    icon: RotateCcw,
    steps: [
      "Vérifiez votre connexion internet",
      "Assurez-vous d'être connecté à votre compte",
      "Forcez la synchronisation manuellement",
      "Vérifiez les paramètres de synchronisation",
      "Contactez le support si les données ne se synchronisent pas"
    ]
  }
]

// FAQ spécifique à l'application
const appFAQs = [
  {
    question: "Comment mettre à jour l'application ?",
    answer: "Les mises à jour sont disponibles sur l'App Store (iOS) ou le Play Store (Android). Activez les mises à jour automatiques ou vérifiez régulièrement les mises à jour disponibles. Il est recommandé de toujours utiliser la dernière version pour une meilleure compatibilité et sécurité."
  },
  {
    question: "L'application ne se connecte pas à ma trottinette, que faire ?",
    answer: "Vérifiez que le Bluetooth est activé, que vous êtes à portée de la trottinette, et que celle-ci est allumée. Essayez de redémarrer l'application et la trottinette. Si le problème persiste, réinitialisez la connexion Bluetooth dans les paramètres de l'application."
  },
  {
    question: "Comment sécuriser mon compte ?",
    answer: "Utilisez un mot de passe fort, activez l'authentification à deux facteurs si disponible, ne partagez pas vos identifiants, et déconnectez-vous de l'application lorsque vous ne l'utilisez pas. Vérifiez régulièrement l'activité de votre compte."
  },
  {
    question: "Les données de trajet ne s'affichent pas correctement",
    answer: "Vérifiez votre connexion internet et assurez-vous que l'application est à jour. Essayez de forcer la synchronisation manuellement. Si le problème persiste, contactez le support technique avec les détails du problème."
  }
]

// Symptômes visuels des problèmes d'application
const appSymptoms = [
  {
    symptom: "Application qui se bloque",
    explanation: "Peut être dû à une version obsolète, un cache corrompu ou des problèmes de mémoire. Essayez de mettre à jour l'application et de nettoyer le cache."
  },
  {
    symptom: "Connexion instable",
    explanation: "Vérifiez la distance avec la trottinette, les interférences Bluetooth et l'état de la batterie de votre téléphone. Redémarrez le Bluetooth si nécessaire."
  },
  {
    symptom: "Données manquantes",
    explanation: "Problème de synchronisation ou de connexion internet. Vérifiez votre connexion et forcez la synchronisation manuellement."
  },
  {
    symptom: "Erreurs d'affichage",
    explanation: "Peut indiquer un problème de compatibilité ou de cache. Mettez à jour l'application et nettoyez le cache."
  }
]

export default function AppIssuePage() {
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
        {/* En-tête avec fil d'Ariane */}
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/support"
            className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au support
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-1 px-3 rounded-full">
              <Smartphone className="w-4 h-4 mr-1.5" />
              Guide de dépannage
            </div>
            <h1 className="text-4xl font-medium mb-4">Problèmes d'application</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Solutions et conseils pour une utilisation optimale de l'application
            </p>
          </motion.div>
        </div>

        {/* Problèmes courants et solutions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {appSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-12 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="p-6 md:p-8 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                      {solution.icon && <solution.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />}
                    </div>
                    <h2 className="text-2xl font-medium">{solution.title}</h2>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Suivez ces étapes pour résoudre ce problème :
                  </p>
                </div>

                <div className="p-6 md:p-8">
                  <ul className="space-y-5">
                    {solution.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          {stepIndex + 1}
                        </div>
                        <p className="flex-1">{step}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Diagnostic visuel */}
        <section className="py-12 bg-neutral-100 dark:bg-neutral-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-medium mb-4">Signes d'alerte</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Identifiez ces symptômes pour diagnostiquer les problèmes d'application à temps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {appSymptoms.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full">
                      <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{item.symptom}</h3>
                      <p className="text-neutral-600 dark:text-neutral-400">{item.explanation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-medium mb-4">Questions fréquentes</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Réponses aux questions les plus courantes sur l'application
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {appFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700"
                >
                  <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
