import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ProductProvider } from "@/components/shop/product-provider"
import { Toaster } from "@/components/ui/sonner"
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'] })

// Métadonnées SEO optimisées
export const metadata: Metadata = {
  title: {
    default: "Trott e Perf | Vente et réparation de trottinettes électriques",
    template: "%s | Trott e Perf"
  },
  description: "Trott e Perf, votre spécialiste en vente, réparation et personnalisation de trottinettes électriques. Pièces détachées, accessoires et service de qualité.",
  keywords: [
    "trottinette électrique",
    "réparation trottinette",
    "pièces détachées trottinette",
    "trottinette xiaomi",
    "dualtron",
    "ninebot",
    "accessoires trottinette",
    "entretien trottinette"
  ],
  authors: [{ name: "Trott e Perf", url: "https://trott-e-perf.fr" }],
  creator: "Trott e Perf",
  publisher: "Trott e Perf",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://trott-e-perf.fr"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://trott-e-perf.fr",
    title: "Trott e Perf | Vente et réparation de trottinettes électriques",
    description: "Trott e Perf, votre spécialiste en vente, réparation et personnalisation de trottinettes électriques. Pièces détachées, accessoires et service de qualité.",
    siteName: "Trott e Perf",
    images: [
      {
        url: "https://trott-e-perf.fr/logo.png",
        width: 1200,
        height: 630,
        alt: "Trott e Perf - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trott e Perf | Vente et réparation de trottinettes électriques",
    description: "Trott e Perf, votre spécialiste en vente, réparation et personnalisation de trottinettes électriques. Pièces détachées, accessoires et service de qualité.",
    images: ["https://trott-e-perf.fr/logo.png"],
    creator: "@trotteperf",
  },
  verification: {
    google: "à-compléter-avec-votre-code-de-vérification",
  },
  icons: {
    icon: "/favico.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="google-site-verification" content="à-compléter-avec-votre-code-de-vérification" />

        {/* Données structurées pour l'entreprise */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Trott e Perf",
              "url": "https://trott-e-perf.fr",
              "logo": "https://trott-e-perf.fr/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33123456789",
                "contactType": "customer service",
                "areaServed": "FR",
                "availableLanguage": "French"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Rue de la Trottinette",
                "addressLocality": "Paris",
                "postalCode": "75000",
                "addressCountry": "FR"
              },
              "sameAs": [
                "https://www.facebook.com/trotteperf",
                "https://www.instagram.com/trotteperf",
                "https://twitter.com/trotteperf"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} dark antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ProductProvider>
            {children}
            <Toaster position="bottom-right" />
            <CookieConsent />
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
