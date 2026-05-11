'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const scrolled = Math.max(0, -rect.top)
        const maxScroll = rect.height
        const progress = Math.min(1, scrolled / maxScroll)
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate rotation and perspective based on scroll
  const rotationY = scrollProgress * 360
  const translateY = Math.sin(Date.now() * 0.001) * 5

  return (
    <section 
      ref={sectionRef}
      id="inicio" 
      className="min-h-screen pt-32 pb-16 relative overflow-hidden"
    >
      {/* Background mountains/agave pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-primary/20 to-transparent" />
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

          {/* Right content - Bottle with 3D rotation effect */}
          <div className="relative h-[500px] lg:h-[650px] flex items-center justify-center">
            {/* Glow effect behind bottle */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="w-64 h-64 rounded-full bg-primary/10 blur-3xl"
                style={{
                  transform: `scale(${1 + scrollProgress * 0.3})`,
                }}
              />
            </div>
            
            {/* Bottle container with 3D perspective */}
            <div 
              className="relative z-10 transition-transform duration-100 ease-out"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  transform: `rotateY(${rotationY}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {/* Front of bottle */}
                <div
                  className="relative"
                  style={{
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png"
                    alt="Botella de Mezcal Puente de Dos Tierras - Espadín Joven"
                    width={320}
                    height={640}
                    className="object-contain drop-shadow-2xl h-auto"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary/30"
                  style={{
                    opacity: Math.abs(((rotationY / 72) % 5) - i) < 1 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
