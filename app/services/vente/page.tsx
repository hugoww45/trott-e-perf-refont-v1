"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ShoppingBag, Check, ArrowRight, Shield, Zap, Award, Battery, Gauge } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const products = [
  {
    name: "TrottX Pro",
    price: "1299€",
    specs: {
      vitesse: "45 km/h",
      autonomie: "65 km",
      puissance: "800W"
    },
    description: "La référence en matière de performance urbaine.",
    image: "https://images.unsplash.com/photo-1604868189265-219ba7bf7ea3?w=800&h=600&fit=crop"
  },
  {
    name: "TrottX Sport",
    price: "999€",
    specs: {
      vitesse: "35 km/h",
      autonomie: "45 km",
      puissance: "500W"
    },
    description: "L'équilibre parfait entre puissance et maniabilité.",
    image: "https://images.unsplash.com/photo-1604868189269-9fa3611cf2a3?w=800&h=600&fit=crop"
  },
  {
    name: "TrottX City",
    price: "799€",
    specs: {
      vitesse: "25 km/h",
      autonomie: "35 km",
      puissance: "350W"
    },
    description: "Compacte et efficace pour vos trajets quotidiens.",
    image: "https://images.unsplash.com/photo-1604868189266-0193c2c97eb5?w=800&h=600&fit=crop"
  }
]

const testimonials = [
  {
    text: "Une expérience d'achat exceptionnelle, un produit qui dépasse mes attentes.",
    author: "Marie L."
  },
  {
    text: "Le meilleur rapport qualité-prix du marché. Service client irréprochable.",
    author: "Thomas B."
  }
]

export default function VentePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <div ref={containerRef} className="pt-24">
        {/* Hero Video Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/video-back-landing.mp4" type="video/mp4" />
            </video>
          </div>
          
          <motion.div 
            className="relative z-20 container mx-auto px-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-6">
                La performance au service
                <br />
                de votre mobilité
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-12 font-light">
                Découvrez notre nouvelle gamme de trottinettes électriques haute performance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="min-w-[200px] h-12 text-base rounded-full bg-white text-black hover:bg-white/90">
                  Découvrir la gamme
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Product Showcase */}
        <section className="py-24 md:py-32 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                style={{ scale }}
                className="relative aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
                  {products[0].name}
                </h2>
                <p className="text-2xl font-medium text-primary mb-8">
                  {products[0].price}
                </p>
                
                <div className="grid grid-cols-3 gap-8 mb-12">
                  <div>
                    <Gauge className="h-6 w-6 mb-2 text-primary" />
                    <div className="text-2xl font-medium mb-1">{products[0].specs.vitesse}</div>
                    <div className="text-sm text-gray-400">Vitesse max</div>
                  </div>
                  <div>
                    <Battery className="h-6 w-6 mb-2 text-primary" />
                    <div className="text-2xl font-medium mb-1">{products[0].specs.autonomie}</div>
                    <div className="text-sm text-gray-400">Autonomie</div>
                  </div>
                  <div>
                    <Zap className="h-6 w-6 mb-2 text-primary" />
                    <div className="text-2xl font-medium mb-1">{products[0].specs.puissance}</div>
                    <div className="text-sm text-gray-400">Puissance</div>
                  </div>
                </div>

                <Button size="lg" className="w-full rounded-full">
                  Commander maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Grid */}
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
                Trouvez votre modèle idéal
              </h2>
              <p className="text-gray-400 text-lg">
                Une gamme complète pour tous les besoins
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-medium mb-2">{product.name}</h3>
                  <p className="text-xl font-medium text-primary mb-4">{product.price}</p>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-sm text-gray-400">
                      <span className="block font-medium text-white">{product.specs.vitesse}</span>
                      Vitesse
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="block font-medium text-white">{product.specs.autonomie}</span>
                      Autonomie
                    </div>
                    <div className="text-sm text-gray-400">
                      <span className="block font-medium text-white">{product.specs.puissance}</span>
                      Puissance
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-full">
                    En savoir plus
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 md:py-32 bg-black overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="text-center mb-16 last:mb-0"
                >
                  <p className="text-2xl md:text-3xl font-light italic mb-6">
                    "{testimonial.text}"
                  </p>
                  <p className="text-gray-400">{testimonial.author}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-neutral-950">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">
                Prêt à redéfinir votre mobilité ?
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Nos experts sont là pour vous guider dans votre choix.
              </p>
              <Link href="/contact">
                <Button size="lg" className="min-w-[200px] h-12 text-base rounded-full bg-white text-black hover:bg-white/90">
                  Nous contacter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}