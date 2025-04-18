"use client"

import { useState, useRef, useEffect } from 'react'
import { Search, X, ArrowRight, Tag as TagIcon, Info } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from 'framer-motion'

interface SearchBarProps {
  onSearch: (query: string, tags: string[]) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showTags, setShowTags] = useState(false)
  const [showSearchInfo, setShowSearchInfo] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Catégories de tags pour une meilleure organisation
  const tagCategories = {
    'Type': ['Nouveautés', 'Promotions', 'Éco-responsable'],
    'Usage': ['Urbain', 'Sport', 'Quotidien'],
    'Public': ['Hommes', 'Femmes', 'Enfants'],
    'Produits': ['Accessoires', 'Chaussures', 'Xiaomi', 'Électrique']
  }

  // Tendances
  const trendingSearches = [
    'Accélérateur Xiaomi', 'Noir', 'Batterie', 'Pro'
  ]

  useEffect(() => {
    // Charger les recherches récentes depuis localStorage
    const savedSearches = localStorage.getItem('recentSearches')
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 3))
      } catch (e) {
        console.error('Erreur lors du chargement des recherches récentes:', e)
      }
    }
  }, [])

  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return

    const updatedSearches = [query, ...recentSearches.filter(s => s !== query)].slice(0, 3)
    setRecentSearches(updatedSearches)

    try {
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des recherches récentes:', e)
    }
  }

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSearch = () => {
    onSearch(searchQuery, selectedTags)
    saveRecentSearch(searchQuery)
    setShowTags(false)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setSelectedTags([])
    onSearch('', [])
  }

  const handleSearchSpecific = (term: string) => {
    setSearchQuery(term)
    saveRecentSearch(term)
    onSearch(term, [])
  }

  const focusSearchInput = () => {
    searchInputRef.current?.focus()
    setShowTags(true)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-30"
      >
        <div className="flex items-center bg-black/30 backdrop-blur-lg rounded-full border border-neutral-800 hover:border-neutral-700 transition-all p-1.5 shadow-lg">
          <div className="relative flex-grow">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="h-4 w-4 text-neutral-400" />
            </div>
            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher des produits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 shadow-none h-11 pl-10 pr-10 rounded-full focus-visible:ring-primary"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              onFocus={() => setShowTags(true)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 rounded-full transition-colors"
                onClick={() => {
                  setSearchQuery('')
                  searchInputRef.current?.focus()
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <Button
              onClick={handleSearch}
              className="rounded-full bg-primary h-11 px-5 ml-2 hover:bg-primary/90 hover:scale-105 transition-all"
            >
              <span className="hidden sm:inline mr-1">Rechercher</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <button
              className="absolute -right-8 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-white transition-colors"
              onClick={() => setShowSearchInfo(!showSearchInfo)}
              onMouseEnter={() => setShowSearchInfo(true)}
              onMouseLeave={() => setShowSearchInfo(false)}
            >
              <Info className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {showSearchInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-xl p-3 rounded-lg shadow-xl border border-neutral-700 text-xs text-neutral-300 w-64 z-50"
                >
                  <p className="mb-1.5 font-medium text-white">Astuce de recherche</p>
                  <p className="mb-2">Notre moteur de recherche intelligent prend en charge plusieurs formats :</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Recherche avec tirets (burn-e)</li>
                    <li>Recherche avec espaces (burn e)</li>
                    <li>Recherche sans séparateurs (burne)</li>
                  </ul>
                  <p className="mt-2">Toutes les combinaisons sont testées pour trouver votre produit !</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {showTags && (
            <motion.div
              initial={{ opacity: 0, y: -5, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -5, height: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-black/70 backdrop-blur-xl rounded-2xl border border-neutral-800 p-4 shadow-xl"
            >
              <div className="space-y-4">
                {/* Tags organisés par catégories */}
                {Object.entries(tagCategories).map(([category, tags]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-sm font-semibold text-neutral-400 flex items-center">
                      <TagIcon className="h-3 w-3 mr-1" />
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer hover:bg-neutral-800 transition-colors ${selectedTags.includes(tag) ? 'bg-primary text-white hover:bg-primary/90' : 'text-neutral-300'}`}
                          onClick={() => handleTagClick(tag)}
                        >
                          {tag}
                          {selectedTags.includes(tag) && (
                            <X className="h-3 w-3 ml-1" onClick={(e) => {
                              e.stopPropagation()
                              handleTagClick(tag)
                            }} />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Recherches récentes */}
                  {recentSearches.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-neutral-400">Recherches récentes</h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, index) => (
                          <button
                            key={`recent-${index}`}
                            className="text-sm bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 py-1.5 px-3 rounded-full transition-colors"
                            onClick={() => handleSearchSpecific(term)}
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tendances */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-neutral-400">Tendances</h3>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term, index) => (
                        <button
                          key={`trend-${index}`}
                          className="text-sm bg-primary/20 hover:bg-primary/30 text-primary py-1.5 px-3 rounded-full transition-colors"
                          onClick={() => handleSearchSpecific(term)}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {(searchQuery || selectedTags.length > 0) && (
                <div className="mt-4 pt-3 border-t border-neutral-800">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSearch}
                    className="text-sm text-neutral-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    Effacer les filtres
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Affichage des tags sélectionnés */}
      {selectedTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap gap-1.5 mt-2.5"
        >
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="default"
              className="bg-primary/80 hover:bg-primary text-white"
            >
              {tag}
              <X
                className="h-3 w-3 ml-1"
                onClick={() => handleTagClick(tag)}
              />
            </Badge>
          ))}
        </motion.div>
      )}
    </div>
  )
}
