"use client"

import { useRef, useState, useEffect } from "react"
import {
  motion, useScroll, useTransform,
  AnimatePresence, useInView, useSpring, useAnimation
} from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Wrench, CheckCircle, ArrowRight, Shield, Settings,
  Timer, Sparkles, AlertCircle, ChevronRight, Zap,
  ChevronDown, Play, ClipboardCheck, Award, ArrowDown,
  RefreshCw, BadgeCheck, Inspect
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import router from "next/router"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Interfaces pour typer les données
interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

interface RepairProcess {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string;
  duration: string;
  color: string;
  iconColor: string;
}

interface CommonIssue {
  title: string;
  description: string;
  solution: string;
  image: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services = [
  {
    icon: Shield,
    title: "Diagnostic Expert",
    description: "Analyse complète et détaillée de votre trottinette par nos techniciens certifiés.",
    color: "from-gray-400/30 to-gray-600/10"
  },
  {
    icon: Wrench,
    title: "Réparation Premium",
    description: "Intervention professionnelle avec des pièces d'origine et garantie constructeur.",
    color: "from-gray-300/30 to-gray-500/10"
  },
  {
    icon: Settings,
    title: "Maintenance Préventive",
    description: "Programme d'entretien régulier pour optimiser la durée de vie de votre machine.",
    color: "from-gray-500/30 to-gray-700/10"
  }
]

const repairProcess = [
  {
    icon: AlertCircle,
    title: "Diagnostic Initial",
    description: "Analyse complète de votre trottinette pour identifier précisément le problème.",
    details: "Nos techniciens examinent systématiquement les composants électroniques, mécaniques et structurels pour garantir un diagnostic précis.",
    duration: "30 min",
    color: "border-gray-500/30 bg-gray-700/5",
    iconColor: "text-gray-300"
  },
  {
    icon: Timer,
    title: "Devis Détaillé",
    description: "Proposition transparente et sans surprise avec options personnalisées.",
    details: "Vous recevez un devis complet avec plusieurs options adaptées à vos besoins et votre budget, sans frais cachés.",
    duration: "1h",
    color: "border-gray-400/30 bg-gray-600/5",
    iconColor: "text-gray-200"
  },
  {
    icon: Wrench,
    title: "Réparation",
    description: "Intervention par nos experts qualifiés avec des pièces d'origine.",
    details: "Nos réparateurs certifiés utilisent exclusivement des pièces d'origine ou de qualité équivalente pour assurer performance et durabilité.",
    duration: "2-4h",
    color: "border-gray-300/30 bg-gray-500/5",
    iconColor: "text-gray-100"
  },
  {
    icon: CheckCircle,
    title: "Tests Qualité",
    description: "Vérification complète et essais rigoureux post-réparation.",
    details: "Nous effectuons des contrôles de sécurité et de performance exhaustifs avant de vous remettre votre trottinette en parfait état de fonctionnement.",
    duration: "1h",
    color: "border-gray-200/30 bg-gray-400/5",
    iconColor: "text-white"
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

const testimonials = [
  {
    name: "Sophie L.",
    role: "Utilisatrice quotidienne",
    text: "Service exceptionnel ! Ma trottinette fonctionnait comme neuve après l'intervention, et le délai a été respecté à la minute près. Je recommande vivement.",
    rating: 5,
    avatar: "/header-p1.jpg"
  },
  {
    name: "Thomas R.",
    role: "Rider urbain",
    text: "J'ai apprécié la transparence du devis et la qualité des pièces utilisées. L'équipe prend vraiment le temps d'expliquer les interventions réalisées.",
    rating: 5,
    avatar: "/header-p2.jpg"
  },
  {
    name: "Marie K.",
    role: "Livreuse professionnelle",
    text: "En tant que pro, je ne peux pas me permettre d'immobiliser mon outil de travail. Trott-E-Perf a su comprendre l'urgence et réaliser la réparation en un temps record.",
    rating: 4,
    avatar: "/header-p3.jpg"
  }
]

const advantages = [
  {
    icon: BadgeCheck,
    title: "Techniciens Certifiés",
    description: "Notre équipe est formée et certifiée par les plus grands constructeurs du marché."
  },
  {
    icon: ClipboardCheck,
    title: "Garantie 6 Mois",
    description: "Toutes nos réparations sont couvertes par une garantie pièces et main d'œuvre."
  },
  {
    icon: RefreshCw,
    title: "Pièces d'Origine",
    description: "Nous n'utilisons que des composants d'origine ou de qualité équivalente."
  },
  {
    icon: Award,
    title: "Transparence Totale",
    description: "Devis détaillé gratuit et explication claire des interventions nécessaires."
  }
]

// Composant de carte de réparation amélioré avec effet 3D
function RepairProcessCard({ process, index }: { process: RepairProcess; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={cardRef}
      className="process-item"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.25, 0.1, 0.25, 1.0]
          }
        }
      }}
    >
      <div className={`relative group h-full rounded-2xl ${process.color} backdrop-blur-md overflow-hidden border border-gray-800 p-6 transition-all duration-500 hover:border-gray-600`}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0 pointer-events-none" />

        {/* Effet de brillance sur hover */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${process.iconColor} bg-black/20 backdrop-blur-xl`}>
            <process.icon className="h-6 w-6" />
          </div>

          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold">{process.title}</h3>
            <span className="text-xs font-medium bg-black/30 backdrop-blur-md rounded-full px-3 py-1">
              {process.duration}
            </span>
          </div>

          <p className="text-gray-300 mb-4">{process.description}</p>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-gray-400 border-t border-gray-800 pt-3 mt-2"
          >
            {process.details}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Composant de carte de problème commun avec effet de parallaxe
function CommonIssueCard({ issue, index }: { issue: CommonIssue; index: number }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.2 })
  const imageControls = useAnimation()

  useEffect(() => {
    if (isInView) {
      imageControls.start({ scale: 1, filter: "grayscale(0%)" })
    }
  }, [isInView, imageControls])

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl h-full group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.2 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      <motion.div
        className="relative h-full w-full overflow-hidden"
        initial={{ scale: 1.1, filter: "grayscale(100%)" }}
        animate={imageControls}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Image
          src={issue.image}
          alt={issue.title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
        <h3 className="text-xl font-bold mb-2">{issue.title}</h3>
        <p className="text-gray-300 text-sm mb-3">{issue.description}</p>

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex items-center text-sm space-x-2 bg-black/30 backdrop-blur-md rounded-lg p-3 border border-gray-800">
            <CheckCircle className="h-4 w-4 text-gray-300 shrink-0" />
            <p className="text-gray-200">{issue.solution}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Composant pour les témoignages
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      className="bg-black/30 backdrop-blur-md border border-gray-800 rounded-2xl p-6 h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4 space-x-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gray-700">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{testimonial.name}</h4>
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        </div>
      </div>

      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-gray-300' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-gray-300 italic mb-3">{testimonial.text}</p>
    </motion.div>
  )
}

// Composant Card pour les avantages
function AdvantageCard({ advantage, index }: { advantage: Advantage; index: number }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-black/70 to-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
        <advantage.icon className="h-6 w-6 text-gray-300" />
      </div>
      <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
      <p className="text-gray-300">{advantage.description}</p>
    </motion.div>
  )
}

export default function ReparationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIssue, setActiveIssue] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Animation parallaxe
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Défilement automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Animation au scroll pour les éléments
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.utils.toArray('.animate-on-scroll').forEach((item: any, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.1
          }
        )
      })
    }
  }, [])

  // Effet de suivi de la souris pour la section hero
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const hero = document.getElementById('hero-section')

      if (hero) {
        const rect = hero.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setMousePosition({ x, y })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Blob suivant la souris
  const blobX = useSpring(0, { stiffness: 50, damping: 15 })
  const blobY = useSpring(0, { stiffness: 50, damping: 15 })

  useEffect(() => {
    blobX.set(mousePosition.x)
    blobY.set(mousePosition.y)
  }, [mousePosition, blobX, blobY])

  // Lecture automatique de la vidéo de fond
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Erreur lors de la lecture automatique:", error)
      })
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden" ref={containerRef}>
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      {/* Indicateur de progression au scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gray-500 via-white to-gray-400 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Section Hero avec vidéo de fond */}
      <section
        id="hero-section"
        className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-16"
      >
        {/* Blob réactif à la souris */}
        <motion.div
          className="absolute blur-3xl opacity-30 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-600 rounded-full"
          style={{
            height: 300,
            width: 300,
            x: blobX,
            y: blobY,
            transform: "translate(-50%, -50%)"
          }}
        />

        {/* Vidéo de fond avec overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-[#121212]/80 to-black/90 z-10" />
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="object-cover object-center w-full h-full"
          >
            <source src="/video-back-landing-2.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Contenu principal avec animation */}
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-xl text-xs font-medium">
                <Wrench className="h-3 w-3 mr-1.5 text-gray-300" />
                Service Premium
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-[1.1]"
            >
              <span className="block">Service de</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-white to-gray-300">
                Réparation Expert
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-base sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Notre équipe de techniciens certifiés restaure les performances d'origine de votre trottinette électrique avec une précision inégalée.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 border-none"
              >
                Prendre rendez-vous
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium border-gray-700 hover:bg-white/10 backdrop-blur-md"
              >
                <Play className="mr-2 h-4 w-4" />
                Voir notre processus
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Flèche d'exploration vers le bas */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <span className="text-white/60 text-xs mb-2 uppercase tracking-widest">Explorer</span>
            <ArrowDown className="h-4 w-4 text-white" />
          </div>
        </motion.div>
      </section>

      {/* Section Processus de Réparation Avancé */}
      <section className="py-24 bg-gradient-to-b from-[#121212] to-[#0a0a0a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/10 via-transparent to-transparent"></div>

        {/* Ligne de délimitation animée */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.span
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Inspect className="h-3 w-3 mr-1.5 text-gray-300" />
              Méthodologie Exclusive
            </motion.span>

            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Notre Processus d'<span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Intervention</span>
            </motion.h2>

            <motion.p
              className="text-gray-300 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Un parcours d'excellence en quatre étapes, conçu pour assurer transparence, qualité et satisfaction totale.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {repairProcess.map((process, index) => (
              <RepairProcessCard key={process.title} process={process} index={index} />
            ))}
          </div>

          {/* Visualisation du processus animée */}
          <motion.div
            className="mt-20 relative h-2 bg-gray-800/50 rounded-full overflow-hidden max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-600 via-white to-gray-400 rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
            />

            {/* Points du processus */}
            {repairProcess.map((_, index) => {
              const position = `${index * (100 / (repairProcess.length - 1))}%`;
              return (
                <motion.div
                  key={index}
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-black"
                  style={{ left: position }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.2 }}
                />
              )
            })}
          </motion.div>

          <div className="mt-16 text-center">
            <Button
              variant="default"
              size="lg"
              className="rounded-full px-8 h-14 text-base font-medium bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 border-none"
            >
              Demander un diagnostic
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Section Problèmes Courants avec Images */}
      <section className="py-24 bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0f0f0f] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Expertise</span> pour Tous Types de Problèmes
            </motion.h2>

            <motion.p
              className="text-gray-300 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Des solutions adaptées pour les pannes et dysfonctionnements les plus courants rencontrés par nos clients.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 aspect-auto">
            {commonIssues.map((issue, index) => (
              <CommonIssueCard key={issue.title} issue={issue} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Pourquoi Nous Choisir */}
      <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#080808] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700/10 via-transparent to-transparent opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Award className="h-3 w-3 mr-1.5 text-gray-300" />
                Service d'Exception
              </motion.span>

              <motion.h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">notre service</span> de réparation
              </motion.h2>

              <motion.p
                className="text-gray-300 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Notre engagement d'excellence se traduit par une approche rigoureuse, des équipements de pointe et une équipe passionnée par les technologies de la mobilité électrique.
              </motion.p>

              {/* Grille des avantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {advantages.map((advantage, index) => (
                  <AdvantageCard key={advantage.title} advantage={advantage} index={index} />
                ))}
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 h-14 text-base font-medium border-gray-700 hover:bg-white/10"
                >
                  <Link href="/a-propos">
                    En savoir plus sur notre équipe
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="relative">
              {/* Image avec effet de parallaxe */}
              <motion.div
                className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full max-w-xl mx-auto shadow-2xl shadow-black/40"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <Image
                  src="/r-1.jpg"
                  alt="Atelier de réparation Trott-E-Perf"
                  fill
                  className="object-cover"
                />

                {/* Élements flottants autour de l'image */}
                <motion.div
                  className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-gray-800 rounded-lg p-3 pr-6 flex items-center gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white">
                    <BadgeCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Certifié Constructeur</h4>
                    <p className="text-xs text-gray-400">Partenaire officiel agréé</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md border border-gray-800 rounded-lg px-4 py-2 flex items-center gap-2"
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Zap className="w-4 h-4 text-gray-300" />
                  <span className="text-sm font-medium">+2000 réparations</span>
                </motion.div>
              </motion.div>

              {/* Élément décoratif */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-64 h-64 rounded-full border border-gray-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section FAQ Accordéon */}
      <section className="py-24 bg-gradient-to-b from-black to-neutral-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/10 via-transparent to-transparent opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-3xl sm:text-4xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Fréquentes</span>
              </motion.h2>

              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Toutes les réponses aux questions les plus courantes sur notre service de réparation.
              </motion.p>
            </div>

            <motion.div
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm px-6 py-2 data-[state=open]:bg-white/10"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium py-4 [&[data-state=open]>svg]:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-2 pb-4 px-2">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-gray-300 mb-6">Vous avez d'autres questions ?</p>
              <Button
                variant="default"
                size="lg"
                className="rounded-full px-8 h-14 text-base font-medium bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 border-none"
              >
                Nous contacter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Call-to-Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-black"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700/40 via-gray-600/40 to-gray-500/40 opacity-60"></div>
            <div className="absolute inset-0 backdrop-blur-sm bg-black/50"></div>

            {/* Éléments décoratifs */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-white/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full border border-white/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 p-10 md:p-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <motion.h2
                    className="text-3xl sm:text-4xl font-bold mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Prêt à <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">retrouver</span> les sensations de votre première balade ?
                  </motion.h2>

                  <motion.p
                    className="text-lg text-gray-200 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Nos experts sont prêts à redonner à votre trottinette toutes ses performances d'origine et même à les optimiser.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Button
                      variant="default"
                      size="lg"
                      className="rounded-full px-8 h-14 text-base font-medium bg-white text-black hover:bg-white/90"
                    >
                      Prendre rendez-vous
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Image
                    src="/r-3.jpg"
                    alt="Service réparation Trott-E-Perf"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
