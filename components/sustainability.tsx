'use client'

import { Recycle, Leaf, Globe } from 'lucide-react'
import { useCountry } from '@/app/country-context'

export default function Sustainability() {
  const { country } = useCountry()

  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm uppercase tracking-widest text-primary">Compromiso ambiental</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-6">
              Botellas 100% reciclables
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              En Puente de Dos Tierras nos comprometemos con el medio ambiente. Todas nuestras botellas son completamente reciclables, porque creemos que cuidar la tradición también significa cuidar el planeta.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {country === 'mexico'
                ? 'Desde el proceso de producción hasta el empaque final, buscamos minimizar nuestro impacto ambiental. Cada botella que eliges es un paso hacia un futuro más sustentable.'
                : 'Desde el proceso de producción hasta el empaque final, buscamos minimizar nuestro impacto ambiental. Cada botella que elegís es un paso hacia un futuro más sustentable.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-background rounded-xl p-6 text-center border border-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Reciclable</h3>
              <p className="text-sm text-muted-foreground">Vidrio 100% reciclable en cada botella</p>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Sustentable</h3>
              <p className="text-sm text-muted-foreground">Producción responsable con el medio ambiente</p>
            </div>

            <div className="bg-background rounded-xl p-6 text-center border border-border">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Bajo impacto</h3>
              <p className="text-sm text-muted-foreground">Reducimos nuestra huella de carbono</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
