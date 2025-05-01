"use client"

import Link from "next/link"
import { Zap, Twitter, Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

const footerLinks = {
  boutique: [
    { name: "Trottinettes", href: "/boutique/trottinettes" },
    { name: "Accessoires", href: "/boutique/accessoires" },
    { name: "Nouveautés", href: "/boutique/nouveautes" },
  ],
  services: [
    { name: "Réparation", href: "/services/reparation" },
    { name: "Customisation", href: "/services/customisation" },
    { name: "Entretien", href: "/services/entretien" },
  ],
  entreprise: [
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
    { name: "Carrières", href: "/carrieres" },
  ],
  legal: [
    { name: "Confidentialité", href: "/politique-de-confidentialite" },
    { name: "CGV", href: "/conditions-generales-vente" },
    { name: "Mentions légales", href: "/mentions-legales" },
    { name: "Cookies", href: "/politique-cookies" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com/trott-e-perf", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/trott-e-perf", icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 mt-auto">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Boutique</h3>
              <ul className="space-y-3">
                {footerLinks.boutique.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Entreprise</h3>
              <ul className="space-y-3">
                {footerLinks.entreprise.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-4">Légal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-900 py-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
            {/* Logo à gauche */}
            <div className="flex items-center md:w-1/4">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                <span>Trott E Perf</span>
              </Link>
            </div>

            {/* Réseaux sociaux au milieu */}
            <div className="flex items-center justify-center space-x-8 my-6 md:my-0 order-last md:order-none md:w-2/4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-110 duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6 md:h-7 md:w-7" />
                </Link>
              ))}
            </div>

            {/* Copyright à droite en plus petit */}
            <div className="text-xs text-gray-500 md:w-1/4 md:text-right">
              Copyright © {new Date().getFullYear()} Trott E Perf. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
