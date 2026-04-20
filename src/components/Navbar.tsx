"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, ChevronDown, BookOpen, LayoutDashboard, LogOut, User, Settings, Menu, X, Command } from "lucide-react";
import { MOCK_USER } from "@/lib/mockData";

export default function Navbar({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 dark:bg-[#080A0F]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-lg" : "bg-transparent"}`}>
        {/* Subtle gradient for visibility when not scrolled */}
        {!scrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 dark:from-black/40 to-transparent pointer-events-none transition-opacity duration-500" />
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center justify-between h-20">

            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 flex-shrink-0">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <rect width="32" height="32" rx="10" fill="#E02B20" className="group-hover:rotate-12 transition-transform duration-500" />
                  <path d="M8 22V10h3.2v4.8h5.6V10H20v12h-3.2v-4.8h-5.6V22H8Z" fill="white"/>
                  <circle cx="23" cy="22" r="2" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <div className="hidden sm:flex flex-col leading-none">
                <span className="font-black text-gray-900 dark:text-white text-lg tracking-tight group-hover:text-[#E02B20] transition-colors duration-200">Worpedia</span>
                <span className="text-[10px] text-gray-400 dark:text-white/30 font-black tracking-[0.3em] uppercase">ASP • Honda</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {[
                { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                { href: "/division", label: "Divisi", icon: BookOpen },
              ].map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${isActive(href) ? "text-[#E02B20] dark:text-white bg-[#E02B20]/5 dark:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md" : "text-gray-500 dark:text-white/40 hover:text-[#E02B20] dark:hover:text-white/80 hover:bg-gray-100 dark:hover:bg-white/5"}`}>
                  <Icon size={16} />{label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={onSearchOpen} className="hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-400 dark:text-white/40 text-sm hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-600 dark:hover:text-white/60 transition-all duration-300" aria-label="Buka pencarian">
                <Search size={16} />
                <span className="text-xs font-bold">Cari Modul...</span>
                <kbd className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-gray-200 dark:bg-white/5 text-[10px] text-gray-400 dark:text-white/20 font-bold border border-black/5 dark:border-white/10">
                  <Command size={10} /> K
                </kbd>
              </button>

              <button className="relative w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-400 dark:text-white/40 hover:text-gray-600 dark:hover:text-white/80 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300" aria-label="Notifikasi">
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[#E02B20] rounded-full shadow-[0_0_8px_#E02B20]" />
              </button>

              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1 rounded-2xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 group" aria-label="Profil pengguna" aria-expanded={profileOpen}>
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-black/5 dark:border-white/10 relative shadow-xl group-hover:border-[#E02B20]/40 transition-colors">
                    <Image 
                      src={MOCK_USER.avatar} 
                      alt={MOCK_USER.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 dark:text-white/20 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="absolute right-0 top-full mt-4 w-72 rounded-3xl bg-white dark:bg-[#0D1017] border border-black/5 dark:border-white/10 shadow-[0_32px_64px_rgba(0,0,0,0.2)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.8)] overflow-hidden">
                      <div className="p-5 border-b border-black/5 dark:border-white/10 bg-gradient-to-br from-gray-50 dark:from-white/5 to-transparent">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-[1.25rem] overflow-hidden border-2 border-[#E02B20]/20 shadow-lg relative">
                            <Image src={MOCK_USER.avatar} alt={MOCK_USER.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 dark:text-white truncate">{MOCK_USER.name}</p>
                            <p className="text-[10px] font-black text-[#E02B20] uppercase tracking-widest mt-0.5">{MOCK_USER.employeeId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {[{ icon: User, label: "Profil Saya" }, { icon: Settings, label: "Pengaturan" }].map(({ icon: Icon, label }) => (
                          <button key={label} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 dark:text-white/60 hover:text-[#E02B20] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200"><Icon size={16} />{label}</button>
                        ))}
                        <div className="my-2 border-t border-black/5 dark:border-white/10" />
                        <Link href="/login" onClick={() => setProfileOpen(false)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-[#E02B20] hover:bg-[#E02B20]/10 transition-all duration-200">
                          <LogOut size={16} />Keluar Sesi
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-gray-400 dark:text-white/40 hover:text-[#E02B20] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu navigasi">
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="md:hidden overflow-hidden border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-[#080A0F]/95 backdrop-blur-xl">
              <div className="px-4 py-6 space-y-2">
                {[{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }, { href: "/division", label: "Semua Divisi", icon: BookOpen }].map(({ href, label, icon: Icon }) => (
                  <Link key={href} href={href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-black transition-all ${isActive(href) ? "text-[#E02B20] dark:text-white bg-[#E02B20]/10 dark:bg-white/10" : "text-gray-400 dark:text-white/40"}`}>
                    <Icon size={18} />{label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {profileOpen && <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} aria-hidden="true" />}
    </>
  );
}
