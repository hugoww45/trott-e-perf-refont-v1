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
  CircleDot
} from 'lucide-react'

// Solutions aux problèmes de roues
const wheelSolutions = [
  {
    id: 'wheel-wear',
    title: 'Usure des pneus',
    icon: CircleDot,
    steps: [
      "Vérifiez régulièrement l'usure de la bande de roulement",
      "Inspectez les pneus pour détecter les coupures ou déchirures",
      "Contrôlez la pression des pneus (généralement entre 2.5 et 3 bars)",
      "Remplacez les pneus si la bande de roulement est trop usée",
      "Assurez-vous que les pneus sont correctement alignés"
    ]
  },
  {
    id: 'wheel-maintenance',
    title: 'Maintenance des roues',
    icon: Wrench,
    steps: [
      "Nettoyez régulièrement les roues et les pneus",
      "Vérifiez le serrage des écrous de roue",
      "Contrôlez l'état des roulements",
      "Lubrifiez les roulements si nécessaire",
      "Vérifiez l'alignement des roues"
    ]
  },
  {
    id: 'wheel-performance',
    title: 'Performance des roues',
    icon: Gauge,
    steps: [
      "Maintenez une pression de pneus optimale",
      "Évitez les surfaces abrasives quand c'est possible",
      "Nettoyez les roues après utilisation sur terrain humide",
      "Vérifiez régulièrement l'équilibrage des roues",
      "Remplacez les roulements si vous entendez des bruits anormaux"
    ]
  }
]

// FAQ spécifique aux roues
const wheelFAQs = [
  {
    question: "À quelle fréquence dois-je vérifier la pression des pneus ?",
    answer: "Il est recommandé de vérifier la pression des pneus au moins une fois par semaine. La pression optimale se situe généralement entre 2.5 et 3 bars. Une pression incorrecte peut affecter la performance, l'autonomie et la sécurité."
  },
  {
    question: "Comment savoir si mes pneus doivent être remplacés ?",
    answer: "Les pneus doivent être remplacés lorsque la bande de roulement est trop usée (moins de 1mm), en cas de coupures profondes, ou si vous constatez des déformations. Une usure irrégulière peut également indiquer un problème d'alignement."
  },
  {
    question: "Puis-je utiliser ma trottinette par temps de pluie ?",
    answer: "Oui, mais avec précaution. Les pneus perdent de l'adhérence sur sol mouillé. Réduisez votre vitesse, évitez les freinages brusques et les virages serrés. Après utilisation sous la pluie, nettoyez et séchez les roues."
  },
  {
    question: "Comment entretenir les roulements ?",
    answer: "Les roulements doivent être nettoyés et lubrifiés régulièrement, surtout après utilisation sur terrain humide ou poussiéreux. Si vous entendez des bruits de roulement ou si les roues ne tournent pas librement, il est temps de les entretenir ou de les remplacer."
  }
]

// Symptômes visuels des problèmes de roues
const wheelSymptoms = [
  {
    symptom: "Vibrations excessives",
    explanation: "Peut indiquer des pneus mal gonflés, des roulements usés ou des roues déséquilibrées. Vérifiez la pression et l'état des roulements."
  },
  {
    symptom: "Bruits de roulement anormaux",
    explanation: "Souvent causé par des roulements usés ou mal lubrifiés. Un entretien ou un remplacement des roulements peut être nécessaire."
  },
  {
    symptom: "Usure irrégulière des pneus",
    explanation: "Peut indiquer un problème d'alignement ou de pression incorrecte. Vérifiez l'alignement des roues et la pression des pneus."
  },
  {
    symptom: "Roues qui se bloquent",
    explanation: "Peut être dû à des roulements endommagés ou à des débris coincés. Nettoyez les roues et vérifiez l'état des roulements."
  }
]

export default function WheelIssuePage() {
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
              <CircleDot className="w-4 h-4 mr-1.5" />
              Guide de dépannage
            </div>
            <h1 className="text-4xl font-medium mb-4">Problèmes de roues</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Solutions et conseils pour maintenir vos roues en parfait état
            </p>
          </motion.div>
        </div>

        {/* Problèmes courants et solutions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {wheelSolutions.map((solution, index) => (
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
                Identifiez ces symptômes pour diagnostiquer les problèmes de roues à temps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {wheelSymptoms.map((item, index) => (
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
                Réponses aux questions les plus courantes sur les roues
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {wheelFAQs.map((faq, index) => (
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
