"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Clock, BookOpen, Layers, X, Hash } from "lucide-react";
import { DIVISIONS, type Lesson, type Division } from "@/lib/mockData";

type SearchResult =
  | { type: "division"; item: Division }
  | { type: "lesson"; item: Lesson; division: Division };

const RECENT_SEARCHES = ["Alur Penjualan SPK", "STNK BPKB", "Servis Berkala", "PGM-FI"];

export default function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results: SearchResult[] = query.trim().length < 2 ? [] : DIVISIONS.flatMap((div): SearchResult[] => {
    const q = query.toLowerCase();
    const res: SearchResult[] = [];
    if (div.name.toLowerCase().includes(q) || div.description.toLowerCase().includes(q)) res.push({ type: "division", item: div });
    div.lessons.forEach((lesson) => {
      if (lesson.title.toLowerCase().includes(q) || lesson.tags.some((t) => t.toLowerCase().includes(q)) || lesson.description.toLowerCase().includes(q))
        res.push({ type: "lesson", item: lesson, division: div });
    });
    return res;
  });

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); setQuery(""); setSelected(0); }
  }, [open]);

  const navigate = useCallback((result: SearchResult) => {
    if (result.type === "division") router.push(`/division/${result.item.id}`);
    else router.push(`/division/${result.division.id}/${result.item.id}`);
    onClose();
  }, [router, onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, results.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === "Enter" && results[selected]) navigate(results[selected]);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, results, selected, navigate, onClose]);

  useEffect(() => { setSelected(0); }, [query]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: -20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }} transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} className="fixed top-[12vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-xl px-4">
            <div className="rounded-2xl bg-[#0D1017] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/7">
                <Search size={18} className="text-white/30 flex-shrink-0" />
                <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari tutorial, divisi, atau topik..." className="flex-1 bg-transparent text-white text-[15px] placeholder-white/25 outline-none" aria-label="Pencarian tutorial" />
                {query && <button onClick={() => setQuery("")} className="text-white/20 hover:text-white/50 transition-colors"><X size={15} /></button>}
                <kbd className="hidden sm:flex items-center px-1.5 py-0.5 rounded bg-white/5 text-[11px] text-white/25 font-mono border border-white/8">ESC</kbd>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {query.trim().length < 2 ? (
                  <div className="p-3">
                    <p className="text-xs text-white/25 uppercase tracking-widest font-medium px-2 mb-2">Pencarian Terakhir</p>
                    {RECENT_SEARCHES.map((term, i) => (
                      <button key={i} onClick={() => setQuery(term)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-150 text-left">
                        <Clock size={14} className="flex-shrink-0 text-white/20" />{term}
                      </button>
                    ))}
                    <p className="text-xs text-white/25 uppercase tracking-widest font-medium px-2 mb-2 mt-4">Semua Divisi</p>
                    {DIVISIONS.map((div) => (
                      <button key={div.id} onClick={() => { router.push(`/division/${div.id}`); onClose(); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all duration-150 text-left">
                        <Layers size={14} className="flex-shrink-0 text-white/20" />{div.name}<span className="ml-auto text-xs text-white/20">{div.totalLessons} tutorial</span>
                      </button>
                    ))}
                  </div>
                ) : results.length === 0 ? (
                  <div className="py-12 text-center"><Search size={24} className="text-white/10 mx-auto mb-3" /><p className="text-white/30 text-sm">Tidak ada hasil untuk <span className="text-white/50">"{query}"</span></p></div>
                ) : (
                  <div className="p-2">
                    <p className="text-xs text-white/25 uppercase tracking-widest font-medium px-2 py-2">{results.length} hasil ditemukan</p>
                    {results.map((result, i) => (
                      <button key={i} onClick={() => navigate(result)} onMouseEnter={() => setSelected(i)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-100 text-left group ${selected === i ? "bg-[#E02B20]/12 text-white" : "text-white/50 hover:text-white/80"}`}>
                        {result.type === "division" ? <Layers size={15} className={`flex-shrink-0 ${selected === i ? "text-[#E02B20]" : "text-white/20"}`} /> : <BookOpen size={15} className={`flex-shrink-0 ${selected === i ? "text-[#E02B20]" : "text-white/20"}`} />}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{result.type === "division" ? result.item.name : result.item.title}</p>
                          {result.type === "lesson" && <p className="text-xs text-white/30 truncate">{result.division.name}</p>}
                        </div>
                        {result.type === "lesson" && result.item.tags.slice(0, 1).map(tag => (
                          <span key={tag} className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded bg-white/5 text-white/25"><Hash size={9} />{tag}</span>
                        ))}
                        <ArrowRight size={14} className={`flex-shrink-0 transition-transform duration-150 ${selected === i ? "text-[#E02B20] translate-x-0.5" : "text-white/10"}`} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t border-white/7 flex items-center gap-4 text-[11px] text-white/20">
                <span className="flex items-center gap-1"><kbd className="font-mono bg-white/5 border border-white/8 px-1 rounded">↑↓</kbd> navigasi</span>
                <span className="flex items-center gap-1"><kbd className="font-mono bg-white/5 border border-white/8 px-1 rounded">↵</kbd> pilih</span>
                <span className="flex items-center gap-1"><kbd className="font-mono bg-white/5 border border-white/8 px-1 rounded">ESC</kbd> tutup</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
