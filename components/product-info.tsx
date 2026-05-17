'use client'

import { useCountry } from '@/app/country-context'
import { Package, CreditCard, Clock, Truck, HelpCircle, CheckCircle } from 'lucide-react'

const faqArgentina = [
  {
    question: '¿Qué es?',
    answer: 'Un mezcal importado de alta calidad producido en México',
    icon: Package,
  },
  {
    question: '¿Cuánto sale?',
    answer: 'Varía según el producto, para este ejemplo $28.900 ARS',
    icon: HelpCircle,
  },
  {
    question: '¿Cuándo se paga?',
    answer: 'Al momento de hacer el pedido por la página',
    icon: CreditCard,
  },
  {
    question: '¿Cuándo sucede?',
    answer: 'Luego de realizar el pago del producto',
    icon: Clock,
  },
  {
    question: '¿Cómo se paga?',
    answer: 'Con cualquier medio online habilitado',
    icon: CreditCard,
  },
  {
    question: '¿Cómo sucede?',
    answer: 'Se entrega en la dirección del usuario',
    icon: Truck,
  },
]

const faqMexico = [
  {
    question: '¿Qué es?',
    answer: 'Un mezcal artesanal producido en el país',
    icon: Package,
  },
  {
    question: '¿Cuánto sale?',
    answer: 'Varía según el producto, para este ejemplo $700 MXN',
    icon: HelpCircle,
  },
  {
    question: '¿Cuándo se paga?',
    answer: 'Al momento de poseer el producto físico',
    icon: CreditCard,
  },
  {
    question: '¿Cuándo sucede?',
    answer: 'Luego de realizar el pago del producto',
    icon: Clock,
  },
  {
    question: '¿Cómo se paga?',
    answer: 'Con cualquier medio habilitado',
    icon: CreditCard,
  },
  {
    question: '¿Cómo sucede?',
    answer: 'De manera física',
    icon: CheckCircle,
  },
]

export default function ProductInfo() {
  const { country } = useCountry()
  const faqData = country === 'argentina' ? faqArgentina : faqMexico

  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Información</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
            Todo lo que necesitás saber
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-background rounded-xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{item.question}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
