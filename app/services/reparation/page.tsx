"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Wrench,
  Clock,
  CheckCircle,
  ArrowRight,
  Shield,
  Settings,
  Timer,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const services = [
  {
    icon: Shield,
    title: "Diagnostic Expert",
    description: "Analyse complète et détaillée de votre trottinette par nos techniciens certifiés.",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Wrench,
    title: "Réparation Premium",
    description: "Intervention professionnelle avec des pièces d'origine et garantie constructeur.",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    icon: Settings,
    title: "Maintenance Préventive",
    description: "Programme d'entretien régulier pour optimiser la durée de vie de votre machine.",
    color: "from-green-500/20 to-green-500/5"
  }
]

const repairProcess = [
  {
    icon: AlertCircle,
    title: "Diagnostic Initial",
    description: "Analyse complète de votre trottinette pour identifier précisément le problème.",
    details: "Nos techniciens examinent systématiquement les composants électroniques, mécaniques et structurels pour garantir un diagnostic précis.",
    duration: "30 min",
    color: "border-orange-500/30 bg-orange-500/5"
  },
  {
    icon: Timer,
    title: "Devis Détaillé",
    description: "Proposition transparente et sans surprise avec options personnalisées.",
    details: "Vous recevez un devis complet avec plusieurs options adaptées à vos besoins et votre budget, sans frais cachés.",
    duration: "1h",
    color: "border-blue-500/30 bg-blue-500/5"
  },
  {
    icon: Wrench,
    title: "Réparation",
    description: "Intervention par nos experts qualifiés avec des pièces d'origine.",
    details: "Nos réparateurs certifiés utilisent exclusivement des pièces d'origine ou de qualité équivalente pour assurer performance et durabilité.",
    duration: "2-4h",
    color: "border-green-500/30 bg-green-500/5"
  },
  {
    icon: CheckCircle,
    title: "Tests Qualité",
    description: "Vérification complète et essais rigoureux post-réparation.",
    details: "Nous effectuons des contrôles de sécurité et de performance exhaustifs avant de vous remettre votre trottinette en parfait état de fonctionnement.",
    duration: "1h",
    color: "border-purple-500/30 bg-purple-500/5"
  }
]

const commonIssues = [
  {
    title: "Problèmes de batterie",
    description: "Autonomie réduite, difficultés de charge, connectique défectueuse",
    solution: "Diagnostic électronique complet, remplacement de cellules ou de batterie complète selon les besoins",
    image: "/r-2.jpg"
  },
  {
    title: "Système électrique",
    description: "Contrôleur défectueux, écran endommagé, câblage défaillant",
    solution: "Réparation ou remplacement des composants électroniques avec pièces d'origine",
    image: "/r-1.jpg"
  },
  {
    title: "Freinage et transmission",
    description: "Freins inefficaces, transmission qui patine, courroie usée",
    solution: "Ajustement précis, remplacement des plaquettes ou des systèmes complets selon l'usure",
    image: "/r-3.jpg"
  },
  {
    title: "Suspension et structure",
    description: "Amortisseurs défaillants, cadre fissuré, instabilité",
    solution: "Réparation structurelle, renforcement du cadre, remplacement des suspensions",
    image: "/r-4.jpg"
  }
]

const faqs = [
  {
    question: "Combien de temps prend une réparation standard ?",
    answer: "La plupart des réparations sont effectuées en 24 à 48 heures. Pour les cas complexes nécessitant des pièces spécifiques, nous vous communiquons un délai précis lors du diagnostic."
  },
  {
    question: "Utilisez-vous uniquement des pièces d'origine ?",
    answer: "Oui, nous utilisons exclusivement des pièces d'origine ou de qualité équivalente approuvées par les constructeurs pour garantir performance, sécurité et longévité."
  },
  {
    question: "Proposez-vous un service de réparation à domicile ?",
    answer: "Oui, pour certaines interventions, notre équipe mobile peut se déplacer chez vous. Ce service est disponible dans un rayon de 30km autour de notre atelier."
  },
  {
    question: "Quelle garantie offrez-vous sur les réparations ?",
    answer: "Toutes nos réparations sont garanties 6 mois pièces et main d'œuvre. Cette garantie couvre les défauts de fabrication et les problèmes liés directement à notre intervention."
  },
  {
    question: "Comment obtenir un devis pour ma trottinette ?",
    answer: "Vous pouvez nous contacter par téléphone, via notre formulaire en ligne ou directement en boutique. Un diagnostic initial gratuit sera effectué avant toute proposition de devis."
  }
]

export default function ReparationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeProcess, setActiveProcess] = useState(0)

  // Animation parallaxe
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.8, 0])

  // Effet au scroll pour les processus de réparation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const processItems = document.querySelectorAll('.process-item')

      processItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.15
          }
        )
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white" ref={containerRef}>
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      {/* Indicateur de progression */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-blue-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section Hero */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Arrière-plan avec léger effet parallaxe */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{ y: y1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
          <Image
            src="/header-p2.jpg"
            alt="Service de réparation Trott E Perf"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
        </motion.div>

        {/* Contenu principal avec animation */}
        <div className="container mx-auto px-4 relative z-20 mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl text-sm font-medium">
                <Wrench className="h-3.5 w-3.5 mr-2 text-blue-400" />
                Service Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="block">Réparation</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                par des experts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Notre service de réparation premium restaure les performances d'origine de votre trottinette avec une expertise inégalée.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8">
                Prendre rendez-vous
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white rounded-full px-8 hover:bg-white/10">
                Nos services
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Indicateur de défilement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <p className="text-sm text-gray-400 mb-2">Découvrir</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronRight size={20} className="text-gray-400 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Section Processus de réparation */}
      <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold mb-6"
            >
              Un processus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">à la perfection</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Nous suivons une méthodologie rigoureuse pour garantir une réparation impeccable de votre trottinette.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {repairProcess.map((process, index) => (
              <motion.div
                key={index}
                className={`process-item rounded-2xl border p-6 ${process.color} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10`}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <process.icon className="h-6 w-6 mr-3 text-white" />
                    <h3 className="text-xl font-semibold">{process.title}</h3>
                  </div>
                  <span className="text-sm font-medium px-2 py-1 rounded-full bg-white/10">
                    {process.duration}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{process.description}</p>
                <p className="text-sm text-gray-400">{process.details}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">services</span> premium
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services pour maintenir votre trottinette au sommet de ses performances.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="relative overflow-hidden rounded-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-900/70 group-hover:from-gray-900/80 group-hover:to-gray-900/60 transition-all duration-300 z-10" />

                <div className="absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-all duration-300 z-0" />

                <div className="h-full w-full p-8 relative z-20 flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} mb-6`}>
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>

                  <div className="mt-6">
                    <Button variant="link" className="text-blue-400 hover:text-blue-500 p-0 flex items-center group">
                      En savoir plus <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Problèmes Courants */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Problèmes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">courants</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Nos solutions pour les dysfonctionnements les plus fréquents sur les trottinettes électriques.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Carte de grande taille pour le problème principal (batterie) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative mb-16 overflow-hidden rounded-2xl"
            >
              <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
                <Image
                  src="/r-2.jpg"
                  alt="Problèmes de batterie"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 z-10">
                <h3 className="text-2xl md:text-4xl font-bold mb-3 text-white">Problèmes de batterie</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-black/70 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <h4 className="text-lg font-medium mb-2 text-white">Symptômes</h4>
                    <p className="text-sm md:text-base text-gray-200">Autonomie réduite, difficultés de charge, connectique défectueuse</p>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                    <h4 className="text-lg font-medium mb-2 text-white">Notre solution</h4>
                    <p className="text-sm md:text-base text-gray-200">Diagnostic électronique complet, remplacement de cellules ou de batterie complète selon les besoins</p>
                  </div>
                </div>
                <Button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2">
                  En savoir plus
                </Button>
              </div>
            </motion.div>

            {/* Grille pour les autres problèmes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonIssues.slice(1).map((issue, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group rounded-xl overflow-hidden shadow-lg h-full relative flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={issue.image}
                      alt={issue.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <h3 className="absolute bottom-0 left-0 w-full p-4 text-xl font-bold text-white">{issue.title}</h3>
                  </div>

                  <div className="p-4 bg-black/20 backdrop-blur-sm flex-grow flex flex-col">
                    <div className="space-y-3 flex-grow">
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-blue-400 mb-1">Symptômes</h4>
                        <p className="text-sm text-gray-300">{issue.description}</p>
                      </div>
                      <div>
                        <h4 className="text-sm uppercase tracking-wider text-blue-400 mb-1">Notre solution</h4>
                        <p className="text-sm text-gray-300">{issue.solution}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-gray-800">
                      <Button variant="link" className="text-blue-400 hover:text-blue-300 p-0 flex items-center text-sm">
                        Diagnostiquer <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">fréquentes</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur notre service de réparation.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-800 rounded-xl overflow-hidden bg-gray-900/50"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline font-medium text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-purple-900/30 mix-blend-multiply" />
          <Image
            src="/header-p3.jpg"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Prêt à retrouver les performances d'origine ?
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Notre équipe d'experts est disponible pour vous accompagner et réparer votre trottinette avec le plus grand soin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8">
                Prendre rendez-vous
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white rounded-full px-8 hover:bg-white/10">
                Nous contacter
              </Button>
            </div>
            <div className="mt-10 flex items-center justify-center space-x-6">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Garantie 6 mois</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Pièces d'origine</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Devis gratuit</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
