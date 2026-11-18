"use client";

import React from "react";
import { ArrowUp, Volume2, VolumeX } from "lucide-react";
import { CHAPTERS } from "@/data/t1EditionData";
import { useEditionScroll } from "@/components/SmoothScrollProvider";

export function FloatingEditionPill() {
  const { progress, activeChapter, soundEnabled, toggleSound, scrollToChapter } =
    useEditionScroll();

  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <nav
      aria-label="Điều hướng các hồi ký sự"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-fit"
    >
      <div className="museum-glass flex items-center gap-1.5 sm:gap-2 rounded-full px-2.5 py-2 shadow-[0_18px_50px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-2 pl-2 pr-2.5 border-r border-[rgba(234,227,210,0.14)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A81323]" />
          <span className="font-mono text-[10px] font-medium text-[#C5A059] tabular-nums">
            {String(pct).padStart(2, "0")}%
          </span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {CHAPTERS.map((ch) => {
            const isActive = activeChapter === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(ch.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.12em] whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#EAE3D2] text-[#070606] font-medium"
                    : "text-[#EAE3D2]/65 hover:text-[#EAE3D2] hover:bg-white/5"
                }`}
              >
                <span className="hidden md:inline opacity-60 mr-1">
                  {ch.roman}.
                </span>
                {ch.label}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-1 pl-2 border-l border-[rgba(234,227,210,0.14)]">
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
            className="p-1.5 rounded-full text-[#EAE3D2]/65 hover:text-[#EAE3D2] hover:bg-white/10 transition-colors cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => scrollToChapter("hero")}
            aria-label="Quay lại đầu trang"
            className="p-1.5 rounded-full text-[#EAE3D2]/65 hover:text-[#EAE3D2] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
