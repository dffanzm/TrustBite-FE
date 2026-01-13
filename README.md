# 🎨 TrustBite Client Interface (Glassmorphism UI)

![TrustBite Frontend Badge](https://img.shields.io/badge/TrustBite-Frontend%20UI-0F172A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Built%20With-Vite-646CFF?style=for-the-badge\&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Styled%20With-Tailwind-38B2AC?style=for-the-badge\&logo=tailwind-css)

---

## 📖 Introduction

Ini adalah **wajah dari TrustBite**. Tempat di mana kompleksitas **AI** dan kekakuan **Blockchain** diterjemahkan menjadi pengalaman pengguna yang **fluid**, **intuitif**, dan kelihatan *mahal*.

Frontend ini mengadopsi filosofi desain **Glassmorphism** — transparansi, blur, dan bayangan halus untuk menciptakan UI modern dan futuristik. Bukan sekadar tombol dan input, tapi *experience*.

Dibangun dengan **React + Vite** (cepat, ringan, no drama). Animasi transisi halus ditenagai **Framer Motion**. Untuk koneksi ke dunia nyata: frontend ini berkomunikasi aman dengan **Backend AI (Python)** via REST API dan terhubung ke **Ethereum Blockchain** menggunakan **Ethers.js**.

---

## 🚀 Key Features

* **Modern Dashboard UI**
  Layout split-screen responsif: kiri untuk upload file, kanan untuk kamera real-time.

* **Real-time Camera Access**
  Akses kamera langsung via `navigator.mediaDevices` — tanpa aplikasi tambahan.

* **Smart AI Feedback**
  Hasil analisis AI divisualisasikan dengan warna tegas:

  * 🟢 Emerald → **Halal**
  * 🔴 Rose → **Haram**
  * 🟡 Amber → **Syubhat**

* **Blockchain Integration**
  Tombol **Save to Blockchain** memicu MetaMask untuk menyimpan hasil analisis ke ledger Ethereum secara permanen.

* **Global State Management**
  Context API untuk Theme (Dark/Light) dan Language (ID/EN) secara global.

* **Security Aware**
  Environment Variable (`.env`) untuk menyimpan API Key dan endpoint backend dengan aman.

---

## 🛠️ Tech Stack & Libraries

* **Core:** React.js (v18+)
* **Build Tool:** Vite (Fast HMR)
* **Styling:** Tailwind CSS v3 + PostCSS + Autoprefixer
* **Animation:** Framer Motion
* **Icons:** Lucide React
* **HTTP Client:** Axios (Custom Interceptors)
* **Web3:** Ethers.js (v6)

---

## 📋 Prerequisites

Pastikan environment kamu siap:

1. **Node.js** v16+
2. **NPM** atau **Yarn**
3. **Browser modern** (Chrome / Edge / Firefox)
4. **MetaMask Extension** (untuk fitur blockchain)

---

## ⚡ Installation & Setup

### 1️⃣ Masuk ke Folder Frontend

```bash
cd frontend
```

### 2️⃣ Install Dependencies

Jika pernah install dan error, bersihin dulu.

```bash
# Opsional
rm -rf node_modules
npm install
```

### 3️⃣ Setup Environment Variables

Buat file `.env` di root folder `frontend` (sejajar dengan `package.json`).

```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
VITE_API_KEY=developmentbydaffa
```

⚠️ **Pastikan API Key sama dengan yang ada di backend.**

---

### 4️⃣ Konfigurasi Smart Contract (Opsional)

Jika smart contract sudah dideploy, update alamat kontrak di:

```
src/utils/blockchain.js
```

```js
const CONTRACT_ADDRESS = "0xYourContractAddress";
```

---

## 🏃‍♂️ Running the App

Jalankan server development:

```bash
npm run dev
```

Buka browser:

```
http://localhost:5173
```

Dashboard TrustBite siap gas 🚀

---

## 🏗️ Project Structure

```
frontend/
├── public/                 # Aset statis
├── src/
│   ├── assets/             # Gambar, font, dll
│   ├── components/         # Komponen UI reusable
│   │   ├── AnalysisResult.jsx
│   │   └── ...
│   ├── context/
│   │   └── GlobalContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Welcome.jsx
│   │   └── About.jsx
│   ├── utils/
│   │   ├── api.js
│   │   └── blockchain.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── tailwind.config.js
└── vite.config.js
```

---

## 🧩 Key Components Breakdown

### `Dashboard.jsx`

Otak dari frontend.

* Handle kamera & upload file
* Request ke backend AI
* Manage loading, error, dan response

### `AnalysisResult.jsx`

Komponen visualisasi hasil AI.

* Render data JSON dari backend
* Badge status Halal / Haram / Syubhat
* Trigger simpan data ke blockchain

### `api.js`

Layer komunikasi API.

* Inject otomatis header `x-api-key`
* Base URL dari `.env`

---

## ✨ Author

Designed & built with ⚛️ + 🎨 by **Daffa Najmudin Hanif**

Future-proof UI. No overengineering. Just clean execution.
