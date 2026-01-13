import axios from "axios";

// 1. Panggil variabel dari .env
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// 2. Validasi (Opsional tapi bagus buat debugging)
if (!API_URL || !API_KEY) {
  console.error(
    "🚨 FATAL: .env variable tidak terbaca! Pastikan file .env ada di root frontend."
  );
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    // 3. Masukin kunci ke header 'x-api-key'
    "x-api-key": API_KEY,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Debugging Error biar enak liat di Console
    const errorMsg = error.response ? error.response.data : error.message;
    console.error("🔥 API Error:", errorMsg);

    // Kalau 403 Forbidden, kasih tau user kuncinya salah
    if (error.response && error.response.status === 403) {
      alert("Akses Ditolak! API Key Frontend tidak cocok dengan Backend.");
    }

    return Promise.reject(error);
  }
);

export default api;
