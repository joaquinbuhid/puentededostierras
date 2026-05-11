import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import ProductHighlight from '@/components/product-highlight'
import Culture from '@/components/culture'
import HowToBuy from '@/components/how-to-buy'
import Newsletter from '@/components/newsletter'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ProductHighlight />
      <Culture />
      <HowToBuy />
      <Newsletter />
      <Footer />
    </main>
  )
}
