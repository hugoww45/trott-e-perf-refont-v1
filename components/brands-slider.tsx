'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'

// Liste des marques distribuées
const brands = [
  { name: 'MAGURA', logo: '/logo.png' }, // Utiliser temporairement le logo existant
  { name: 'PMT', logo: '/logo.png' },
  { name: 'Galfer', logo: '/logo.png' },
  { name: 'Hope', logo: '/logo.png' },
  { name: 'MT Helmet', logo: '/logo.png' },
  { name: 'Nami', logo: '/logo.png' },
  { name: 'Vsett', logo: '/logo.png' },
  { name: 'Kaboo', logo: '/logo.png' },
  { name: 'Dualtron', logo: '/logo.png' },
  { name: 'Teverun', logo: '/logo.png' },
  { name: 'Hikerboy', logo: '/logo.png' },
  { name: 'Kuickwheel', logo: '/logo.png' },
  { name: 'MiniWalker', logo: '/logo.png' },
  { name: 'Invoxia', logo: '/logo.png' }
]

// Dupliquer la liste des marques pour créer une animation en boucle infinie
const infiniteBrands = [...brands, ...brands]

export function BrandsSlider() {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animate = async () => {
      const containerWidth = containerRef.current?.offsetWidth || 0
      const duration = 30 // Durée en secondes pour un cycle complet

      // Animation infinie
      await controls.start({
        x: [`0%`, `-50%`],
        transition: {
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }
      })
    }

    animate()
  }, [controls])

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-2"
        >
          Distributeur officiel
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center text-neutral-400 mb-10"
        >
          Des marques de confiance pour des performances exceptionnelles
        </motion.p>
      </div>

      <div className="relative overflow-hidden" ref={containerRef}>
        {/* Dégradé gauche */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10"></div>

        {/* Slider */}
        <motion.div
          animate={controls}
          className="flex items-center gap-12 py-4"
        >
          {infiniteBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="flex flex-col items-center justify-center min-w-[120px]">
              <div className="bg-neutral-900/50 p-4 rounded-lg h-24 w-24 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-16 max-w-16 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-sm font-medium mt-2 text-neutral-300">{brand.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Dégradé droit */}
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10"></div>
      </div>
    </section>
  )
}
