"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, Wrench, Sparkles, ThumbsUp, Phone, ArrowRight, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AssurancePage() {
  const { scrollYProgress } = useScroll();
  const insuranceRef = useRef<HTMLElement>(null);
  const coverageRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation avec fond transparent et effet de flou */}
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      {/* Barre de progression */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section - Style Apple */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
        {/* Canvas de fond avec effet profondeur */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-black z-10" />

          {/* Image de fond avec effet de parallaxe subtil */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <Image
              src="/header-p3.jpg"
              alt="Assurance trottinette"
              fill
              className="object-cover opacity-30 blur-[1px]"
              priority
            />
          </motion.div>
        </div>

        {/* Overlays lumineux */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          {/* Glow primaire */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />

          {/* Glow secondaire */}
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 relative z-30 mt-20">
          <div className="flex flex-col items-center">
            {/* Badge premium */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
            </motion.div>

            {/* Titre avec animation séquentielle */}
            <div className="relative">
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-center mb-6 text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="inline-block">Sécurité</span>{" "}
                <span className="inline-block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-blue-400">
                    absolue
                  </span>
                  <motion.span
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-blue-400 w-full opacity-70"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, delay: 1.1 }}
                  />
                </span>
              </motion.h1>
            </div>

            {/* Sous-titre */}
            <motion.p
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 text-center font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Une protection complète conçue pour votre tranquillité.
              Aussi innovante que votre trottinette.
            </motion.p>

            {/* CTA boutons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <Button
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 min-w-[200px] transition-all duration-300 h-14 text-base font-medium"

                onClick={() => {
                  if (experienceRef.current) {
                    experienceRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <Link href="/contact">
                  Obtenir un devis
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-white/20 hover:bg-white/10 min-w-[200px] transition-all duration-300 h-14 text-base font-medium"
                onClick={() => {
                  if (coverageRef.current) {
                    coverageRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Découvrir nos formules
              </Button>
            </motion.div>
          </div>

          {/* Aperçu visuel du produit */}
          <motion.div
            className="mt-16 md:mt-20 relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="relative">
              {/* Cadre avec effet de profondeur */}
              <div className="absolute inset-0 -m-6 bg-gradient-to-b from-primary/20 to-blue-500/20 rounded-3xl blur-xl opacity-30" />

              {/* Image de la carte d'assurance */}
              <div className="bg-gradient-to-br from-neutral-900 to-black rounded-2xl p-8 border border-white/10 shadow-2xl flex items-center justify-between overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-black/0" />

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full gap-6">
                  <div className="text-left">
                    <div className="text-sm text-gray-400 mb-1">ASSURANCE Trott e Perf</div>
                    <h3 className="text-2xl font-medium text-white mb-4">Protection Intégrale</h3>
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center text-sm text-white">
                        <CheckCircle className="h-4 w-4 text-primary mr-1.5" />
                        Vol & Dommages
                      </span>
                      <span className="inline-flex items-center text-sm text-white">
                        <CheckCircle className="h-4 w-4 text-primary mr-1.5" />
                        Assistance 24/7
                      </span>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-70 h-32 w-32" />
                    <div className="bg-gradient-to-br from-primary to-blue-600 h-20 w-20 rounded-full flex items-center justify-center">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Logos des partenaires */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <motion.p
                className="text-gray-500 text-sm mr-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                En partenariat avec :
              </motion.p>
              {[1, 2, 3].map((_, index) => (
                <motion.div
                  key={index}
                  className="h-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <div className="h-6 w-24 bg-gray-400/20 rounded-md"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
          <div className="hidden md:block sm:block flex-col items-center gap-2">
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

      {/* Divider */}
      <div className="relative z-10 h-20 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container mx-auto px-4">
          <div className="h-px bg-white/5 w-full" />
        </div>
      </div>

      {/* Section "Pourquoi s'assurer ?" */}
      <section ref={insuranceRef as React.RefObject<HTMLDivElement>} className="py-24 md:py-32 bg-black relative overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(50,50,50,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,50,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

        {/* Glowing effect */}
        <div className="absolute right-0 top-1/3 w-96 h-96 bg-primary/10 rounded-full blur-[150px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Protection</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Pourquoi </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">s'assurer ?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une protection complète pour vous et votre trottinette
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Vol & Vandalisme",
                description: "Protection contre le vol, la tentative de vol et les actes de vandalisme. Votre trottinette est protégée où que vous soyez.",
                icon: <Lock className="h-6 w-6" />,
                color: "bg-blue-500",
                delay: 0.1
              },
              {
                title: "Casse & Accident",
                description: "Couverture des dommages matériels suite à un accident, une chute ou une collision. Inclut les pièces et la main d'œuvre.",
                icon: <Shield className="h-6 w-6" />,
                color: "bg-emerald-500",
                delay: 0.3
              },
              {
                title: "Assistance & Dépannage",
                description: "Service d'assistance 24/7 et dépannage en cas de panne. Nous vous récupérons, vous et votre trottinette, où que vous soyez.",
                icon: <Wrench className="h-6 w-6" />,
                color: "bg-amber-500",
                delay: 0.5
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-black/40 border border-white/5 rounded-2xl backdrop-blur-sm p-8 hover:border-primary/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} bg-opacity-20 flex items-center justify-center mb-6`}>
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="relative h-32 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r "
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

      {/* Section "Notre couverture" */}
      <section ref={coverageRef as React.RefObject<HTMLDivElement>} className="py-24 md:py-32 bg-gradient-to-b from-black to-black/90 relative overflow-hidden">
        {/* Diagonal grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-25"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Couverture</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="text-white">Notre </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">couverture</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Une vision claire de ce qui est couvert par nos assurances
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                title: "Ce qui est couvert",
                items: [
                  "Vol et tentative de vol avec effraction",
                  "Dommages suite à un accident",
                  "Vandalisme prouvé par constat",
                  "Pièces défectueuses hors garantie",
                  "Dépannage 24/7",
                  "Transport de la trottinette"
                ],
                icon: <CheckCircle className="h-5 w-5" />,
                iconColor: "text-emerald-500",
                borderColor: "border-emerald-800/30",
                bgColor: "bg-emerald-500/5"
              },
              {
                title: "Ce qui n'est pas couvert",
                items: [
                  "Usage professionnel intensif",
                  "Compétitions et courses",
                  "Négligence manifeste",
                  "Modifications non homologuées",
                  "Usure normale des pièces",
                  "Dommages esthétiques mineurs"
                ],
                icon: <XCircle className="h-5 w-5" />,
                iconColor: "text-red-500",
                borderColor: "border-red-800/30",
                bgColor: "bg-red-500/5"
              },
              {
                title: "Options disponibles",
                items: [
                  "Extension de garantie à 3 ans",
                  "Couverture à l'international",
                  "Remplacement valeur à neuf",
                  "Protection conducteur étendue",
                  "Assistance Premium",
                  "Prêt de trottinette"
                ],
                icon: <AlertCircle className="h-5 w-5" />,
                iconColor: "text-amber-500",
                borderColor: "border-amber-800/30",
                bgColor: "bg-amber-500/5"
              }
            ].map((column, colIndex) => (
              <motion.div
                key={colIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: colIndex * 0.2 }}
                className={`rounded-2xl border ${column.borderColor} ${column.bgColor} backdrop-blur-sm p-6 relative overflow-hidden`}
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">{column.title}</h3>

                <ul className="space-y-4">
                  {column.items.map((item, itemIndex) => (
                    <motion.li
                      key={itemIndex}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + itemIndex * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <span className={`mt-0.5 ${column.iconColor} flex-shrink-0`}>{column.icon}</span>
                      <span className="text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Expérience client / garantie */}
      <section ref={experienceRef as React.RefObject<HTMLDivElement>} className="py-24 md:py-36 bg-neutral-950 relative overflow-hidden">
        {/* Dark background with pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_400px_at_center,rgba(120,120,255,0.03),transparent)]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Satisfaction</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                <span className="text-white">Un souci ?</span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                  On s'occupe de tout.
                </span><br />
                <span className="text-white">Sans stress, sans délai.</span>
              </h2>

              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                Notre équipe de spécialistes est disponible 24/7 pour vous accompagner et résoudre rapidement tout problème que vous pourriez rencontrer.
              </p>

              <div className="space-y-4">
                {[
                  "Réponse garantie sous 30 minutes",
                  "Dossier traité sous 48h maximum",
                  "Satisfaction client notée 4.9/5"
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-white">{point}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 relative"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent z-10"></div>
                <Image
                  src="/header-p2.jpg"
                  alt="Support client"
                  fill
                  className="object-cover"
                />

                <div className="absolute left-8 bottom-8 right-8 z-20 p-6 bg-black/30 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 rounded-full bg-primary/20">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-xl mb-2">Assistance 24/7</h3>
                      <p className="text-gray-300 mb-4">Notre équipe est à votre écoute à tout moment pour répondre à vos questions et résoudre vos problèmes.</p>
                      <Link href="/contact">
                      <Button variant="default" size="sm" className="rounded-full bg-white text-black hover:bg-white/90">
                        Nous contacter
                          <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black/90"></div>

        {/* Animated glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[150px] opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
              <span className="text-white">Protégez votre </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
                trottinette maintenant
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-10">
              Souscrivez en quelques minutes et roulez l'esprit tranquille dès aujourd'hui.
            </p>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/contact">
                <Button size="lg" className="min-w-[250px] rounded-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-base h-14">
                  Souscrire à une assurance
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <p className="text-sm text-gray-500 mt-6">
              Sans engagement • Annulation possible à tout moment • Paiement sécurisé
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
