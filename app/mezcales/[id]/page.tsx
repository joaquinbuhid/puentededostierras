'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductById, products, formatPrice } from '@/lib/products'
import { useCountry } from '@/app/country-context'
import { useCart } from '@/app/cart-context'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { 
  ShoppingCart, 
  Minus, 
  Plus, 
  Check,
  Leaf,
  Flame,
  Droplets,
  MapPin,
  ArrowLeft
} from 'lucide-react'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const { country } = useCountry()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const otherProducts = products.filter(p => p.id !== product.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <Link 
            href="/mezcales" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Mezcales
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-32">
                <div className="bg-gradient-to-b from-muted/40 to-muted/10 rounded-3xl p-8 lg:p-12">
                  {product.badge && (
                    <span className="absolute top-6 left-6 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-full">
                      {product.badge}
                    </span>
                  )}
                  <div className="flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={600}
                      className="object-contain h-auto max-h-[600px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <p className="text-accent font-medium mb-2">{product.subtitle}</p>
              <h1 className="font-serif text-4xl lg:text-5xl text-foreground mb-4">
                {product.name}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-6">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-3xl font-bold text-foreground">
                  {formatPrice(product.price[country], country)}
                </span>
                <span className="text-muted-foreground ml-2">
                  {country === 'argentina' ? '(IVA incluido)' : '(IVA incluido)'}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-foreground font-medium">Cantidad:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="flex gap-4 mb-8">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 text-lg transition-all ${
                    added 
                      ? 'bg-green-600 hover:bg-green-600' 
                      : 'bg-primary hover:bg-primary/90'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Agregado al carrito
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Agregar al carrito
                    </>
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-muted/30 rounded-2xl">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className="border-t border-border pt-8">
                <h3 className="font-serif text-xl text-foreground mb-6">
                  Especificaciones
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Leaf className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Agave</p>
                      <p className="text-muted-foreground text-sm">{product.specs.agave}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Flame className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Graduación</p>
                      <p className="text-muted-foreground text-sm">{product.specs.alcohol}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Droplets className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Contenido</p>
                      <p className="text-muted-foreground text-sm">{product.specs.volume}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Origen</p>
                      <p className="text-muted-foreground text-sm">{product.specs.origin}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Long Description */}
              <div className="border-t border-border pt-8 mt-8">
                <h3 className="font-serif text-xl text-foreground mb-4">
                  Sobre este mezcal
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.longDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-foreground mb-8 text-center">
            También te puede interesar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProducts.map((p) => (
              <Link 
                key={p.id}
                href={`/mezcales/${p.id}`}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative aspect-square bg-gradient-to-b from-muted/30 to-muted/10 p-6">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={160}
                    height={320}
                    className="object-contain h-full w-auto mx-auto transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-accent text-sm font-medium mb-1">{p.subtitle}</p>
                  <h3 className="font-serif text-lg text-foreground mb-2">{p.name}</h3>
                  <p className="font-bold text-foreground">
                    {formatPrice(p.price[country], country)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
