'use client'

import { Search, CreditCard, Truck } from 'lucide-react'
import { useCountry } from '@/app/country-context'

const stepsArgentina = [
  {
    icon: Search,
    title: 'Elegí tu mezcal',
    description: 'Explorá nuestra selección de mezcales artesanales.'
  },
  {
    icon: CreditCard,
    title: 'Comprá online',
    description: 'Proceso 100% seguro y múltiples medios de pago.'
  },
  {
    icon: Truck,
    title: 'Te lo enviamos',
    description: 'Recibilo en la puerta de tu casa en todo el país.'
  }
]

const stepsMexico = [
  {
    icon: Search,
    title: 'Elige tu mezcal',
    description: 'Explora nuestra selección de mezcales artesanales.'
  },
  {
    icon: CreditCard,
    title: 'Compra en línea',
    description: 'Proceso 100% seguro y múltiples métodos de pago.'
  },
  {
    icon: Truck,
    title: 'Te lo enviamos',
    description: 'Recíbelo en la puerta de tu casa en todo el país.'
  }
]

export default function HowToBuy() {
  const { country } = useCountry()
  const steps = country === 'mexico' ? stepsMexico : stepsArgentina
  const title = country === 'mexico'
    ? 'Comprar mezcal artesanal nunca fue tan fácil'
    : 'Comprar mezcal en Argentina nunca fue tan fácil'

  return (
    <section className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card shadow-lg flex items-center justify-center">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                  <svg className="w-8 h-8 text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
