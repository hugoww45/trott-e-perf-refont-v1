"use client";

import { useRef } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PiggyBank, ArrowRight, CheckCircle } from "lucide-react";

export default function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll();

  const benefits = [
    "Processus simple et rapide",
    "Options flexibles de financement",
    "Accompagnement personnalisé",
    "Sécurité garantie"
  ];

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black"></div>
        <Image
          src="/header-p3.jpg"
          alt="Financement"
          fill
          className="object-cover mix-blend-overlay opacity-20"
        />

        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 opacity-80"
          style={{
            background: "radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 70%)",
            scale: useTransform(scrollYProgress, [0, 1], [1.5, 1])
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            {/* Main Content */}
            <div className="lg:w-3/5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
                className=""
              >
                <div className="flex items-center gap-2 mb-6">
                  <PiggyBank className="h-6 w-6 text-primary" />
                  <span className="text-primary font-medium">Simulateur de financement</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
                  <span className="text-white">Prêt à découvrir </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    vos options?
                  </span>
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  Simulez votre financement en quelques clics et trouvez la solution
                  qui correspond le mieux à vos besoins de mobilité urbaine.
                </p>

                <ul className="space-y-3 mb-8">
                  {benefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <Button
                    className="relative px-8 py-6 text-lg bg-primary text-black hover:bg-primary/90 group overflow-hidden"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center">
                      Simuler mon financement
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-500 rounded-2xl opacity-50 blur-xl"></div>
                <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden p-8">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/30 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

                  <div className="relative">
                    <div className="text-center mb-8">
                      <span className="text-white/60 text-sm">Exemple de financement</span>
                      <div className="text-white text-4xl font-bold mt-1">599€</div>
                      <div className="text-primary">ou 4 × 149,75€</div>
                    </div>

                    <div className="rounded-lg border border-white/10 p-5 mb-5 bg-white/5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-white/60 text-sm">Durée</div>
                          <div className="text-white font-medium">3 mois</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-white/60 text-sm">Taux</div>
                          <div className="text-white font-medium">0%</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-white/60 text-sm">Frais</div>
                          <div className="text-white font-medium">0€</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-white/60 text-sm">Total</div>
                          <div className="text-white font-medium">599€</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      variant="outline"
                    >
                      Personnaliser
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
