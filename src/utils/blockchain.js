import { ethers } from "ethers";

// 1. ALAMAT KONTRAK (DARI LOG HARDHAT KAMU)
// Pastikan tidak ada spasi tambahan
const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

// 2. ABI (Kamus Bahasa Kontrak)
// Ini harus cocok sama fungsi di HalalRegistry.sol
const CONTRACT_ABI = [
  "function recordAnalysis(string _foodName, string _status, uint256 _confidenceScore, string _explanation) public",
  "function getAnalysisCount() public view returns (uint256)",
  "function getAnalysis(uint256 _index) public view returns (string, string, uint256, uint256, string, address)",
];

export const saveToBlockchain = async (data) => {
  // Cek apakah user punya MetaMask
  if (!window.ethereum) {
    throw new Error("MetaMask tidak ditemukan! Install dulu extension-nya.");
  }

  try {
    // A. Minta izin akses wallet
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // B. Cek Network (Harus Localhost 8545)
    const network = await provider.getNetwork();
    // Chain ID 31337 adalah default Hardhat
    if (network.chainId !== 31337n) {
      console.warn(
        "⚠️ Peringatan: Pastikan MetaMask terhubung ke Localhost 8545"
      );
    }

    // C. Koneksi ke Smart Contract
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    // D. Persiapan Data
    // Blockchain tidak terima desimal (0.95), jadi kita kali 100 (95)
    const scoreInt = Math.floor(data.score * 100);

    // E. Kirim Transaksi
    console.log("🚀 Mengirim transaksi ke Blockchain...");
    const tx = await contract.recordAnalysis(
      "Scanned Food", // Nama makanan (bisa dibuat dinamis nanti)
      data.status, // "HALAL" / "HARAM"
      scoreInt, // 95
      data.explanation // Penjelasan panjang
    );

    console.log("⏳ Menunggu konfirmasi block...", tx.hash);

    // F. Tunggu sampai transaksi 'divalidasi' (Mining)
    await tx.wait();

    console.log("✅ Transaksi Berhasil!");
    return tx;
  } catch (error) {
    console.error("❌ Blockchain Error:", error);
    // Ubah pesan error aneh jadi bahasa manusia
    if (error.code === "ACTION_REJECTED") {
      throw new Error("Transaksi dibatalkan oleh user.");
    }
    throw error;
  }
};
