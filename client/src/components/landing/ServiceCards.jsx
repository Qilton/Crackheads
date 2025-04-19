import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const ServiceCards = () => {
  const services = [
    {
      icon: '💡',
      title: 'Digital Strategy',
      description: 'We create comprehensive digital strategies aligned with your business objectives.'
    },
    {
      icon: '🎯',
      title: 'Branding & Identity',
      description: 'Develop a strong brand identity that resonates with your target audience.'
    },
    {
      icon: '🖌',
      title: 'UX/UI Design',
      description: 'Design intuitive interfaces that deliver exceptional user experiences.'
    },
    {
      icon: '💻',
      title: 'Web Development',
      description: 'Build robust, scalable web applications using cutting-edge technologies.'
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Create native and cross-platform mobile apps for iOS and Android.'
    },
    {
      icon: '📊',
      title: 'Analytics & Insights',
      description: 'Gather and analyze data to optimize performance and drive growth.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section className="py-20 bg-gray-200">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl  md:text-heading-sm font-bold mb-4">Our Services</h2>
          <p className="text-gray max-w-2xl mx-auto">
            Comprehensive digital solutions to help your business thrive in the digital landscape.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray mb-4">{service.description}</p>
              <motion.a 
                href="#"
                className="inline-flex items-center text-dark font-medium hover:text-primary transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                Learn more <FiArrowRight className="ml-2" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ServiceCards