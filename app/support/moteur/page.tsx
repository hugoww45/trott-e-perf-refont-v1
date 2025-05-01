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
  Power,
  Gauge,
  Wrench,
  Battery,
  RotateCcw,
  Cable,
  Thermometer,
  Zap,
  Play,
  ChevronRight,
  AlertTriangle,
  HelpCircle
} from 'lucide-react'

// Solutions aux problèmes de moteur
const motorSolutions = [
  {
    id: 'no-power',
    title: 'Le moteur ne démarre pas',
    icon: Power,
    steps: [
      "Vérifiez que la batterie est suffisamment chargée (au moins 10%)",
      "Assurez-vous que le contact est bien enclenché et que le bouton marche/arrêt fonctionne",
      "Contrôlez si l'interrupteur de sécurité du frein n'est pas bloqué",
      "Vérifiez les connexions entre le contrôleur et le moteur (câbles non endommagés)",
      "Redémarrez complètement le système en éteignant et rallumant après 30 secondes"
    ]
  },
  {
    id: 'reduced-power',
    title: 'Perte de puissance',
    icon: Gauge,
    steps: [
      "Vérifiez que le mode de puissance sélectionné n'est pas en mode économie d'énergie",
      "Contrôlez l'état de charge de la batterie (en dessous de 15%, la puissance diminue automatiquement)",
      "Examinez la pression des pneus (une pression insuffisante réduit les performances)",
      "Inspectez les freins pour tout frottement anormal qui pourrait créer une résistance",
      "La température extérieure froide peut réduire temporairement les performances du moteur"
    ]
  },
  {
    id: 'strange-noises',
    title: 'Bruits anormaux du moteur',
    icon: Wrench,
    steps: [
      "Vérifiez qu'aucun objet n'est coincé dans la roue motrice",
      "Inspectez le moteur pour tout dommage externe visible",
      "Contrôlez les vis de fixation du moteur et resserrez-les si nécessaire",
      "Un bourdonnement léger est normal, mais un grincement aigu ou un cliquetis indique un problème",
      "Si le bruit persiste, arrêtez d'utiliser la trottinette et consultez un technicien"
    ]
  }
]

// FAQ spécifique au moteur
const motorFAQs = [
  {
    question: "Quelle est la durée de vie moyenne du moteur d'une trottinette électrique ?",
    answer: "Un moteur de trottinette électrique bien entretenu peut durer entre 3000 et 5000 km, soit environ 3 à 5 ans pour un usage quotidien modéré. Les moteurs brushless (sans balais) ont généralement une durée de vie plus longue que les moteurs à balais traditionnels."
  },
  {
    question: "Le moteur peut-il être endommagé par la pluie ?",
    answer: "La plupart des trottinettes modernes ont des moteurs avec une protection minimale contre l'humidité (indice IPX4 ou IPX5), mais ne sont pas complètement étanches. Une exposition occasionnelle à la pluie légère est généralement acceptable, mais évitez les flaques d'eau profondes et séchez la trottinette après utilisation par temps humide."
  },
  {
    question: "Est-ce normal que le moteur chauffe pendant l'utilisation ?",
    answer: "Un échauffement modéré du moteur est normal, surtout après une utilisation prolongée ou en montée. Cependant, si le moteur devient trop chaud pour être touché confortablement (plus de 70°C), cela peut indiquer une surcharge ou un problème technique. Laissez-le refroidir avant de continuer."
  },
  {
    question: "La trottinette perd-elle de la puissance avec le temps ?",
    answer: "Une légère baisse de performance peut survenir avec l'âge, principalement due à l'usure des composants et à la dégradation progressive de la batterie. Un entretien régulier (vérification des connexions, nettoyage, lubrification des pièces mobiles) peut minimiser cette perte de puissance."
  }
]

// Symptômes visuels des problèmes de moteur
const motorSymptoms = [
  {
    symptom: "Le moteur tourne mais la roue ne bouge pas",
    explanation: "Ce symptôme indique généralement un problème avec le système de transmission entre le moteur et la roue. Vérifiez l'embrayage, les engrenages ou la courroie selon le modèle de votre trottinette. Une réparation professionnelle est souvent nécessaire."
  },
  {
    symptom: "Vibrations excessives pendant le fonctionnement",
    explanation: "Des vibrations anormales peuvent signaler un déséquilibre de la roue, un désalignement du moteur, ou des pièces desserrées. Vérifiez les fixations du moteur et l'état des roulements. Une utilisation prolongée dans cet état peut endommager d'autres composants."
  },
  {
    symptom: "Surchauffe rapide du moteur",
    explanation: "Un moteur qui chauffe rapidement peut indiquer une surcharge (pente trop raide, charge excessive), un problème de contrôleur, ou des frottements mécaniques internes. Laissez refroidir le moteur et vérifiez que rien ne bloque la rotation de la roue."
  },
  {
    symptom: "Coupures de puissance intermittentes",
    explanation: "Des coupures aléatoires peuvent être causées par des connexions électriques défectueuses, un contrôleur défaillant, ou des capteurs endommagés. Vérifiez les câblages et connecteurs entre la batterie, le contrôleur et le moteur. Des mises à jour de firmware peuvent parfois résoudre ce problème."
  }
]

// Articles concernant les problèmes de moteur
const motorPosts = [
  {
    title: 'Optimiser les performances de votre moteur',
    date: '18 juin 2023',
    excerpt: 'Conseils d\'experts pour maintenir votre moteur au maximum de ses capacités et prolonger sa durée de vie.',
    readTime: '5 min',
    link: '/support/moteur/performance'
  },
  {
    title: 'Comment identifier les bruits anormaux',
    date: '3 mars 2023',
    excerpt: 'Guide complet pour reconnaître les différents bruits que peut produire votre moteur et ce qu\'ils signifient.',
    readTime: '4 min',
    link: '/support/moteur/diagnostics-sonores'
  },
  {
    title: 'Les avantages des moteurs brushless',
    date: '12 avril 2023',
    excerpt: 'Découvrez pourquoi les moteurs sans balais offrent de meilleures performances et une durabilité supérieure.',
    readTime: '6 min',
    link: '/support/moteur/technologie-brushless'
  },
  {
    title: 'Protéger votre moteur des éléments',
    date: '21 septembre 2023',
    excerpt: 'Mesures préventives pour protéger le moteur de votre trottinette contre l\'eau, la poussière et les températures extrêmes.',
    readTime: '8 min',
    link: '/support/moteur/protection'
  }
]

export default function MotorIssuePage() {
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
              <Zap className="w-4 h-4 mr-1.5" />
              Guide de dépannage
            </div>
            <h1 className="text-4xl font-medium mb-4">Problèmes de moteur</h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Diagnostiquez et résolvez les problèmes liés au moteur et à la puissance de votre trottinette
            </p>
          </motion.div>
        </div>

        {/* Problèmes courants et solutions */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {motorSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-12 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-neutral-200/80 dark:border-neutral-800/80"
              >
                <div className="p-6 md:p-8 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <solution.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
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
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
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
              <h2 className="text-3xl font-medium mb-4">Signes de dysfonctionnement</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Reconnaître ces symptômes vous aidera à identifier rapidement un problème de moteur
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {motorSymptoms.map((item, index) => (
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
              <h2 className="text-3xl font-medium mb-4">Ressources techniques</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Articles spécialisés pour approfondir vos connaissances sur le moteur
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {motorPosts.map((post, index) => (
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
                    <div className="flex items-center text-green-600 dark:text-green-400 font-medium text-sm">
                      Lire l'article <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ moteur */}
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
                Réponses aux interrogations courantes sur les problèmes de moteur
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {motorFAQs.map((faq, index) => (
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

        {/* Conseils de maintenance */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-medium mb-4">
                  Entretien préventif
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-8">
                  Prévenir les problèmes avec une maintenance régulière de votre moteur
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-neutral-800/50 rounded-xl p-6 border border-green-200 dark:border-green-800/30"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full h-fit">
                      <RotateCcw className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Maintenance régulière</h3>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>Vérifiez régulièrement les fixations du moteur et resserrez si nécessaire</li>
                        <li>Nettoyez délicatement le moteur avec une brosse sèche pour éliminer la poussière</li>
                        <li>Inspectez les câbles pour tout signe d'usure ou dommage</li>
                        <li>Après chaque utilisation sous la pluie, séchez soigneusement la zone du moteur</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white dark:bg-neutral-800/50 rounded-xl p-6 border border-green-200 dark:border-green-800/30"
                >
                  <div className="flex gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full h-fit">
                      <Thermometer className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Éviter la surchauffe</h3>
                      <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                        <li>Évitez les montées prolongées à pleine puissance</li>
                        <li>Respectez le poids maximal recommandé pour votre modèle</li>
                        <li>Alternez entre les différents modes de puissance lors des longs trajets</li>
                        <li>Prévoyez des pauses de refroidissement lors d'une utilisation intensive</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-10 text-center">
                <Button className="h-12 px-6 bg-green-600 hover:bg-green-700 text-white">
                  Planifier un entretien complet
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
