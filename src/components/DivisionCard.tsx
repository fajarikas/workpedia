"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ClipboardList, Wrench, Package, Banknote, TrendingUp, Users, ArrowRight, Play, CheckCircle2 } from "lucide-react";
import type { Division } from "@/lib/mockData";
import Image from "next/image";

const ICON_MAP: Record<string, React.ElementType> = { ClipboardList, Wrench, Package, Banknote, TrendingUp, Users };

interface DivisionCardProps {
  division: Division;
  index?: number;
}

export default function DivisionCard({ division, index = 0 }: DivisionCardProps) {
  const Icon = ICON_MAP[division.icon] ?? ClipboardList;
  const progress = Math.round((division.completedLessons / division.totalLessons) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/division/${division.id}`} className="block outline-none rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
        <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-gray-200 dark:bg-gray-800">
          {/* Background Image */}
          <Image
            src={division.image}
            alt={division.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[#E02B20]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 backdrop-blur-md border border-white/20"
                style={{ background: `${division.accent}40` }}
              >
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mb-1 block">
                {division.shortName}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                {division.name}
              </h3>
              <p className="text-sm text-white/70 line-clamp-2 leading-relaxed font-medium">
                {division.description}
              </p>
            </div>

            {/* Progress Section */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/60 font-medium">
                    <Play size={12} className="text-[#E02B20]" />
                    {division.totalLessons} Tutorial
                  </div>
                  {division.completedLessons > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-[#10B981] font-medium">
                      <CheckCircle2 size={12} />
                      {division.completedLessons} Selesai
                    </div>
                  )}
                </div>
                <span className="text-xs font-bold text-white tabular">{progress}%</span>
              </div>
              
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: division.accent }}
                />
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-4 flex items-center gap-2 text-white font-bold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Mulai Belajar <ArrowRight size={16} className="text-[#E02B20]" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
