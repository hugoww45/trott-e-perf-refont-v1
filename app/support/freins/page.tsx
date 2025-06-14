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
  CircleStop
} from 'lucide-react'

// Solutions aux problèmes de freins
const brakeSolutions = [
  {
    id: 'brake-wear',
    title: 'Usure des freins',
    icon: CircleStop,
    steps: [
      "Vérifiez l'épaisseur des plaquettes de frein (minimum 2mm)",
      "Inspectez les disques de frein pour détecter les rayures ou déformations",
      "Nettoyez régulièrement les freins avec un produit adapté",
      "Ajustez la tension du câble de frein si nécessaire",
      "Remplacez les plaquettes si elles sont trop usées"
    ]
  },
  {
    id: 'brake-adjustment',
    title: 'Ajustement des freins',
    icon: Settings,
    steps: [
      "Vérifiez la tension du câble de frein",
      "Ajustez la position des plaquettes par rapport au disque",
      "Contrôlez le jeu de la poignée de frein",
      "Assurez-vous que les freins se desserrent correctement",
      "Testez les freins à basse vitesse après chaque ajustement"
    ]
  },
  {
    id: 'brake-performance',
    title: 'Performance des freins',
    icon: Gauge,
    steps: [
      "Vérifiez la pression des pneus (influence la distance de freinage)",
      "Contrôlez l'alignement des roues",
      "Nettoyez les disques et plaquettes de frein",
      "Vérifiez l'état des câbles et gaines",
      "Testez les freins sur différentes surfaces"
    ]
  }
]

// FAQ spécifique aux freins
const brakeFAQs = [
  {
    question: "À quelle fréquence dois-je entretenir mes freins ?",
    answer: "Un entretien régulier est recommandé tous les 3 mois ou après 500 km d'utilisation. Vérifiez l'usure des plaquettes, la tension des câbles et l'état des disques. Un entretien plus fréquent est nécessaire si vous roulez dans des conditions difficiles (pluie, poussière, etc.)."
  },
  {
    question: "Comment savoir si mes plaquettes de frein sont usées ?",
    answer: "Les plaquettes doivent être remplacées lorsque leur épaisseur est inférieure à 2mm. Vous pouvez également remarquer une diminution de l'efficacité du freinage, des bruits anormaux ou des vibrations lors du freinage. Une inspection visuelle régulière est recommandée."
  },
  {
    question: "Puis-je remplacer les plaquettes de frein moi-même ?",
    answer: "Le remplacement des plaquettes est possible en suivant les instructions du manuel d'utilisation. Cependant, si vous n'êtes pas à l'aise avec la mécanique, il est recommandé de faire appel à un technicien qualifié pour garantir un freinage optimal et sécurisé."
  },
  {
    question: "Comment améliorer la performance de mes freins ?",
    answer: "Maintenez une pression de pneus correcte, gardez les freins propres et secs, évitez les freinages brusques prolongés, et effectuez un entretien régulier. L'utilisation de plaquettes de qualité et le bon alignement des roues sont également importants."
  }
]

// Symptômes visuels des problèmes de freins
const brakeSymptoms = [
  {
    symptom: "Freinage insuffisant ou mou",
    explanation: "Peut indiquer des plaquettes usées, des câbles détendus ou des disques contaminés. Vérifiez l'état des composants et ajustez la tension des câbles si nécessaire."
  },
  {
    symptom: "Bruits de grincement lors du freinage",
    explanation: "Souvent causé par des plaquettes usées ou des disques sales. Nettoyez les freins et remplacez les plaquettes si nécessaire."
  },
  {
    symptom: "Vibrations dans le guidon lors du freinage",
    explanation: "Peut indiquer des disques voilés ou mal alignés. Vérifiez l'alignement des roues et l'état des disques de frein."
  },
  {
    symptom: "Freins qui se bloquent",
    explanation: "Problème de tension excessive des câbles ou de mauvais alignement des plaquettes. Ajustez la tension et vérifiez l'alignement des composants."
  }
]

// Articles concernant les problèmes de freins
const brakePosts = [
  {
    title: 'Guide d\'entretien des freins',
    date: '15 mars 2024',
    excerpt: 'Conseils pratiques pour maintenir vos freins en parfait état de fonctionnement.',
    readTime: '5 min',
    link: '/support/freins/entretien'
  },
  {
    title: 'Comment ajuster vos freins',
    date: '1 février 2024',
    excerpt: 'Guide étape par étape pour un ajustement optimal de vos freins.',
    readTime: '4 min',
    link: '/support/freins/ajustement'
  },
  {
    title: 'Signes d\'usure des freins',
    date: '20 janvier 2024',
    excerpt: 'Apprenez à reconnaître les signes d\'usure de vos freins pour une maintenance préventive.',
    readTime: '3 min',
    link: '/support/freins/usure'
  },
  {
    title: 'Optimisation du freinage',
    date: '5 janvier 2024',
    excerpt: 'Techniques et conseils pour un freinage optimal et sécurisé.',
    readTime: '6 min',
    link: '/support/freins/optimisation'
  }
]

export default function BrakeIssuePage() {
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
              <CircleStop className="w-4 h-4 mr-1.5" />
              Guide de dépannage
            </div>
            <h1 className="text-4xl font-medium mb-4">Problèmes de freins</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Solutions et conseils pour maintenir vos freins en parfait état de fonctionnement
            </p>
          </motion.div>
        </div>

        {/* Problèmes courants et solutions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {brakeSolutions.map((solution, index) => (
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
                Identifiez ces symptômes pour diagnostiquer les problèmes de freins à temps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {brakeSymptoms.map((item, index) => (
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
                Réponses aux questions les plus courantes sur les freins
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-6">
              {brakeFAQs.map((faq, index) => (
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
