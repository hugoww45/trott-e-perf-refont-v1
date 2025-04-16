"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Zap, Search, ShoppingBag, ChevronDown, X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Cart } from "@/components/cart"

// Définition des éléments de navigation avec mega menu pour certains
const navItems = [
  {
    name: "Boutique",
    href: "/boutique",
    hasMegaMenu: true,
    columns: [
      {
        title: "Catégories",
        links: [
          { name: "Trottinettes électriques", href: "/boutique/trottinettes" },
          { name: "Accessoires", href: "/boutique/accessoires" },
          { name: "Pièces détachées", href: "/boutique/pieces" },
          { name: "Équipements de sécurité", href: "/boutique/securite" }
        ]
      },
      {
        title: "Collections",
        links: [
          { name: "Nouveautés", href: "/boutique/nouveautes" },
          { name: "Meilleures ventes", href: "/boutique/meilleures-ventes" },
          { name: "Offres spéciales", href: "/boutique/offres" },
          { name: "Éditions limitées", href: "/boutique/editions-limitees" }
        ]
      }
    ]
  },
  {
    name: "Services",
    href: "/services",
    hasMegaMenu: true,
    columns: [
      {
        title: "Nos services",
        links: [
          { name: "Réparation", href: "/services/reparation" },
          { name: "Customisation", href: "/services/customisation" },
        ]
      },
      {
        title: "Assistance",
        links: [
          { name: "FAQ", href: "/services/faq" },
          { name: "Garantie", href: "/services/garantie" },
        ]
      }
    ]
  },
  { name: "À propos", href: "/a-propos" },
  { name: "Support", href: "/support" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const menuTimeoutRef = React.useRef<NodeJS.Timeout>()
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()

  // Résout le problème de l'hydratation et du flash blanc
  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Ferme le menu si on navigue
  React.useEffect(() => {
    setIsOpen(false)
    setSearchOpen(false)
  }, [pathname])

  // Gestion du hover pour le mega menu
  const handleMouseEnter = (itemName: string) => {
    if (menuTimeoutRef.current) {
      clearTimeout(menuTimeoutRef.current)
    }
    setHoveredItem(itemName)
  }

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 150)
  }

  // Utilise resolvedTheme pour avoir la valeur réelle même en cas de préférence système
  const isDark = mounted && (theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark'))

  // Utilise une couleur par défaut avant le montage pour éviter le flash
  const navBackgroundBeforeMount = 'bg-[rgba(0,0,0,0.8)] backdrop-blur-md'

  // Style Apple dynamique selon le thème et le scroll
  const navBackground = !mounted
    ? navBackgroundBeforeMount
    : isDark
      ? 'bg-[rgba(0,0,0,0.8)] backdrop-blur-md'
      : 'bg-[rgba(255,255,255,0.8)] backdrop-blur-md'

  const textColorBeforeMount = 'text-[#f5f5f7]'
  const textColor = !mounted ? textColorBeforeMount : isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
  const textColorMuted = !mounted ? 'text-[#a1a1a6]' : isDark ? 'text-[#a1a1a6]' : 'text-[#86868b]'
  const hoverBg = isDark ? 'hover:bg-[#1d1d1f]/40' : 'hover:bg-[#e8e8ed]'
  const searchBg = isDark ? 'bg-[#1d1d1f]' : 'bg-[#e8e8ed]'
  const borderColor = isDark ? 'border-[#424245]' : 'border-[#d2d2d7]'
  const overlayBg = isDark ? 'bg-black/90' : 'bg-white/90'
  const megaMenuBg = isDark ? 'bg-black/80' : 'bg-[rgba(240,240,240,0.98)]'

  return (
    <>
      {/* Barre de navigation style Apple */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          "bg-black py-6"
        )}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Trott-E-Perf Logo"
                width={70}
                height={20}
                className="object-contain"
              />
              <span className={cn("text-xl font-bold text-white", textColor)}>Trott E-Perf</span>
            </Link>

            {/* Menu principal desktop */}
            <div className="hidden md:flex h-full justify-center items-center space-x-8 tracking-[.25em]">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.hasMegaMenu && handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center text-xs font-medium transition-colors h-full px-1",
                      item.href === pathname ? textColor : textColorMuted,
                      "hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7]"
                    )}
                  >
                    {item.name}
                    {item.hasMegaMenu}
                  </Link>
                </div>
              ))}
            </div>

            {/* Icônes à droite */}
            <div className="flex items-center space-x-7">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "hidden md:flex items-center justify-center transition-opacity duration-200",
                  isOpen && "opacity-60",
                  textColorMuted
                )}
              >
                <Search className="h-4 w-4" />
              </button>

              <Cart />

              {/* Bouton hamburger mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </nav>
      </header>


      {/* Mega Menu style Apple - déplacé en dehors du conteneur de navigation pour couvrir toute la largeur */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
           className={cn(
              "absolute top-[70px] left-0 right-0 w-full z-40",
              megaMenuBg,
              "backdrop-blur-md"
            )}
            onMouseEnter={() => handleMouseEnter(hoveredItem)}
            onMouseLeave={handleMouseLeave}
          >
          <div className="w-full max-w-[980px] mx-auto px-4 md:px-6 xl:px-0 py-8">
              <div className="grid grid-cols-2 gap-8">
                {navItems
                  .find(item => item.name === hoveredItem)
                  ?.columns?.map((column, i) => (
                    <div key={i} className="p-4">
                      <h3 className={cn("text-xs font-medium mb-3", textColorMuted)}>
                        {column.title}
                      </h3>
                      <ul className="space-y-3">
                        {column.links.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              className={cn(
                                "block text-sm transition-colors",
                                textColor,
                                "hover:text-[#0071e3] dark:hover:text-[#2997ff]"
                              )}
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                }
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de recherche style Apple */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "fixed inset-0 z-40 pt-[44px]",
              overlayBg,
              "backdrop-blur-md"
            )}
          >
            <div className="max-w-[980px] mx-auto px-6 pt-6">
              <div className="relative">
                <Search className={cn("absolute left-4 top-3 h-4 w-4", textColorMuted)} />
                <input
                  type="text"
                  placeholder="Rechercher sur trott-e-perf.com"
                  autoFocus
                  className={cn(
                    "w-full h-10 pl-10 pr-10 rounded-lg",
                    searchBg,
                    textColor,
                    "outline-none",
                    "text-sm"
                  )}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-3"
                >
                  <X className={cn("h-4 w-4", textColorMuted)} />
                </button>
              </div>
              <div className="mt-6">
                <p className={cn("text-sm font-medium", textColorMuted)}>Recherches suggérées</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                  {['Trottinettes électriques', 'Nouveautés', 'Accessoires', 'Réparation'].map((item) => (
                    <Link
                      key={item}
                      href={`/search?q=${encodeURIComponent(item)}`}
                      className={cn(
                        "block p-3 rounded-lg",
                        hoverBg,
                        textColor,
                        "text-sm"
                      )}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu mobile plein écran style Apple */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "fixed inset-0 z-40 pt-[44px]",
              overlayBg,
              "backdrop-blur-md md:hidden"
            )}
          >
            <div className="h-full overflow-auto px-6 py-8">
              <nav className="space-y-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block text-2xl font-semibold",
                      textColor
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
              <div className={cn("mt-10 pt-10 border-t", borderColor)}>
                <div className="flex space-x-6">
                  <Link href="/search" className={textColorMuted}>
                    <Search className="h-5 w-5" />
                  </Link>
                  <Cart />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
