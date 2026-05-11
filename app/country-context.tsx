'use client'

import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

type Country = 'argentina' | 'mexico' | null

interface CountryContextType {
  country: Country
  setCountry: (country: Country) => void
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<Country>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider')
  }
  return context
}
