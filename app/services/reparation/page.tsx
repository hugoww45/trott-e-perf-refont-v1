"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Wrench,
  Clock,
  CheckCircle,
  ArrowRight,
  Shield,
  Settings,
  ChevronDown,
  Zap,
  Timer,
  Sparkles,
  AlertCircle
} from "lucide-react"
import Image from "next/image"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
    description: "Analyse complète de votre trottinette",
    duration: "30 min",
    color: "from-orange-500/20 to-orange-500/5"
  },
  {
    icon: Timer,
    title: "Devis Détaillé",
    description: "Proposition transparente et sans surprise",
    duration: "1h",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    icon: Wrench,
    title: "Réparation",
    description: "Intervention par nos experts qualifiés",
    duration: "2-4h",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    icon: CheckCircle,
    title: "Tests Qualité",
    description: "Vérification complète post-réparation",
    duration: "1h",
    color: "from-purple-500/20 to-purple-500/5"
  }
]

const stats = [
  { number: "2000+", label: "Réparations Réussies" },
  { number: "99%", label: "Taux de Satisfaction" },
  { number: "3 ans", label: "Expérience Moyenne" },
  { number: "24/7", label: "Support Technique" }
]

const guarantees = [
  {
    icon: Shield,
    title: "Garantie 6 Mois",
    description: "Toutes nos réparations sont garanties pendant 6 mois."
  },
  {
    icon: Sparkles,
    title: "Pièces d'Origine",
    description: "Uniquement des composants certifiés constructeur."
  },
  {
    icon: Zap,
    title: "Service Express",
    description: "Réparations urgentes en 24h selon disponibilité."
  }
]

export default function ReparationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState(0)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = clientX / innerWidth
      const y = clientY / innerHeight
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <div ref={containerRef}>
        {/* Barre de progression */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        {/* Hero Section - Style Apple */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
          {/* Canvas de fond avec effet profondeur */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black z-10" />

            {/* Image de fond avec effet de parallaxe subtil */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1604868189743-ec3e9d6d4471"
                alt="Service de réparation Trott E Perf"
                fill
                className="object-cover opacity-30 blur-[1px]"
                priority
              />
            </motion.div>
          </div>

          {/* Overlays lumineux */}
          <div className="absolute inset-0 z-20 overflow-hidden">
            {/* Glow primaire */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[150px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />

            {/* Glow secondaire */}
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>

          {/* Contenu principal */}
          <div className="container mx-auto px-4 relative z-30 mt-20">
            <div className="flex flex-col items-center">
              {/* Badge premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm font-medium text-white">
                  <Wrench className="h-3.5 w-3.5 mr-2 text-blue-400" />
                  Service Technique Premium
                </span>
              </motion.div>

              {/* Titre avec animation séquentielle */}
              <div className="relative">
                <motion.h1
                  className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-center mb-6 text-white"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="inline-block">Réparation</span>{" "}
                  <span className="inline-block relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">
                      d'experts
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 w-full opacity-70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                    />
                  </span>
                </motion.h1>
              </div>

              {/* Sous-titre */}
              <motion.p
                className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 text-center font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Une équipe de techniciens certifiés pour maintenir et réparer
                votre trottinette avec précision et excellence.
              </motion.p>

              {/* CTA boutons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <Button
                  size="lg"
                  className="rounded-full bg-blue-500 hover:bg-blue-500/90 min-w-[200px] transition-all duration-300 h-14 text-base font-medium"
                >
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/20 hover:bg-white/10 min-w-[200px] transition-all duration-300 h-14 text-base font-medium"
                >
                  Nos services
                </Button>
              </motion.div>
            </div>

            {/* Aperçu visuel du service */}
            <motion.div
              className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <div className="relative">
                {/* Cadre avec effet de profondeur */}
                <div className="absolute inset-0 -m-6 bg-gradient-to-b from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-30" />

                {/* Carte des services */}
                <div className="bg-gradient-to-br from-neutral-900 to-black rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-black/0" />

                  <div className="relative z-10">
                    <div className="grid md:grid-cols-3 gap-6">
                      {services.map((service, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                          className={`p-6 rounded-xl bg-gradient-to-b ${service.color} border border-white/10 backdrop-blur-md`}
                        >
                          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                            <service.icon className="h-6 w-6 text-blue-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                          <p className="text-sm text-gray-400">{service.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats en défilement */}
              <div className="mt-12 flex items-center justify-center">
                <motion.div
                  className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 bg-neutral-900/50 backdrop-blur-lg py-6 px-10 rounded-full border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                >
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 2, duration: 1 },
              y: { delay: 2, duration: 1.5, repeat: Infinity, repeatType: "loop" }
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-gray-500">Découvrir</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-500"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="py-24 md:py-32 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Nos Services
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Une gamme complète de services pour l'entretien de votre trottinette
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative group cursor-pointer ${
                    activeService === index ? 'scale-105' : ''
                  }`}
                  onClick={() => setActiveService(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  <div className="relative bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40">
                    <service.icon className="h-8 w-8 mb-6 text-white" />
                    <h3 className="text-xl font-medium mb-4">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-24 md:py-32 bg-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Notre Processus
              </h2>
              <p className="text-gray-400 text-lg">
                Une approche méthodique pour des résultats optimaux
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {repairProcess.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  <div className="relative bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40">
                    <step.icon className="h-8 w-8 mb-6 text-white" />
                    <h3 className="text-xl font-medium mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <span className="text-sm font-medium text-white/60">{step.duration}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 md:py-32 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantees Section */}
        <section className="py-24 md:py-32 bg-neutral-950">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Nos Garanties
              </h2>
              <p className="text-gray-400 text-lg">
                Un service premium avec des engagements clairs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {guarantees.map((guarantee, index) => (
                <motion.div
                  key={guarantee.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40"
                >
                  <guarantee.icon className="h-8 w-8 mb-6 text-white" />
                  <h3 className="text-xl font-medium mb-4">{guarantee.title}</h3>
                  <p className="text-gray-400">{guarantee.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-black relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                Besoin d'une réparation ?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Nos experts sont à votre disposition pour un diagnostic précis
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="min-w-[200px] h-12 rounded-full bg-white text-black hover:bg-white/90"
                >
                  Contacter un expert
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
