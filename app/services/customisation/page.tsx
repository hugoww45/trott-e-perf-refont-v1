"use client"

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { 
  Paintbrush, 
  Zap, 
  Gauge, 
  ArrowRight, 
  Sparkles, 
  Palette, 
  Sliders, 
  ChevronDown,
  Battery,
  Shield,
  Cpu
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

const features = [
  {
    title: "Performance",
    description: "Optimisation sur mesure de votre trottinette pour des performances exceptionnelles.",
    icon: Gauge,
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    title: "Design",
    description: "Un design unique qui reflète votre personnalité et votre style.",
    icon: Palette,
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    title: "Innovation",
    description: "Les dernières technologies pour une expérience de conduite inégalée.",
    icon: Cpu,
    color: "from-green-500/20 to-green-500/5"
  }
]

const customizationOptions = [
  {
    title: "Motorisation",
    options: ["Standard", "Sport", "Performance"],
    icon: Zap,
    currentOption: 0
  },
  {
    title: "Batterie",
    options: ["Urbaine", "Longue Distance", "Ultra Capacité"],
    icon: Battery,
    currentOption: 0
  },
  {
    title: "Protection",
    options: ["Basic", "Advanced", "Ultimate"],
    icon: Shield,
    currentOption: 0
  }
]

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "Échange détaillé avec nos experts pour définir vos besoins."
  },
  {
    number: "02",
    title: "Conception",
    description: "Création de votre configuration personnalisée."
  },
  {
    number: "03",
    title: "Réalisation",
    description: "Assemblage minutieux par nos techniciens qualifiés."
  }
]

export default function CustomisationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
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
      setActiveFeature((prev) => (prev + 1) % features.length)
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
              backgroundImage: "url('https://images.unsplash.com/photo-1604868189744-bf0227c9c85b?w=1600&h=900&fit=crop')",
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
                  Customisation Premium
                </span>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8">
                  L'excellence,
                  <br />
                  personnalisée.
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
                  Une expérience unique de personnalisation, où chaque détail reflète votre vision.
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
                  Découvrir
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

        {/* Features Section */}
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
                Une expérience unique
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Découvrez nos options de personnalisation premium
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative group cursor-pointer ${
                    activeFeature === index ? 'scale-105' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  <div className="relative bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40">
                    <feature.icon className="h-8 w-8 mb-6 text-white" />
                    <h3 className="text-xl font-medium mb-4">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Customization Options */}
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
                Configurez votre trottinette
              </h2>
              <p className="text-gray-400 text-lg">
                Chaque détail compte dans la création de votre machine
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {customizationOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40"
                >
                  <option.icon className="h-8 w-8 mb-6 text-white" />
                  <h3 className="text-xl font-medium mb-4">{option.title}</h3>
                  <div className="space-y-2">
                    {option.options.map((opt, i) => (
                      <div
                        key={opt}
                        className={`p-4 rounded-lg transition-all duration-300 ${
                          i === option.currentOption
                            ? 'bg-white/10'
                            : 'hover:bg-white/5'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 md:py-32 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Notre processus
              </h2>
              <p className="text-gray-400 text-lg">
                Une approche structurée pour un résultat exceptionnel
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 text-6xl font-bold text-white/10">
                    {step.number}
                  </div>
                  <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40">
                    <h3 className="text-xl font-medium mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-neutral-950 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                Prêt à créer votre chef-d'œuvre ?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Nos experts sont là pour donner vie à votre vision
              </p>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="min-w-[200px] h-12 rounded-full bg-white text-black hover:bg-white/90"
                >
                  Démarrer votre projet
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