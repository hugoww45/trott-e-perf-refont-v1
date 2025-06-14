"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ChevronDown, CreditCard, ArrowRight, Shield, Clock, Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Animation des particules
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 0.5 + 0.2,
  }));

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Arrière-plan avec effet parallax */}
      <div className="absolute inset-0 z-0 w-full">
        <motion.div
          style={{ scale, y: textY }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50 z-10" />
          <Image
            src="/static/header-p2.jpg"
            alt="Financement"
            fill
            priority
            className="object-cover object-center opacity-40"
          />

          {/* Overlay de grille */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-20 opacity-30" />

          {/* Particules */}
          <div className="absolute inset-0 z-20">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-primary/30"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: ["0%", `${particle.speed * 100}%`],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 8 / particle.speed,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Conteneur principal */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-16 px-4">
        <div className="container mx-auto w-full max-w-screen-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Contenu texte */}
            <div className="order-2 lg:order-1 text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 mb-8 bg-primary/20 px-4 py-2 rounded-full">
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Financement Flexible</span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  <motion.span
                    className="text-white inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    Le futur est
                  </motion.span>
                  <br />
                  <motion.span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                  >
                    accessible
                  </motion.span>
                </h1>

                <motion.p
                  className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  Nos solutions de financement vous permettent de rider sans compromis,
                  avec des options flexibles adaptées à vos besoins.
                </motion.p>

                {/* Badges avantages */}
                <motion.div
                  className="flex flex-wrap gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  {[
                    { icon: <Clock className="w-4 h-4" />, text: "Approbation rapide" },
                    { icon: <Shield className="w-4 h-4" />, text: "100% sécurisé" },
                    { icon: <Star className="w-4 h-4" />, text: "Sans frais cachés" },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2"
                    >
                      <span className="text-primary">{badge.icon}</span>
                      <span className="text-sm text-white">{badge.text}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <Link href="/en-construction">
                    <Button
                      className="px-8 py-6 text-lg bg-primary text-black hover:bg-primary/90 transition-all group"
                      size="lg"
                    >
                      <span>Simuler mon financement</span>
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    className="px-8 py-6 text-lg bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      const solutionsSection = document.getElementById('solutions-section');
                      if (solutionsSection) {
                        solutionsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    En savoir plus
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Carte principale */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm p-8 lg:p-10">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/40 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-12 w-40 h-40 bg-primary/30 rounded-full blur-3xl"></div>

                {/* Animation des cercles */}
                <motion.div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full border border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 rounded-full border border-primary/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />

                <div className="relative z-10">
                  <div className="mb-6 flex items-end justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Exemple de paiement</p>
                      <h3 className="text-white text-3xl font-bold mt-1">599 €</h3>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-2"></span>
                      <span className="text-white font-medium">En 4 fois</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
                    {[149.75, 149.75, 149.75, 149.75].map((amount, i) => (
                      <motion.div
                        key={i}
                        className={`rounded-xl p-3 md:p-4 ${i === 0 ? 'border-2 border-primary bg-black/50' : 'border border-white/10 bg-white/5'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * i + 0.5 }}
                      >
                        <div className="text-sm text-gray-400">Paiement {i + 1}</div>
                        <div className="text-white font-bold mt-1">{amount}€</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badges flottants */}
              <motion.div
                className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-lg p-4 rounded-lg border border-white/10 hidden lg:block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <div className="text-primary font-bold">24/7</div>
                <div className="text-xs text-gray-400">Support client</div>
              </motion.div>

              <motion.div
                className="absolute -right-5 bottom-12 bg-black/80 backdrop-blur-lg p-4 rounded-lg border border-white/10 hidden lg:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <div className="text-primary font-bold">100%</div>
                <div className="text-xs text-gray-400">Sécurisé</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Flèche de défilement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </div>
  );
}
