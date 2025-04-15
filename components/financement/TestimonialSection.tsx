"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Smartphone, ArrowRight } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-6 w-6 text-primary" />,
    title: "Paiements sécurisés",
    description: "Toutes vos transactions sont entièrement chiffrées et sécurisées.",
    delay: 0.2
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Décisions rapides",
    description: "Réponse instantanée pour vos demandes de financement sans attente.",
    delay: 0.4
  },
  {
    icon: <Smartphone className="h-6 w-6 text-primary" />,
    title: "Gestion simplifiée",
    description: "Suivez et gérez facilement vos paiements depuis votre espace client.",
    delay: 0.6
  }
];

export default function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-28 bg-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-primary/5 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/10 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full filter blur-[80px]"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-center opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24">
            {/* Main content */}
            <div className="lg:w-2/5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg"
              >
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  <span className="text-white">Plus de liberté.</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                    Moins de stress.
                  </span>
                </h2>

                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Nos solutions de financement sont conçues pour vous offrir tranquillité
                  d'esprit et flexibilité dans votre expérience de mobilité.
                </p>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="inline-flex items-center group cursor-pointer mt-4"
                >
                  <span className="text-primary font-medium mr-2 group-hover:mr-4 transition-all duration-300">
                    Découvrir nos offres
                  </span>
                  <ArrowRight className="h-5 w-5 text-primary transform group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </motion.div>
            </div>

            {/* Feature cards */}
            <div className="lg:w-3/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, delay: feature.delay }}
                    className="relative group"
                  >
                    <div className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden group-hover:border-primary/20 transition-colors duration-300">
                      {/* Glow effect on hover */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl"></div>

                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-black/50 flex items-center justify-center mb-5">
                          {feature.icon}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3">
                          {feature.title}
                        </h3>

                        <p className="text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
