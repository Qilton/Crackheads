import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'

const DesignProcess = () => {
  const [openId, setOpenId] = useState(1)
  
  const processes = [
    {
      id: 1,
      title: 'Instant Alerts',
      description: 'Get real-time push notifications about local incidents, safety threats, or emergencies.'
    },
    {
      id: 3,
      title: 'Verified Community Network',
      description: 'Connect only with trusted, verified members of your neighborhood for a safe and secure experience.'
    },
    {
      id: 2,
      title: 'GPS Alerts',
      description: 'Get notifications relevant to your specific area — no spam, just what matters near you.'
    },
    {
      id: 4,
      title: 'Community Polls & Feedback',
      description: 'Participate in safety polls or give input on local issues to strengthen community decision-making.'
    }
  ]

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-20" id="process">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl text-left md:text-heading-sm font-bold mb-4">Get started with SafeCircle</h2>
          {/* <p className="text-gray text-left  max-w-2xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, animi?
          </p> */}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {processes.map((process) => (
            <motion.div 
              key={process.id}
              className="process-item py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: process.id * 0.1 }}
            >
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAccordion(process.id)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-dark font-bold mr-4">
                    {process.id < 10 ?` ${process.id}` : process.id}
                  </div>
                  <h3 className="text-xl font-semibold">{process.title}</h3>
                </div>
                <button className="text-dark hover:text-primary transition-colors duration-300">
                  {openId === process.id ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </button>
              </div>
              
              <AnimatePresence>
                {openId === process.id && (
                  <motion.div 
                    className="pl-12 pr-4 pt-3"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-gray">{process.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DesignProcess