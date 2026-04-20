"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, 
  CheckCircle2, AlertCircle, ExternalLink, 
  RotateCcw, FastForward, Settings
} from "lucide-react";
import type { Lesson } from "@/lib/mockData";

interface VideoPlayerProps {
  lesson: Lesson;
  accentColor?: string;
}

export default function VideoPlayer({ lesson, accentColor = "#E02B20" }: VideoPlayerProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [completed, setCompleted] = useState(lesson.isCompleted ?? false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const levelColors: Record<string, string> = { Dasar: "#10B981", Menengah: "#F59E0B", Mahir: "#E02B20" };

  return (
    <div className="space-y-4">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-black shadow-2xl group">
        <div className="relative aspect-video w-full">
          {!hasStarted ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Background Thumbnail with Blur */}
              <div className="absolute inset-0 opacity-40">
                <img src={lesson.thumbnail} alt="" className="w-full h-full object-cover blur-sm scale-110" />
              </div>
              <div className="absolute inset-0 bg-black/60" />
              
              <div className="relative z-10 flex flex-col items-center">
                <motion.button 
                  onClick={() => setHasStarted(true)} 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }} 
                  className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all duration-500"
                >
                  <Play size={32} className="ml-1" fill="currentColor" />
                </motion.button>
                
                <div className="mt-8 text-center px-6">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-2 block">Mulai Belajar</span>
                  <h3 className="text-xl font-bold text-white max-w-md line-clamp-2">{lesson.title}</h3>
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <div 
                  className="px-3 py-1 rounded-full border border-white/20 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2"
                  style={{ background: `${levelColors[lesson.level]}40` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: levelColors[lesson.level] }} />
                  {lesson.level}
                </div>
                <div className="px-3 py-1 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white/60">
                  {lesson.duration} Menit
                </div>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0&modestbranding=1${muted ? "&mute=1" : ""}`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Custom Overlay Controls (Visible on Hover when started) */}
        <AnimatePresence>
          {hasStarted && (
            <motion.div 
              initial={{ opacity: 0 }} 
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 transition-opacity duration-300"
            >
              <div className="flex justify-between items-start pointer-events-auto">
                <div className="glass px-4 py-2 rounded-2xl flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#E02B20] animate-pulse" />
                  <span className="text-xs font-bold text-white tabular">04:12 / {lesson.duration}</span>
                </div>
                <button onClick={() => setHasStarted(false)} className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/20 transition-all">
                  <RotateCcw size={18} />
                </button>
              </div>

              <div className="flex items-center gap-6 pointer-events-auto">
                <button className="text-white/70 hover:text-white transition-colors">
                  <Volume2 size={20} />
                </button>
                <div className="flex-1 h-1.5 bg-white/20 rounded-full relative group/progress cursor-pointer">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-[#E02B20] rounded-full shadow-[0_0_10px_rgba(224,43,32,0.6)]" />
                  <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Settings size={20} />
                  </button>
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={() => setCompleted(!completed)}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] text-sm font-bold border transition-all duration-500 ${
            completed 
              ? "bg-[#10B981] border-[#10B981] text-white shadow-lg shadow-[#10B981]/20" 
              : "bg-white dark:bg-white/5 border-black/5 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10"
          }`}
        >
          {completed ? <><CheckCircle2 size={18} /> Modul Telah Selesai</> : <><AlertCircle size={18} className="opacity-40" /> Tandai Selesai</>}
        </motion.button>
        
        <button className="px-6 py-4 rounded-[1.5rem] bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white font-bold text-sm hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2">
          <FastForward size={18} />
          Skip Latihan
        </button>
      </div>
    </div>
  );
}
