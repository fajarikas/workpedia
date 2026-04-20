"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft, Search, Play, CheckCircle2, Clock, BookOpen,
  ClipboardList, Wrench, Package, Banknote, TrendingUp, Users,
  Filter, ChevronRight, Lock, Sparkles, LayoutDashboard
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import { getDivisionById } from "@/lib/mockData";

const ICON_MAP: Record<string, React.ElementType> = {
  ClipboardList, Wrench, Package, Banknote, TrendingUp, Users,
};

const LEVEL_COLORS: Record<string, string> = {
  Dasar: "#10B981",
  Menengah: "#F59E0B",
  Mahir: "#E02B20",
};

export default function DivisionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>("Semua");
  const [query, setQuery] = useState("");

  const divisionId = params.divisionId as string;
  const division = getDivisionById(divisionId);

  useEffect(() => {
    if (!division) router.push("/dashboard");
  }, [division, router]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!division) return null;

  const Icon = ICON_MAP[division.icon] ?? ClipboardList;
  const progress = Math.round((division.completedLessons / division.totalLessons) * 100);

  const filteredLessons = division.lessons.filter((l) => {
    const matchLevel = filterLevel === "Semua" || l.level === filterLevel;
    const matchQuery = query.trim() === "" ||
      l.title.toLowerCase().includes(query.toLowerCase()) ||
      l.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchLevel && matchQuery;
  });

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-h-screen pt-20 pb-20 overflow-x-hidden bg-white dark:bg-[#080A0F]">
        
        {/* ── Page Header (Homepage Style) ── */}
        <section className="relative pt-16 pb-12 mb-12">
          {/* Ambient Background Glows */}
          <div 
            className="absolute top-0 left-[-10%] w-[60%] h-[60%] blur-[150px] rounded-full pointer-events-none opacity-20" 
            style={{ backgroundColor: division.accent }}
          />
          <div className="absolute top-20 right-[-5%] w-[30%] h-[40%] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Breadcrumb - Premium Style */}
              <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 dark:text-white/30 mb-10 uppercase tracking-[0.3em]">
                <Link href="/dashboard" className="hover:text-[#E02B20] transition-colors flex items-center gap-2">
                  <LayoutDashboard size={14}/> Dashboard
                </Link>
                <ChevronRight size={10} className="opacity-40" />
                <span className="text-gray-900 dark:text-white font-black">Division Detail</span>
              </div>

              <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
                <div className="flex-1 max-w-4xl">
                  <div className="flex items-center gap-6 mb-8">
                    <div 
                      className="w-20 h-20 rounded-3xl flex items-center justify-center border-4 border-white dark:border-white/10 shadow-2xl backdrop-blur-xl"
                      style={{ background: `${division.accent}20` }}
                    >
                      <Icon size={40} className="drop-shadow-lg" style={{ color: division.accent }} />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-3">
                        <Sparkles size={12} className="text-[#E02B20]" />
                        <span className="text-[10px] font-black text-gray-500 dark:text-white/40 uppercase tracking-[0.2em]">Academic Curriculum 2026</span>
                      </div>
                      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
                        {division.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl text-gray-500 dark:text-white/50 font-bold leading-relaxed max-w-2xl">
                    {division.description}
                  </p>
                </div>

                {/* Progress Stats Card (Matching Homepage) */}
                <div className="w-full lg:w-80 glass rounded-[2.5rem] p-8 shadow-xl border border-black/5 dark:border-white/5">
                   <div className="flex justify-between items-end mb-6">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Completion</p>
                        <p className="text-4xl font-black tabular text-gray-900 dark:text-white">{progress}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-2xl font-black text-gray-900 dark:text-white tabular">{division.totalLessons}</p>
                      </div>
                   </div>
                   <div className="h-2.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="h-full rounded-full shadow-[0_0_15px_rgba(224,43,32,0.4)]"
                        style={{ background: division.accent }}
                      />
                   </div>
                   <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest mt-4">
                     {division.completedLessons} dari {division.totalLessons} Selesai
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Filters & Content ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Sticky Filters (Homepage Button Style) */}
          <div className="sticky top-20 z-40 mb-16 pt-4">
            <div className="glass rounded-[2.5rem] p-3 flex flex-col md:flex-row gap-4 shadow-2xl shadow-black/5 border border-black/5 dark:border-white/5">
              <div className="relative flex-1 group">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E02B20] transition-colors" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari modul atau keyword pekerjaan..."
                  className="w-full bg-gray-50 dark:bg-white/5 border border-transparent rounded-[2rem] pl-14 pr-6 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#E02B20]/10 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 p-1 bg-gray-50 dark:bg-white/5 rounded-[2rem]">
                {["Semua", "Dasar", "Menengah", "Mahir"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setFilterLevel(level)}
                    className={`px-8 py-3 rounded-[1.75rem] text-[10px] font-black uppercase tracking-widest transition-all ${
                      filterLevel === level
                        ? "bg-black dark:bg-white text-white dark:text-black shadow-lg"
                        : "text-gray-400 dark:text-white/30 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Module List (Refined Aesthetic) */}
          {filteredLessons.length === 0 ? (
            <div className="text-center py-32 glass rounded-[4rem] border border-dashed border-black/10 dark:border-white/10">
              <div className="w-24 h-24 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center mx-auto mb-8">
                <Search size={40} className="text-gray-200 dark:text-white/5" />
              </div>
              <h3 className="text-2xl font-black mb-3">Modul Tidak Ditemukan</h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Coba gunakan kata kunci lain</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredLessons.map((lesson, i) => (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/division/${division.id}/${lesson.id}`}
                    className="group flex flex-col sm:flex-row gap-6 p-6 rounded-[3rem] bg-white dark:bg-[#0D1017] border border-black/5 dark:border-white/5 hover:border-[#E02B20]/30 transition-all hover:shadow-2xl hover:shadow-black/5"
                  >
                    <div className="relative w-full sm:w-44 aspect-video sm:aspect-square rounded-[2rem] overflow-hidden flex-shrink-0 shadow-2xl shadow-black/10">
                      <Image src={lesson.thumbnail} alt={lesson.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                      {lesson.isCompleted && (
                        <div className="absolute inset-0 bg-[#10B981]/80 backdrop-blur-[2px] flex items-center justify-center">
                          <CheckCircle2 size={48} className="text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-white tabular uppercase tracking-widest">
                        {lesson.duration}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span
                            className="text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-[0.2em]"
                            style={{
                              color: LEVEL_COLORS[lesson.level],
                              borderColor: `${LEVEL_COLORS[lesson.level]}40`,
                              background: `${LEVEL_COLORS[lesson.level]}10`,
                            }}
                          >
                            {lesson.level}
                          </span>
                          {lesson.isCompleted && (
                            <span className="text-[9px] font-black text-[#10B981] uppercase tracking-[0.2em]">Verified Mastery</span>
                          )}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-[1.2] group-hover:text-[#E02B20] transition-colors mb-4 line-clamp-2">
                          {lesson.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-white/40 line-clamp-2 font-medium leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-3">
                          {lesson.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] font-black text-gray-400 dark:text-white/20 bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-lg uppercase tracking-widest">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#E02B20] group-hover:text-white transition-all duration-500 shadow-sm">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* ── Footer Stats ── */}
      <footer className="py-24 border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mx-auto mb-10 shadow-2xl">
             <BookOpen size={40} />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">Eksplorasi Modul Lainnya</h2>
          <p className="text-lg text-gray-500 dark:text-white/40 font-bold mb-12 max-w-lg mx-auto leading-relaxed">
            Perluas wawasanmu di divisi lain untuk mendapatkan pemahaman holistik tentang operasional Dealer Honda.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/dashboard" className="px-10 py-5 rounded-[2rem] bg-[#E02B20] text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-[#E02B20]/30 hover:scale-105 transition-transform">
              Kembali ke Dashboard
            </Link>
            <button className="px-10 py-5 rounded-[2rem] bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
              Pusat Bantuan
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
