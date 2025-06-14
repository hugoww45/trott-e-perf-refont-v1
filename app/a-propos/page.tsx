"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Users, Target, Rocket, Award, Clock, Zap } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

const milestones = [
  {
    year: "2018",
    title: "Création",
    description: "Nessance de l'idée de la création de la marque Trott e Perf."
  },
  {
    year: "2020",
    title: "Concrétisation",
    description: "Développement de notre première gamme de trottinettes haute performance."
  },
  {
    year: "2022",
    title: "Expansion",
    description: "Ouverture de notre premier concession et centre technique."
  },
  {
    year: "2025",
    title: "Excellence",
    description: "Reconnaissance internationale et développement de nouvelles technologies."
  }
]

const expertise = [
  {
    icon: Target,
    title: "Précision",
    description: "Chaque composant est méticuleusement sélectionné et testé."
  },
  {
    icon: Users,
    title: "Expertise",
    description: "Une équipe de passionnés aux compétences complémentaires."
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Recherche constante de nouvelles solutions technologiques."
  }
]

const stats = [
  { number: "2200+", label: "Clients Satisfaits" },
  { number: "98%", label: "Taux de Satisfaction" },
  { number: "24/7", label: "Support Technique" },
  { number: "1", label: "Nombre de concession" }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <div ref={containerRef} className="min-h-screen pt-24 bg-background">
        {/* Hero Section avec Split Design et Animations */}
        <section className="relative min-h-screen flex flex-col md:flex-row items-stretch">
          {/* Left Content */}
          <motion.div
            className="relative z-20 flex-1 flex items-center justify-center p-8 md:p-16"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Notre Histoire
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 leading-tight">
                  L'Excellence en
                  <br />
                  Mouvement
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  Depuis 2018, nous repoussons les limites de l'innovation pour créer les solutions de mobilité les plus avancées.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                {["Innovation", "Performance", "Design"].map((tag, index) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border border-border/40 text-sm text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Image with Parallax */}
          <motion.div
            className="relative flex-1 min-h-[50vh] md:min-h-screen"
            style={{ scale }}
          >
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent md:from-transparent z-10" />
              <Image
                src="/static/header-p2.jpg"
                alt="Innovation"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Floating Stats */}
            <motion.div
              className="absolute bottom-8 right-8 z-20 bg-black/80 backdrop-blur-lg p-6 rounded-2xl border border-border/40 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">4+</div>
              <div className="text-sm text-gray-400">Années d'Innovation</div>
            </motion.div>
          </motion.div>
        </section>

        {/* Timeline Section */}
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
                Notre Parcours
              </h2>
              <p className="text-gray-400 text-lg">
                Les étapes clés de notre évolution
              </p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-border/40" />

              <div className="space-y-24">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className={`flex items-center ${
                      index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    <div className="w-1/2 pr-8 text-right">
                      <div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
                        <span className="text-4xl font-bold text-primary">{milestone.year}</span>
                        <h3 className="text-xl font-medium mt-2">{milestone.title}</h3>
                        <p className="text-gray-400 mt-2">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="relative flex items-center justify-center w-12">
                      <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                    <div className="w-1/2 pl-8" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 md:py-32 bg-neutral-950">
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
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
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
                Notre Expertise
              </h2>
              <p className="text-gray-400 text-lg">
                L'excellence technique au service de votre mobilité
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {expertise.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                  <div className="relative bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40">
                    <item.icon className="h-8 w-8 mb-6 text-primary" />
                    <h3 className="text-xl font-medium mb-4">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]) }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10" />
            <Image
              src="/static/header-p3.jpg"
              alt="Notre Vision"
              fill
              className="object-cover"
            />
          </motion.div>
          <div className="container mx-auto px-4 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl mx-auto text-center"
            >
              <Zap className="h-12 w-12 mx-auto mb-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
                Notre Vision pour Demain
              </h2>
              <p className="text-xl text-gray-200">
                Nous imaginons un futur où la mobilité urbaine est plus intelligente, plus durable et plus performante. Chaque innovation nous rapproche de cet objectif.
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
