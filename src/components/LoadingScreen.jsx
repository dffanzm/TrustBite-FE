import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-slate-950 z-[999] flex flex-col items-center justify-center">
      {/* Logo Animasi Masuk */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Logo size="text-4xl" iconSize={40} />
      </motion.div>

      {/* Progress Bar Container */}
      <div className="mt-8 w-64 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        {/* The Bar Itself */}
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Text Typewriter Effect */}
      <motion.div
        className="mt-4 flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs font-bold tracking-widest text-slate-400">
          LOADING RESOURCES
        </span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-emerald-500"
        >
          ...
        </motion.span>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
