import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  Camera,
  X,
  ScanLine,
  Image as ImageIcon,
  RefreshCw,
} from "lucide-react";
import { useGlobal } from "../context/GlobalContext";
import api from "../utils/api";
import { saveToBlockchain } from "../utils/blockchain";
import AnalysisResult from "../components/AnalysisResult";

const Dashboard = () => {
  const { t } = useGlobal();

  // --- STATES ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  // Camera States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  // --- LOGIC: UPLOAD HANDLER ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      stopCamera(); // Matiin kamera kalo user pilih upload
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  // --- LOGIC: CAMERA HANDLER ---
  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      setSelectedFile(null);
      setPreview(null);
      setResult(null);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Prefer kamera belakang di HP
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Gagal akses kamera:", err);
      alert("Gagal membuka kamera. Pastikan izin diberikan.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const file = new File([blob], "camera-capture.jpg", {
          type: "image/jpeg",
        });
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        stopCamera(); // Stop kamera setelah foto diambil
      }, "image/jpeg");
    }
  };

  // --- LOGIC: ANALYZE & BLOCKCHAIN ---
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Panggil Backend
      const response = await api.post("/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Gagal analisis. Cek koneksi backend.");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockchainSave = async () => {
    if (!result) return;
    setSaving(true);
    try {
      await saveToBlockchain(result);
      alert("✅ Data Berhasil Tercatat di Blockchain!");
    } catch (error) {
      alert("Gagal simpan: " + (error.reason || error.message));
    } finally {
      setSaving(false);
    }
  };

  // Bersihkan kamera saat pindah halaman
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 md:px-8 min-h-screen max-w-6xl mx-auto relative">
      {/* Background Blobs (Ala ManageLife) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-[100px] -z-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] -z-10" />

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center md:text-left"
      >
        <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
          TrustBite<span className="text-emerald-500">.</span> Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
          Pilih metode scan untuk memulai analisis AI.
        </p>
      </motion.div>

      {/* --- MAIN GLASS CONTAINER --- */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* === KIRI: UPLOAD SECTION === */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <div className="h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group hover:shadow-emerald-500/10 transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                <UploadCloud size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  Upload Foto
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  File System
                </p>
              </div>
            </div>

            <div className="relative border-3 border-dashed border-slate-300 dark:border-slate-600 rounded-3xl h-64 flex flex-col justify-center items-center bg-slate-50/50 dark:bg-slate-900/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
              />
              <div className="text-center p-6 transition-transform group-hover:scale-105 duration-300">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-lg inline-block mb-4 text-emerald-500">
                  <ImageIcon size={32} />
                </div>
                <p className="font-bold text-slate-600 dark:text-slate-300">
                  Drag & Drop atau Klik
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Mendukung JPG, PNG (Max 5MB)
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* === KANAN: CAMERA SECTION === */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <div className="h-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <Camera size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  Ambil Foto
                </h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Real-time Camera
                </p>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-slate-900 h-64 flex flex-col justify-center items-center shadow-inner">
              {!isCameraActive ? (
                // State: Kamera Mati
                <div className="text-center">
                  <button
                    onClick={startCamera}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Camera size={20} />
                    Buka Kamera
                  </button>
                </div>
              ) : (
                // State: Kamera Nyala
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay Button */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <button
                      onClick={stopCamera}
                      className="p-3 rounded-full bg-red-500/80 text-white hover:bg-red-600 backdrop-blur-sm transition"
                    >
                      <X size={20} />
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="p-3 rounded-full bg-white text-slate-900 hover:bg-emerald-400 hover:text-white transition shadow-lg animate-pulse"
                    >
                      <Camera size={24} />
                    </button>
                  </div>
                </div>
              )}
              {/* Hidden Canvas for capture */}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* === PREVIEW & ACTION AREA === */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-8 bg-white dark:bg-slate-800 rounded-[2rem] p-8 shadow-2xl border border-emerald-500/20 relative overflow-hidden"
          >
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 rounded-full blur-3xl -z-10"></div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Kolom Gambar */}
              <div className="relative w-full md:w-1/3">
                <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-slate-700 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <button
                  onClick={() => {
                    setPreview(null);
                    setSelectedFile(null);
                    setResult(null);
                  }}
                  className="absolute -top-3 -right-3 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 shadow-md transition"
                >
                  <RefreshCw size={16} />
                </button>
              </div>

              {/* Kolom Action */}
              <div className="flex-1 w-full text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                  Foto Siap Dianalisis!
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  AI kami akan membaca komposisi bahan dan mencocokkannya dengan
                  5.000+ database bahan halal/haram.
                </p>

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full md:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <ScanLine /> Cek Kehalalan Sekarang
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hasil Analisis Muncul di Sini */}
            <div className="mt-8">
              <AnalysisResult
                result={result}
                onSave={handleBlockchainSave}
                isSaving={saving}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
