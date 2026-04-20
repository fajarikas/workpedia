export type Lesson = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  videoId: string;
  description: string;
  tags: string[];
  level: "Dasar" | "Menengah" | "Mahir";
  isCompleted?: boolean;
};

export type Division = {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  accent: string;
  image: string;
  totalLessons: number;
  completedLessons: number;
  lessons: Lesson[];
};

export const DIVISIONS: Division[] = [
  {
    id: "admin-retail",
    name: "Admin Retail",
    shortName: "ADR",
    description: "Proses administrasi penjualan unit motor Honda, STNK, BPKB, dan dokumen retail.",
    icon: "ClipboardList",
    color: "from-rose-500/20 to-red-600/10",
    accent: "#E02B20",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2574&auto=format&fit=crop",
    totalLessons: 8,
    completedLessons: 5,
    lessons: [
      { id: "adr-001", title: "Alur Proses Penjualan Unit Honda", duration: "12:34", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2500&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Pelajari alur lengkap proses penjualan unit motor Honda, mulai dari penerimaan SPK hingga serah terima unit ke konsumen.", tags: ["SPK", "Unit", "Konsumen"], level: "Dasar", isCompleted: true },
      { id: "adr-002", title: "Pengajuan STNK dan BPKB Baru", duration: "18:22", thumbnail: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=2671&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Tutorial lengkap pengajuan dokumen STNK dan BPKB ke SAMSAT untuk unit Honda baru.", tags: ["STNK", "BPKB", "SAMSAT"], level: "Menengah", isCompleted: true },
      { id: "adr-003", title: "Proses Kredit Motor via Leasing", duration: "21:05", thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Cara mengurus pengajuan kredit motor Honda melalui partner leasing resmi (FIF, Adira, dll).", tags: ["Kredit", "Leasing", "FIF"], level: "Menengah", isCompleted: true },
      { id: "adr-004", title: "Input Data di Sistem DMS", duration: "09:47", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan input dan verifikasi data penjualan pada sistem DMS internal Honda Main Dealer.", tags: ["DMS", "Input Data", "Sistem"], level: "Dasar", isCompleted: true },
      { id: "adr-005", title: "Penanganan Keluhan Konsumen", duration: "15:30", thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Standard Operating Procedure penanganan komplain konsumen sesuai standar Honda.", tags: ["Komplain", "SOP", "Konsumen"], level: "Menengah", isCompleted: true },
      { id: "adr-006", title: "Rekonsiliasi dan Laporan Harian", duration: "11:15", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Prosedur rekonsiliasi kas harian dan penyusunan laporan penjualan untuk supervisor.", tags: ["Rekonsiliasi", "Laporan", "Kas"], level: "Menengah", isCompleted: false },
      { id: "adr-007", title: "Proses Balik Nama Kendaraan", duration: "16:45", thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Langkah-langkah pengurusan balik nama STNK dan BPKB kendaraan Honda bekas.", tags: ["Balik Nama", "STNK", "BPKB"], level: "Mahir", isCompleted: false },
      { id: "adr-008", title: "Closing Bulanan dan Audit Dokumen", duration: "24:10", thumbnail: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2626&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan closing akhir bulan, audit kelengkapan dokumen, dan pelaporan ke AHM.", tags: ["Closing", "Audit", "AHM"], level: "Mahir", isCompleted: false },
    ],
  },
  {
    id: "servis",
    name: "Servis & Bengkel",
    shortName: "SRV",
    description: "Standar penerimaan, perbaikan, dan pengiriman kembali unit motor Honda ke konsumen.",
    icon: "Wrench",
    color: "from-orange-500/20 to-amber-600/10",
    accent: "#F97316",
    image: "https://images.unsplash.com/photo-1621252179027-9d62d3e1d1d8?q=80&w=2670&auto=format&fit=crop",
    totalLessons: 6,
    completedLessons: 2,
    lessons: [
      { id: "srv-001", title: "Penerimaan Unit Servis (Service Advisor)", duration: "10:20", thumbnail: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "SOP penerimaan unit dari konsumen, diagnosa awal, dan pembuatan work order.", tags: ["SA", "Work Order", "Diagnosa"], level: "Dasar", isCompleted: true },
      { id: "srv-002", title: "Service Berkala Honda (1.000 - 20.000 km)", duration: "22:44", thumbnail: "https://images.unsplash.com/photo-1504222490345-c075b6008014?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan servis berkala sesuai tabel interval Honda untuk semua tipe motor.", tags: ["Servis Berkala", "Oil", "Filter"], level: "Dasar", isCompleted: true },
      { id: "srv-003", title: "Diagnosa Kerusakan Mesin Honda Beat & Vario", duration: "28:15", thumbnail: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=2689&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Teknik identifikasi dan diagnosa kerusakan mesin pada Honda Beat dan Vario series.", tags: ["Honda Beat", "Vario", "Mesin"], level: "Menengah", isCompleted: false },
      { id: "srv-004", title: "Sistem Injeksi PGM-FI Honda", duration: "31:00", thumbnail: "https://images.unsplash.com/photo-1589139665042-491c1ec462fa?q=80&w=2574&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Memahami cara kerja dan troubleshooting sistem injeksi PGM-FI pada motor Honda.", tags: ["PGM-FI", "Injeksi", "ECU"], level: "Mahir", isCompleted: false },
      { id: "srv-005", title: "Estimasi Biaya dan Persetujuan Konsumen", duration: "08:30", thumbnail: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Cara membuat estimasi biaya perbaikan yang transparan dan mendapatkan persetujuan konsumen.", tags: ["Estimasi", "Persetujuan"], level: "Dasar", isCompleted: false },
      { id: "srv-006", title: "Quality Control Sebelum Unit Diserahkan", duration: "13:55", thumbnail: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Checklist quality control wajib sebelum unit dikembalikan ke konsumen.", tags: ["QC", "Checklist", "Serah Terima"], level: "Menengah", isCompleted: false },
    ],
  },
  {
    id: "sparepart",
    name: "Sparepart & Gudang",
    shortName: "SPP",
    description: "Manajemen stok, pemesanan, dan distribusi suku cadang resmi Honda.",
    icon: "Package",
    color: "from-blue-500/20 to-cyan-600/10",
    accent: "#3B82F6",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2670&auto=format&fit=crop",
    totalLessons: 5,
    completedLessons: 1,
    lessons: [
      { id: "spp-001", title: "Sistem Stok Sparepart Honda (H2H)", duration: "14:22", thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2426&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Pengenalan sistem manajemen stok Honda to Honda (H2H) dan cara penggunaannya.", tags: ["H2H", "Stok", "Sistem"], level: "Dasar", isCompleted: true },
      { id: "spp-002", title: "Order Sparepart ke Main Dealer (AHM)", duration: "17:10", thumbnail: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Prosedur pemesanan sparepart resmi ke Astra Honda Motor melalui sistem online.", tags: ["AHM", "Order", "Pemesanan"], level: "Menengah", isCompleted: false },
      { id: "spp-003", title: "Penerimaan dan Verifikasi Barang Masuk", duration: "09:45", thumbnail: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2574&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "SOP penerimaan barang dari AHM, verifikasi kelengkapan, dan input ke sistem gudang.", tags: ["Penerimaan", "Verifikasi", "Gudang"], level: "Dasar", isCompleted: false },
      { id: "spp-004", title: "Identifikasi Part Number Honda", duration: "20:33", thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Cara membaca dan mengidentifikasi part number pada katalog Honda untuk semua tipe.", tags: ["Part Number", "Katalog"], level: "Menengah", isCompleted: false },
      { id: "spp-005", title: "Stock Opname dan Audit Gudang", duration: "26:00", thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2426&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan pelaksanaan stock opname berkala dan prosedur audit gudang sparepart.", tags: ["Stock Opname", "Audit", "Gudang"], level: "Mahir", isCompleted: false },
    ],
  },
  {
    id: "kasir",
    name: "Kasir & Keuangan",
    shortName: "KSR",
    description: "Proses transaksi pembayaran, pengelolaan kas, dan pelaporan keuangan harian.",
    icon: "Banknote",
    color: "from-emerald-500/20 to-green-600/10",
    accent: "#10B981",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop",
    totalLessons: 5,
    completedLessons: 3,
    lessons: [
      { id: "ksr-001", title: "Prosedur Pembayaran Tunai dan Non-Tunai", duration: "11:05", thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2500&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "SOP penerimaan pembayaran tunai, transfer, dan kartu debit/kredit untuk semua transaksi.", tags: ["Tunai", "Transfer", "EDC"], level: "Dasar", isCompleted: true },
      { id: "ksr-002", title: "Rekap Kas Harian dan Setor Bank", duration: "13:40", thumbnail: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=2626&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Cara merekap semua transaksi harian, menghitung kas, dan menyiapkan setoran bank.", tags: ["Rekap", "Kas", "Bank"], level: "Menengah", isCompleted: true },
      { id: "ksr-003", title: "Penanganan Selisih Kas", duration: "08:55", thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Prosedur identifikasi, pelaporan, dan penyelesaian selisih kas saat tutup kasir.", tags: ["Selisih", "Koreksi", "Laporan"], level: "Menengah", isCompleted: true },
      { id: "ksr-004", title: "Input Jurnal Transaksi di SAP", duration: "19:20", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Tutorial input jurnal transaksi keuangan harian pada sistem SAP yang digunakan perusahaan.", tags: ["SAP", "Jurnal", "Akuntansi"], level: "Mahir", isCompleted: false },
      { id: "ksr-005", title: "Laporan Keuangan Bulanan untuk Manajemen", duration: "23:15", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan penyusunan laporan keuangan bulanan yang akan dipresentasikan ke manajemen.", tags: ["Laporan Bulanan", "Manajemen"], level: "Mahir", isCompleted: false },
    ],
  },
  {
    id: "sales",
    name: "Sales & Marketing",
    shortName: "SLS",
    description: "Teknik penjualan, follow-up prospek, dan strategi marketing Honda.",
    icon: "TrendingUp",
    color: "from-violet-500/20 to-purple-600/10",
    accent: "#8B5CF6",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2670&auto=format&fit=crop",
    totalLessons: 6,
    completedLessons: 0,
    lessons: [
      { id: "sls-001", title: "Product Knowledge Honda 2025-2026", duration: "35:20", thumbnail: "https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=2474&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Pengenalan lengkap seluruh lineup produk Honda 2025-2026 beserta keunggulan dan fitur terbaru.", tags: ["Product Knowledge", "Honda", "2025"], level: "Dasar", isCompleted: false },
      { id: "sls-002", title: "Teknik Prospekting dan Follow-Up", duration: "18:44", thumbnail: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Strategi mencari prospek potensial, teknik follow-up efektif, dan manajemen pipeline penjualan.", tags: ["Prospek", "Follow-Up", "Pipeline"], level: "Menengah", isCompleted: false },
      { id: "sls-003", title: "Teknik Closing dan Handling Objection", duration: "25:10", thumbnail: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=2574&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Cara mengatasi keberatan konsumen dan teknik closing yang efektif untuk meningkatkan konversi.", tags: ["Closing", "Objection", "Konversi"], level: "Mahir", isCompleted: false },
      { id: "sls-004", title: "Penggunaan CRM Dealer Honda", duration: "14:30", thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Tutorial penggunaan sistem CRM dealer untuk tracking prospek dan histori konsumen.", tags: ["CRM", "Data Konsumen"], level: "Menengah", isCompleted: false },
      { id: "sls-005", title: "Event dan Pameran Honda", duration: "12:00", thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2612&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan persiapan, pelaksanaan, dan pelaporan event penjualan dan pameran Honda.", tags: ["Event", "Pameran", "Display"], level: "Menengah", isCompleted: false },
      { id: "sls-006", title: "Social Media Marketing Honda Dealer", duration: "16:55", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Strategi konten dan engagement di media sosial untuk meningkatkan awareness dealer.", tags: ["Social Media", "Konten", "Instagram"], level: "Menengah", isCompleted: false },
    ],
  },
  {
    id: "hrd",
    name: "HRD & GA",
    shortName: "HRD",
    description: "Administrasi kepegawaian, penggajian, training, dan urusan general affairs.",
    icon: "Users",
    color: "from-pink-500/20 to-rose-600/10",
    accent: "#EC4899",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
    totalLessons: 4,
    completedLessons: 1,
    lessons: [
      { id: "hrd-001", title: "Onboarding Karyawan Baru Honda", duration: "20:15", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Panduan lengkap proses onboarding karyawan baru, dari administrasi hingga orientasi budaya perusahaan.", tags: ["Onboarding", "Karyawan Baru", "Orientasi"], level: "Dasar", isCompleted: true },
      { id: "hrd-002", title: "Absensi dan Manajemen Kehadiran", duration: "09:30", thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Cara penggunaan sistem absensi digital dan prosedur pengajuan izin/cuti karyawan.", tags: ["Absensi", "Cuti", "Izin"], level: "Dasar", isCompleted: false },
      { id: "hrd-003", title: "Penggajian dan Komponen SLIP Gaji", duration: "18:00", thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2670&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "Penjelasan komponen gaji, tunjangan, potongan BPJS, dan cara membaca slip gaji.", tags: ["Gaji", "Slip", "BPJS"], level: "Menengah", isCompleted: false },
      { id: "hrd-004", title: "Manajemen Aset dan Inventaris Kantor", duration: "14:00", thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop", videoId: "dQw4w9WgXcQ", description: "SOP pencatatan, pemeliharaan, dan penghapusan aset kantor sesuai prosedur Honda.", tags: ["Aset", "Inventaris", "GA"], level: "Menengah", isCompleted: false },
    ],
  },
];

export const MOCK_USER = {
  name: "Desy Rahayu",
  role: "Admin Retail",
  division: "Admin Retail",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
  employeeId: "ASP-2024-0142",
  branch: "PT Asia Surya Perkasa — Cabang Utama",
};

export function getDivisionById(id: string): Division | undefined {
  return DIVISIONS.find((d) => d.id === id);
}

export function getLessonById(divisionId: string, lessonId: string): Lesson | undefined {
  const division = getDivisionById(divisionId);
  return division?.lessons.find((l) => l.id === lessonId);
}

export function getTotalProgress(): { completed: number; total: number } {
  const total = DIVISIONS.reduce((acc, d) => acc + d.totalLessons, 0);
  const completed = DIVISIONS.reduce((acc, d) => acc + d.completedLessons, 0);
  return { completed, total };
}
