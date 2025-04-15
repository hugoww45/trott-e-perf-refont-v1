import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ProductProvider } from "@/components/shop/product-provider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://trotteperf.com'),
  title: {
    default: 'Trott E Perf | Trottinettes Électriques Haut de Gamme',
    template: '%s | Trott E Perf'
  },
  description: 'Spécialiste de la vente, réparation et optimisation de trottinettes électriques haut de gamme.',
  keywords: ['trottinette électrique', 'trottinettes haut de gamme', 'réparation trottinette', 'optimisation trottinette'],
  authors: [{ name: 'Trott E Perf' }],
  creator: 'Trott E Perf',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://trotteperf.com',
    title: 'Trott E Perf | Trottinettes Électriques Haut de Gamme',
    description: 'Spécialiste de la vente, réparation et optimisation de trottinettes électriques haut de gamme.',
    siteName: 'Trott E Perf',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trott E Perf | Trottinettes Électriques Haut de Gamme',
    description: 'Spécialiste de la vente, réparation et optimisation de trottinettes électriques haut de gamme.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} dark antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ProductProvider>
            {children}
          </ProductProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
