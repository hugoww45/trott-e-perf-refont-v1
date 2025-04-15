"use client"

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SearchBarProps {
  onSearch: (query: string, tags: string[]) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const predefinedTags = [
    'Nouveautés', 'Promotions', 'Urbain', 'Sport', 'Éco-responsable',
    'Hommes', 'Femmes', 'Enfants', 'Accessoires', 'Chaussures', 'Xiaomi'
  ]

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleSearch = () => {
    onSearch(searchQuery, selectedTags)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setSelectedTags([])
    onSearch('', [])
  }

  const handleSearchSpecific = (term: string) => {
    setSearchQuery(term)
    onSearch(term, [])
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Rechercher des produits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={handleClearSearch}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Rechercher
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {predefinedTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className="cursor-pointer"
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

      {/* Recherche rapide pour produits spécifiques */}
      <div className="flex flex-wrap gap-2 pt-2">
        <span className="text-sm text-muted-foreground">Recherches populaires:</span>
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => handleSearchSpecific("Accélérateur Xiaomi")}
        >
          Accélérateur Xiaomi
        </button>
        <button
          className="text-sm text-primary hover:underline"
          onClick={() => handleSearchSpecific("Noir")}
        >
          Noir
        </button>
      </div>

      {(searchQuery || selectedTags.length > 0) && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearSearch}
          className="text-sm"
        >
          Effacer les filtres
        </Button>
      )}
    </div>
  )
}
