"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import { FILMSTRIP_FRAMES } from "@/data/t1EditionData";
import { soundFx } from "@/lib/soundFx";

export function FrameScrubberSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const lastSoundIndexRef = useRef<number>(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeFrame = FILMSTRIP_FRAMES[activeIndex] ?? FILMSTRIP_FRAMES[0];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const pinEl = pinRef.current;
    if (!pinEl) return;

    const trigger = ScrollTrigger.create({
      trigger: pinEl,
      start: "top top",
      end: "+=2600",
      pin: true,
      scrub: 0.45,
      onUpdate: (self) => {
        const nextIdx = Math.min(
          FILMSTRIP_FRAMES.length - 1,
          Math.max(
            0,
            Math.round(self.progress * (FILMSTRIP_FRAMES.length - 1))
          )
        );
        setActiveIndex(nextIdx);
        if (nextIdx !== lastSoundIndexRef.current) {
          lastSoundIndexRef.current = nextIdx;
          soundFx.playTick(540 + nextIdx * 35);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const stepIndex = (delta: number) => {
    soundFx.playTick(680);
    setActiveIndex((prev) =>
      Math.min(FILMSTRIP_FRAMES.length - 1, Math.max(0, prev + delta))
    );
  };

  return (
    <section
      id="hall-of-frames"
      ref={sectionRef}
      className="relative bg-[#090808] border-b border-[rgba(234,227,210,0.12)]"
    >
      <div
        ref={pinRef}
        className="min-h-screen w-full flex flex-col justify-center py-8 sm:py-12 px-5 sm:px-10 lg:px-14"
      >
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] text-[#C5A059] uppercase mb-2">
                <Film className="w-3.5 h-3.5" />
                HỒI II // CUỘN PHIM TƯ LIỆU 2013 — 2026
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-[#EAE3D2]">
                Tám Khoảnh Khắc{" "}
                <span className="italic text-[#A81323]">Đẫm Nước Mắt</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 museum-glass rounded-full px-3 py-1.5">
              <button
                type="button"
                onClick={() => stepIndex(-1)}
                aria-label="Khung hình trước"
                className="p-1.5 rounded-full hover:bg-white/10 text-[#EAE3D2]/80 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] tracking-[0.16em] px-2 text-[#EAE3D2]">
                {activeFrame.plate} / 0{FILMSTRIP_FRAMES.length}
              </span>
              <button
                type="button"
                onClick={() => stepIndex(1)}
                aria-label="Khung hình tiếp theo"
                className="p-1.5 rounded-full hover:bg-white/10 text-[#EAE3D2]/80 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Documentary Cinema Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: Real Archival Photograph Stage */}
            <div className="lg:col-span-7 archival-frame overflow-hidden bg-[#050404] min-h-[340px] sm:min-h-[450px] lg:min-h-[520px] relative">
              {FILMSTRIP_FRAMES.map((frame, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={frame.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? "opacity-100 scale-100 z-10"
                        : "opacity-0 scale-105 z-0 pointer-events-none"
                    }`}
                  >
                    <img
                      src={frame.image}
                      alt={frame.title}
                      style={{ objectPosition: frame.objectPosition }}
                      className="w-full h-full object-cover archival-photo archival-photo-active"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(7,6,6,0.94) 0%, rgba(7,6,6,0.28) 45%, rgba(7,6,6,0.35) 100%)",
                      }}
                    />
                  </div>
                );
              })}

              {/* Top Archival Registration Plaque */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-3">
                <span className="museum-glass px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.2em] text-[#EAE3D2]">
                  {activeFrame.year} · {activeFrame.venue}
                </span>
                <span className="museum-glass px-3 py-1 rounded-full font-mono text-[10px] tracking-[0.18em] text-[#C5A059]">
                  {activeFrame.scoreOrStatus}
                </span>
              </div>

              {/* Bottom Caption Over Photo */}
              <div className="absolute bottom-4 left-5 right-5 z-20">
                <p className="font-mono text-[11px] text-[#EAE3D2]/75">
                  {activeFrame.caption}
                </p>
              </div>
            </div>

            {/* Right: Emotional Prose & Interactive 35mm Contact Sheet */}
            <div className="lg:col-span-5 flex flex-col justify-between archival-frame bg-[#0d0b0b] p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(234,227,210,0.12)]">
                  <span className="font-mono text-xs tracking-[0.2em] text-[#C5A059]">
                    {activeFrame.plate} — NĂM {activeFrame.year}
                  </span>
                  <span className="font-mono text-[10px] text-[#9A9284]">
                    CUỘN ĐỂ XEM TIẾP ↓
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-3xl sm:text-4xl text-[#EAE3D2] leading-tight">
                  {activeFrame.title}
                </h3>

                <blockquote className="mt-5 pl-4 border-l-2 border-[#A81323] font-serif italic text-xl sm:text-2xl text-[#EAE3D2]/95 leading-snug">
                  &ldquo;{activeFrame.quote}&rdquo;
                </blockquote>

                <p className="mt-4 text-sm sm:text-[15px] text-[#EAE3D2]/75 leading-relaxed font-light">
                  {activeFrame.narrative}
                </p>
              </div>

              {/* 35mm Contact Sheet Real Thumbnail Scrubber */}
              <div className="mt-7 pt-5 border-t border-[rgba(234,227,210,0.12)]">
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-[#9A9284] mb-3">
                  <span>CUỘN PHIM TƯ LIỆU (CHỌN HOẶC CUỘN)</span>
                  <span className="text-[#C5A059]">{activeFrame.year}</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-2">
                  {FILMSTRIP_FRAMES.map((frame, idx) => {
                    const selected = idx === activeIndex;
                    return (
                      <button
                        key={frame.id}
                        type="button"
                        onClick={() => {
                          soundFx.playChime(620, 0.1);
                          setActiveIndex(idx);
                        }}
                        className={`group relative overflow-hidden border transition-all cursor-pointer ${
                          selected
                            ? "border-[#C5A059] ring-1 ring-[#C5A059]/60"
                            : "border-white/15 opacity-55 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={frame.image}
                          alt={frame.year}
                          style={{ objectPosition: frame.objectPosition }}
                          className="w-full h-12 object-cover"
                        />
                        <div className="bg-black/80 py-0.5 font-mono text-[9px] text-center text-[#EAE3D2]">
                          {frame.year}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
