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
  MonitorSmartphone,
  PlugZap,
  Power,
  Hammer,
  Search,
  RefreshCw,
  ChevronRight,
  AlertTriangle,
  HelpCircle
} from 'lucide-react'

// Solutions aux problèmes d'écran
const displaySolutions = [
  {
    id: 'black-screen',
    title: 'Écran qui ne s\'allume pas',
    icon: Power,
    steps: [
      "Vérifiez que la batterie est suffisamment chargée",
      "Assurez-vous que l'interrupteur principal est bien enclenché",
      "Appuyez sur le bouton d'alimentation pendant 5-10 secondes pour forcer un redémarrage",
      "Inspectez les câbles reliant l'écran au contrôleur pour détecter d'éventuelles déconnexions",
      "Si possible, testez avec un autre écran pour identifier si le problème vient de l'écran ou du système"
    ]
  },
  {
    id: 'glitches',
    title: 'Affichage défectueux ou parasites',
    icon: MonitorSmartphone,
    steps: [
      "Redémarrez complètement votre trottinette (éteignez puis rallumez après 30 secondes)",
      "Vérifiez si des mises à jour du firmware sont disponibles via l'application",
      "Inspectez les connecteurs pour détecter d'éventuelles traces d'oxydation ou d'humidité",
      "Nettoyez délicatement l'écran et ses connecteurs avec un chiffon sec",
      "Réinitialisez les paramètres d'usine si votre modèle le permet"
    ]
  },
  {
    id: 'controls',
    title: 'Dysfonctionnement des commandes',
    icon: Settings,
    steps: [
      "Vérifiez si les boutons physiques sont bloqués ou endommagés",
      "Nettoyez autour des boutons pour éliminer la poussière ou les débris",
      "Testez les boutons individuellement pour identifier le problème spécifique",
      "Vérifiez les connexions entre les boutons et le contrôleur principal",
      "Si les commandes tactiles ne répondent pas, essayez de calibrer l'écran"
    ]
  }
]

// FAQ spécifique aux écrans et contrôleurs
const displayFAQs = [
  {
    question: "Comment réinitialiser le système de ma trottinette électrique ?",
    answer: "La plupart des modèles peuvent être réinitialisés en maintenant le bouton d'alimentation enfoncé pendant 10 secondes. Pour une réinitialisation complète (retour aux paramètres d'usine), consultez le manuel de votre modèle spécifique ou contactez notre support technique."
  },
  {
    question: "L'écran de ma trottinette est rayé, puis-je le remplacer ?",
    answer: "Oui, les écrans peuvent être remplacés. Nous proposons ce service dans nos ateliers. Le coût et la complexité dépendent du modèle de votre trottinette. Nous vous recommandons d'utiliser un film protecteur pour éviter les rayures futures."
  },
  {
    question: "Comment protéger mon écran des intempéries ?",
    answer: "Pour protéger l'écran, utilisez une housse de protection imperméable lorsque vous ne l'utilisez pas. Évitez de rouler sous forte pluie. Vous pouvez également appliquer un revêtement hydrophobe spécial pour écrans, disponible dans notre boutique."
  },
  {
    question: "L'écran affiche un code d'erreur, que dois-je faire ?",
    answer: "Les codes d'erreur sont spécifiques à chaque fabricant. Notez le code exact, puis consultez le manuel utilisateur ou notre base de données de codes d'erreur sur notre site web. Si le problème persiste, contactez notre support technique."
  }
]

// Symptômes visuels des problèmes d'écran
const displaySymptoms = [
  {
    symptom: "Écran qui clignote par intermittence",
    explanation: "Un écran clignotant indique souvent un problème de connexion entre l'écran et le contrôleur, ou un problème d'alimentation électrique. Vérifiez les câbles et connecteurs."
  },
  {
    symptom: "Boutons qui répondent de façon aléatoire",
    explanation: "Ce symptôme suggère un problème avec le circuit imprimé sous les boutons ou une infiltration d'humidité. Un nettoyage interne peut être nécessaire."
  },
  {
    symptom: "Affichage de batterie incohérent",
    explanation: "Si l'indicateur de batterie saute ou affiche des valeurs incohérentes, le BMS (système de gestion de batterie) peut nécessiter une recalibration ou une mise à jour."
  },
  {
    symptom: "Écran qui s'éteint pendant l'utilisation",
    explanation: "Des coupures pendant l'utilisation peuvent indiquer un problème de surchauffe du contrôleur, une batterie faible, ou des connexions desserrées par les vibrations."
  }
]

// Articles concernant les problèmes d'écran
const displayPosts = [
  {
    title: 'Réinitialisation du système de contrôle',
    date: '2 juillet 2023',
    excerpt: 'Procédure complète pour réinitialiser le système et résoudre les bugs d\'affichage les plus courants.',
    readTime: '4 min',
    link: '/support/ecran/reinitialisation'
  },
  {
    title: 'Guide de dépannage de l'écran LCD',
    date: '18 janvier 2023',
    excerpt: 'Solutions pas à pas pour résoudre les problèmes d'écran noir ou d'affichage incorrect.',
    readTime: '5 min',
    link: '/support/ecran/depannage-lcd'
  },
  {
    title: 'Décryptage des codes d\'erreur',
    date: '5 mars 2023',
    excerpt: 'Comprendre et résoudre les différents codes d\'erreur qui peuvent s\'afficher sur votre écran.',
    readTime: '8 min',
    link: '/support/ecran/codes-erreur'
  },
  {
    title: 'Protéger et entretenir votre écran',
    date: '27 avril 2023',
    excerpt: 'Conseils pratiques pour prolonger la durée de vie de l'écran et le protéger des éléments.',
    readTime: '6 min',
    link: '/support/ecran/protection'
  }
]

export default function DisplayIssuePage() {
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
              <Settings className="w-4 h-4 mr-1.5" />
              Guide de dépannage
            </div>
            <h1 className="text-4xl font-medium mb-4">Résoudre les problèmes d'écran</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Solutions et conseils pour réparer les écrans et contrôleurs de votre trottinette
            </p>
          </motion.div>
        </div>

        {/* Problèmes courants et solutions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {displaySolutions.map((solution, index) => (
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
              <h2 className="text-3xl font-medium mb-4">Diagnostic visuel</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Identifiez rapidement les symptômes et problèmes potentiels de votre écran
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {displaySymptoms.map((item, index) => (
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
              {displayPosts.map((post, index) => (
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

        {/* FAQ écran */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl font-medium mb-4">Questions fréquentes sur les écrans</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Réponses aux questions les plus courantes concernant les écrans et contrôleurs
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {displayFAQs.map((faq, index) => (
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
        <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-medium mb-6">
                  Besoin d'une assistance technique ?
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
                  Si vous n'avez pas pu résoudre votre problème avec ce guide, nos spécialistes
                  en électronique sont disponibles pour vous aider. Contactez-nous pour un diagnostic précis.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="h-12 px-6 bg-purple-600 hover:bg-purple-700 text-white">
                    Contacter un spécialiste
                  </Button>
                  <Button variant="outline" className="h-12 px-6 border-purple-600 text-purple-600 hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950">
                    Prendre rendez-vous en atelier
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
