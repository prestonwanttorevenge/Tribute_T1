"use client";

import React from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Star } from "lucide-react";
import { STAR_MILESTONES, STORY_SCENES } from "@/data/storyData";
import { T1LogoSvg } from "@/components/ui/T1LogoSvg";

interface TopTimelineHudProps {
  activeScene: number;
  maxUnlockedStars: number;
  scrollProgress: number;
}

export function TopTimelineHud({
  activeScene,
  maxUnlockedStars,
  scrollProgress,
}: TopTimelineHudProps) {
  const currentScene = STORY_SCENES[activeScene] ?? STORY_SCENES[0];
  const pct = Math.min(100, Math.max(0, scrollProgress * 100));

  const jumpToScene = (sceneId: string) => {
    gsap.registerPlugin(ScrollToPlugin);
    const el = document.getElementById(sceneId);
    if (el) {
      gsap.to(window, { scrollTo: { y: el, offsetY: 64 }, duration: 1.25, ease: "power3.inOut" });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 bg-[#070709]/88 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Authentic T1 Winged Vector Crest + Era Tag */}
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          type="button"
          onClick={() => jumpToScene("scene-0")}
          className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          aria-label="Về đầu dòng thời gian T1"
        >
          <T1LogoSvg
            className="h-5 sm:h-6 w-auto t1-glow transition-transform duration-300 group-hover:scale-105"
            fill="#E4002B"
          />
          <span className="hidden xl:inline-block font-mono text-[10px] tracking-[0.22em] text-white/60 uppercase">
            DYNASTY ARCHIVE
          </span>
        </button>

        <span className="hidden sm:inline-block h-3.5 w-px bg-white/15 shrink-0" />
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] text-white/80 truncate">
          {currentScene.eraTag} ·{" "}
          <strong className="text-[#E5B84B] font-semibold">
            {currentScene.years}
          </strong>
        </span>
      </div>

      {/* Center: 2003 -> 2026 Scrubbed Timeline with Chapter Ticks */}
      <div className="hidden md:flex items-center gap-3 flex-1 max-w-md mx-4">
        <span className="font-mono text-[10px] text-white/45">2003</span>
        <div className="relative flex-1 flex items-center">
          <div className="relative w-full h-[2px] bg-white/15 overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#E4002B] to-[#E5B84B] transition-[width] duration-100"
              style={{ width: `${pct.toFixed(2)}%` }}
            />
          </div>
          <div className="absolute inset-x-0 flex items-center justify-between pointer-events-auto">
            {STORY_SCENES.map((s) => (
              <button
                key={s.id}
                type="button"
                title={`${s.eraTag} (${s.years})`}
                onClick={() => jumpToScene(s.id)}
                aria-label={`Chuyển đến ${s.eraTag}`}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  activeScene === s.index
                    ? "bg-[#E5B84B] scale-125"
                    : activeScene > s.index
                    ? "bg-[#E4002B]/80 hover:scale-125"
                    : "bg-white/25 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
        <span className="font-mono text-[10px] text-[#E5B84B]">2026</span>
      </div>

      {/* Right: 6 Championship Stars */}
      <div
        className="flex items-center gap-1.5 sm:gap-2 shrink-0"
        aria-label={`${maxUnlockedStars} trên 6 ngôi sao vô địch thế giới`}
      >
        {STAR_MILESTONES.map((item) => {
          const lit = maxUnlockedStars >= item.star;
          return (
            <div
              key={item.star}
              title={`${item.year} — ${item.label}`}
              className="flex flex-col items-center"
            >
              <Star
                className={`w-4 h-4 sm:w-[17px] sm:h-[17px] transition-all duration-700 ${
                  lit
                    ? "fill-[#E5B84B] text-[#E5B84B] gold-glow scale-110"
                    : "fill-transparent text-white/20 scale-95"
                }`}
              />
            </div>
          );
        })}
      </div>
    </header>
  );
}
