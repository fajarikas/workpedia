"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft, ChevronRight, Clock, CheckCircle2,
  Play, Hash, BookOpen, ListOrdered, Info,
  LayoutDashboard, Sparkles, ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import VideoPlayer from "@/components/VideoPlayer";
import { getDivisionById, getLessonById } from "@/lib/mockData";

const LEVEL_COLORS: Record<string, string> = {
  Dasar: "#10B981",
  Menengah: "#F59E0B",
  Mahir: "#E02B20",
};

export default function LessonPage() {
  const params = useParams();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  const divisionId = params.divisionId as string;
  const lessonId = params.lessonId as string;

  const division = getDivisionById(divisionId);
  const lesson = getLessonById(divisionId, lessonId);

  useEffect(() => {
    if (!division || !lesson) router.push("/dashboard");
  }, [division, lesson, router]);

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

  if (!division || !lesson) return null;

  const currentIndex = division.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? division.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < division.lessons.length - 1
    ? division.lessons[currentIndex + 1]
    : null;

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-h-screen pt-20 pb-20 overflow-x-hidden bg-white dark:bg-[#080A0F]">
        
        {/* ── Ambient Glows (Homepage Style) ── */}
        <div className="absolute top-0 left-[-10%] w-[50%] h-[50%] bg-[#E02B20]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] bg-blue-500/5 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12">
          
          {/* Breadcrumb - Premium Style */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-[10px] font-black text-gray-400 dark:text-white/30 mb-10 uppercase tracking-[0.3em]"
          >
            <Link href="/dashboard" className="hover:text-[#E02B20] transition-colors flex items-center gap-2">
              <LayoutDashboard size={14} /> Dashboard
            </Link>
            <ChevronRight size={10} className="opacity-40" />
            <Link href={`/division/${division.id}`} className="hover:text-[#E02B20] transition-colors">
              {division.name}
            </Link>
            <ChevronRight size={10} className="opacity-40" />
            <span className="text-gray-900 dark:text-white truncate max-w-[200px]">{lesson.title}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ── Main Content ── */}
            <div className="lg:col-span-2 space-y-8">

              {/* Video Player */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoPlayer lesson={lesson} accentColor={division.accent} />
              </motion.div>

              {/* Lesson Info Card (Dashboard Card Style) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="glass rounded-[3rem] p-10 shadow-xl border border-black/5 dark:border-white/5"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                        <Sparkles size={12} className="text-[#E02B20]" />
                        <span className="text-[10px] font-black text-gray-500 dark:text-white/40 uppercase tracking-[0.2em]">{division.shortName} Module</span>
                      </div>
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
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
                      {lesson.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6">
                      <div className="flex items-center gap-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
                        <Clock size={16} className="text-[#E02B20]" />
                        {lesson.duration} Menit
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
                        <BookOpen size={16} className="text-blue-500" />
                        {division.name}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Info size={16} className="text-[#E02B20]" />
                    <span className="text-[10px] font-black text-gray-400 dark:text-white/30 uppercase tracking-[0.3em]">Modul Deskripsi</span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-white/60 font-medium leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-3">
                  {lesson.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-2 text-[10px] font-black text-gray-500 dark:text-white/40 bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/5 px-4 py-2 rounded-xl uppercase tracking-widest hover:border-[#E02B20]/30 transition-colors"
                    >
                      <Hash size={12} className="text-[#E02B20]" />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Prev / Next Navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {prevLesson ? (
                  <Link
                    href={`/division/${division.id}/${prevLesson.id}`}
                    className="group p-8 rounded-[2.5rem] glass border border-black/5 dark:border-white/5 hover:border-[#E02B20]/30 hover:shadow-2xl transition-all duration-300"
                  >
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                      <ArrowLeft size={14} className="text-[#E02B20]" /> Sebelumnya
                    </p>
                    <p className="text-xl font-black text-gray-900 dark:text-white group-hover:text-[#E02B20] transition-colors line-clamp-2 leading-tight">
                      {prevLesson.title}
                    </p>
                  </Link>
                ) : <div className="hidden sm:block" />}

                {nextLesson ? (
                  <Link
                    href={`/division/${division.id}/${nextLesson.id}`}
                    className="group p-8 rounded-[2.5rem] glass border border-black/5 dark:border-white/5 hover:border-[#E02B20]/30 hover:shadow-2xl transition-all duration-300 text-right"
                  >
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-3 flex items-center justify-end gap-2">
                      Berikutnya <ArrowRight size={14} className="text-[#E02B20]" />
                    </p>
                    <p className="text-xl font-black text-gray-900 dark:text-white group-hover:text-[#E02B20] transition-colors line-clamp-2 leading-tight">
                      {nextLesson.title}
                    </p>
                  </Link>
                ) : <div className="hidden sm:block" />}
              </div>
            </div>

            {/* ── Sidebar (Premium ListOrdered) ── */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-1"
            >
              <div className="glass rounded-[3rem] border border-black/5 dark:border-white/5 overflow-hidden sticky top-28 shadow-2xl">
                <div className="p-8 border-b border-black/5 dark:border-white/5 bg-gradient-to-br from-gray-50 dark:from-white/5 to-transparent">
                  <div className="flex items-center gap-3 mb-4">
                    <ListOrdered size={20} className="text-[#E02B20]" />
                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-[0.3em]">{division.name}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span>Course Content</span>
                      <span className="text-gray-900 dark:text-white">{division.completedLessons}/{division.totalLessons} Selesai</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full shadow-[0_0_10px_rgba(224,43,32,0.4)] transition-all duration-1000"
                        style={{
                          width: `${Math.round((division.completedLessons / division.totalLessons) * 100)}%`,
                          background: division.accent,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[50vh] scrollbar-hide">
                  {division.lessons.map((l, i) => {
                    const isActive = l.id === lessonId;
                    return (
                      <Link
                        key={l.id}
                        href={`/division/${division.id}/${l.id}`}
                        className={`flex items-center gap-5 px-8 py-5 border-b border-black/5 dark:border-white/5 transition-all duration-300 last:border-b-0 group ${
                          isActive
                            ? "bg-[#E02B20]/5 dark:bg-[#E02B20]/10"
                            : "hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs font-black transition-all duration-500 ${
                            l.isCompleted
                              ? "bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20"
                              : isActive
                              ? "bg-[#E02B20] text-white shadow-lg shadow-[#E02B20]/40 rotate-12"
                              : "bg-gray-100 dark:bg-white/10 text-gray-400 dark:text-white/20 group-hover:rotate-6"
                          }`}
                        >
                          {l.isCompleted ? (
                            <CheckCircle2 size={18} />
                          ) : isActive ? (
                            <Play size={16} fill="currentColor" />
                          ) : (
                            <span>{i + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold truncate transition-colors ${
                            isActive ? "text-[#E02B20] dark:text-white" : "text-gray-500 dark:text-white/40 group-hover:text-gray-900 dark:hover:text-white"
                          }`}>
                            {l.title}
                          </p>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">{l.duration} • {l.level}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.aside>

          </div>
        </div>
      </main>
    </>
  );
}
