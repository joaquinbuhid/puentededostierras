'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Bottle3D from '@/components/bottle-3d'

export default function Hero() {
  return (
    <section 
      id="inicio" 
      className="min-h-screen pt-32 pb-16 relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/grande-c879Atgc7oDMOQkX9riMh40QzK9USl.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* White overlay to fade the background */}
        <div className="absolute inset-0 bg-white/75" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
          {/* Left content */}
          <div className="space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-foreground leading-tight text-balance">
                Auténtico mezcal mexicano, en Argentina.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Conectamos a productores mexicanos con vos, para que disfrutes un mezcal artesanal, de calidad y a un precio accesible.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                Comprar Mezcales
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg"
              >
                Conocer Nuestra Historia
              </Button>
            </div>
          </div>

          {/* Right content - Interactive 3D Bottle */}
          <div className="relative h-[500px] lg:h-[650px]">
            <Bottle3D
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png"
              alt="Botella de Mezcal Puente de Dos Tierras - Espadín Joven"
              width={320}
              height={640}
              className="w-full h-full"
              intensity={1}
              enableFloat={true}
              enableGlow={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
