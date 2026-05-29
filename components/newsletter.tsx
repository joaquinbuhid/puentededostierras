'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCountry } from '@/app/country-context'
import { Input } from '@/components/ui/input'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const { country } = useCountry()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter submission
    console.log('Newsletter subscription:', email)
    setEmail('')
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
              {country === 'mexico'
                ? 'Entérate de lanzamientos, promociones y más.'
                : 'Enterate de lanzamientos, promociones y más.'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {country === 'mexico'
                ? 'Suscríbete y obtén 10% OFF en tu primera compra.'
                : 'Suscribite y obtené 10% OFF en tu primera compra.'}
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-12"
                required
              />
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8"
              >
                SUSCRIBIRME
              </Button>
            </form>
            
            <p className="text-xs text-muted-foreground mt-4">
              {country === 'mexico'
                ? 'No compartimos tu información. Cancela tu suscripción cuando quieras.'
                : 'No compartimos tu información. Desuscribite cuando quieras.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
