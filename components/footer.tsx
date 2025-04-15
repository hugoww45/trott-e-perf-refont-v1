"use client"

import Link from "next/link"
import { Zap } from "lucide-react"
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
    { name: "Confidentialité", href: "/confidentialite" },
    { name: "CGV", href: "/cgv" },
    { name: "Mentions légales", href: "/mentions-legales" },
  ],
}

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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <Zap className="h-4 w-4 mr-2" />
                <span>Trott E Perf</span>
              </Link>
            </div>

            <p className="text-sm text-gray-400">
              Copyright © {new Date().getFullYear()} Trott E Perf. Tous droits réservés.
            </p>

            <div className="flex space-x-6">
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
