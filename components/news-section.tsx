'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const newsArticles = [
  {
    id: 1,
    title: 'Les nouvelles réglementations pour les trottinettes électriques en 2024',
    excerpt: 'Découvrez les changements importants concernant l\'utilisation des trottinettes électriques et comment rester en conformité.',
    date: '15 avril 2024',
    image: '/header-p1.jpg',
    category: 'Législation'
  },
  {
    id: 2,
    title: 'Notre sélection des meilleures trottinettes pour l\'été 2024',
    excerpt: 'Nous avons testé pour vous les modèles les plus performants pour vous accompagner durant la belle saison.',
    date: '28 mars 2024',
    image: '/header-p2.jpg',
    category: 'Tests & Comparatifs'
  },
  {
    id: 3,
    title: 'Ouverture d\'un nouveau centre de service TROTT\'e Perf',
    excerpt: 'Notre réseau s\'agrandit avec l\'ouverture d\'un nouveau centre dédié à l\'entretien et à la réparation de vos trottinettes.',
    date: '10 février 2024',
    image: '/header-p3.jpg',
    category: 'Actualité'
  }
]

export function NewsSection() {
  return (
    <section className="py-16 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Actualités</h2>
            <p className="text-neutral-400">Les dernières nouvelles du monde de la mobilité électrique</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-4 md:mt-0"
          >
            <a
              href="/actualites"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Toutes les actualités
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 * index }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-black rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-white text-xs font-medium py-1 px-2 rounded">
                  {article.category}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-neutral-400 mb-2">{article.date}</p>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-neutral-300 mb-4">
                  {article.excerpt}
                </p>
                <a
                  href={`/actualites/${article.id}`}
                  className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Lire la suite
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
