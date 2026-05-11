import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Culture() {
  return (
    <section id="cultura" className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <span className="text-sm uppercase tracking-widest text-primary-foreground/70">
              Cultura y Tradición
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-balance">
              Más que una bebida, una historia que cruza fronteras.
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Cada botella lleva el trabajo de familias mexicanas que, generación tras generación, mantienen viva la tradición del mezcal artesanal.
            </p>
            <Button 
              variant="outline" 
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              CONOCER MÁS
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          {/* Right - Images grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-primary-foreground/20 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <h4 className="font-bold mb-2">Productores</h4>
                    <p className="text-sm text-primary-foreground/70">
                      Trabajamos directamente con agricultores y maestros mezcaleros.
                    </p>
                  </div>
                </div>
              </div>
              <div className="aspect-[4/3] bg-primary-foreground/20 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <h4 className="font-bold mb-2">Proceso artesanal</h4>
                    <p className="text-sm text-primary-foreground/70">
                      Métodos tradicionales que respetan la esencia del agave.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <div className="aspect-[3/4] bg-primary-foreground/20 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-4">
                    <h4 className="font-bold mb-2">Origen</h4>
                    <p className="text-sm text-primary-foreground/70">
                      Oaxaca, México. Tierra de agaves y mezcales únicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
