// about us

import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const FeatureCards = () => {
  const features = [
    {
      title: "Real-Time Alerts",
      description:
        "Receive instant notifications about suspicious activities or emergencies, keeping your community informed and ready to act without delay.",
      color: "bg-primary",
      icon: "🚀",
    },
    {
      title: "Easy Incident Reporting",
      description:
        "Instantly notify community members about suspicious activities, emergencies, or safety concerns — no delays, no misinformation.",
      color: "bg-dark",
      icon: "💻",
    },
    {
      title: "Trusted Community Network",
      description:
        "Seamlessly report issues through photos, voice notes, or quick texts. No tech skills needed — just tap, share, and alert.",
      color: "bg-primary",
      icon: "🛡",
    },
    {
      title: "Collective Awareness & Response",
      description:
        "Connect with verified neighbors, local authorities, and community leaders to build a reliable safety net around your area.",
      color: "bg-dark",
      icon: "📱",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl text-left font-bold mb-4">
              About Us
              <br />
            </h2>
            <p className="text-gray-600 text-left mb-6 max-w-md">
              <span className="text-[#010203] font-[500]">SafeCircle</span> is a community-based emergency assistance platform
              designed to keep you and your loved ones safe. With just a few
              taps, users can <span className="text-[#010203] font-[500]">send real-time alerts</span> to nearby community members
              during emergencies—whether it’s a medical issue, safety concern,
              or urgent help. <br />
              <br />
              We empower people to stay connected, support each
              other, and <span className="text-[#010203] font-[500]">build safer neighborhoods</span> through smart technology and
              trusted networks. SafeCircle brings communities together when it
              matters most.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center text-dark font-medium hover:text-[#4aff01] transition-colors duration-300"
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
                className="border-2 border-solid border-grey-500 card shadow-card shadow-md hover:shadow-card-hover rounded-xl overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${feature.color}`}></div>
                <div className="p-6">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
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