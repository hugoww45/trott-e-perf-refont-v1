import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { Footer } from "@/components/footer"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trott E Perf | Spécialiste Trottinettes Électriques Haut de Gamme",
  description: "Vente, réparation et personnalisation de trottinettes électriques premium. Découvrez notre sélection de modèles haut de gamme et nos services d'experts.",
  keywords: ["trottinette électrique", "trottinette haut de gamme", "vente trottinette", "réparation trottinette", "customisation trottinette"],
  alternates: {
    canonical: "https://trotteperf.com"
  },
  openGraph: {
    title: "Trott E Perf | Spécialiste Trottinettes Électriques Premium",
    description: "Vente, réparation et personnalisation de trottinettes électriques haut de gamme. Expertise et conseils personnalisés.",
    url: "https://trotteperf.com",
    type: "website",
    images: [
      {
        url: "https://trotteperf.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trott E Perf - Trottinettes électriques premium"
      }
    ]
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation avec fond transparent et effet de flou */}
      <div className="fixed top-0 z-50 w-full backdrop-blur-xl bg-background/20 supports-[backdrop-filter]:bg-background/20 border-b border-border/40">
        <Navigation />
      </div>

      <HomeContent />
      <Footer />
    </main>
  )
}
