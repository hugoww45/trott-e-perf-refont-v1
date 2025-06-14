'use client'

import { useEffect, useRef } from 'react'

const brands = [
  { name: 'MAGURA', logo: '/logo-magurat.png' },
  { name: 'PMT', logo: '/logo-pmt.png' },
  { name: 'Galfer', logo: '/logo-galfer.png' },
  { name: 'Hope', logo: '/logo-hope.png' },
  { name: 'MT Helmet', logo: '/logo-mthelmet.png' },
  { name: 'Nami', logo: '/logo-nami.png' },
  { name: 'Vsett', logo: '/logo-vsett.png' },
  { name: 'Kaboo', logo: '/logo-kaboo.png' },
  { name: 'Dualtron', logo: '/logo-dualtron.png' },
  { name: 'Teverun', logo: '/logo-teverun.png' },
  { name: 'Hikerboy', logo: '/logo-hikerboy.png' },
  { name: 'Kuickwheel', logo: '/logo-kuickwheel.png' },
  { name: 'MiniWalker', logo: '/logo-miniwalker.png' },
  { name: 'Invoxia', logo: '/logo-invoxia.png' }
]

export function BrandsSlider() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollAmount = 0

    const scroll = () => {
      if (!container) return
      scrollAmount += 1
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0
      }
      container.scrollLeft = scrollAmount
    }

    const interval = setInterval(scroll, 20) // + rapide = plus fluide
    return () => clearInterval(interval)
  }, [])

  const infiniteBrands = [...brands, ...brands] // 2x pour scroll infini visuel

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-white">
          Distributeur officiel
        </h2>
        <p className="text-center text-neutral-400 mb-10">
          Des marques de confiance pour des performances exceptionnelles
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative overflow-hidden whitespace-nowrap scrollbar-hide"
      >
        {/* Dégradés gauche et droite */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent z-10" />

        <div className="flex w-max">
          {infiniteBrands.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className="flex flex-col items-center justify-center min-w-[120px] mx-6">
              <div className="bg-neutral-900/50 p-4 rounded-lg h-24 w-24 flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-16 max-w-16 opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="text-sm font-medium mt-2 text-neutral-300">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
