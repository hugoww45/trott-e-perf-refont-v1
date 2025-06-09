"use client";

import HeroSection from "./HeroSection";
import SolutionsSection from "./SolutionsSection";
import StepsSection from "./StepsSection";
import TestimonialSection from "./TestimonialSection";
import FaqSection from "./FaqSection";
import CtaSection from "./CtaSection";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { motion, useScroll } from "framer-motion";

export default function FinancementPage() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Fixed Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md">
        <Navigation />
      </div>

      <main className="min-h-screen bg-background text-foreground">
        <HeroSection />

        {/* Divider Element */}
        <div className="relative z-10 h-20 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container mx-auto px-4">
            <div className="h-px bg-white/5 w-full" />
          </div>
        </div>

        <SolutionsSection />

        {/* Nouveau divider avec animation */}
        <div className="relative h-32 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <motion.div
              className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>

        {/* Section Caractéristiques - avec amélioration responsive */}
        <section className="relative py-16 md:py-24 lg:py-28 bg-gradient-to-b from-black to-black/90 overflow-hidden">
          {/* Grille de fond */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

          {/* Particules flottantes */}
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20"
            >
              <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
                <svg className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1"></path>
                </svg>
                <span className="text-sm font-medium text-primary">Simplicité & Sécurité</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-white">Une expérience de </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
                  financement sans friction
                </span>
              </h2>

              <p className="text-gray-400 text-base md:text-lg px-4 sm:px-0">
                Notre service de financement combine simplicité d'utilisation et sécrurité garantie pour une expérience de financement exceptionnelle.
              </p>
            </motion.div>

            {/* Caractéristiques en grille - amélioré pour mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  title: "Paiement sécurisé",
                  description: "Transactions chiffrées et protégées par les derniers protocoles de sécurité.",
                  color: "bg-emerald-500"
                },
                {
                  title: "Traitement rapide",
                  description: "Un conseiller vous recontacte dans les plus brefs délais.",
                  color: "bg-blue-500"
                },
                {
                  title: "Gestion mobile",
                  description: "Suivez vos paiements et gérez votre financement depuis votre smartphone.",
                  color: "bg-violet-500"
                },
                {
                  title: "Économies garanties",
                  description: "Solutions conçues pour maximiser votre pouvoir d'achat avec des taux avantageux.",
                  color: "bg-amber-500"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="col-span-1"
                >
                  <div className={`relative h-full rounded-2xl overflow-hidden ${feature.color} bg-opacity-5 backdrop-blur-sm border border-white/5 p-5 md:p-8 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group`}>
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${feature.color} bg-opacity-20 flex items-center justify-center mb-4 md:mb-6`}>
                      <svg className="h-5 w-5 md:h-6 md:w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6">{feature.description}</p>
                    <div className="mt-auto pt-4 md:pt-6 flex items-center">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "40px" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                        className={`h-[1px] ${feature.color} mr-3`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Decorative Element */}


        <StepsSection />
        <TestimonialSection />
        <FaqSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}
