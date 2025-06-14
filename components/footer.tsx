'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  boutique: [
    { name: 'Trottinettes', href: '/boutique/trottinettes' },
    { name: 'Accessoires', href: '/boutique/accessoires' },
    { name: 'Nouveautés', href: '/boutique/nouveautes' }
  ],
  services: [
    { name: 'Réparation', href: '/services/reparation' },
    { name: 'Customisation', href: '/services/customisation' },
    { name: 'Entretien', href: '/services/entretien' }
  ],
  entreprise: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Contact', href: '/contact' },
    { name: 'Carrières', href: '/carrieres' }
  ],
  legal: [
    { name: 'Confidentialité', href: '/politique-de-confidentialite' },
    { name: 'CGV', href: '/conditions-generales-vente' },
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Cookies', href: '/politique-cookies' }
  ]
}

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/Trott.e.Perf', icon: Facebook },
  { name: 'Instagram', href: 'https://www.instagram.com/trott.e.perf/', icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/trott-e-perf/', icon: Linkedin }
]

export function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-900">
      <div className="container mx-auto px-4">
        {/* Sections de liens en 4 colonnes */}
        <div className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold text-gray-300 mb-4 capitalize">{section}</h3>
                <ul className="space-y-2">
                  {links.map(link => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

          {/* Logo centré sans espace autour */}
          <div className="full flex justify-center items-center -mt-20 -mb-20">
              <Image
                src="/static/logo-trotteperf-fb.png"
                alt="Trott e Perf Logo"
                width={220}
                height={80}
                priority
                className="object-contain"
              />
          </div>


        {/* Réseaux sociaux centrés */}
        <div className="flex justify-center items-center pb-10 space-x-5">
          {socialLinks.map(social => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>

        {/* Copyright centré */}
        <div className="border-t border-neutral-900 py-4">
          <p className="text-sm md:text-base font-light text-gray-300 text-center">
            © 2025 Trott e Perf. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
