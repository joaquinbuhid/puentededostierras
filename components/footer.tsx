'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useCountry } from '@/app/country-context'

const navigationLinks = [
  { title: 'NAVEGACIÓN', links: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#mezcales', label: 'Mezcales' },
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#productores', label: 'Productores' },
    { href: '#cultura', label: 'Cultura' },
    { href: '#contacto', label: 'Contacto' },
  ]},
  { title: 'AYUDA', links: [
    { href: '#', label: 'Preguntas frecuentes' },
    { href: '#', label: 'Envíos y entregas' },
    { href: '#', label: 'Formas de pago' },
    { href: '#', label: 'Cambios y devoluciones' },
    { href: '#', label: 'Términos y condiciones' },
  ]},
]

const contactArgentina = {
  email: 'info@puentedostierras.com.ar',
  phone: '+54 11 1234 5678',
  location: 'Buenos Aires, Argentina',
}

const contactMexico = {
  email: 'info@puentedostierras.com.mx',
  phone: '+52 55 1234 5678',
  location: 'Ciudad de México, México',
}

export default function Footer() {
  const { country } = useCountry()
  const contact = country === 'mexico' ? contactMexico : contactArgentina

  return (
    <footer id="contacto" className="bg-primary text-primary-foreground py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-bold tracking-wide">PUENTE</span>
                <span className="text-xs text-primary-foreground/70 tracking-widest -mt-1">DE DOS TIERRAS</span>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Puente de Dos Tierras conecta lo mejor de México y Argentina a través del mezcal. Tradición, calidad y autenticidad en cada botella.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/puentededostierras" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Navigation links */}
          {navigationLinks.map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="font-bold text-sm tracking-wider">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider">CONTACTO</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Mail className="w-4 h-4" />
                {contact.email}
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" />
                {contact.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Puente de Dos Tierras. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
