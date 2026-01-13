import React from "react";
import { motion } from "framer-motion";
import { Cpu, Link, ShieldCheck, Database, Github } from "lucide-react";

const About = () => {
  return (
    <div className="pt-24 px-6 min-h-screen max-w-5xl mx-auto pb-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
          Tentang <span className="text-emerald-500">TrustBite.</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Platform deteksi kehalalan modern yang menggabungkan kecerdasan buatan
          untuk analisis komposisi dan Blockchain untuk integritas data.
        </p>
      </motion.div>

      {/* Tech Stack Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {/* Card 1: AI */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-24 bg-blue-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-blue-500/10" />
          <Cpu size={48} className="text-blue-500 mb-6" />
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            AI Powered OCR
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Menggunakan <b>EasyOCR & OpenCV</b> untuk membaca teks komposisi
            dari kemasan, lalu mencocokkannya dengan 5.000+ database bahan
            menggunakan algoritma Fuzzy Logic.
          </p>
        </motion.div>

        {/* Card 2: Blockchain */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-24 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 transition-all group-hover:bg-emerald-500/10" />
          <Link size={48} className="text-emerald-500 mb-6" />
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Ethereum Blockchain
          </h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Setiap hasil analisis disimpan ke dalam{" "}
            <b>Smart Contract (Solidity)</b> di jaringan Sepolia Testnet,
            menjamin data tidak bisa dimanipulasi (Immutable).
          </p>
        </motion.div>
      </div>

      {/* Developer Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
      >
        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">
          Developed By
        </p>
        <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Daffa Najmudin Hanif
        </h4>
        <p className="text-emerald-500 font-medium mb-6">
          Informatics Engineering Student
        </p>

        <a
          href="https://github.com"
          target="_blank"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:scale-105 transition-transform"
        >
          <Github size={20} />
          View on GitHub
        </a>
      </motion.div>
    </div>
  );
};

export default About;
