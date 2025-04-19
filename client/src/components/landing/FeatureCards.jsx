import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'

const FeatureCards = () => {
  const features = [
    {
      title: 'Digital Strategy',
      description: 'Strategic roadmap to transform your business in the digital age.',
      color: 'bg-primary',
      icon: '🚀'
    },
    {
      title: 'Web Development',
      description: 'Custom web applications with modern technologies and frameworks.',
      color: 'bg-dark',
      icon: '💻'
    },
    {
      title: 'UX/UI Design',
      description: 'User-centered design that creates meaningful and relevant experiences.',
      color: 'bg-primary',
      icon: '✨'
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      color: 'bg-dark',
      icon: '📱'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="py-20" id="services">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl text-left font-bold mb-4">
              Services that drive<br />digital excellence
            </h2>
            <p className="text-gray-600 text-left mb-6 max-w-md">
              Our team of experts helps you navigate the complexities of digital transformation with tailored solutions.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center text-dark font-medium hover:text-primary transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              View all services <FiArrowUpRight className="ml-2" />
            </motion.a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card shadow-card hover:shadow-card-hover rounded-xl overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${feature.color}`}></div>
                <div className="p-6">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
