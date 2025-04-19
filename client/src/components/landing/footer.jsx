import { FiMail, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="text-white font-bold text-xl flex items-center mb-6">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              FutureLabs
            </a>
            <p className="text-gray-400 mb-6">
              We design and develop custom digital solutions that help businesses transform and innovate.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FiGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Digital Strategy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">UX/UI Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Mobile Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">E-commerce Solutions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Our Process</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="mt-1 mr-3 text-primary" />
                <span className="text-gray-400">123 Innovation Street, San Francisco, CA 94103</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-3 text-primary" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-primary transition-colors duration-300">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center">
                <FiMail className="mr-3 text-primary" />
                <a href="mailto:hello@futurelabs.com" className="text-gray-400 hover:text-primary transition-colors duration-300">hello@futurelabs.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} FutureLabs. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-500 text-sm hover:text-primary transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer