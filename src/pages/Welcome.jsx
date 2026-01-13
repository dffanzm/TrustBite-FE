import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import Logo from "../components/Logo";
import { useGlobal } from "../context/GlobalContext";

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useGlobal();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Background Blobs (Sama kayak Dashboard biar konsisten) */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-2xl z-10"
      >
        {/* Logo Besar */}
        <div className="flex justify-center mb-8 scale-150">
          <Logo />
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
          Halal Scanning <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
            Reimagined.
          </span>
        </h1>

        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto">
          Analisis komposisi makanan instan dengan kekuatan <b>AI Vision</b> dan
          validasi transparansi via <b>Ethereum Blockchain</b>.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {["AI Powered", "Blockchain Verified", "99% Accuracy"].map(
            (feat, i) => (
              <span
                key={i}
                className="px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 shadow-sm flex items-center gap-2"
              >
                <CheckCircle2 size={14} className="text-emerald-500" />
                {feat}
              </span>
            )
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-slate-900 dark:bg-white dark:text-slate-900 rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 shadow-xl shadow-slate-900/20"
        >
          <span className="mr-2 text-lg">Mulai Sekarang</span>
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-emerald-500/50 transition-all" />
        </motion.button>
      </motion.div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-[10px] text-slate-400 uppercase tracking-widest"
      >
        TrustBite v1.0 • Secure & Transparent
      </motion.p>
    </div>
  );
};

export default Welcome;
