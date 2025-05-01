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
  Settings,
  Ruler,
  Shield,
  PanelBottomClose,
  Wrench,
  GaugeCircle,
  Hand,
  Play,
  ChevronRight,
  AlertTriangle,
  HelpCircle
} from 'lucide-react'

// Solutions aux problèmes de roues
const wheelSolutions = [
  {
    id: 'flat-tire',
    title: 'Pneu à plat ou dégonflé',
    icon: GaugeCircle,
    steps: [
      "Vérifiez la pression du pneu avec un manomètre adapté",
      "Inspectez le pneu pour détecter d'éventuelles perforations ou objets pointus",
      "Regonflez le pneu à la pression recommandée (généralement indiquée sur le flanc du pneu)",
      "Si le pneu se dégonfle rapidement, utilisez un produit anti-crevaison adapté aux trottinettes",
      "Pour les crevaisons importantes, remplacez la chambre à air ou le pneu"
    ]
  },
  {
    id: 'wheel-alignment',
    title: 'Problèmes d\'alignement des roues',
    icon: Ruler,
    steps: [
      "Vérifiez si les roues sont correctement centrées et alignées avec le cadre",
      "Assurez-vous que les écrous d'axe sont serrés de manière uniforme des deux côtés",
      "Vérifiez si le garde-boue ou d'autres composants interfèrent avec la rotation",
      "Inspectez le cadre pour détecter d'éventuelles déformations ou dommages",
      "Consultez le manuel pour les spécifications d'alignement de votre modèle"
    ]
  },
  {
    id: 'brake-issues',
    title: 'Dysfonctionnement des freins',
    icon: Hand,
    steps: [
      "Vérifiez l'usure des plaquettes de frein et remplacez-les si nécessaire",
      "Ajustez la tension du câble de frein pour une réponse optimale",
      "Assurez-vous que le disque de frein est propre et sans débris",
      "Vérifiez que l'étrier de frein est correctement aligné avec le disque",
      "Lubrifiez légèrement les pièces mobiles (sauf les surfaces de freinage)"
    ]
  }
]

// FAQ spécifique aux roues et freins
const wheelFAQs = [
  {
    question: "À quelle fréquence dois-je vérifier la pression des pneus ?",
    answer: "Il est recommandé de vérifier la pression des pneus au moins une fois par semaine pour une utilisation quotidienne. Une pression correcte améliore l'autonomie de la batterie, le confort de conduite et réduit les risques de crevaison."
  },
  {
    question: "Comment savoir si mes plaquettes de frein sont usées ?",
    answer: "Les signes d'usure des plaquettes incluent : un bruit de frottement métallique lors du freinage, une diminution de l'efficacité de freinage, une distance d'arrêt plus longue ou une épaisseur de plaquette inférieure à 1,5 mm. Inspectez-les visuellement régulièrement."
  },
  {
    question: "Puis-je remplacer moi-même mes pneus ?",
    answer: "Oui, c'est possible avec les bons outils. Vous aurez besoin de démonte-pneus, d'une pompe avec manomètre et potentiellement d'une clé pour desserrer l'axe de roue. Nous proposons des tutoriels vidéo sur notre site ou vous pouvez consulter nos ateliers pour ce service."
  },
  {
    question: "Quel type de pneu choisir : plein ou pneumatique ?",
    answer: "Les pneus pneumatiques offrent un meilleur confort et absorption des chocs, mais sont sujets aux crevaisons. Les pneus pleins sont increvables mais transmettent davantage les vibrations. Le choix dépend de votre usage : urbain lisse (plein possible) ou terrain varié (pneumatique recommandé)."
  }
]

// Symptômes visuels des problèmes de roues
const wheelSymptoms = [
  {
    symptom: "Vibrations anormales pendant la conduite",
    explanation: "Des vibrations peuvent indiquer un déséquilibre de la roue, un pneu déformé, des roulements endommagés ou un axe plié. Vérifiez ces éléments et remplacez les pièces défectueuses."
  },
  {
    symptom: "Bruit de frottement métallique lors du freinage",
    explanation: "Ce son indique généralement des plaquettes de frein complètement usées où le métal frotte contre le disque. Remplacez immédiatement les plaquettes pour éviter d'endommager le disque."
  },
  {
    symptom: "La trottinette tire d'un côté",
    explanation: "Ce comportement peut résulter d'un alignement incorrect des roues, d'une pression inégale dans les pneus, d'un cadre légèrement tordu ou d'un frein qui frotte d'un côté. Vérifiez ces points un par un."
  },
  {
    symptom: "Usure irrégulière des pneus",
    explanation: "Une usure inégale peut signaler un problème d'alignement, une pression incorrecte maintenue sur la durée, ou un problème de suspension. Corrigez la cause pour éviter l'usure prématurée."
  }
]

// Articles concernant les problèmes de roues
const wheelPosts = [
  {
    title: 'Guide complet du changement de pneu',
    date: '15 juin 2023',
    excerpt: 'Tutoriel pas à pas pour remplacer le pneu de votre trottinette sans outil spécialisé.',
    readTime: '7 min',
    link: '/support/roue/changement-pneu'
  },
  {
    title: 'Optimiser la durée de vie de vos freins',
    date: '3 mars 2023',
    excerpt: "Conseils d\'entretien et techniques de freinage pour maximiser la longévité de votre système de freinage.",
    readTime: '5 min',
    link: '/support/roue/entretien-freins'
  },
  {
    title: 'Choisir les bons pneus pour votre usage',
    date: '22 avril 2023',
    excerpt: 'Comparatif des différents types de pneus et recommandations selon votre utilisation quotidienne.',
    readTime: '8 min',
    link: '/support/roue/choix-pneus'
  },
  {
    title: 'Améliorer le confort de roulement',
    date: '11 mai 2023',
    excerpt: 'Astuces et modifications pour réduire les vibrations et améliorer la stabilité de votre trottinette.',
    readTime: '6 min',
    link: '/support/roue/confort-roulement'
  }
]

export default function WheelIssuePage() {
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
              <Wrench className="w-4 h-4 mr-1.5" />
              Guide de réparation
            </div>
            <h1 className="text-4xl font-medium mb-4">Problèmes de roues et de freins</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Solutions et conseils pour entretenir et réparer le système de roulement
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
                    <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                      <solution.icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
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
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
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
              <h2 className="text-3xl font-medium mb-4">Diagnostic visuel</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Identifiez les symptômes et comprenez les causes de vos problèmes de roues
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

        {/* Articles et guides */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-medium mb-4">Nos articles sur le sujet</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Consultez nos guides détaillés pour approfondir vos connaissances
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {wheelPosts.map((post, index) => (
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
                    <div className="flex items-center text-teal-600 dark:text-teal-400 font-medium text-sm">
                      Lire l'article <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ roues et freins */}
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
                Réponses aux questions les plus courantes concernant les roues et freins
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {wheelFAQs.map((faq, index) => (
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

        {/* Contactez un spécialiste */}
        <section className="py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-950 dark:to-blue-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-medium mb-6">
                  Besoin d'une intervention professionnelle ?
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
                  Si vous n'êtes pas à l'aise pour effectuer ces réparations vous-même, nos techniciens
                  sont disponibles en atelier pour maintenir votre trottinette en parfait état.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="h-12 px-6 bg-teal-600 hover:bg-teal-700 text-white">
                    Prendre rendez-vous en atelier
                  </Button>
                  <Button variant="outline" className="h-12 px-6 border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-teal-950">
                    Commander des pièces détachées
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
