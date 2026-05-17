import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CountryProvider } from './country-context'
import { CartProvider } from './cart-context'
import CountryModal from '@/components/country-modal'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Puente de Dos Tierras | Mezcal Artesanal',
  description: 'Auténtico mezcal mexicano en Argentina. Conectamos a productores mexicanos con vos, para que disfrutes un mezcal artesanal, de calidad y a un precio accesible.',
  keywords: ['mezcal', 'mezcal artesanal', 'mezcal mexicano', 'Argentina', 'Oaxaca', 'agave', 'espadin'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <CountryProvider>
          <CartProvider>
            <CountryModal />
            {children}
          </CartProvider>
        </CountryProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
