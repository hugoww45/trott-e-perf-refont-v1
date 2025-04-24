"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface ProductFilterProps {
  onFilterChange?: (priceRange: number[], categories: string[], inStock: boolean) => void
}

export function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [inStock, setInStock] = useState(false)

  const categories = ['Urbaine', 'Sport', 'Tout-terrain', 'Accessoires', 'Vêtements']

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(priceRange, selectedCategories, inStock)
    }
  }, [priceRange, selectedCategories, inStock, onFilterChange])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category))
    }
  }

  const handleReset = () => {
    setPriceRange([0, 20000])
    setSelectedCategories([])
    setInStock(false)
    if (onFilterChange) {
      onFilterChange([0, 20000], [], false)
    }
  }

  return (
    <div className="space-y-8 sticky top-24">
      <div>
        <h3 className="text-lg font-medium mb-4">Prix</h3>
        <Slider
          value={priceRange}
          max={20000}
          step={100}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>{priceRange[0]}€</span>
          <span>{priceRange[1]}€</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Catégories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <Label htmlFor={category}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Disponibilité</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={inStock}
              onCheckedChange={(checked) => setInStock(checked as boolean)}
            />
            <Label htmlFor="in-stock">En stock uniquement</Label>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={handleReset}
      >
        Réinitialiser les filtres
      </Button>
    </div>
  )
}
