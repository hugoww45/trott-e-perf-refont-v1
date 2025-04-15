import { Navigation } from "@/components/navigation"
import { HomeContent } from "@/components/home-content"
import { Footer } from "@/components/footer"

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