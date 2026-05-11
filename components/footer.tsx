import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

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

export default function Footer() {
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
              <Link href="#" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
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
                info@puentedostierras.com.ar
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <Phone className="w-4 h-4" />
                +54 11 1234 5678
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                <MapPin className="w-4 h-4" />
                Buenos Aires, Argentina
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
