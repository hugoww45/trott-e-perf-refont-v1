'use client'

import { motion } from 'framer-motion'

export function PressSection() {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Ils parlent de nous
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Article 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-neutral-900 rounded-lg p-6 border border-neutral-800"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" />
                  <path d="M15 18h-5" />
                  <path d="M10 6h8v4h-8V6Z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">TechMobilité Magazine</h3>
            </div>
            <blockquote className="text-neutral-300 italic mb-4">
              "TROTT'e Perf se distingue par son expertise et la qualité de ses produits dans le secteur des trottinettes électriques haut de gamme."
            </blockquote>
            <p className="text-sm text-neutral-400">Juin 2023</p>
          </motion.div>

          {/* Article 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-neutral-900 rounded-lg p-6 border border-neutral-800"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">MobilitéVerte</h3>
            </div>
            <blockquote className="text-neutral-300 italic mb-4">
              "Un service client exceptionnel et une connaissance approfondie des dernières innovations en matière de mobilité électrique."
            </blockquote>
            <p className="text-sm text-neutral-400">Septembre 2023</p>
          </motion.div>

          {/* Article 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-neutral-900 rounded-lg p-6 border border-neutral-800"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">UrbanMob Journal</h3>
            </div>
            <blockquote className="text-neutral-300 italic mb-4">
              "TROTT'e Perf représente l'excellence dans le domaine des trottinettes électriques avec un service de personnalisation unique."
            </blockquote>
            <p className="text-sm text-neutral-400">Décembre 2023</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
