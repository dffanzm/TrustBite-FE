import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ScanSearch,
  ChevronRight,
  FlaskConical,
  Leaf,
  Droplets,
  Bone,
  Info,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AnalysisResult = ({ result, onSave, isSaving }) => {
  if (!result) return null;

  // 1. Tentukan Tema Warna Berdasarkan Status
  const getTheme = () => {
    switch (result.status) {
      case "HALAL":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          border: "border-emerald-200 dark:border-emerald-500/30",
          text: "text-emerald-800 dark:text-emerald-100",
          accent: "text-emerald-600 dark:text-emerald-400",
          btn: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200/50",
          icon: ShieldCheck,
        };
      case "HARAM":
        return {
          bg: "bg-rose-50 dark:bg-rose-900/20",
          border: "border-rose-200 dark:border-rose-500/30",
          text: "text-rose-800 dark:text-rose-100",
          accent: "text-rose-600 dark:text-rose-400",
          btn: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200/50",
          icon: XCircle,
        };
      case "SYUBHAT": // Ragu-ragu
        return {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-200 dark:border-amber-500/30",
          text: "text-amber-800 dark:text-amber-100",
          accent: "text-amber-600 dark:text-amber-400",
          btn: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200/50",
          icon: AlertTriangle,
        };
      default:
        return {
          bg: "bg-slate-50 dark:bg-slate-800",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-800 dark:text-slate-100",
          accent: "text-slate-600 dark:text-slate-400",
          btn: "bg-slate-800 hover:bg-slate-900 text-white",
          icon: Info,
        };
    }
  };

  const theme = getTheme();
  const StatusIcon = theme.icon;

  // 2. Helper Icon untuk Kategori Bahan
  const getCategoryIcon = (category) => {
    const cat = category ? category.toLowerCase() : "";
    if (cat.includes("hewani") || cat.includes("daging"))
      return <Bone size={14} className="text-rose-500" />;
    if (
      cat.includes("kimia") ||
      cat.includes("pewarna") ||
      cat.includes("pengawet")
    )
      return <FlaskConical size={14} className="text-blue-500" />;
    if (cat.includes("nabati") || cat.includes("alam") || cat.includes("buah"))
      return <Leaf size={14} className="text-emerald-500" />;
    return <Droplets size={14} className="text-slate-400" />;
  };

  // 3. Helper Style Badge untuk List Bahan
  const getIngredientStyle = (status) => {
    if (status === "HARAM")
      return "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/40 dark:text-rose-300 dark:border-rose-700";
    if (status === "WARNING")
      return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700";
    if (status === "SAFE")
      return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800";
    return "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="space-y-6 w-full max-w-2xl mx-auto font-sans" // Pastikan font-sans (Poppins) aktif
    >
      {/* --- KARTU UTAMA (HEADER STATUS) --- */}
      <div
        className={`relative overflow-hidden rounded-3xl p-8 border ${theme.border} ${theme.bg} shadow-lg transition-colors duration-300`}
      >
        {/* Dekorasi Background Icon Besar */}
        <div className="absolute -right-10 -top-10 opacity-[0.07] rotate-12">
          <StatusIcon size={200} />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon Status Animasi */}
          <div
            className={`p-4 rounded-2xl bg-white/60 dark:bg-black/20 backdrop-blur-md shadow-sm border ${theme.border}`}
          >
            <StatusIcon size={48} className={theme.accent} strokeWidth={2} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-white/50 dark:bg-black/20 border ${theme.border} ${theme.text}`}
              >
                AI Confidence: {(result.score * 100).toFixed(0)}%
              </span>
            </div>

            <h2
              className={`text-4xl font-extrabold tracking-tight ${theme.text} mb-2`}
            >
              {result.status}
            </h2>

            <p
              className={`text-sm font-medium opacity-90 leading-relaxed ${theme.text} max-w-lg`}
            >
              {result.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* --- TABEL ANALISIS RINCI --- */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Header Tabel */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center backdrop-blur-sm">
          <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-lg">
            <ScanSearch className="text-emerald-500" size={20} />
            Analisis Komposisi
          </h3>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-lg">
            {result.ingredients_analysis.length} Bahan Terdeteksi
          </span>
        </div>

        {/* List Bahan (Scrollable) */}
        <div className="max-h-[350px] overflow-y-auto custom-scrollbar p-4 space-y-3 bg-white dark:bg-slate-800">
          {result.ingredients_analysis.length > 0 ? (
            result.ingredients_analysis.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-2xl border flex items-start justify-between group hover:shadow-md transition-all duration-300
                  bg-white dark:bg-slate-800/80 ${getIngredientStyle(
                    item.status
                  )}
                `}
              >
                {/* Kolom Kiri: Nama & Deskripsi */}
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200">
                      {item.name}
                    </span>
                    {/* Badge Kategori Kecil */}
                    <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5">
                      {getCategoryIcon(item.category)} {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {item.description}
                  </p>
                </div>

                {/* Kolom Kanan: Status Badge */}
                <div
                  className={`shrink-0 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm
                  ${getIngredientStyle(item.status)}
                `}
                >
                  {item.status}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 text-slate-400">
              <p>Tidak ada teks komposisi yang terbaca dengan jelas.</p>
            </div>
          )}
        </div>
      </div>

      {/* --- TOMBOL BLOCKCHAIN (CALL TO ACTION) --- */}
      <motion.button
        whileHover={{ scale: 1.02, translateY: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSave}
        disabled={isSaving}
        className={`w-full py-5 rounded-2xl font-bold text-lg transition-all shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3
          ${theme.btn}
        `}
      >
        {isSaving ? (
          <>Menyimpan ke Blockchain...</>
        ) : (
          <>
            <ShieldCheck size={24} />
            Simpan Hasil Permanen (Web3)
            <ChevronRight size={20} className="opacity-70" />
          </>
        )}
      </motion.button>

      <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">
        *Data akan disimpan secara kekal (immutable) di jaringan Ethereum
        Sepolia.
      </p>
    </motion.div>
  );
};

export default AnalysisResult;
