export interface Product {
  id: string
  name: string
  subtitle: string
  description: string
  longDescription: string
  price: {
    argentina: number
    mexico: number
  }
  image: string
  features: string[]
  specs: {
    agave: string
    alcohol: string
    volume: string
    origin: string
    process: string
  }
  badge?: string
}

export const products: Product[] = [
  {
    id: 'clasica-premium',
    name: 'Clásica Premium',
    subtitle: 'Elegante y Minimalista',
    description: 'Nuestro mezcal insignia. Suave, equilibrado y perfecto para comenzar en el mundo del mezcal artesanal.',
    longDescription: 'La Clásica Premium representa la esencia pura del mezcal artesanal. Elaborada con agave Espadín de Oaxaca, cocida en horno cónico de piedra durante 72 horas, fermentada naturalmente en tinas de madera y destilada en alambiques de cobre. Su sabor es suave con notas ahumadas sutiles, toques herbales y un final limpio que invita a descubrir más. Ideal para quienes se inician en el mezcal o buscan una experiencia refinada.',
    price: {
      argentina: 28900,
      mexico: 700
    },
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png',
    features: ['100% Agave', 'Doble Destilación', 'Horno Cónico', 'Artesanal'],
    specs: {
      agave: 'Espadín (Agave angustifolia Haw)',
      alcohol: '44% Alc. Vol.',
      volume: '700 ml',
      origin: 'Oaxaca, México',
      process: 'Doble destilación en cobre'
    },
    badge: 'Más vendido'
  },
  {
    id: 'artesanal-rustica',
    name: 'Artesanal Rústica',
    subtitle: 'Tradición Mexicana',
    description: 'Edición especial con presentación tradicional. Sello de cera y etiqueta kraft que honran la tradición mezcalera.',
    longDescription: 'La Artesanal Rústica es un homenaje a las raíces del mezcal. Cada botella viene sellada con cera artesanal y presenta una etiqueta de papel kraft que evoca las técnicas ancestrales de los maestros mezcaleros de Oaxaca. El líquido en su interior es igualmente especial: un mezcal con mayor presencia de notas ahumadas, tierra húmeda y agave cocido. Fermentación natural extendida que le otorga complejidad y profundidad. Para conocedores que aprecian la autenticidad.',
    price: {
      argentina: 34900,
      mexico: 850
    },
    image: '/mezcal-rustico.png',
    features: ['100% Agave', 'Artesanal', 'Fermentación Natural', 'Horno Cónico'],
    specs: {
      agave: 'Espadín (Agave angustifolia Haw)',
      alcohol: '46% Alc. Vol.',
      volume: '700 ml',
      origin: 'Oaxaca, México',
      process: 'Fermentación extendida, destilación tradicional'
    },
    badge: 'Edición Especial'
  },
  {
    id: 'moderna-black',
    name: 'Moderna Black',
    subtitle: 'Sofisticada y Exclusiva',
    description: 'Nuestra línea premium en botella negra. Un mezcal de carácter intenso para paladares exigentes.',
    longDescription: 'La Moderna Black es la expresión más audaz de Puente de Dos Tierras. Presentada en una elegante botella negra mate, este mezcal ofrece una experiencia sensorial única. Elaborado con una selección especial de agaves maduros de 8 años, presenta notas intensas de humo de encino, chocolate amargo, especias y un final prolongado con toques minerales. Doble destilación cuidadosamente controlada para lograr un equilibrio perfecto entre potencia y elegancia. Reservado para ocasiones especiales.',
    price: {
      argentina: 42900,
      mexico: 1050
    },
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png',
    features: ['100% Agave', 'Artesanal', 'Doble Destilación', 'Edición Especial'],
    specs: {
      agave: 'Espadín seleccionado (8 años)',
      alcohol: '47% Alc. Vol.',
      volume: '700 ml',
      origin: 'Oaxaca, México',
      process: 'Doble destilación premium'
    },
    badge: 'Premium'
  },
  {
    id: 'internacional-export',
    name: 'Internacional Export',
    subtitle: 'Conexión Mex-Arg',
    description: 'Diseñada especialmente para el mercado argentino. Calidad de exportación con certificación internacional.',
    longDescription: 'La Internacional Export nace de la conexión entre México y Argentina. Esta edición especial está diseñada para cumplir con los más altos estándares de exportación, manteniendo la esencia artesanal que nos caracteriza. Cada botella lleva la certificación de Denominación de Origen Protegida y está pensada para quienes buscan un mezcal premium en Argentina. Notas equilibradas de agave cocido, cítricos sutiles, hierbas frescas y un ahumado delicado. El puente perfecto entre dos culturas.',
    price: {
      argentina: 32900,
      mexico: 800
    },
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mezcal-jdgCJvvZKCyL3hi8HfYXwgTxOFoAdW.png',
    features: ['100% Agave', 'Artesanal', 'Export Quality', 'Certificación DOP'],
    specs: {
      agave: 'Espadín (Agave angustifolia Haw)',
      alcohol: '44% Alc. Vol.',
      volume: '700 ml',
      origin: 'Oaxaca, México',
      process: 'Destilación certificada para exportación'
    },
    badge: 'Export Quality'
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function formatPrice(price: number, country: 'argentina' | 'mexico'): string {
  if (country === 'argentina') {
    return `$${price.toLocaleString('es-AR')} ARS`
  }
  return `$${price.toLocaleString('es-MX')} MXN`
}
