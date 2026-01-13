import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation(); // Sekarang aman dipanggil disini

  // Logic Sembunyikan Navbar di halaman Welcome ('/')
  const isWelcomePage = location.pathname === "/";

  useEffect(() => {
    // Simulasi Loading 2 Detik
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Tampilkan Loading Screen dulu
  if (loading) {
    return <LoadingScreen />;
  }

  // Tampilkan Aplikasi Utama
  return (
    <>
      {/* Navbar muncul otomatis kecuali di halaman Welcome */}
      {!isWelcomePage && <Navbar />}

      {/* Routing Halaman */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
