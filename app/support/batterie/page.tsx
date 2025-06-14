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
  BatteryWarning,
  BatteryFull,
  ThermometerSnowflake,
  Wrench,
  Hourglass,
  Lightbulb,
  Bolt,
  Play,
  ChevronRight,
  AlertTriangle,
  HelpCircle
} from 'lucide-react'

// Solutions aux problèmes de batterie
const batterySolutions = [
  {
    id: 'low-autonomy',
    title: 'Autonomie réduite',
    icon: Hourglass,
    steps: [
      "Vérifiez que la batterie est chargée à 100% avant utilisation",
      "Assurez-vous d'utiliser le chargeur d'origine fourni avec la trottinette",
      "Contrôlez la pression des pneus (une pression insuffisante augmente la consommation)",
      "Évitez les démarrages et freinages brusques qui consomment plus d'énergie",
      "Après 300-500 cycles de charge, une baisse d'autonomie de 20% est normale"
    ]
  },
  {
    id: 'charging-issues',
    title: 'Problèmes de charge',
    icon: BatteryCharging,
    steps: [
      "Vérifiez que la prise murale fonctionne correctement",
      "Inspectez le câble et le connecteur du chargeur pour tout dommage",
      "Assurez-vous que le port de charge de la trottinette est propre et sans débris",
      "Pendant la charge, l'indicateur du chargeur doit être rouge, puis passer au vert lorsque terminé",
      "Si le chargeur chauffe excessivement ou ne s\'allume pas, il peut être défectueux"
    ]
  },
  {
    id: 'battery-indicator',
    title: 'Indicateur de batterie incorrect',
    icon: BatteryWarning,
    steps: [
      "Effectuez un cycle complet de décharge puis de charge",
      "Redémarrez le système en maintenant le bouton d'alimentation pendant 10 secondes",
      "Mettez à jour le firmware si une mise à jour est disponible",
      "Vérifiez si le problème persiste après plusieurs cycles d'utilisation",
      "Si l'indicateur reste erratique, une calibration en atelier peut être nécessaire"
    ]
  }
]

// FAQ spécifique à la batterie
const batteryFAQs = [
  {
    question: "Quelle est la durée de vie normale d'une batterie de trottinette ?",
    answer: "Une batterie de trottinette électrique a généralement une durée de vie de 300 à 500 cycles de charge complets. Avec une utilisation quotidienne, cela représente environ 2 à 3 ans. Au-delà, une perte d'autonomie progressive jusqu'à 20-30% est considérée comme normale."
  },
  {
    question: "Est-il préférable de charger la batterie après chaque utilisation ?",
    answer: "Il est recommandé de maintenir la charge entre 20% et 80% pour optimiser la durée de vie. Évitez les décharges complètes régulières. Une charge complète occasionnelle (1 fois par mois) est conseillée pour recalibrer le système. Ne laissez pas la batterie déchargée pendant de longues périodes."
  },
  {
    question: "Puis-je utiliser ma trottinette par temps froid ?",
    answer: "L'utilisation par temps froid (inférieur à 5°C) réduit temporairement l'autonomie de la batterie jusqu'à 30%. Évitez de charger la batterie à des températures inférieures à 0°C. Si possible, stockez la trottinette à l'intérieur avant utilisation par temps froid pour préserver les performances."
  },
  {
    question: "Puis-je remplacer la batterie moi-même ?",
    answer: "Bien que techniquement possible, le remplacement de la batterie nécessite des connaissances en électronique et peut invalider la garantie. Pour préserver la sécurité et les performances, nous recommandons de faire appel à nos techniciens certifiés pour tout remplacement de batterie."
  }
]

// Symptômes visuels des problèmes de batterie
const batterySymptoms = [
  {
    symptom: "Batterie qui chauffe excessivement pendant la charge",
    explanation: "Une légère chaleur est normale, mais une chaleur excessive peut indiquer un problème de chargeur incompatible, un court-circuit interne ou une batterie endommagée. Débranchez immédiatement et contactez le support technique."
  },
  {
    symptom: "Temps de charge anormalement long",
    explanation: "Si la batterie prend plus de 6-8 heures pour se charger complètement, cela peut indiquer un chargeur défectueux, une batterie vieillissante ou des cellules endommagées. Vérifiez d'abord le chargeur avant de diagnostiquer la batterie."
  },
  {
    symptom: "Autonomie qui chute brutalement pendant l'utilisation",
    explanation: "Une chute soudaine de l'indicateur de batterie pendant l'utilisation suggère soit un problème de calibration, soit des cellules défectueuses dans la batterie. Effectuez un cycle complet de charge/décharge pour recalibrer."
  },
  {
    symptom: "Gonflement visible de la batterie",
    explanation: "Un gonflement est un signe critique de détérioration de la batterie lithium-ion. Cessez immédiatement l'utilisation, ne chargez plus la batterie et contactez le service technique pour un remplacement sécurisé."
  }
]

// Articles concernant les problèmes de batterie
const batteryPosts = [
  {
    title: 'Comment maximiser la durée de vie de votre batterie',
    date: '27 mai 2023',
    excerpt: 'Conseils pratiques pour préserver les performances et prolonger la durée de vie de votre batterie.',
    readTime: '6 min',
    link: '/support/batterie/durabilite'
  },
  {
    title: 'Guide d\'entretien de la batterie',
    date: '14 février 2023',
    excerpt: 'Les bonnes pratiques pour maintenir votre batterie en parfait état.',
    readTime: '4 min',
    link: '/support/batterie/entretien'
  },
  {
    title: 'Optimiser l\'autonomie de votre batterie',
    date: '8 avril 2023',
    excerpt: 'Conseils et astuces pour maximiser l\'autonomie de votre trottinette électrique.',
    readTime: '5 min',
    link: '/support/batterie/optimisation'
  },
  {
    title: 'Diagnostic des problèmes de batterie',
    date: '29 juillet 2023',
    excerpt: 'Comment identifier et résoudre les problèmes courants de batterie.',
    readTime: '7 min',
    link: '/support/batterie/diagnostic'
  }
]

export default function BatteryIssuePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
              <BatteryFull className="w-4 h-4 mr-1.5" />
              Guide de dépannage
            </div>
            <h1 className="text-4xl font-medium mb-4">Problèmes de batterie</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Solutions et conseils pour optimiser la durée de vie et les performances de votre batterie
            </p>
          </motion.div>
        </div>

        {/* Problèmes courants et solutions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {batterySolutions.map((solution, index) => (
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
                      <solution.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
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
                Identifiez ces symptômes pour diagnostiquer les problèmes de batterie à temps
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {batterySymptoms.map((item, index) => (
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

        {/* Articles et guides */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-medium mb-4">Nos articles sur la batterie</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Guides détaillés pour mieux comprendre et entretenir votre batterie
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {batteryPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={post.link}
                    className="block bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800/80 rounded-xl p-6 border border-neutral-200 dark:border-neutral-800 transition-all duration-200 h-full"
                  >
                    <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">{post.date} • Lecture {post.readTime}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-purple-600 dark:text-purple-400 font-medium text-sm">
                      Lire l'article <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ batterie */}
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
                Réponses aux questions les plus courantes concernant la batterie
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {batteryFAQs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="mb-6 p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800"
                >
                  <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Conseils de sécurité */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-medium mb-4">
                  Conseils de sécurité importants
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
                  La batterie lithium-ion de votre trottinette nécessite quelques précautions
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-neutral-800/50 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full h-fit">
                      <ThermometerSnowflake className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Précautions climatiques</h3>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>Ne chargez jamais une batterie à des températures inférieures à 0°C</li>
                        <li>Évitez d'exposer la trottinette à une chaleur extrême (plus de 40°C)</li>
                        <li>Ne stockez pas la batterie complètement déchargée</li>
                        <li>Pour un stockage prolongé, maintenez la charge à environ 50%</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-neutral-800/50 rounded-xl p-6 border border-purple-200 dark:border-purple-800/30"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full h-fit">
                      <BatteryWarning className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Attention dangers</h3>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>N'utilisez jamais un chargeur non certifié par le fabricant</li>
                        <li>Ne tentez pas d'ouvrir, percer ou modifier la batterie</li>
                        <li>En cas de choc important, vérifiez l'intégrité de la batterie</li>
                        <li>Si la batterie dégage une odeur inhabituelle, cessez immédiatement son utilisation</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10 text-center">
                <Button className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white">
                  Contacter notre service technique
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
