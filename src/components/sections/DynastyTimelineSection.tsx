"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHRONICLE_SPREADS } from "@/data/t1EditionData";

const TONE_BADGES: Record<string, string> = {
  TRIUMPH: "VINH QUANG",
  HEARTBREAK: "NƯỚC MẮT",
  RESURRECTION: "PHỤC SINH",
  REQUIEM: "BI TRÁNG 2026",
};

export function DynastyTimelineSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".spread-block").forEach((block) => {
        gsap.from(block, {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 82%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".spread-secondary-photo").forEach((el) => {
        gsap.to(el, {
          y: -28,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dynasty"
      ref={sectionRef}
      className="relative bg-[#070606] border-b border-[rgba(234,227,210,0.12)] py-24 sm:py-32 px-5 sm:px-10 lg:px-14"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-[rgba(234,227,210,0.12)]">
          <div className="lg:col-span-7">
            <div className="font-mono text-[11px] tracking-[0.22em] text-[#C5A059] uppercase mb-3">
              HỒI III // BIÊN NIÊN SỬ MÁU, MỒ HÔI &amp; NƯỚC MẮT
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl leading-[0.98] text-[#EAE3D2]">
              Không Có Vương Triều Nào
              <span className="block italic text-[#C5A059] mt-1">
                Sinh Ra Không Vết Xước.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex items-end">
            <p className="text-sm sm:text-base text-[#EAE3D2]/68 leading-relaxed font-light">
              Người đời chỉ đếm số cúp trên ngực áo T1. Nhưng phía sau sáu ngôi
              sao ấy là những đêm gục mặt xuống bàn phím ở Bắc Kinh, tiếng khóc
              ở San Francisco, cánh tay chấn thương mùa hè 2023 và những cuộc
              chia ly xé lòng giai đoạn 2024–2026.
            </p>
          </div>
        </div>

        {/* Alternating Asymmetric Photo-Essay Spreads */}
        <div className="divide-y divide-[rgba(234,227,210,0.1)]">
          {CHRONICLE_SPREADS.map((spread, index) => {
            const mediaFirst = index % 2 === 0;
            const isHeartbreakOrRequiem =
              spread.tearsOrTriumph === "HEARTBREAK" ||
              spread.tearsOrTriumph === "REQUIEM";

            return (
              <article
                key={spread.id}
                className="spread-block py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                {/* Photographic Composition Column */}
                <div
                  className={`lg:col-span-7 relative ${
                    mediaFirst ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="archival-frame overflow-hidden">
                    <img
                      src={spread.primaryImage}
                      alt={spread.title}
                      className="w-full aspect-[16/10] object-cover object-top archival-photo"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[11px] text-[#9A9284]">
                    {spread.primaryCaption}
                  </p>

                  {/* Overlapping Secondary Archival Plate */}
                  <div
                    className={`spread-secondary-photo hidden md:block absolute -bottom-10 ${
                      mediaFirst ? "-right-6" : "-left-6"
                    } w-52 lg:w-64 archival-frame overflow-hidden z-10`}
                  >
                    <img
                      src={spread.secondaryImage}
                      alt={spread.secondaryCaption}
                      className="w-full aspect-[4/3] object-cover object-top archival-photo"
                    />
                    <div className="px-3 py-2 bg-[#0a0909] font-mono text-[9px] leading-snug text-[#EAE3D2]/75">
                      {spread.secondaryCaption}
                    </div>
                  </div>
                </div>

                {/* Literary Copy Column */}
                <div
                  className={`lg:col-span-5 ${
                    mediaFirst ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-serif italic text-3xl text-[#C5A059]">
                      {spread.roman}.
                    </span>
                    <span className="h-px w-6 bg-[rgba(234,227,210,0.25)]" />
                    <span className="font-mono text-[11px] tracking-[0.2em] text-[#EAE3D2]/80">
                      {spread.years}
                    </span>
                    <span
                      className={`ml-auto font-mono text-[10px] px-2.5 py-0.5 rounded-full border ${
                        isHeartbreakOrRequiem
                          ? "border-[#A81323]/60 text-[#e05a68] bg-[#A81323]/10"
                          : "border-[#C5A059]/45 text-[#C5A059] bg-[#C5A059]/10"
                      }`}
                    >
                      {TONE_BADGES[spread.tearsOrTriumph]}
                    </span>
                  </div>

                  <div className="font-mono text-[11px] tracking-[0.18em] text-[#9A9284] uppercase">
                    {spread.eraLabel}
                  </div>
                  <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-[#EAE3D2] leading-tight">
                    {spread.title}
                  </h3>
                  <div className="mt-2 font-mono text-[11px] text-[#C5A059]/85">
                    {spread.subtitle}
                  </div>

                  <blockquote className="mt-6 pl-4 border-l border-[#C5A059]/60 font-serif italic text-xl sm:text-2xl text-[#EAE3D2]/92 leading-snug">
                    &ldquo;{spread.quote}&rdquo;
                  </blockquote>

                  <div className="mt-5 space-y-4 text-sm sm:text-[15px] text-[#EAE3D2]/72 leading-relaxed font-light">
                    {spread.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
