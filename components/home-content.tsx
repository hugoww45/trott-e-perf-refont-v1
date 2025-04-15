"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Zap, Shield, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimationControls } from "framer-motion"
import { TextReveal } from "@/components/magicui/text-reveal"
import { useEffect } from "react"
import { Card, Carousel } from "@/components/ui/apple-cards-carousel"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

const features = [
  {
    icon: Zap,
    title: "Performance",
    description: "Une puissance optimale pour une expérience de conduite incomparable."
  },
  {
    icon: Shield,
    title: "Sécurité",
    description: "Des systèmes de sécurité avancés pour une conduite en toute confiance."
  },
  {
    icon: Sparkles,
    title: "Design",
    description: "Une esthétique raffinée qui allie style et fonctionnalité."
  }
]

const services = [
  {
    title: "Vente Premium",
    category: "Services",
    src: "/header-p1.jpg",
    content: (
      <div className="prose dark:prose-invert">
        <p>
          Découvrez notre sélection exclusive de trottinettes électriques haut de gamme.
          Chaque modèle est soigneusement choisi pour offrir une expérience de conduite
          exceptionnelle.
        </p>
      </div>
    ),
  },
  {
    title: "Réparation Expert",
    category: "Services",
    src: "/header-p2.jpg",
    content: (
      <div className="prose dark:prose-invert">
        <p>
          Notre équipe de techniciens qualifiés assure un service de maintenance
          et de réparation professionnel pour votre trottinette électrique.
        </p>
      </div>
    ),
  },
  {
    title: "Customisation",
    category: "Services",
    src: "/header-p3.jpg",
    content: (
      <div className="prose dark:prose-invert">
        <p>
          Personnalisez votre trottinette selon vos besoins avec nos services
          d'optimisation sur mesure pour des performances exceptionnelles.
        </p>
      </div>
    ),
  },
]

// Double the clients array to create a seamless loop
const clients = [
  {
    name: "TechMobile",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80",
  },
  {
    name: "EcoRide",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80",
  },
  {
    name: "UrbanMove",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80",
  },
  {
    name: "SmartWay",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80",
  },
  {
    name: "GreenPath",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80",
  },
]

const infiniteClients = [...clients, ...clients] // Double the array for seamless loop

const revealText = [
  "Chaque détail compte.",
  "Chaque innovation rapproche de la perfection.",
  "Nous ne suivons pas la tendance, nous la créons.",
  "Découvrez une nouvelle vision de l'excellence."
].join(" ")

export function HomeContent() {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      x: [0, -50 * clients.length],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    })
  }, [controls])

  return (
    <>
      {/* Hero Section avec Vidéo */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Vidéo en arrière-plan */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10" />
          <video
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            onEnded={(e) => {
              const video = e.target as HTMLVideoElement;
              video.currentTime = 0;
              video.play();
            }}
          >
            <source src="/video-back-landing.mp4" type="video/mp4" />
          </video>
        </div>

        <motion.div
          className="relative z-20 container mx-auto px-4 text-center"
          initial="initial"
          animate="animate"
          variants={{
            initial: { opacity: 0 },
            animate: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6"
            variants={fadeIn}
          >
            Redéfinissez
            <br />
            votre mobilité
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-12 font-light"
            variants={fadeIn}
          >
            Une nouvelle génération de trottinettes électriques alliant performance et élégance.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeIn}
          >
            <Link href="/boutique">
              <Button size="lg" className="min-w-[200px] h-12 text-base rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300">
                Découvrir
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <ChevronDown className="h-6 w-6 animate-bounce text-white/80" />
        </motion.div>
      </section>

      {/* Concept Section */}
      <section className="py-24 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                Une nouvelle approche de la mobilité urbaine
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Nous redéfinissons les standards de la mobilité électrique en associant technologie de pointe, design raffiné et performance exceptionnelle. Chaque détail est pensé pour vous offrir une expérience de conduite unique.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/header-p4.jpg"
                alt="Concept"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              Une expérience unique
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des services premium pour une mobilité électrique sans compromis.
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
                className="text-center p-6"
              >
                <feature.icon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Apple Cards Carousel */}
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
              Nos Services
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Découvrez notre gamme complète de services premium.
            </p>
          </motion.div>

          <Carousel
            items={services.map((service, index) => (
              <Card key={service.title} card={service} index={index} layout />
            ))}
          />
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 md:py-32 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              Ils nous font confiance
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des partenaires de renom qui partagent notre vision de la mobilité urbaine.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="flex gap-8 items-center"
              animate={controls}
            >
              {infiniteClients.map((client, index) => (
                <motion.div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="relative w-40 h-20 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Text Reveal Section */}
      <TextReveal>{revealText}</TextReveal>

      {/* Reviews Section */}
      {/* <ReviewsSection /> */}

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
              Prêt à redéfinir votre mobilité ?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Découvrez notre sélection de trottinettes électriques haut de gamme et transformez vos déplacements quotidiens.
            </p>
            <Link href="/boutique">
              <Button size="lg" className="min-w-[200px] h-12 text-base rounded-full bg-white text-black hover:bg-white/90">
                Voir la boutique
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
