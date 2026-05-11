import { Droplet, Hand, MapPin } from 'lucide-react'

const features = [
  {
    icon: Droplet,
    title: '100% AGAVE',
    description: 'Sin aditivos ni conservantes'
  },
  {
    icon: Hand,
    title: 'HECHO A MANO',
    description: 'Producción artesanal en pequeños lotes'
  },
  {
    icon: MapPin,
    title: 'DIRECTO DEL PRODUCTOR',
    description: 'Sin intermediarios, precio justo'
  }
]

export default function Features() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
