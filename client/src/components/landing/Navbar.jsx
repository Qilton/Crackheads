import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import {useNavigate} from "react-router-dom";
const Navbar = ({ scrolled }) => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isOpen])

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-dark font-bold text-xl flex items-center">
            <div className="w-8 h-8 bg-dark rounded-full flex items-center justify-center mr-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
            SafeCircle
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-dark hover:text-primary transition-colors duration-300">Community</a>
          <a href="#work" className="text-dark hover:text-primary transition-colors duration-300">Services</a>
          <a href="#process" className="text-dark hover:text-primary transition-colors duration-300">Contact</a>
          <a href="#about" className="text-dark hover:text-primary transition-colors duration-300">About</a>
          <a href="#contact" onClick={()=>navigate("/profile")} className="btn btn-primary">Profile</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-dark focus:outline-none"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-white absolute w-full`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a href="#services" className="text-dark hover:text-primary transition-colors duration-300 py-2 border-b border-gray-100">Community</a>
          <a href="#work" className="text-dark hover:text-primary transition-colors duration-300 py-2 border-b border-gray-100">Services</a>
          <a href="#process" className="text-dark hover:text-primary transition-colors duration-300 py-2 border-b border-gray-100">Contact</a>
          <a href="#about" className="text-dark hover:text-primary transition-colors duration-300 py-2 border-b border-gray-100">About</a>
          <a href="#contact" onClick={()=>navigate("/profile")} className="btn btn-primary w-full">Profile</a>
        </div>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar