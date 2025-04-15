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
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1604868189743-ec3e9d6d4471?w=1600&h=900&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              scale: 1.1,
              x: useTransform(mouseXSpring, [0, 1], [-20, 20]),
              y: useTransform(mouseYSpring, [0, 1], [-20, 20])
            }}
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-10" />
          
          <div className="relative z-20 container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                  Service Premium
                </span>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8">
                  L'expertise au
                  <br />
                  service de votre
                  <br />
                  mobilité.
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                  Une équipe d'experts pour maintenir votre trottinette au meilleur niveau.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button 
                  size="lg" 
                  className="min-w-[200px] h-12 rounded-full bg-white text-black hover:bg-white/90"
                >
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <ChevronDown className="h-6 w-6 animate-bounce text-white/80" />
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