"use client"

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Lightbulb, Workflow, Users, Rocket, Globe, Award, Clock, ChevronRight, ArrowDown, ArrowUpRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react"

// Définition des valeurs de l'entreprise
const values = [
  {
    icon: Heart,
    title: "Passion",
    description: "Nous sommes passionnés par la mobilité électrique et ses possibilités infinies pour transformer nos villes."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous repoussons constamment les limites pour créer des produits à la pointe de la technologie."
  },
  {
    icon: Workflow,
    title: "Excellence",
    description: "Nous visons l'excellence dans chaque aspect de notre travail, de la conception à l'expérience client."
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Nous croyons que les meilleures idées émergent du travail d'équipe et de la diversité des perspectives."
  },
  {
    icon: Globe,
    title: "Impact",
    description: "Nous œuvrons pour un avenir plus durable et une mobilité plus respectueuse de l'environnement."
  }
]

// Témoignages d'employés
const testimonials = [
  {
    name: "Sophie Laurent",
    role: "Ingénieure en électronique",
    quote: "Chez Trott e Perf, j'ai trouvé un environnement où mes idées sont valorisées et où je peux vraiment pousser l'innovation au quotidien.",
    image: "/team-member-1.jpg" // À remplacer par des images réelles
  },
  {
    name: "Thomas Dubois",
    role: "Designer produit",
    quote: "La liberté créative que nous avons ici est incroyable. Nous avons la possibilité de façonner l'avenir de la mobilité urbaine.",
    image: "/team-member-2.jpg" // À remplacer par des images réelles
  },
  {
    name: "Léa Martin",
    role: "Spécialiste en marketing",
    quote: "L'équilibre entre l'ambition collective et le bien-être individuel fait de Trott e Perf un endroit vraiment unique pour travailler.",
    image: "/team-member-3.jpg" // À remplacer par des images réelles
  }
]

// Offres d'emploi actuelles
const jobOpenings = [
  {
    title: "Ingénieur(e) Électronique Senior",
    department: "R&D",
    type: "CDI",
    location: "Paris",
    description: "Rejoignez notre équipe d'innovation pour développer les systèmes électroniques de nos futures trottinettes.",
    id: "job-1"
  },
  {
    title: "Designer UX/UI",
    department: "Design",
    type: "CDI",
    location: "Paris",
    description: "Façonnez l'expérience utilisateur de nos applications et interfaces embarquées.",
    id: "job-2"
  },
  {
    title: "Technicien(ne) de Maintenance",
    department: "Service",
    type: "CDI",
    location: "Lyon",
    description: "Assurez l'excellence technique et le service client de nos centres de réparation.",
    id: "job-3"
  },
  {
    title: "Responsable Marketing Digital",
    department: "Marketing",
    type: "CDI",
    location: "Paris",
    description: "Élaborez et déployez notre stratégie de communication digitale pour renforcer notre présence en ligne.",
    id: "job-4"
  }
]

// Avantages pour les employés
const benefits = [
  {
    title: "Équilibre travail-vie personnelle",
    description: "Horaires flexibles et télétravail partiel pour favoriser votre bien-être."
  },
  {
    title: "Formation continue",
    description: "Formation personnalisé et accès à des ressources d'apprentissage premium."
  },
  {
    title: "Mobilité verte",
    description: "Trottinette de fonction mise à disposition pour nos collaborateurs."
  },
  {
    title: "Santé & Bien-être",
    description: "Mutuelle premium et accès à des programmes de bien-être."
  }
]

// Variants pour éviter le clignotement dans les animations
const testimonialVariants = {
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

export default function CarriersPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [hoverJob, setHoverJob] = useState<string | null>(null)
  const [scrollY, setScrollY] = useState(0)

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

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1])

  // Animation automatique du carousel de témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <div ref={containerRef} className="pt-24 bg-black">
        {/* Hero Section avec animations plus avancées */}
        <section className="min-h-[90vh] relative flex items-center overflow-hidden">
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
                src="/header-p1.jpg"
                alt="Carrières chez Trott e Perf"
                fill
                className="object-cover brightness-[0.4]"
                priority
              />
              <div
                className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"
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
                  REJOIGNEZ NOTRE ÉQUIPE
                </span>
              </motion.div>

              <div className="space-y-6 text-left md:text-left md:max-w-3xl">
                <motion.h1
                  className="text-6xl md:text-8xl font-bold tracking-tight text-white"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <span className="block">Façonnons</span>
                  <span className="block bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">l'avenir</span>
                  <span className="block">ensemble</span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Chez Trott e Perf, nous créons les solutions qui transforment la mobilité urbaine de demain.
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <Link href="/en-construction">
                  <Button
                    size="lg"
                    className="rounded-full px-8 h-14 text-base font-medium bg-primary hover:bg-primary/90"
                  >
                    Découvrir nos offres
                    <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    </Link>
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
          <div className="absolute top-1/4 right-[10%] w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse z-10"></div>
          <div className="absolute bottom-1/4 left-[15%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000 z-10"></div>
        </section>

        {/* Section Notre Mission - Adaptée au thème sombre */}
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
          {/* Fond avec élément graphique */}
          <div className="absolute inset-0 z-0">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-radial from-primary/5 to-transparent opacity-30"></div>
            <div className="absolute left-0 bottom-0 w-80 h-80 bg-primary/5 rounded-full filter blur-[100px]"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                NOTRE MISSION
              </span>
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-8 text-white">
                Redéfinir la mobilité urbaine
              </h2>
              <p className="text-xl text-gray-400 mb-16 leading-relaxed">
                Nous créons les solutions de mobilité électrique les plus innovantes pour transformer la façon dont les gens se déplacent en ville, tout en préservant notre planète.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
              {[
                { title: "Innovation", number: "24/7", description: "Recherche constante d'amélioration" },
                { title: "Qualité", number: "100%", description: "Engagement pour l'excellence" },
                { title: "Impact", number: "+10", description: "Tonnes de CO₂ économisées" }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className="text-center p-8 rounded-2xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="relative mb-4">
                    <span className="text-7xl font-light text-white opacity-20 absolute -top-4 left-1/2 transform -translate-x-1/2">{index + 1}</span>
                    <h3 className="text-5xl font-light mb-3 text-primary relative z-10">{item.number}</h3>
                  </div>
                  <h4 className="text-lg font-semibold mb-3 text-white">{item.title}</h4>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Nos Valeurs avec mise en page innovante */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    NOS VALEURS
                  </span>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                    Ce qui nous <span className="text-primary">définit</span>
                  </h2>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    Nos valeurs sont le moteur de notre innovation et le fondement de notre culture d'entreprise. Chaque jour, nous travaillons à incarner ces principes dans chacune de nos actions.
                  </p>

                  <div className="mt-8 inline-flex items-center cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 group-hover:bg-primary/30 transition-colors duration-300">
                      <Play className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-white group-hover:text-primary transition-colors duration-300">Découvrez notre environnement de travail</span>
                  </div>
                </motion.div>
              </div>

              <div className="relative">
                <div className="grid grid-cols-2 gap-6 max-w-xl">
                  {values.map((value, index) => (
                    <motion.div
                      key={value.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
                      className={`backdrop-blur-sm rounded-xl p-6 border border-neutral-800 ${
                        index % 2 === 0 ? "bg-neutral-900/70" : "bg-neutral-800/70"
                      }`}
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
                      <p className="text-sm text-gray-400">{value.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Éléments décoratifs */}
                <div className="absolute -z-10 top-1/2 right-1/4 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -z-10 bottom-0 left-1/3 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignages avec animation fluide */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              className="max-w-4xl mx-auto text-center mb-16"
              style={{ willChange: "opacity, transform" }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                TÉMOIGNAGES
              </span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                Ils travaillent avec nous
              </h2>
              <p className="text-xl text-gray-400">
                Découvrez les expériences de nos collaborateurs qui contribuent chaque jour à notre mission.
              </p>
            </motion.div>

            <div className="relative max-w-5xl mx-auto">
              <div
                className="overflow-hidden rounded-2xl relative"
                style={{
                  minHeight: "250px",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden" as const,
                  perspective: "1000px" as const,
                }}
              >
                <AnimatePresence mode="sync" initial={false} presenceAffectsLayout={false}>
                  <motion.div
                    key={`testimonial-${activeTestimonial}`}
                    variants={testimonialVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full flex-shrink-0 px-4"
                    style={{
                      willChange: "opacity, transform",
                      transform: "translateZ(0)",
                    }}
                  >
                    <div className="bg-gradient-to-br from-neutral-800/80 to-neutral-900/80 backdrop-blur-sm rounded-2xl p-10 border border-white/10">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                          <div className="w-full h-full bg-neutral-700 relative overflow-hidden">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/30"
                              animate={{
                                rotate: [0, 180],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />
                            {/* Placeholder pour une vraie image */}
                            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
                              {testimonials[activeTestimonial].name.charAt(0)}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-light italic mb-6 text-white leading-relaxed">
                            "{testimonials[activeTestimonial].quote}"
                          </div>
                          <div className="font-medium text-xl mb-1">
                            {testimonials[activeTestimonial].name}
                          </div>
                          <div className="text-primary">
                            {testimonials[activeTestimonial].role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-10 space-x-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`transition-all duration-300 ease-in-out ${
                      activeTestimonial === index
                        ? "w-12 bg-primary h-1"
                        : "w-6 bg-gray-600 h-1 hover:bg-gray-400"
                    }`}
                    aria-label={`Voir témoignage ${index + 1}`}
                  />
                ))}
              </div>

              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-3/4 h-12 bg-primary/20 blur-2xl"></div>
            </div>
          </div>
        </section>

        {/* Section Avantages dans le thème sombre */}
        <section className="py-32 bg-neutral-950 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-radial from-primary/5 to-transparent opacity-30"></div>
            <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                AVANTAGES
              </span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                Ce que nous offrons
              </h2>
              <p className="text-xl text-gray-400">
                Nous prenons soin de nos talents pour qu'ils puissent donner le meilleur d'eux-mêmes.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-neutral-900 to-neutral-800/60 backdrop-blur-sm rounded-2xl p-8 border border-neutral-700/20 relative overflow-hidden group"
                >
                  {/* Effet de halo sur hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl"></div>

                  {/* Numéro décoratif */}
                  <div className="absolute -top-4 -right-4 text-9xl font-bold text-white opacity-5 select-none">
                    {index + 1}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold mb-4 text-white">{benefit.title}</h3>
                    <p className="text-gray-400 mb-6">{benefit.description}</p>

                    <div className="w-12 h-1 bg-primary/50 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Section Offres d'Emploi avec mise en page moderne */}
        <section className="py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                CARRIÈRES
              </span>
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 text-white">
                Rejoignez-nous
              </h2>
              <p className="text-xl text-gray-400 mb-10">
                Trouvez le poste qui vous permettra d'exprimer votre talent et de contribuer à notre mission.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  onHoverStart={() => setHoverJob(job.id)}
                  onHoverEnd={() => setHoverJob(null)}
                  className="group mb-8"
                >
                  <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-8 border border-neutral-800 transition-all duration-300 hover:border-primary/30 hover:bg-neutral-800/50">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-primary transition-colors duration-300">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-block bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary">{job.department}</span>
                          <span className="inline-block bg-neutral-800 rounded-full px-3 py-1 text-xs font-medium text-gray-300">{job.type}</span>
                          <span className="inline-block bg-neutral-800 rounded-full px-3 py-1 text-xs font-medium text-gray-300">{job.location}</span>
                        </div>
                        <p className="text-gray-400 mb-4 md:mb-0 max-w-2xl">{job.description}</p>
                      </div>

                      <Link
                        href={`/carrieres/${job.id}`}
                        className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium group-hover:underline"
                      >
                        <span className="mr-2">Voir le poste</span>
                        <motion.div
                          animate={{ x: hoverJob === job.id ? 5 : 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto mt-16 text-center"
            >
              <p className="text-lg text-gray-400 mb-6">
                Vous ne trouvez pas le poste qui vous convient ?
              </p>
              <Button
                variant="outline"
                className="rounded-full px-8 h-14 text-base font-medium border-primary/30 hover:bg-primary/10 text-primary"
              >
                Candidature spontanée
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Section CTA avec animation avancée */}
        <section className="py-32 bg-gradient-to-b from-black to-neutral-900 relative overflow-hidden">
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
              className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
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

            <motion.div
              className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 10,
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
              className="max-w-3xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white">
                  Prêt à nous <span className="text-primary">rejoindre</span> ?
                </h2>
              </motion.div>

              <motion.p
                className="text-xl mb-12 text-gray-300 leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Ensemble, façonnons l'avenir de la mobilité urbaine et créons un impact durable pour les générations futures.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="rounded-full px-10 h-16 text-lg font-medium bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                >
                  Postuler maintenant
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
