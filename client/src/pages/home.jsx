import { useState, useEffect } from 'react'
import Navbar from '../components/landing/Navbar'
import "./home.css"
import Hero from '../components/landing/hero'
import FeatureCards from '../components/landing/FeatureCards'
import DesignProcess from '../components/landing/DesignProcess'
import ServiceCards from '../components/landing/ServiceCards'
import Footer from '../components/landing/footer'
import NotificationAlert from '../components/NotificationAlert'

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <div className="relative">
      <Navbar scrolled={scrolled} />
      <Hero />
      <FeatureCards />
      <DesignProcess />
      <ServiceCards />
      <Footer />
      <NotificationAlert/>
    </div>
  )
}

export default App