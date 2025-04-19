import { FiMail, FiFacebook, FiPhone, FiMapPin, FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { PiWhatsappLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="text-left bg-black text-white pt-16 pb-6">
      <div className="text-left container mx-auto px-4">
        <div className="text-left grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <a href="/" className="text-left text-white font-bold text-xl flex items-center mb-6">
              <div className="text-left w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
                <div className="text-left w-3 h-3 bg-[#4aff01] rounded-full"></div>
              </div>
              SafeCircle
            </a>
            <p className="text-left text-white-400 mb-6">
            A platform for community members to report issues and emergencies directly to their society's secretary.
            </p>
            <div className="text-left flex space-x-4">
              <a target='_blank' href="#" className="text-left text-[#4aff01] hover:text-[#4aff01] transition-colors duration-300">
                <PiWhatsappLogo  size={23} />
              </a>
              <a target='_blank' href="https://x.com/SafeCircle82246" className="text-left text-[#4aff01] hover:text-[#4aff01] transition-colors duration-300">
                <FiTwitter size={20} />
              </a>
              <a target='_blank' href="#" className="text-left text-[#4aff01] hover:text-[#4aff01] transition-colors duration-300">
                <FiFacebook size={20} />
              </a>
              <a target='_blank' href="#" className="text-left text-[#4aff01] hover:text-[#4aff01] transition-colors duration-300">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-left text-lg font-semibold mb-6">Services</h3>
            <ul className="text-left space-y-3">
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Digital Community</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">GPS Tracking</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Community alerts</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Polls and Flags</a></li>
              {/* <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">E-commerce Solutions</a></li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-left text-lg font-semibold mb-6">Company</h3>
            <ul className="text-left space-y-3">
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">About Us</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Our Process</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-left text-lg font-semibold mb-6">Contact</h3>
            <ul className="text-left space-y-4">
              <li className="text-left flex items-start">
                <FiMapPin className="text-left mt-1 mr-3 text-[#4aff01] text-[#4aff01]" />
                <span className="text-left text-white-400">Salt Lake, Sector V, Bidhannagar, Kolkata, West Bengal, 700091</span>
              </li>
              <li className="text-left flex items-center">
                <FiPhone className="text-left mr-3 text-[#4aff01] text-[#4aff01]" />
                <a href="tel:+1234567890" className="text-left text-white-400 hover:text-[#4aff01] transition-colors duration-300">+91 9821709422</a>
              </li>
              <li className="text-left flex items-center">
                <FiMail className="text-left mr-3 text-[#4aff01] text-[#4aff01]" />
                <a  className=" text-left text-white-400 hover:text-[#4aff01] cursor-pointer transition-colors duration-300">safecircle49@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-left border-t border-white-800 mt-12 pt-6">
          <div className="text-left flex flex-col md:flex-row justify-between items-center">
            <p className="text-left text-white-500 text-sm">
              © {new Date().getFullYear()} SafeCircle. All rights reserved.
            </p>
            <div className="text-left flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-left text-white-500 text-sm hover:text-[#4aff01] transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-left text-white-500 text-sm hover:text-[#4aff01] transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-left text-white-500 text-sm hover:text-[#4aff01] transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer