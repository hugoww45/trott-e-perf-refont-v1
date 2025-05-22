"use client"

import Link from "next/link"
import { Twitter, Instagram, Linkedin, Facebook } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

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
  { name: "Facebook", href: "https://www.facebook.com/Trott.e.Perf", icon: Facebook  },
  { name: "Instagram", href: "https://www.instagram.com/trott.e.perf/", icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/trott-e-perf/", icon: Linkedin },
]

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 mt-0">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-3">Boutique</h3>
              <ul className="space-y-2">
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
              <h3 className="text-sm font-medium text-gray-400 mb-3">Services</h3>
              <ul className="space-y-2">
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
              <h3 className="text-sm font-medium text-gray-400 mb-3">Entreprise</h3>
              <ul className="space-y-2">
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
              <h3 className="text-sm font-medium text-gray-400 mb-3">Légal</h3>
              <ul className="space-y-2">
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

        {/* Logo Section */}
        <div className="flex justify-center">
          <Link href="/" aria-label="Trott e Perf">
            <div className="relative" style={{ width: "280px", height: "250px" }}>
              <Image
                src="/logo-trotteperf-fb.png"
                alt="Trott e Perf Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-900 py-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright à gauche */}
            <div className="text-xs text-gray-500 md:text-left mb-2 md:mb-0">
              Copyright © {new Date().getFullYear()} Trott e Perf. Tous droits réservés.
            </div>

            {/* Réseaux sociaux à droite */}
            <div className="flex items-center justify-center space-x-8">
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
          </div>
        </div>
      </div>
    </footer>
  )
}
