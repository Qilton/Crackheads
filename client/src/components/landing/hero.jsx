import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useState } from 'react'
import axios from 'axios'
const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
    const [communityName, setCommunityName] = useState('')
    const [description, setDescription] = useState('')
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleCreateCommunity = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('No token found')
      return
    }
    try {
      const response = await axios.post('http://localhost:8080/community/create', { communityName, description },{
        headers: {
            Authorization:token,
        },
    })
      console.log(response.data)
      closeModal()
    } catch (error) {
      console.error('Error creating community:', error)
    }
  }

  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center ">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl md:text-left lg:text-heading-lg font-bold mb-6 leading-tight">
              Build your strong<br className="hidden md:block" />
              and safe community
            </h1>
            <p className="text-gray md:text-left text-lg mb-8 max-w-lg">
            A digital platform where community members can report inconveniences and emergency issues directly to their society's secretary for quick and effective resolution.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a 
                href="#contact" 
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openModal}
              >
                Create Community
                <FiArrowRight className="ml-2" />
              </motion.a>
              <motion.a 
                href="#services" 
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join a community
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-primary rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-dark rounded-full"></div>
              <div className="relative z-10 bg-light-gray rounded-2xl overflow-hidden shadow-lg">
                <video className='w-full' disablePictureInPicture src="src/assets/safe video.mp4"  loop muted autoPlay></video>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[1000] flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-[1001]">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Create a Community</h2>
            <form>
              <input
                type="text"
                placeholder="Community Name"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
              />
              <button
                type="submit"
                className="btn btn-primary w-full"
                onClick={handleCreateCommunity}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
