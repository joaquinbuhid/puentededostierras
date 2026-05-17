'use client'

import Image from 'next/image'
import Link from 'next/link'
import { products, formatPrice } from '@/lib/products'
import { useCountry } from '@/app/country-context'
import { useCart } from '@/app/cart-context'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Eye } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function MezcalesPage() {
  const { country } = useCountry()
  const { addToCart } = useCart()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-accent font-medium mb-4">Nuestra Colección</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Mezcales Artesanales
            </h1>
            <p className="text-muted-foreground text-lg">
              Cada botella cuenta una historia. Descubrí nuestra selección de mezcales 
              artesanales, elaborados con métodos tradicionales por maestros mezcaleros de Oaxaca.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div 
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] bg-gradient-to-b from-muted/30 to-muted/10 p-6">
                  {product.badge && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full z-10">
                      {product.badge}
                    </span>
                  )}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={180}
                      height={360}
                      className="object-contain h-full w-auto transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link 
                      href={`/mezcales/${product.id}`}
                      className="bg-white text-foreground p-3 rounded-full hover:bg-accent hover:text-white transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-white text-foreground p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <p className="text-accent text-sm font-medium mb-1">{product.subtitle}</p>
                  <h3 className="font-serif text-xl text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 3).map((feature) => (
                      <span 
                        key={feature}
                        className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="font-bold text-lg text-foreground">
                      {formatPrice(product.price[country], country)}
                    </span>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(product)}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-serif text-xl mb-2">Envío a Todo el País</h3>
              <p className="text-primary-foreground/80 text-sm">
                {country === 'argentina' 
                  ? 'Envíos a toda Argentina con seguimiento'
                  : 'Entrega en todo México'}
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-2">Pago Seguro</h3>
              <p className="text-primary-foreground/80 text-sm">
                Múltiples medios de pago disponibles
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl mb-2">Calidad Garantizada</h3>
              <p className="text-primary-foreground/80 text-sm">
                Denominación de Origen Protegida
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
