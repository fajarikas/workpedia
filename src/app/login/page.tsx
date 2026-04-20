"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Fingerprint,
  Command,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ employeeId: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.employeeId || !form.password) {
      setError("Silakan masukkan ID Karyawan dan password Anda.");
      return;
    }
    setLoading(true);
    // Simulate premium auth experience
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard");
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-[#080A0F] flex overflow-hidden selection:bg-[#E02B20]/30 transition-colors duration-500">
      {/* ── Left Side: Visual/Branding (Hidden on Mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1558981420-c532902e58b4?q=80&w=2474&auto=format&fit=crop"
          alt="Honda Heritage"
          fill
          className="object-cover opacity-60 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#080A0F] via-[#080A0F]/40 to-transparent" />

        {/* Decorative elements */}
        <div className="absolute top-12 left-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E02B20] flex items-center justify-center shadow-2xl shadow-[#E02B20]/40">
              <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                <path
                  d="M8 22V10h3.2v4.8h5.6V10H20v12h-3.2v-4.8h-5.6V22H8Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-white font-black tracking-widest text-lg uppercase">
              Worpedia
            </span>
          </div>
        </div>

        <div className="absolute bottom-20 left-12 right-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <Sparkles size={14} className="text-[#E02B20]" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">
                Internal Access Only
              </span>
            </div>
            <h2 className="text-5xl font-black text-white leading-[1.1] mb-6 tracking-tight">
              Kuasai Ilmu, <br />
              <span className="text-[#E02B20]">Pimpin Perubahan.</span>
            </h2>
            <p className="text-white/60 text-lg font-medium max-w-md leading-relaxed">
              Platform pusat pengetahuan digital untuk seluruh insan dealer PT
              Asia Surya Perkasa. Satu portal untuk semua SOP dan tutorial
              kerja.
            </p>
          </motion.div>
        </div>

        {/* Floating Stats or Info */}
        <div className="absolute top-1/2 right-12 -translate-y-1/2 space-y-4">
          {[
            { label: "Active Users", val: "1,240+" },
            { label: "Tutorials", val: "450+" },
            { label: "Completion Rate", val: "94%" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass p-4 rounded-2xl border border-white/10 w-40"
            >
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">
                {s.label}
              </p>
              <p className="text-xl font-black text-white">{s.val}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Right Side: Login Form ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Ambient background light */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#E02B20]/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E02B20] flex items-center justify-center shadow-xl shadow-[#E02B20]/30">
                <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                  <path
                    d="M8 22V10h3.2v4.8h5.6V10H20v12h-3.2v-4.8h-5.6V22H8Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                Worpedia
              </h1>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-3">
              Selamat Datang.
            </h3>
            <p className="text-gray-500 dark:text-white/40 font-medium">
              Masukkan kredensial Anda untuk mengakses basis data pengetahuan
              internal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                ID Karyawan
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E02B20] transition-colors">
                  <Command size={18} />
                </div>
                <input
                  type="text"
                  value={form.employeeId}
                  onChange={(e) =>
                    setForm({ ...form, employeeId: e.target.value })
                  }
                  placeholder="ASP-2024-XXXX"
                  className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-[#E02B20]/20 focus:border-[#E02B20] transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-black text-[#E02B20] uppercase tracking-widest hover:underline"
                >
                  Lupa Password?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E02B20] transition-colors">
                  <Fingerprint size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full h-14 bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-[#E02B20]/20 focus:border-[#E02B20] transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-[#E02B20]/10 border border-[#E02B20]/20 text-[#E02B20] text-xs font-bold flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-[#E02B20]" />
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 group/btn"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Verifikasi & Masuk
                  <ArrowRight
                    size={18}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/10">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <ShieldCheck size={20} className="text-[#10B981]" />
              <p className="text-[10px] font-bold text-gray-500 dark:text-white/30 uppercase tracking-widest leading-relaxed">
                Sesi Anda diamankan dengan standar enkripsi AHM (Astra Honda
                Motor).
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <div className="mt-auto pt-10 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            © 2026 PT Asia Surya Perkasa
          </p>
        </div>
      </div>
    </div>
  );
}
