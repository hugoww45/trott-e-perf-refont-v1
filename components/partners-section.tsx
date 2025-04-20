'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Logos des marques partenaires
const brands = [
  { name: 'MAGURA', logo: '/logo-magura.png' },
  { name: 'PMT', logo: '/logo-pmt.png' },
  { name: 'Galfer', logo: '/logo-galfer.png' },
  { name: 'Hope', logo: '/logo-hope.png' },
  { name: 'MT Helmet', logo: '/logo-mt-helmet.png' },
  { name: 'Nami', logo: '/logo-nami.png' },
  { name: 'Vsett', logo: '/logo-vsett.png' },
  { name: 'Kaboo', logo: '/logo-kaboo.png' },
  { name: 'Dualtron', logo: '/logo-dualtron.png' },
  { name: 'Teverun', logo: '/logo-teverun.png' },
  { name: 'Hikerboy', logo: '/logo-hikerboy.png' },
  { name: 'Kuickwheel', logo: '/logo-kuickwheel.png' },
  { name: 'MiniWalker', logo: '/logo-miniwalker.png' },
  { name: 'Invoxia', logo: '/logo-invoxia.png' },
]

// Doublage des marques pour créer un défilement infini
const infiniteBrands = [...brands, ...brands]

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Animation automatique pour le défilement des logos
  const scrollSpeed = 30 // Pixels par seconde

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let prevTime: number

    const scroll = (time: number) => {
      if (prevTime === undefined) {
        prevTime = time
      }

      const deltaTime = time - prevTime
      prevTime = time

      if (scrollContainer) {
        scrollContainer.scrollLeft += (scrollSpeed * deltaTime) / 1000

        // Boucle quand on arrive à la moitié
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0
        }
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="py-16 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ils parlent de nous
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-24 h-1 bg-primary mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto"
          >
            Découvrez les témoignages et critiques des médias spécialisés et utilisateurs de nos produits et services.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {/* Citations des médias et clients */}
          <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-neutral-800">
            <div className="flex items-start mb-4">
              <div className="bg-primary/20 p-3 rounded-md mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Le Monde du Deux-Roues</h3>
                <p className="text-sm text-neutral-400">Magazine spécialisé</p>
              </div>
            </div>
            <p className="text-neutral-300">« TROTT'e Perf propose des trottinettes d'exception avec un service client irréprochable. Une référence incontournable pour les passionnés de mobilité électrique. »</p>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-neutral-800">
            <div className="flex items-start mb-4">
              <div className="bg-primary/20 p-3 rounded-md mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Mobilité Urbaine</h3>
                <p className="text-sm text-neutral-400">Blog spécialisé</p>
              </div>
            </div>
            <p className="text-neutral-300">« Les modifications proposées par TROTT'e Perf transforment radicalement les performances des trottinettes électriques, avec un réel savoir-faire technique. »</p>
          </div>

          <div className="bg-neutral-900 rounded-xl p-6 shadow-lg border border-neutral-800">
            <div className="flex items-start mb-4">
              <div className="bg-primary/20 p-3 rounded-md mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Électro-Passion</h3>
                <p className="text-sm text-neutral-400">Forum communautaire</p>
              </div>
            </div>
            <p className="text-neutral-300">« La qualité du service après-vente de TROTT'e Perf est exceptionnelle. Une équipe passionnée et réactive, toujours prête à aider avec expertise. »</p>
          </div>
        </motion.div>
      </div>

      {/* Section des marques partenaires */}
      <div className="container mx-auto px-4 mb-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-semibold text-center mb-8"
        >
          Distributeur officiel des marques suivantes
        </motion.h3>
      </div>

      {/* Bandeau défilant des logos */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar py-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex space-x-12 px-8">
            {infiniteBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center bg-neutral-900/40 rounded-md h-24 px-6 border border-neutral-800 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="w-28 h-16 relative flex items-center justify-center">
                  {/* Utiliser Image si vous avez les vrais logos, sinon utiliser du texte */}
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={112}
                      height={64}
                      className="max-h-full max-w-full object-contain"
                      // Fallback à du texte si l'image ne charge pas
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const textNode = document.createElement('span');
                          textNode.className = 'text-white font-semibold text-lg';
                          textNode.textContent = brand.name;
                          parent.appendChild(textNode);
                        }
                      }}
                    />
                  ) : (
                    <span className="text-white font-semibold text-lg">{brand.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 text-center">
        <Link href="/partenaires" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
          <span className="mr-2">Découvrir tous nos partenaires</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </Link>
      </div>
    </section>
  )
}
