import { useState, useEffect, useMemo } from "react";
import jobHuntIllustration from "../../assets/job_hunt_re_q203.svg";

import AppButton from "../../components/UI/AppButton";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const LandingPage = () => {
  useEffect(() => {
    document.title = "Cover Bot";
  }, []);
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between gap-10 px-8 py-20 bg-indigo-50">
      {/* Image on the left */}
      <motion.div
        className="flex-1 max-w-xl mx-auto"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={jobHuntIllustration}
          alt="Job hunt illustration"
          className="w-full drop-shadow-md"
        />
      </motion.div>

      {/* Content on the right */}
      <motion.div
        className="flex-1 text-center md:text-left"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-4 text-gray-900"
          variants={fadeInUp}
        >
          Ready to streamline your job application?
        </motion.h2>

        <motion.p
          className="text-lg text-gray-700 max-w-lg mb-8"
          variants={fadeInUp}
        >
          Cover Bot crafts tailored cover letters with{" "}
          <span className="font-medium text-indigo-600">AI + automation</span>{" "}
          so you can apply with confidence in seconds.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <AppButton
            size="lg"
            color="indigo"
            className="px-8 py-4 text-lg font-bold shadow-md"
            onClick={() => (window.location.href = "/cover-bot")}
          >
            🚀 Launch App
          </AppButton>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingPage;
