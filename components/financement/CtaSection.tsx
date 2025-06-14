"use client";

import { useRef } from "react";
import { motion, useInView, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll();

  const benefits = [
    "Réponse rapide à vos questions",
    "Conseils personnalisés",
    "Accompagnement sur mesure",
    "Support dédié"
  ];

  return (
    <section
      ref={ref}
      className="relative py-28 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-black to-black"></div>
        <Image
          src="/static/header-p3.jpg"
          alt="Contact"
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
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <span className="text-primary font-medium">Contactez-nous</span>
                </div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
                  <span className="text-white">Une question sur </span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    votre projet ?
                  </span>
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                  Notre équipe est à votre disposition pour vous aider à concrétiser votre projet de mobilité urbaine.
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
                  <Link href="/contact">
                    <Button
                      className="relative px-8 py-6 text-lg bg-primary text-black hover:bg-primary/90 group overflow-hidden"
                      size="lg"
                    >
                      <span className="relative z-10 flex items-center">
                        Contactez-nous
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                      <div className="absolute inset-0 w-0 bg-white transition-all duration-300 group-hover:w-full"></div>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Decorative Element - Formulaire de contact simplifié */}
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
                    <div className="text-center mb-6">
                      <span className="text-white text-xl font-bold">Besoin d'aide ?</span>
                      <div className="text-primary/80 mt-1">Nous sommes là pour vous</div>
                    </div>

                    <div className="space-y-4 mb-5">
                      <div className="rounded-lg border border-white/10 p-4 bg-white/5 flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-white/60">Email</div>
                          <div className="text-white font-medium">contact@trott-e-perf.fr</div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-white/10 p-4 bg-white/5 flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-full">
                          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm text-white/60">Téléphone</div>
                          <div className="text-white font-medium">09 87 28 52 44</div>
                        </div>
                      </div>
                    </div>

                    <Link href="/contact">
                      <Button
                        className="w-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        variant="outline"
                      >
                        Formulaire de contact
                      </Button>
                    </Link>
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
