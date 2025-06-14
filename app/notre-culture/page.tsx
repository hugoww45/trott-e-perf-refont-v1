"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Heart,
  Lightbulb,
  Target,
  Users,
  Coffee,
  Rocket,
  Trophy,
  Clock,
  Zap,
  ChevronRight,
  ArrowDown,
  Play,
  Calendar,
  Sparkles,
  Leaf,
  Github
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

// Piliers de notre culture
const culturePillars = [
  {
    icon: Heart,
    title: "Passion",
    description: "Une passion commune pour la mobilité électrique et l'innovation technique qui nous pousse à repousser nos limites chaque jour."
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "La recherche constante de l'excellence dans chaque détail, de la conception à la livraison de nos produits et services."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Une approche collaborative où chaque membre de l'équipe contribue avec ses idées et compétences uniques."
  },
  {
    icon: Leaf,
    title: "Durabilité",
    description: "Un engagement profond envers des solutions de mobilité qui préservent notre environnement pour les générations futures."
  }
]

// Événements de l'entreprise
const companyEvents = [
  {
    title: "Hackathon Mobilité",
    description: "Événement annuel où nos équipes se challengent pendant 48h pour créer des prototypes innovants.",
    imageUrl: "/header-p2.jpg"
  },
  {
    title: "Journées Vertes",
    description: "Chaque trimestre, nous participons collectivement à des actions environnementales concrètes.",
    imageUrl: "/header-p3.jpg"
  },
  {
    title: "Conférences Tech",
    description: "Nos ingénieurs participent régulièrement à des conférences internationales sur la mobilité électrique.",
    imageUrl: "/header-p1.jpg"
  }
]

// Activités en équipe
const teamActivities = [
  {
    title: "Coworking en nature",
    description: "Sessions de travail collaboratif dans des espaces naturels pour stimuler la créativité.",
    icon: Coffee
  },
  {
    title: "Challenges sportifs",
    description: "Participations à des événements sportifs d'entreprise qui renforcent notre esprit collectif.",
    icon: Trophy
  },
  {
    title: "Innovation Days",
    description: "Journées dédiées aux projets personnels liés à la mobilité électrique et au développement durable.",
    icon: Lightbulb
  },
  {
    title: "Formations continues",
    description: "Programme de formation permettant à chacun de développer ses compétences dans son domaine d'expertise.",
    icon: Rocket
  }
]

// Citations de l'équipe
const teamQuotes = [
  {
    quote: "Notre culture est basée sur la confiance et l'autonomie. Chacun est encouragé à proposer des idées et à prendre des initiatives.",
    author: "Marie Durand",
    role: "Directrice des Ressources Humaines"
  },
  {
    quote: "C'est l'équilibre parfait entre l'innovation technologique et les valeurs humaines qui fait notre force.",
    author: "Alexandre Moreau",
    role: "Ingénieur en Chef"
  },
  {
    quote: "Nous ne créons pas seulement des produits, mais un mouvement vers une mobilité plus intelligente et plus respectueuse de l'environnement.",
    author: "Sophie Legrand",
    role: "Responsable Développement Durable"
  }
]

// Variants pour éviter le clignotement
const quoteVariants = {
  enter: {
    opacity: 0,
    y: 20,
    position: "absolute" as const,
    width: "100%",
    willChange: "opacity, transform" as const
  },
  center: {
    opacity: 1,
    y: 0,
    position: "relative" as const,
    willChange: "opacity, transform" as const,
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1] // Cubic-bezier pour une transition plus fluide
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    position: "absolute" as const,
    width: "100%",
    willChange: "opacity, transform" as const,
    transition: {
      duration: 0.5,
      ease: [0.32, 0, 0.67, 0] // Cubic-bezier pour une transition plus fluide
    }
  }
}

export default function CulturePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const quoteContainerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Tracking de la position de défilement pour les effets parallaxes
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animation du texte de citation
  const [currentQuote, setCurrentQuote] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % teamQuotes.length)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <div ref={containerRef} className="pt-24 bg-black">
        {/* Hero Section */}
        <section className="min-h-[85vh] relative flex items-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <motion.div
              initial={{ scale: 1.2, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full h-full will-change-transform will-change-opacity"
              style={{
                willChange: "transform, opacity"
              }}
            >
              <Image
                src="/static/header-p3.jpg"
                alt="Notre culture d'entreprise"
                fill
                className="object-cover brightness-[0.3]"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"
                style={{
                  backgroundPosition: `center ${scrollY * 0.05}px`,
                  willChange: "background-position"
                }}
              />
            </motion.div>
          </div>

          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4 inline-flex"
              >
                <span className="text-sm font-medium bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary">
                  NOTRE CULTURE
                </span>
              </motion.div>

              <div className="space-y-6 text-left md:text-left md:max-w-3xl">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold tracking-tight text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="block">L'esprit</span>
                  <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Trott e Perf</span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Une culture d'innovation, de passion et d'engagement qui anime notre équipe chaque jour.
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Button
                    variant="default"
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-medium bg-primary hover:bg-primary/90"
                  >
                    Découvrir nos valeurs
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-medium border-white/20 hover:bg-white/10"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Voir notre équipe
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-white/60 text-xs mb-2 uppercase tracking-widest">Explorer</span>
              <ArrowDown className="h-4 w-4 text-white animate-bounce" />
            </div>
          </motion.div>

          {/* Éléments décoratifs flottants */}
          <div className="absolute top-1/4 right-[20%] w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse z-10"></div>
          <div className="absolute bottom-1/3 left-[20%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000 z-10"></div>
        </section>

        {/* Section Citation Animée */}
        <section className="py-20 bg-gradient-to-b from-black to-neutral-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div
                ref={quoteContainerRef}
                className="relative"
                style={{
                  minHeight: "250px",
                  transform: "translateZ(0)", // Force GPU acceleration
                  backfaceVisibility: "hidden" as const,
                  perspective: "1000px" as const,
                }}
              >
                <AnimatePresence mode="sync" initial={false} presenceAffectsLayout={false}>
                  <motion.div
                    key={`quote-${currentQuote}`}
                    variants={quoteVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="bg-neutral-900/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-neutral-800"
                    style={{
                      willChange: "opacity, transform",
                      transform: "translateZ(0)",
                    }}
                  >
                    <div className="text-7xl text-primary/20 font-serif">"</div>
                    <h2 className="text-2xl md:text-3xl font-light italic text-gray-100 mb-8 leading-relaxed text-center">
                      {teamQuotes[currentQuote].quote}
                    </h2>
                    <div className="flex flex-col items-center">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-3">
                        {teamQuotes[currentQuote].author.charAt(0)}
                      </div>
                      <p className="font-medium text-lg">{teamQuotes[currentQuote].author}</p>
                      <p className="text-primary text-sm">{teamQuotes[currentQuote].role}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {teamQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`transition-all duration-300 ease-in-out ${
                      currentQuote === index
                        ? "w-10 bg-primary h-1"
                        : "w-4 bg-gray-600 h-1 hover:bg-gray-400"
                    }`}
                    aria-label={`Citation ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section Piliers de Notre Culture */}
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-primary/5 to-transparent opacity-20"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="max-w-4xl mx-auto text-center mb-20"
              style={{ willChange: "opacity, transform" }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                NOS PILIERS
              </span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-white">
                Ce qui nous <span className="text-primary">anime</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
                Notre culture d'entreprise est fondée sur des valeurs fortes qui guident nos actions au quotidien et façonnent notre vision de la mobilité électrique.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {culturePillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                  className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 border border-neutral-800 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Effet de halo sur hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl"></div>

                  {/* Numéro en arrière-plan */}
                  <div className="absolute -bottom-10 -right-10 text-[120px] font-bold text-white opacity-[0.03] select-none z-0">
                    {index + 1}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                        <pillar.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{pillar.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Galerie d'Événements */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-20"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center mb-20"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                MOMENTS CLÉS
              </span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-white">
                Vie d'équipe
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Des moments forts qui forgent notre identité collective et stimulent notre créativité.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {companyEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  className="group relative rounded-xl overflow-hidden h-[500px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-75"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Activités d'Équipe */}
        <section className="py-32 bg-gradient-to-b from-neutral-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  EXPÉRIENCE COLLECTIVE
                </span>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8 text-white">
                  Bien plus qu'une <span className="text-primary">entreprise</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                  Nous créons un environnement où chacun peut s'épanouir, développer ses compétences et participer à des projets qui ont du sens, dans une ambiance collaborative et stimulante.
                </p>

                <Button
                  variant="outline"
                  className="rounded-full px-8 h-14 text-base font-medium border-primary/30 hover:bg-primary/10 text-primary"
                >
                  Rejoindre notre équipe
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {teamActivities.map((activity, index) => (
                  <motion.div
                    key={activity.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: "easeOut"
                    }}
                    className="bg-neutral-900/60 backdrop-blur-sm rounded-xl p-6 border border-neutral-800 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <activity.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white">{activity.title}</h3>
                    <p className="text-sm text-gray-400">{activity.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section CTA */}
        <section className="py-32 bg-gradient-to-b from-neutral-950 to-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Élément graphique animé */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-center opacity-5"
              animate={{
                backgroundPosition: ['0px 0px', '100px 100px']
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "loop"
              }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/20 to-transparent opacity-10"
              animate={{
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            {/* Éléments flottants */}
            <motion.div
              className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
              animate={{
                y: [0, 30, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white"
              >
                Envie de faire partie de <span className="text-primary">l'aventure</span> ?
              </motion.h2>

              <motion.p
                className="text-xl mb-12 text-gray-300 leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Rejoignez une équipe passionnée et contribuez à façonner l'avenir de la mobilité urbaine.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <Link href="/carrieres">
                  <Button
                    size="lg"
                    className="rounded-full px-10 h-16 text-lg font-medium bg-primary hover:bg-primary/90 min-w-[250px]"
                  >
                    Voir nos offres d'emploi
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full px-10 h-16 text-lg font-medium border-white/20 hover:bg-white/10 min-w-[250px]"
                  >
                    Contactez-nous
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
