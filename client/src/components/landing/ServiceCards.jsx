import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

const ServiceCards = () => {
  const services = [
    {
      icon: '🆘',
      title: 'Emergency Help Request',
      description: 'Send instant help requests to nearby community members with one tap.'
    },
    {
      icon: '📍',
      title: 'Real-Time Location & Alerts',
      description: 'Share your live location for faster, more accurate responses.'
    },
    {
      icon: '🏘',
      title: 'Community Creation & Management',
      description: 'Create or join local groups like neighborhoods, hostels, or offices.'
    },
    {
      icon: '💬',
      title: 'Smart Communication',
      description: 'Chat instantly during emergencies and keep your community informed.'
    },
    {
      icon: '🛡',
      title: 'Verified & Trusted Members',
      description: 'Connect with verified users and build a trusted support network.'
    },
    {
      icon: '🔔',
      title: 'Instant Notifications',
      description: 'Get real-time alerts via app notifications or SMS.'
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
    <section className="py-20 bg-gray-200" id="services">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl  md:text-heading-sm font-bold mb-4">Our Services</h2>
          <p className="text-gray max-w-2xl mx-auto">
          Comprehensive digital solutions to help communities stay connected, safe, and supported during emergencies.
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
              className="bg-white text-left rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
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