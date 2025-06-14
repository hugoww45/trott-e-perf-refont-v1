"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
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
  Cpu,
  ChevronRight,
  ArrowUpRight,
  CheckCircle,
  CircleSlash,
  Layers
} from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    title: "Performance",
    description: "Optimisation sur mesure de votre trottinette pour des performances exceptionnelles.",
    icon: Gauge,
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-500/10",
    bgDark: "bg-amber-900/30"
  },
  {
    title: "Design",
    description: "Un design unique qui reflète votre personnalité et votre style.",
    icon: Palette,
    color: "from-purple-500 to-indigo-600",
    bgLight: "bg-purple-500/10",
    bgDark: "bg-purple-900/30"
  },
  {
    title: "Innovation",
    description: "Les dernières technologies pour une expérience de conduite inégalée.",
    icon: Cpu,
    color: "from-blue-500 to-cyan-600",
    bgLight: "bg-blue-500/10",
    bgDark: "bg-blue-900/30"
  }
]

const customizationOptions = [
  {
    title: "Motorisation",
    options: ["Standard", "Sport", "Performance"],
    icon: Zap,
    currentOption: 0,
    color: "from-amber-500 to-orange-600"
  },
  {
    title: "Batterie",
    options: ["Urbaine", "Longue Distance", "Ultra Capacité"],
    icon: Battery,
    currentOption: 0,
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Protection",
    options: ["Basic", "Advanced", "Ultimate"],
    icon: Shield,
    currentOption: 0,
    color: "from-blue-500 to-indigo-600"
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

const comparisons = [
  {
    feature: "Design personalisé",
    standard: false,
    custom: true
  },
  {
    feature: "Performance optimisée",
    standard: false,
    custom: true
  },
  {
    feature: "Pièces premium",
    standard: false,
    custom: true
  },
  {
    feature: "Batterie améliorée",
    standard: false,
    custom: true
  },
  {
    feature: "Personnalisation complète",
    standard: false,
    custom: true
  },
]

export default function CustomisationPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFeature, setActiveFeature] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Barre de progression */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-white z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-black/20 supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
        <Navigation />
      </div>

      <div ref={containerRef}>
        {/* Hero Section - Style Apple */}
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
          {/* Image de fond façon page Carrière */}
          <div className="absolute inset-0 w-full h-full z-0">
            <motion.div
              initial={{ scale: 1.2, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full h-full will-change-transform will-change-opacity"
            >
              <Image
                src="/r-3.jpg" // ou ton image perso
                alt="Customisation trottinette"
                fill
                className="object-cover brightness-[0.4]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
            </motion.div>
          </div>

          {/* Contenu texte avec titre + sous-titre */}
          <div className="container mx-auto px-4 relative z-20 mt-20">
            <div className="flex flex-col items-center">
              <div className="relative">
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-center mb-6 text-white"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="inline-block">L'excellence</span>{" "}
                  <span className="inline-block relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-amber-500">
                      personnalisée
                    </span>
                    <motion.span
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-amber-500 w-full opacity-70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                      style={{ transformOrigin: "left" }}
                    />
                  </span>
                </motion.h1>
              </div>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 text-center font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Une expérience unique où chaque détail reflète votre vision.
                Votre trottinette, à votre image.
              </motion.p>
            </div>
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


        {/* Features Section */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                  CARACTÉRISTIQUES
                </span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  Une customisation <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">sans limites</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Chaque aspect de votre trottinette peut être personnalisé selon vos préférences et besoins spécifiques.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-neutral-900/70 backdrop-blur-sm rounded-3xl p-8 overflow-hidden border border-white/10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgDark} blur-xl opacity-30`}></div>
                    </div>

                    <div className="relative z-10">
                      <div className={`w-16 h-16 rounded-2xl ${feature.bgLight} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`h-8 w-8 text-gradient bg-gradient-to-r ${feature.color}`} />
                      </div>

                      <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                      <p className="text-gray-400 mb-6">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Customization Options Section */}
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-radial from-purple-900/5 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-radial from-amber-900/5 to-transparent opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                OPTIONS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Personnalisez chaque <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">détail</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Des performances aux finitions, adaptez votre trottinette à votre style de vie.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {customizationOptions.map((option, index) => (
                <motion.div
                  key={index}
                  className="relative bg-black rounded-3xl p-6 overflow-hidden border border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${option.color}`}></div>

                  <div className="flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.color} flex items-center justify-center mr-4`}>
                      <option.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{option.title}</h3>
                  </div>

                  <div className="space-y-3 mb-6">
                    {option.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg ${i === option.currentOption ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5'} transition-colors cursor-pointer`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{opt}</span>
                          {i === option.currentOption && (
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500 flex items-center justify-center">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-amber-900/5"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(245, 158, 11, 0.03) 100%)",
                  "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(168, 85, 247, 0.03) 100%)",
                  "linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0) 50%, rgba(245, 158, 11, 0.03) 100%)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                PROCESSUS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">fonctionne</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Un processus simple et efficace pour créer la trottinette de vos rêves.
              </p>
            </motion.div>

            <div className="relative max-w-6xl mx-auto">
              {/* Ligne de connexion animée */}
              <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-purple-500 via-white/50 to-amber-500 transform -translate-y-1/2 hidden md:block">
                <motion.div
                  className="absolute top-0 left-0 right-0 h-full bg-white"
                  animate={{
                    left: ["0%", "100%"],
                    right: ["100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <div className="flex flex-col md:flex-row justify-around items-center md:items-stretch gap-16 md:gap-6 py-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative flex-1 max-w-sm"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                  >
                    {/* Carte avec effet de flottement */}
                    <motion.div
                      className="relative z-10 h-full bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 overflow-hidden"
                      whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)" }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute ${index === 0 ? "top-0 left-0" : index === 1 ? "bottom-0 right-0" : "top-0 right-0"} w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-amber-500/10 blur-3xl -z-10 opacity-60`}></div>

                      {/* Numéro de l'étape */}
                      <div className="relative mb-8">
                        <motion.div
                          className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-amber-500 flex items-center justify-center text-2xl font-bold"
                          whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {step.number}
                        </motion.div>
                        <div className="absolute top-0 left-0 w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-amber-500 blur-xl opacity-40 -z-10"></div>
                      </div>

                      {/* Contenu */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                      >
                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                        <p className="text-gray-400 mb-6">{step.description}</p>

                        {/* Indicateur visuel spécifique à chaque étape */}
                        <div className="flex items-center gap-3 mt-auto">
                          {index === 0 && (
                            <motion.div
                              className="flex items-center gap-2 text-sm text-white/70"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                            >
                              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                              Discussion en cours
                            </motion.div>
                          )}
                          {index === 1 && (
                            <motion.div
                              className="flex items-center gap-2 text-sm text-white/70"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                            >
                              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                              Création en attente
                            </motion.div>
                          )}
                          {index === 2 && (
                            <motion.div
                              className="flex items-center gap-2 text-sm text-white/70"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                            >
                              <span className="w-2 h-2 rounded-full bg-green-500"></span>
                              Livraison garantie
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </motion.div>

                    {/* Cercle sur la ligne (visible seulement en desktop) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white/20 bg-black hidden md:flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-amber-500"></div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Indicateur d'action */}
              <motion.div
                className="flex justify-center mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
              </motion.div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-purple-900/5 to-transparent opacity-20"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-6">
                COMPARAISON
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Standard vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">Personnalisé</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Découvrez les avantages d'une trottinette entièrement personnalisée.
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto bg-black/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-3 bg-white/5 p-6">
                <div className="text-center font-medium text-lg">Fonctionnalité</div>
                <div className="text-center font-medium text-lg">Original</div>
                <div className="text-center font-medium text-lg">Personnalisé</div>
              </div>

              <div className="divide-y divide-white/10">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={index}
                    className="grid grid-cols-3 p-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center">{item.feature}</div>
                    <div className="flex items-center justify-center">
                      {item.standard ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <CircleSlash className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center justify-center">
                      {item.custom ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <CircleSlash className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/10 to-transparent opacity-30"
              animate={{
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-4xl mx-auto backdrop-blur-md bg-gradient-to-b from-white/5 to-white/10 rounded-3xl p-12 border border-white/10 overflow-hidden relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-amber-500"></div>
              <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent opacity-50"></div>

              <div className="relative z-10">
                <div className="text-center mb-10">
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                    Prêt à créer votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-500">chef-d'œuvre</span> ?
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Nos experts sont à votre disposition pour donner vie à votre vision et créer une trottinette unique qui vous ressemble.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/en-construction">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-500 to-amber-500 hover:opacity-90 min-w-[220px] transition-all duration-300 h-14 text-base font-medium"
                  >
                    Démarrer ma personnalisation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  </Link>
                  <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full border-white/20 hover:bg-white/10 min-w-[200px] transition-all duration-300 h-14 text-base font-medium"
                  >
                    Contacter un expert
                    </Button>
                     </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
