"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Trott E Perf",
  description: "Contactez notre équipe d'experts en trottinettes électriques. Service client réactif, assistance technique et conseils personnalisés pour votre mobilité urbaine.",
  keywords: ["contact Trott E Perf", "service client trottinette", "assistance trottinette électrique", "réparation trottinette Paris"],
  openGraph: {
    title: "Contact | Trott E Perf - Experts en Trottinettes Électriques",
    description: "Besoin d'assistance ou de conseils pour votre trottinette électrique ? Notre équipe d'experts est à votre disposition pour vous accompagner.",
    images: [
      {
        url: "https://trotteperf.com/contact-og.jpg",
        width: 1200,
        height: 630,
        alt: "Contactez Trott E Perf"
      }
    ]
  }
}

const contactInfo = {
  address: "123 Avenue des Champs-Élysées, 75008 Paris",
  phone: "+33 1 23 45 67 89",
  email: "contact@trotteperf.com",
  social: [
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", url: "https://instagram.com" },
    { name: "LinkedIn", url: "https://linkedin.com" }
  ]
}

const reasons = [
  {
    title: "Un souci avec votre trottinette ?",
    description: "On vous trouve une solution rapide."
  },
  {
    title: "Besoin d'un conseil avant achat ?",
    description: "Nos experts sont là pour vous guider."
  },
  {
    title: "Un service premium",
    description: "Taillé pour les riders exigeants."
  }
]

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation avec fond transparent et effet de flou */}
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <div ref={containerRef} className="min-h-screen pt-24 bg-background">
        {/* Hero Section */}
        <motion.section
          className="container mx-auto px-4 py-24 md:py-32 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
              Un échange direct,
              <br />
              sans détour.
            </h1>
            <p className="text-xl text-gray-400">
              Parlons de votre projet de mobilité.
            </p>
          </motion.div>
        </motion.section>

        {/* Contact Info Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40 h-full">
                  <MapPin className="h-8 w-8 mb-6 text-primary" />
                  <h3 className="text-xl font-medium mb-4">Notre adresse</h3>
                  <p className="text-gray-400">{contactInfo.address}</p>
                </div>
              </motion.div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href={`tel:${contactInfo.phone}`}>
                  <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40 h-full">
                    <Phone className="h-8 w-8 mb-6 text-primary" />
                    <h3 className="text-xl font-medium mb-4">Téléphone</h3>
                    <p className="text-gray-400">{contactInfo.phone}</p>
                  </div>
                </Link>
              </motion.div>

              <motion.div
                className="group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href={`mailto:${contactInfo.email}`}>
                  <div className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40 h-full">
                    <Mail className="h-8 w-8 mb-6 text-primary" />
                    <h3 className="text-xl font-medium mb-4">Email</h3>
                    <p className="text-gray-400">{contactInfo.email}</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Contact Us Section */}
        <section className="py-24 md:py-32 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              style={{ opacity, y }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Pourquoi nous contacter ?
              </h2>
              <p className="text-gray-400 text-lg">
                Une expertise reconnue au service de votre mobilité
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {reasons.map((reason, index) => (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="bg-neutral-900/50 backdrop-blur-sm p-8 rounded-2xl border border-border/40"
                >
                  <h3 className="text-xl font-medium mb-4">{reason.title}</h3>
                  <p className="text-gray-400">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                Un échange rapide, une réponse précise.
                <br />
                Parlons ensemble.
              </h2>
              <div className="flex justify-center gap-6">
                {contactInfo.social.map((platform) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {platform.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
