"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Zap, Shield, Sparkles, ArrowLeft, ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimationControls, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { TextReveal } from "@/components/magicui/text-reveal"
import LogoCloud from "@/components/logo-cloud"
import { useEffect, useRef, useState } from "react"
import { Card, Carousel } from "@/components/ui/apple-cards-carousel"
import { PressSection } from "@/components/press-section"
import { BrandsSlider } from "@/components/brands-slider"
import { NewsSection } from "@/components/news-section"

// Configuration du carousel du header
const headerSlides = [
  {
    id: 1,
    video: "/video-back-landing.mp4", // Vidéo existante
    title: "LE FUTUR",
    subtitle: "COMMENCE ICI",
    description: "Une nouvelle génération de trottinettes électriques alliant performance et élégance sélectionnées par Trott e Perf.",
    buttonText: "Découvrir",
    buttonLink: "/boutique"
  },
  {
    id: 2,
    video: "/video-back-landing-1.mp4", // Utiliser la même vidéo en attendant d'avoir les autres
    title: "L'EXCELLENCE",
    subtitle: "OU RIEN",
    description: "Notre gamme de véhicules électriques ont étés sélectionnées pour les riders les plus exigeants afin que la seule limite existante soit la vôtre.",
    buttonText: "Explorer",
    buttonLink: "/services/reparation"
  },
  {
    id: 3,
    video: "/video-back-landing-2.mp4", // Utiliser la même vidéo en attendant d'avoir les autres
    title: "UNE LIBERTE",
    subtitle: "SANS LIMITES",
    description: "Allez où vous voulez, quand vous voulez. Chaque trajet devient un plaisir, chaque arrêt une simple pause.",
    buttonText: "En savoir plus",
    buttonLink: "/a-propos"
  }
];

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

const revealText = [
  "Chaque détail compte.",
  "Chaque innovation rapproche de la perfection.",
  "Nous ne suivons pas la tendance, nous la créons.",
  "Découvrez une nouvelle vision de l'excellence."
].join(" ")

export function HomeContent() {
  const controls = useAnimationControls()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [videoEnded, setVideoEnded] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [videoErrors, setVideoErrors] = useState<boolean[]>([])

  // Configuration du carousel
  const slideDuration = 12000; // Durée de chaque slide en ms

  // Gestion de la transition automatique entre les slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, slideDuration);

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Chargement initial des vidéos
  useEffect(() => {
    // Précharger toutes les vidéos
    videoRefs.current = videoRefs.current.slice(0, headerSlides.length);
    setVideoErrors(new Array(headerSlides.length).fill(false));

    // Démarrer la première vidéo
    if (videoRefs.current[currentSlide]) {
      try {
        const playPromise = videoRefs.current[currentSlide]?.play();
        // Gestion des promesses de lecture vidéo
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Erreur lors de la lecture de la vidéo:", error);
            const newErrors = [...videoErrors];
            newErrors[currentSlide] = true;
            setVideoErrors(newErrors);
          });
        }
      } catch (error) {
        console.error("Erreur de lecture vidéo:", error);
      }
    }
  }, []);

  // Gérer le changement de slide
  const goToNextSlide = () => {
    const nextSlide = (currentSlide + 1) % headerSlides.length;

    // Pause la vidéo actuelle
    if (videoRefs.current[currentSlide]) {
      try {
        videoRefs.current[currentSlide]?.pause();
      } catch (error) {
        console.error("Erreur lors de la mise en pause:", error);
      }
    }

    // Joue la prochaine vidéo
    if (videoRefs.current[nextSlide]) {
      try {
        const videoElement = videoRefs.current[nextSlide];
        if (videoElement) {
          videoElement.currentTime = 0;
          const playPromise = videoElement.play();

          // Gestion des promesses de lecture vidéo
          if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Erreur lors de la lecture de la vidéo:", error);
              const newErrors = [...videoErrors];
              newErrors[nextSlide] = true;
              setVideoErrors(newErrors);
            });
          }
        }
      } catch (error) {
        console.error("Erreur de lecture vidéo:", error);
      }
    }

    setCurrentSlide(nextSlide);
  };

  const goToPrevSlide = () => {
    const prevSlide = (currentSlide - 1 + headerSlides.length) % headerSlides.length;

    // Pause la vidéo actuelle
    if (videoRefs.current[currentSlide]) {
      videoRefs.current[currentSlide]?.pause();
    }

    // Joue la vidéo précédente
    if (videoRefs.current[prevSlide]) {
      const videoElement = videoRefs.current[prevSlide];
      if (videoElement) {
        videoElement.currentTime = 0;
        videoElement.play();
      }
    }

    setCurrentSlide(prevSlide);
  };

  return (
    <>
      {/* Header existant avec le slider de vidéos */}
      <header className="h-screen relative flex flex-col text-center md:text-left">
        {/* Arrière-plan vidéo avec overlay */}
        <div className="absolute inset-0 z-0">
          {headerSlides.map((slide, index) => (
            <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <video
                ref={el => videoRefs.current[index] = el}
                src={slide.video}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                onEnded={() => setVideoEnded(true)}
                onError={() => {
                  const newErrors = [...videoErrors];
                  newErrors[index] = true;
                  setVideoErrors(newErrors);
                }}
              />
            </div>
          ))}
        </div>

        {/* Contenu du slide */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`slide-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="relative z-20 flex flex-col h-full justify-center px-8 md:px-16 lg:px-24"
          >
            <div className="container mx-auto">
              <div className="max-w-3xl">
                {/* Tag line */}
                <motion.div
                  className="mb-4 inline-flex"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                </motion.div>

                {/* Titres principaux */}
                <div className="mb-8">
                  <motion.h2
                    className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-2"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {headerSlides[currentSlide].title}
                  </motion.h2>
                  <motion.h2
                    className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ WebkitBackgroundClip: "text" }}
                  >
                    {headerSlides[currentSlide].subtitle}
                  </motion.h2>
                </div>

                {/* Description */}
                <motion.p
                  className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {headerSlides[currentSlide].description}
                </motion.p>

                {/* Bouton d'action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Link href={headerSlides[currentSlide].buttonLink}>
                    <Button
                      size="lg"
                      className="rounded-sm bg-white text-black hover:bg-white/90 transition-all duration-300 h-12 min-w-[180px] text-base"
                    >
                      {headerSlides[currentSlide].buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation du carousel */}
        <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-30 flex items-center space-x-6">
          {/* Indicateurs de slide */}
          <div className="flex items-center space-x-2">
            {headerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  // Pause la vidéo actuelle
                  if (videoRefs.current[currentSlide]) {
                    videoRefs.current[currentSlide]?.pause();
                  }

                  // Joue la vidéo sélectionnée
                  if (videoRefs.current[index]) {
                    const videoElement = videoRefs.current[index];
                    if (videoElement) {
                      videoElement.currentTime = 0;
                      videoElement.play();
                    }
                  }

                  setCurrentSlide(index);
                }}
                className={`h-px w-10 transition-all duration-500 ${
                  currentSlide === index ? "bg-white" : "bg-white/40"
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Compteur de slides */}
          <div className="text-sm font-medium">
            <span className="text-white">{currentSlide + 1}</span>
            <span className="text-white/40">/{headerSlides.length}</span>
          </div>

          {/* Boutons de navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPrevSlide}
              className="p-2 transition-colors duration-300"
              aria-label="Slide précédent"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNextSlide}
              className="p-2 transition-colors duration-300"
              aria-label="Slide suivant"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Indicateur de défilement */}
        <motion.div
          className="absolute bottom-10 right-8 md:right-16 lg:right-24 z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-white/60 text-xs mb-2 uppercase tracking-widest hidden sm:block">Scroll</span>
            <ArrowDown className="h-4 w-4 text-white animate-bounce" />
          </div>
        </motion.div>
      </header>

      {/* Section Caractéristiques */}
      <section className="py-20 md:py-28 bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-10%" }}
                className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-800"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section id="services" className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <motion.div
              initial={fadeIn.initial}
              whileInView={fadeIn.animate}
              transition={fadeIn.transition}
              viewport={{ once: true, margin: "-10%" }}
              className="max-w-3xl"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
              <p className="text-neutral-400">
                Trott e Perf vous propose une gamme complète de services premium pour répondre à tous vos besoins en matière de mobilité électrique.
              </p>
            </motion.div>
          </div>

          <div className="relative">
            <Carousel
              items={services.map((service, index) => (
                <Card
                  key={service.title}
                  card={{
                    title: service.title,
                    category: service.category,
                    content: service.content,
                    src: service.src
                  }}
                  index={index}
                  layout
                />
              ))}
            />
          </div>
        </div>
      </section>

      {/* SECTION - DISTRIBUTEUR OFFICIEL */}
      <BrandsSlider />

      {/* Text Reveal Section */}
      <TextReveal>{revealText}</TextReveal>

      {/* SECTION - ILS PARLENT DE NOUS */}
      <PressSection />

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-neutral-950">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
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

// Composant flèche vers le bas pour l'indicateur de défilement
function ArrowDown(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <polyline points="19 12 12 19 5 12"></polyline>
    </svg>
  );
}
