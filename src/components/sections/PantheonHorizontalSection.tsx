"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BROTHERHOOD_PLATES } from "@/data/t1EditionData";
import { soundFx } from "@/lib/soundFx";

export function PantheonHorizontalSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [focusedId, setFocusedId] = useState<string>("p-faker");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const distance = track.scrollWidth - window.innerWidth + 120;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="pantheon"
      ref={sectionRef}
      className="relative bg-[#0a0909] border-b border-[rgba(234,227,210,0.12)] overflow-x-clip py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] text-[#C5A059] uppercase mb-2">
            HỒI IV // KHÚC CA HUYNH ĐỆ (ZOFGK → 2025 → 2026)
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#EAE3D2]">
            Những Người Đã Đi Qua{" "}
            <span className="italic text-[#C5A059]">Ngọn Lửa Đỏ</span>
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#EAE3D2]/65 leading-relaxed font-light">
          Có người ở lại giữ lời thề đến tận 2028–2029. Có người rẽ hướng mang
          theo nước mắt và ký ức. Nhưng mọi cái tên dưới đây đều đã khắc máu
          thịt mình vào sáu ngôi sao của T1.
        </p>
      </div>

      {/* Horizontal Gallery Track on Desktop / Snap Scroll on Mobile */}
      <div
        ref={trackRef}
        className="flex flex-row gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none px-5 sm:px-10 lg:px-14 lg:w-max pb-4"
      >
        {BROTHERHOOD_PLATES.map((plate, index) => {
          const isFocused = focusedId === plate.id;
          return (
            <article
              key={plate.id}
              onMouseEnter={() => {
                setFocusedId(plate.id);
                soundFx.playTick(600 + index * 30);
              }}
              className={`snap-center shrink-0 w-[84vw] sm:w-[400px] lg:w-[430px] archival-frame bg-[#0e0c0c] flex flex-col justify-between transition-colors duration-500 ${
                isFocused ? "border-[#C5A059]/60" : ""
              }`}
            >
              {/* Tall Archival Portrait Image */}
              <div className="relative overflow-hidden">
                <img
                  src={plate.image}
                  alt={`${plate.ign} (${plate.fullName})`}
                  style={{ objectPosition: plate.objectPosition }}
                  className="w-full aspect-[4/5] object-cover archival-photo"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14,12,12,0.98) 0%, rgba(14,12,12,0.25) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="museum-glass px-2.5 py-1 rounded-full font-mono text-[9px] tracking-[0.18em] text-[#C5A059]">
                    {plate.era}
                  </span>
                  <span className="museum-glass px-2.5 py-1 rounded-full font-mono text-[9px] tracking-[0.14em] text-[#EAE3D2]/85">
                    0{index + 1}
                  </span>
                </div>

                <div className="absolute bottom-3 left-5 right-5">
                  <div className="font-mono text-[10px] tracking-[0.18em] text-[#C5A059]">
                    {plate.statusTag}
                  </div>
                  <h3 className="mt-1 font-serif text-3xl sm:text-4xl text-[#EAE3D2]">
                    {plate.ign}
                    <span className="ml-2.5 font-sans text-xs font-normal tracking-wide text-[#9A9284]">
                      {plate.fullName}
                    </span>
                  </h3>
                  <div className="font-mono text-[10px] text-[#EAE3D2]/65 mt-0.5">
                    {plate.role}
                  </div>
                </div>
              </div>

              {/* Quote & Narrative */}
              <div className="p-5 sm:p-6 pt-3 flex-1 flex flex-col justify-between">
                <blockquote className="font-serif italic text-lg text-[#EAE3D2]/92 leading-snug border-l border-[#A81323] pl-3.5">
                  &ldquo;{plate.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-xs sm:text-[13px] text-[#EAE3D2]/68 leading-relaxed font-light">
                  {plate.story}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
