import React from "react";
import { motion } from "framer-motion";

const SectionTwo = () => {
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  const tasks = [
    {
      title: "For new buyer",
      description: "Earn 50 coins by submitting a detailed review.",
      badge: "High Reward",
    },
    {
      title: "For new worker",
      description: "Earn 10 coins by submitting a detailed review.",
      badge: "High Reward",
    },
    {
      title: "Top worker bonus",
      description: "Workers with 10,000+ coins receive a 100 coin bonus!",
      badge: "Special Bonus",
    },
  ];

  return (
    <div className="mb-5 pt-10">
      <h2 className="text-2xl font-bold text-center mb-5  text-color max-md:text-xl">
        🎯 Featured Tasks
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mx-auto max-md:w-sm">
        {tasks.map((task, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="card bg-base-100 shadow-md border border-gray-700"
          >
            <div className="card-body">
              <h3 className="card-title text-lg text-blue-600">{task.title}</h3>
              <p className="text-gray-400 max-md:text-sm">{task.description}</p>
              <div className="badge badge-success mt-2 font-serif">{task.badge}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SectionTwo;