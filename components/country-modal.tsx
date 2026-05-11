'use client'

import { useCountry } from '@/app/country-context'
import { useEffect, useState } from 'react'

export default function CountryModal() {
  const { country, setCountry } = useCountry()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (country === null) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }, [country])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur background */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative z-10 bg-white rounded-lg shadow-2xl p-8 md:p-12 max-w-md mx-4 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
          ¿De dónde eres?
        </h1>
        
        <p className="text-foreground/70 text-lg mb-8">
          Selecciona tu país para ver el precio en tu moneda
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setCountry('argentina')}
            className="px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors text-lg"
          >
            🇦🇷 Argentina
          </button>
          
          <button
            onClick={() => setCountry('mexico')}
            className="px-8 py-4 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/90 transition-colors text-lg"
          >
            🇲🇽 México
          </button>
        </div>
      </div>
    </div>
  )
}
