"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Phone,
  MessageCircleQuestion,
  ScrollText,
  FileText,
  Settings,
  Store,
  ShieldCheck,
  Activity,
  Package,
  Clock,
  ArrowRight,
  Zap,
  ChevronRight
} from 'lucide-react'

// Types de problèmes courants
const commonIssues = [
  {
    id: 'battery',
    title: 'Problèmes de batterie',
    icon: Zap,
    description: 'Autonomie réduite, problème de charge, batterie qui ne tient pas la charge',
    link: '/support/batterie'
  },
  {
    id: 'motor',
    title: 'Moteur et puissance',
    icon: Activity,
    description: 'Perte de puissance, moteur qui ne démarre pas, bruits anormaux',
    link: '/support/moteur'
  },
  {
    id: 'display',
    title: 'Écran et contrôleurs',
    icon: Settings,
    description: 'Écran qui ne s\'allume pas, dysfonctionnement des commandes',
    link: '/support/ecran'
  },
  {
    id: 'brakes',
    title: 'Freins et sécurité',
    icon: ShieldCheck,
    description: 'Freins qui ne répondent pas, problèmes de freinage d\'urgence',
    link: '/support/freins'
  },
  {
    id: 'wheels',
    title: 'Roues et pneus',
    icon: Package,
    description: 'Pneus crevés, usure prématurée, problèmes de direction',
    link: '/support/roues'
  },
  {
    id: 'software',
    title: 'Applications et connectivité',
    icon: MessageCircleQuestion,
    description: 'Problèmes avec l\'application mobile, Bluetooth, mises à jour',
    link: '/support/application'
  }
]

// Questions fréquentes
const faqs = [
  {
    question: "Comment entretenir ma trottinette électrique ?",
    answer: "Pour maintenir votre trottinette en bon état, nettoyez-la régulièrement, vérifiez la pression des pneus chaque semaine, et gardez votre batterie entre 20% et 80% quand vous ne l'utilisez pas pendant une longue période."
  },
  {
    question: "Quelle est la durée de garantie de mes produits ?",
    answer: "Tous nos produits bénéficient d'une garantie de 2 ans. Notre extension de garantie Premium vous offre une couverture supplémentaire de 1 an pour une protection totale."
  },
  {
    question: "Comment programmer un rendez-vous en atelier ?",
    answer: "Vous pouvez programmer un rendez-vous en atelier via notre application mobile, en appelant notre service client au 01 23 45 67 89, ou directement en boutique."
  },
  {
    question: "Puis-je échanger mon produit après l'achat ?",
    answer: "Oui, vous disposez de 14 jours pour retourner votre produit non utilisé dans son emballage d'origine pour un remboursement complet ou un échange."
  }
]

export default function SupportPage() {
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de recherche à implémenter
    console.log('Recherche:', searchQuery)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f5f5f7] dark:from-black dark:to-[#111] text-black dark:text-white flex flex-col">
      <div className="fixed top-0 z-50 w-full border-b border-neutral-200/30 dark:border-neutral-800/30 bg-white/80 dark:bg-black/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 dark:supports-[backdrop-filter]:bg-black/30">
        <Navigation />
      </div>

      <main className="flex-grow pt-24 z-10">
        {/* Section Hero avec recherche */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-30 dark:opacity-20 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center mb-10"
            >
              <h1 className="text-4xl md:text-5xl font-medium mb-6 tracking-tight">
                Comment pouvons-nous vous aider ?
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8">
                Explorez nos ressources ou contactez-nous pour toute assistance avec vos produits Trott'e Perf.
              </p>

              <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <Input
                  type="text"
                  placeholder="Rechercher un sujet, un produit ou une question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-base rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <Button
                  type="submit"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-12 px-5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Rechercher
                </Button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Section Contact rapide */}
        <section className="py-8 md:py-12 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap justify-center gap-6 md:gap-10"
            >
              <Link href="/contact" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors rounded-xl p-6 flex items-center gap-4 min-w-[280px] max-w-xs">
                <div className="h-12 w-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Nous contacter</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Par téléphone ou email</p>
                </div>
              </Link>

              <Link href="/support/chat" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors rounded-xl p-6 flex items-center gap-4 min-w-[280px] max-w-xs">
                <div className="h-12 w-12 bg-green-500 text-white rounded-full flex items-center justify-center">
                  <MessageCircleQuestion className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Chat en direct</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Assistance immédiate</p>
                </div>
              </Link>

              <Link href="/support/rdv" className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 transition-colors rounded-xl p-6 flex items-center gap-4 min-w-[280px] max-w-xs">
                <div className="h-12 w-12 bg-amber-500 text-white rounded-full flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Prendre rendez-vous</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">En boutique ou atelier</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Section Problèmes courants */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-10 text-center"
            >
              <h2 className="text-3xl font-medium mb-4">Problèmes courants</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Parcourez nos solutions aux problèmes les plus fréquemment rencontrés par nos utilisateurs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {commonIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col h-full"
                >
                  <Link
                    href={issue.link}
                    className="block h-full p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-neutral-800/80 hover:shadow-md dark:hover:border-neutral-700 transition-all duration-200"
                  >
                    <div className="flex items-center mb-5">
                      <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 mr-4">
                        <issue.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-medium">{issue.title}</h3>
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-5">
                      {issue.description}
                    </p>
                    <div className="mt-auto flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                      Voir les solutions <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Support produit avec image */}
        <section className="py-16 md:py-24 bg-neutral-950 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:w-1/2"
              >
                <h2 className="text-3xl md:text-4xl font-medium mb-6">Support produit personnalisé</h2>
                <p className="text-lg text-neutral-300 mb-8">
                  Obtenez une assistance spécifique pour votre modèle de trottinette électrique.
                  Nos experts techniques connaissent parfaitement chaque détail de nos produits
                  et peuvent vous aider à résoudre rapidement tout problème.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-900 mt-1">
                      <ShieldCheck className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="text-xl font-medium mr-3">Documentation technique</h3>
                        <span className="px-2 py-0.5 bg-amber-900/50 text-amber-400 rounded-full text-xs font-medium">Bientôt</span>
                      </div>
                      <p className="text-neutral-300">
                        Accédez aux manuels d'utilisation, schémas et guides d'entretien spécifiques à votre modèle.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-green-900 mt-1">
                      <ScrollText className="h-5 w-5 text-green-400" />
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="text-xl font-medium mr-3">Tutoriels vidéo</h3>
                        <span className="px-2 py-0.5 bg-amber-900/50 text-amber-400 rounded-full text-xs font-medium">Bientôt</span>
                      </div>
                      <p className="text-neutral-300">
                        Suivez nos guides pas à pas pour l'entretien, la réparation et l'optimisation de votre trottinette.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-amber-900 mt-1">
                      <Store className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">Support en boutique</h3>
                      <p className="text-neutral-300">
                        Prenez rendez-vous dans l'un de nos magasins pour un diagnostic complet par nos techniciens.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-10 h-12 px-6 bg-white text-black hover:bg-neutral-200">
                  Trouver mon produit <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:w-1/2 relative"
              >
                <div className="relative h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden">
                  <Image
                    src="/p-1.jpg"
                    alt="Support technique Trott'e Perf"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl font-medium mb-4">Questions fréquentes</h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Réponses aux questions les plus courantes de nos clients
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  className="mb-6 p-6 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800"
                >
                  <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="text-center mt-10"
              >
                <Link href="/support/faq">
                  <Button className="h-12 px-6 bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white">
                    Voir toutes les questions <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section Centre de réparation */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-medium mb-6">
                  Centre de réparation Trott'e Perf
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
                  Nos techniciens certifiés s'occupent de votre trottinette avec le plus grand soin.
                  Service rapide et de qualité dans tous nos centres.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white">
                    Prendre rendez-vous
                  </Button>
                  <Button variant="outline" className="h-12 px-6 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950">
                    Trouver un centre
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
