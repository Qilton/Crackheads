import { motion } from 'framer-motion'

const Partners = () => {
  const partners = [
    { name: 'Google', logo: 'GOOGLE' },
    { name: 'Microsoft', logo: 'MICROSOFT' },
    { name: 'Adobe', logo: 'ADOBE' },
    { name: 'Spotify', logo: 'SPOTIFY' },
    { name: 'Apple', logo: 'APPLE' },
    { name: 'Amazon', logo: 'AMAZON' }
  ]

  return (
    <section className="py-12 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.h2 
            className="text-sm text-gray font-medium uppercase tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Trusted by industry leaders
          </motion.h2>
        </div>
        
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              className="grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-xl md:text-2xl font-bold text-gray">
                {partner.logo}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Partners