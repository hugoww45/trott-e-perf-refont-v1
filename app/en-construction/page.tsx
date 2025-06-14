import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'En Construction | Trott-e',
  description: 'Cette fonctionnalité arrive bientôt. Restez à l\'affût !',
}

export default function ConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-secondary/30 to-background p-8">
      <div className="max-w-4xl w-full text-center space-y-16">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-primary/5 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative space-y-12">
          <div className="flex justify-center">
            <div className="relative w-64 h-32">
              <Image
                src="/static/logo_couleur.svg"
                alt="Trott-e Perf Logo"
                fill
                className="object-contain animate-pulse-slow"
                priority
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-sf-pro-display font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              En Construction
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nous travaillons actuellement sur cette fonctionnalité passionnante.
              <br />
              Restez à l'affût, elle arrive très bientôt !
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            <p className="text-sm text-muted-foreground max-w-md">
              Nous mettons tout en œuvre pour vous offrir une expérience exceptionnelle,
              <br />
              digne de vos attentes.
            </p>
          </div>

          <div className="mt-16">
            <Link href="/">
              <Button
                variant="outline"
                className="group relative overflow-hidden px-10 py-7 text-lg transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                <span className="relative z-10 flex items-center">
                  <ArrowLeft className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  Retour à l'accueil
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
