"use client";

import React from "react";
import { SCENE_FIGURES, STORY_SCENES } from "@/data/storyData";

const ROMAN_LABELS = ["00", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

interface NarrativeColumnProps {
  activeScene: number;
  sceneProgress: number;
}

export function NarrativeColumn({
  activeScene,
  sceneProgress,
}: NarrativeColumnProps) {
  return (
    <div className="w-full min-w-0 lg:w-[42%] px-5 sm:px-10 lg:px-12 py-10 lg:py-20 space-y-12 lg:space-y-16 relative z-10 lg:border-l border-white/[0.06]">
      {STORY_SCENES.map((scene) => {
        const figure = SCENE_FIGURES[scene.index];
        const isActive = activeScene === scene.index;
        const barWidth = isActive
          ? `${Math.round(Math.min(Math.max(sceneProgress, 0), 1) * 100)}%`
          : activeScene > scene.index
          ? "100%"
          : "0%";

        return (
          <section
            key={scene.id}
            id={scene.id}
            data-scene={scene.index}
            className="story-chapter min-h-[75vh] flex flex-col justify-center pt-10 pb-16"
          >
            <div className="relative mb-7 pb-5 border-b border-white/10 flex items-start gap-3 sm:gap-4">
              <div
                className="pointer-events-none absolute -bottom-px left-0 h-[2px] bg-gradient-to-r from-[#E4002B] via-[#E5B84B] to-[#E5B84B] transition-[width] duration-150"
                style={{ width: barWidth }}
                aria-hidden="true"
              />
              <span
                className={`font-serif italic text-2xl sm:text-4xl leading-none shrink-0 pt-1 transition-colors duration-300 ${
                  isActive ? "text-[#E5B84B]" : "text-[#E5B84B]/60"
                }`}
              >
                {ROMAN_LABELS[scene.index]}.
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[10.5px] tracking-[0.22em] text-[#E5B84B] uppercase">
                  {scene.eraTag} {"//"} {scene.years}
                </div>
                <h2 className="mt-1.5 font-serif font-semibold text-xl sm:text-3xl leading-[1.18] text-[#F2EFE9]">
                  {scene.title}
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              {scene.paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className={`story-para text-[15px] sm:text-[16.5px] leading-[1.85] text-[#F2EFE9] opacity-35 transition-opacity duration-500 font-light ${
                    pIdx === 0 ? "chapter-dropcap" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {figure && (
              <figure className="mt-10 archival-plate bg-[#09090c] overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={figure.image}
                    alt={figure.caption}
                    className="w-full aspect-[16/10] object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(7,7,9,0.75) 0%, transparent 45%)",
                    }}
                  />
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[0.2em] px-2.5 py-1 bg-black/75 border border-white/15 text-[#E5B84B]">
                    {figure.code}
                  </span>
                </div>
                <figcaption className="px-4 py-3 font-mono text-[11px] text-white/65 leading-relaxed border-t border-white/10">
                  {figure.caption}
                </figcaption>
              </figure>
            )}
          </section>
        );
      })}
    </div>
  );
}
