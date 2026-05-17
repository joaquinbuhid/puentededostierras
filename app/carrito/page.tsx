'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/app/cart-context'
import { useCountry } from '@/app/country-context'
import { formatPrice } from '@/lib/products'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield
} from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const { country } = useCountry()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout - in real app would integrate with payment provider
    setTimeout(() => {
      alert(country === 'argentina' 
        ? 'Serás redirigido a la plataforma de pago. ¡Gracias por tu compra!'
        : 'Te contactaremos para coordinar la entrega y el pago. ¡Gracias!'
      )
      setIsCheckingOut(false)
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingBag className="w-24 h-24 text-muted-foreground/30 mx-auto mb-6" />
              <h1 className="font-serif text-3xl text-foreground mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-muted-foreground mb-8">
                Explorá nuestra selección de mezcales artesanales y encontrá el perfecto para vos.
              </p>
              <Link href="/mezcales">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Ver Mezcales
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

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
            Seguir comprando
          </Link>
        </div>
      </div>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl lg:text-4xl text-foreground mb-8">
            Tu Carrito ({items.reduce((sum, item) => sum + item.quantity, 0)} {items.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'producto' : 'productos'})
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border/50"
                >
                  {/* Product Image */}
                  <Link href={`/mezcales/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-32 bg-muted/30 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={96}
                        height={128}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/mezcales/${item.product.id}`}>
                      <h3 className="font-serif text-lg text-foreground hover:text-primary transition-colors">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.product.subtitle}
                    </p>
                    <p className="font-bold text-foreground">
                      {formatPrice(item.product.price[country], country)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-muted transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="hidden sm:block text-right">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="font-bold text-foreground">
                      {formatPrice(item.product.price[country] * item.quantity, country)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Clear Cart */}
              <button 
                onClick={clearCart}
                className="text-sm text-muted-foreground hover:text-red-500 transition-colors"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border/50 p-6 sticky top-32">
                <h2 className="font-serif text-xl text-foreground mb-6">
                  Resumen del pedido
                </h2>

                {/* Items Summary */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="text-foreground">
                        {formatPrice(item.product.price[country] * item.quantity, country)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping */}
                <div className="flex justify-between mb-4">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-foreground">
                    {country === 'argentina' ? 'A calcular' : 'Coordinado'}
                  </span>
                </div>

                {/* Total */}
                <div className="flex justify-between mb-6 pt-4 border-t border-border">
                  <span className="font-bold text-lg text-foreground">Total</span>
                  <span className="font-bold text-lg text-foreground">
                    {formatPrice(totalPrice(country), country)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button 
                  size="lg" 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-lg"
                >
                  {isCheckingOut ? (
                    'Procesando...'
                  ) : country === 'argentina' ? (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Finalizar compra
                    </>
                  ) : (
                    'Solicitar pedido'
                  )}
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Truck className="w-4 h-4 text-accent" />
                    <span>
                      {country === 'argentina' 
                        ? 'Envíos a todo el país' 
                        : 'Entrega coordinada'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Pago 100% seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CreditCard className="w-4 h-4 text-accent" />
                    <span>
                      {country === 'argentina' 
                        ? 'Hasta 6 cuotas sin interés' 
                        : 'Múltiples formas de pago'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
