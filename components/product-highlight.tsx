'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Flame, Beaker, Leaf, Mountain } from 'lucide-react'
import { useCountry } from '@/app/country-context'

const processSteps = [
  { icon: Leaf, title: 'AGAVE ESPADÍN', description: 'Agave angustifolia Haw.' },
  { icon: Mountain, title: 'HORNO CÓNICO DE PIEDRA', description: 'Cocción tradicional' },
  { icon: Beaker, title: 'FERMENTACIÓN NATURAL', description: 'Sin acelerantes' },
  { icon: Flame, title: 'DOBLE DESTILACIÓN EN COBRE', description: 'Proceso artesanal' },
]

export default function ProductHighlight() {
  const { country } = useCountry()
  
  const price = country === 'argentina' ? '$28.900 ARS' : '$700 MXN'

  return (
    <section id="mezcales" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Producto destacado</span>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left - Bottle static */}
          <div className="lg:col-span-1 h-[400px] lg:h-[550px] order-2 lg:order-1 flex items-center justify-center relative">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-primary/5 blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png"
                alt="Botella de Mezcal Puente de Dos Tierras - Espadín Joven"
                width={240}
                height={480}
                className="object-contain drop-shadow-xl h-auto"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.25))',
                }}
              />
            </div>
          </div>
          
          {/* Center - Product Info */}
          <div className="lg:col-span-1 space-y-6 order-1 lg:order-2">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">
                Espadín Joven
              </h2>
              <p className="text-lg text-muted-foreground italic">
                Suave, equilibrado y perfecto para comenzar.
              </p>
            </div>
            
            <p className="text-foreground leading-relaxed">
              Elaborado con agave Espadín de Oaxaca, cocido en horno cónico de piedra, fermentado naturalmente y destilado en cobre. Un mezcal joven que conserva el alma de la tradición.
            </p>
            
            <div className="grid grid-cols-4 gap-4 py-4 border-y border-border">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">100% Agave</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">J</span>
                </div>
                <p className="text-xs text-muted-foreground">Joven</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Oaxaca, México</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">44°</span>
                </div>
                <p className="text-xs text-muted-foreground">Alc. 44% Vol.</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                VER PRODUCTO
              </Button>
              <div className="text-right">
                <p className="text-3xl font-bold text-foreground">{price}</p>
              </div>
            </div>
          </div>
          
          {/* Right - Process */}
          <div className="lg:col-span-1 space-y-6 order-3">
            <div className="bg-secondary rounded-xl p-6 space-y-4">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MapPin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
