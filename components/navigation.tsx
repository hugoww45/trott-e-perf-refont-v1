"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Zap, Search, ShoppingBag, ChevronDown, X, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Cart } from "@/components/cart"
import { Search as SearchComponent } from "@/components/search"

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
    href: "",
    hasMegaMenu: true,
    columns: [
      {
        title: "Nos services",
        links: [
          { name: "Assurance", href: "/assurance" },
          { name: "Financement", href: "/financement" },
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

// Définition du composant MobileMenu
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  // Version HTML pure avec design amélioré
  return (
    <div
      id="mobile-menu"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: 'white',
        zIndex: 9999,
        overflow: 'auto',
        padding: '24px'
      }}
    >
      <div>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: 'rgba(80, 80, 80, 0.4)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X style={{ color: 'white', width: '20px', height: '20px' }} />
        </button>

        <div style={{ marginTop: '80px' }}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Rechercher"
                style={{
                  width: '100%',
                  height: '50px',
                  backgroundColor: 'rgba(60, 60, 60, 0.5)',
                  color: 'white',
                  borderRadius: '12px',
                  border: 'none',
                  padding: '0 16px 0 44px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <Search style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                width: '18px',
                height: '18px'
              }} />
            </div>
          </div>

          <a href="/" style={{
            display: 'block',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            margin: '24px 0',
            textDecoration: 'none',
            letterSpacing: '0.2px'
          }}>
            Accueil
          </a>

          <a href="/boutique" style={{
            display: 'block',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            margin: '24px 0 12px',
            textDecoration: 'none',
            letterSpacing: '0.2px'
          }}>
            Boutique
          </a>

          <div style={{
            marginLeft: '24px',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            paddingLeft: '16px'
          }}>
            <a href="/boutique/trottinettes" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              margin: '12px 0',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Trottinettes électriques
            </a>
            <a href="/boutique/accessoires" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              margin: '12px 0',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Accessoires
            </a>
            <a href="/boutique/pieces" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              margin: '12px 0',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Pièces détachées
            </a>
          </div>

          <a href="/services" style={{
            display: 'block',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            margin: '24px 0 12px',
            textDecoration: 'none',
            letterSpacing: '0.2px'
          }}>
            Services
          </a>

          <div style={{
            marginLeft: '24px',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            paddingLeft: '16px'
          }}>
            <a href="/assurance" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              margin: '12px 0',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Assurance
            </a>
            <a href="/financement" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              margin: '12px 0',
              textDecoration: 'none',
              transition: 'color 0.2s ease'
            }}>
              Financement
            </a>
          </div>

          <a href="/a-propos" style={{
            display: 'block',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            margin: '24px 0',
            textDecoration: 'none',
            letterSpacing: '0.2px'
          }}>
            À propos
          </a>

          <a href="/support" style={{
            display: 'block',
            color: 'white',
            fontSize: '24px',
            fontWeight: '600',
            margin: '24px 0',
            textDecoration: 'none',
            letterSpacing: '0.2px'
          }}>
            Support
          </a>
        </div>

        <div style={{
          marginTop: '40px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <a href="/compte" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '16px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Mon compte
          </a>
          <a href="/contact" style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '16px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const [mounted, setMounted] = React.useState(false)
  const menuTimeoutRef = React.useRef<NodeJS.Timeout>()
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()
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

  // Empêcher le scroll du corps quand le menu mobile est ouvert
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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

  // Gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/boutique?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery("")
    }
  }

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

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
              <div className="hidden md:block">
                <SearchComponent className={textColorMuted} />
              </div>

              <Cart />

              {/* Bouton hamburger mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={handleMenuToggle}
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

      {/* Menu mobile */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />

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
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className={cn("absolute left-4 top-3 h-4 w-4", textColorMuted)} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-3"
                >
                  <X className={cn("h-4 w-4", textColorMuted)} />
                </button>
              </form>

              {searchQuery.length >= 2 && (
                <div className="mt-4 bg-background rounded-lg overflow-hidden shadow-lg border">
                  <div className="p-2">
                    <div>
                      <h3 className={cn("text-sm font-medium mb-3", textColorMuted)}>Rechercher dans la boutique</h3>
                      <Link
                        href={`/boutique?q=${encodeURIComponent(searchQuery)}`}
                        className={cn(
                          "flex items-center py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors",
                          textColor
                        )}
                        onClick={() => setSearchOpen(false)}
                      >
                        <Search className="h-4 w-4 mr-3 flex-shrink-0" />
                        <div className="text-sm font-medium">
                          Rechercher "{searchQuery}" dans les produits
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {searchQuery.length < 2 && (
                <div className="mt-6">
                  <p className={cn("text-sm font-medium", textColorMuted)}>Recherches suggérées</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                    {['Trottinettes électriques', 'Nouveautés', 'Accessoires', 'Réparation'].map((item) => (
                      <Link
                        key={item}
                        href={`/boutique?q=${encodeURIComponent(item)}`}
                        onClick={() => setSearchOpen(false)}
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
