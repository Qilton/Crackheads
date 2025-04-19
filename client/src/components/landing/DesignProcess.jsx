import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'

const DesignProcess = () => {
  const [openId, setOpenId] = useState(1)
  
  const processes = [
    {
      id: 1,
      title: 'Consultation',
      description: 'We start by understanding your business goals, challenges, and vision. This phase involves in-depth discussions with stakeholders to gather requirements and establish success metrics.'
    },
    {
      id: 2,
      title: 'Research and Strategy Development',
      description: 'Our team conducts comprehensive market research, competitor analysis, and user research to develop a strategic roadmap tailored to your specific needs and objectives.'
    },
    {
      id: 3,
      title: 'UX/UI Design',
      description: 'We create intuitive user experiences and visually compelling interfaces that align with your brand identity and meet user expectations, ensuring optimal engagement and conversion.'
    },
    {
      id: 4,
      title: 'Development and Implementation',
      description: 'Our developers bring designs to life using cutting-edge technologies and best practices, ensuring scalable, secure, and high-performance digital solutions.'
    },
    {
      id: 5,
      title: 'Testing and Quality Assurance',
      description: 'Rigorous testing across multiple devices, browsers, and scenarios ensures your digital product works flawlessly and delivers an exceptional user experience.'
    },
    {
      id: 6,
      title: 'Launch and Monitoring',
      description: 'We handle the deployment process and provide ongoing support and maintenance to ensure your digital solution continues to perform optimally and evolve with your business needs.'
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
          <h2 className="text-3xl text-left md:text-heading-sm font-bold mb-4">Our Working Process</h2>
          <p className="text-gray text-left  max-w-2xl">
            We follow a proven methodology that ensures successful outcomes for every project, from initial consultation to launch and beyond.
          </p>
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
                    {process.id < 10 ? `${process.id}` : process.id}
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

export default DesignProcess