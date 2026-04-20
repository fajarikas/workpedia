"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Trophy, Flame, Clock, ChevronRight,
  TrendingUp, Play, Star, Zap, Command, ArrowRight,
  Sparkles, ShieldCheck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import DivisionCard from "@/components/DivisionCard";
import { DIVISIONS, MOCK_USER, getTotalProgress } from "@/lib/mockData";

const STATS = [
  {
    icon: BookOpen,
    label: "Tutorial",
    getValue: () => getTotalProgress().total.toString(),
    sub: "Tersedia",
    color: "#E02B20",
  },
  {
    icon: ShieldCheck,
    label: "Selesai",
    getValue: () => getTotalProgress().completed.toString(),
    sub: "Lulus",
    color: "#10B981",
  },
  {
    icon: Flame,
    label: "Streak",
    getValue: () => "7",
    sub: "Hari",
    color: "#F59E0B",
  },
  {
    icon: Clock,
    label: "Waktu",
    getValue: () => "4.2j",
    sub: "Minggu ini",
    color: "#8B5CF6",
  },
];

export default function DashboardPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [greeting, setGreeting] = useState("Selamat datang");
  const progress = getTotalProgress();
  const overallPercent = Math.round((progress.completed / progress.total) * 100);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat pagi");
    else if (hour < 15) setGreeting("Selamat siang");
    else if (hour < 18) setGreeting("Selamat sore");
    else setGreeting("Selamat malam");
  }, []);

  // CMD+K listener
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

  const recentDivision = DIVISIONS[0];
  const featuredLesson = recentDivision.lessons.find((l) => !l.isCompleted) ?? recentDivision.lessons[0];

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-h-screen pt-20 pb-20 overflow-x-hidden">
        {/* ── Hero & Progress Section ── */}
        <section className="relative pt-12 pb-16 mb-12">
          {/* Enhanced Ambient Background Elements */}
          <div className="absolute top-0 left-[-10%] w-[60%] h-[60%] bg-[#E02B20]/10 blur-[150px] rounded-full pointer-events-none transition-colors duration-1000" />
          <div className="absolute top-20 right-[-5%] w-[40%] h-[50%] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none" />
          
          {/* Subtle Mesh Grid */}
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px), radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px', backgroundPosition: '0 0, 12px 12px' }} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start">
              
              {/* Profile & Welcome */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-1/3 text-center lg:text-left"
              >
                <div className="relative inline-block group mb-8">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl relative z-10 bg-gray-200 mx-auto lg:mx-0">
                    <Image 
                      src={MOCK_USER.avatar} 
                      alt={MOCK_USER.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -inset-4 bg-[#E02B20]/20 blur-3xl rounded-full group-hover:bg-[#E02B20]/40 transition-colors duration-700" />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E02B20]/10 border border-[#E02B20]/20">
                    <Sparkles size={14} className="text-[#E02B20]" />
                    <span className="text-[10px] font-black text-[#E02B20] uppercase tracking-[0.2em]">Verified Member</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                    {greeting}, <br />
                    <span className="text-gradient-red">{MOCK_USER.name.split(" ")[0]}</span>
                  </h1>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 dark:text-gray-400 font-bold text-lg uppercase tracking-widest">
                      {MOCK_USER.role}
                    </p>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-500">
                      ID: {MOCK_USER.employeeId} • {MOCK_USER.branch.split("—")[0].trim()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto lg:mx-0 font-medium italic opacity-80">
                    "Kualitas adalah prioritas kita. Teruslah belajar untuk memberikan yang terbaik bagi konsumen Honda."
                  </p>
                </div>
              </motion.div>

              {/* Progress Dashboard Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-2/3 glass rounded-[3rem] p-10 relative overflow-hidden group shadow-2xl shadow-black/5 dark:shadow-white/5"
              >
                {/* Large Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.03] dark:opacity-[0.07] group-hover:opacity-[0.1] transition-opacity duration-700">
                  <TrendingUp size={300} className="text-[#E02B20]" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
                    <div>
                      <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-2">My Learning Velocity</h2>
                      <div className="flex items-baseline gap-3">
                        <span className="text-7xl font-black tracking-tighter tabular text-gray-900 dark:text-white">{overallPercent}%</span>
                        <span className="text-gray-400 font-bold text-lg">Overall Mastery</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-2">Achievement Status</p>
                      <div className="px-4 py-2 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-black inline-flex items-center gap-3 shadow-sm">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]" />
                        Elite Learner Tier
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar Container */}
                  <div className="relative h-4 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-12 shadow-inner border border-black/5 dark:border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${overallPercent}%` }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[#E02B20] via-[#FF5F57] to-[#E02B20] bg-[length:200%_100%] animate-shimmer shadow-[0_0_25px_rgba(224,43,32,0.5)]"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map(({ icon: Icon, label, getValue, sub, color }) => (
                      <div key={label} className="group/stat">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-black/5 dark:border-white/5" style={{ background: `${color}15`, color }}>
                            <Icon size={20} />
                          </div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{label}</span>
                        </div>
                        <p className="text-2xl font-black tabular text-gray-900 dark:text-white leading-none mb-1">{getValue()}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Featured & Quick Access ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-[2.5rem] overflow-hidden relative group min-h-[400px] shadow-2xl border border-black/5 dark:border-white/5"
            >
              <Image 
                src={featuredLesson.thumbnail} 
                alt={featuredLesson.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                    Resume Module
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-[#E02B20] text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-[#E02B20]/40">
                    {recentDivision.shortName}
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 max-w-2xl leading-tight drop-shadow-lg">
                  {featuredLesson.title}
                </h2>
                <div className="flex items-center gap-8 mb-8">
                  <div className="flex items-center gap-2.5 text-white/80 text-sm font-bold">
                    <Clock size={18} className="text-[#E02B20]" />
                    {featuredLesson.duration} Minutes
                  </div>
                  <div className="flex items-center gap-2.5 text-white/80 text-sm font-bold">
                    <Star size={18} className="text-[#F59E0B]" />
                    {featuredLesson.level} Level
                  </div>
                </div>
                <Link
                  href={`/division/${recentDivision.id}/${featuredLesson.id}`}
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-[#E02B20] hover:text-white transition-all duration-300 group/btn shadow-xl"
                >
                  <Play size={18} fill="currentColor" />
                  Jump In Now
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* Recommended/Popular */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Next Recommended</h3>
                <Link href="/division" className="text-xs font-black text-[#E02B20] hover:underline uppercase tracking-widest">Browse All</Link>
              </div>
              
              <div className="space-y-4">
                {DIVISIONS[1].lessons.slice(0, 3).map((lesson, i) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={`/division/${DIVISIONS[1].id}/${lesson.id}`}
                      className="flex items-center gap-5 p-5 rounded-[2rem] bg-white dark:bg-[#0D1017] border border-black/5 dark:border-white/5 hover:border-[#E02B20]/30 transition-all hover:shadow-xl group"
                    >
                      <div className="relative w-18 h-18 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                        <Image src={lesson.thumbnail} alt={lesson.title} fill className="object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-black text-[#E02B20] uppercase tracking-[0.2em] mb-1">{DIVISIONS[1].shortName}</p>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-[#E02B20] transition-colors">{lesson.title}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lesson.duration}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-white/10" />
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{lesson.level}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Division Grid ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#E02B20] shadow-[0_0_8px_#E02B20]" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Academic Curriculum 2026</span>
              </div>
              <h2 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white">Eksplorasi <span className="text-gradient-red">Divisi</span></h2>
              <p className="text-gray-500 dark:text-gray-400 font-bold mt-4 leading-relaxed">
                Pilih departemen kerja Anda dan akses standar operasional resmi Honda untuk meningkatkan efisiensi dan kepuasan konsumen.
              </p>
            </div>
            
            <button
              onClick={() => setSearchOpen(true)}
              className="px-8 py-5 rounded-2xl bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest flex items-center gap-4 hover:scale-105 transition-all active:scale-95 shadow-2xl group shadow-black/20"
            >
              <Command size={18} className="group-hover:rotate-12 transition-transform" />
              Quick Command Lookup
              <span className="opacity-30 font-bold ml-2">⌘K</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIVISIONS.map((division, i) => (
              <DivisionCard key={division.id} division={division} index={i} />
            ))}
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-black transition-transform group-hover:rotate-12">
                <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                  <path d="M8 22V10h3.2v4.8h5.6V10H20v12h-3.2v-4.8h-5.6V22H8Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <span className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 dark:text-white">Worpedia 2.0</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Honda Learning Hub</p>
              </div>
            </div>
            
            <p className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest text-center">
              © 2026 PT Asia Surya Perkasa. All rights reserved. <br className="sm:hidden" /> Empowering Retail Excellence.
            </p>
            
            <div className="flex items-center gap-8">
              {['SOP Dealer', 'Pusat Bantuan', 'Kebijakan'].map(link => (
                <Link key={link} href="#" className="text-[10px] font-black text-gray-400 dark:text-gray-500 hover:text-[#E02B20] dark:hover:text-white transition-colors uppercase tracking-[0.2em]">{link}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
