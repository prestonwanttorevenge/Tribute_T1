"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, Volume2, VolumeX } from "lucide-react";
import { AMBIENT_HERO_VIDEO, CHAPTERS } from "@/data/t1EditionData";
import { useEditionScroll } from "@/components/SmoothScrollProvider";
import { assetPath } from "@/lib/assetPath";
import { soundFx } from "@/lib/soundFx";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitWrapRef = useRef<HTMLDivElement | null>(null);
  const leftPlateRef = useRef<HTMLDivElement | null>(null);
  const rightPlateRef = useRef<HTMLDivElement | null>(null);
  const { soundEnabled, toggleSound, scrollToChapter } = useEditionScroll();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.from(".hero-fade", {
          y: 28,
          opacity: 0,
          duration: 1.0,
          stagger: 0.11,
          ease: "power3.out",
          clearProps: "transform",
        });

        // Flanking archival plates gently part on scroll
        if (leftPlateRef.current) {
          gsap.to(leftPlateRef.current, {
            x: -70,
            y: -40,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (rightPlateRef.current) {
          gsap.to(rightPlateRef.current, {
            x: 70,
            y: -50,
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    // Subtle pointer magnetic parallax on desktop portrait frame
    const wrap = portraitWrapRef.current;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const onPointerMove = (e: PointerEvent) => {
      if (!wrap || prefersReduced || !finePointer) return;
      const nx = (e.clientX / window.innerWidth - 0.5) * 16;
      const ny = (e.clientY / window.innerHeight - 0.5) * 12;
      wrap.style.transform = `translate3d(${nx.toFixed(1)}px, ${ny.toFixed(
        1
      )}px, 0)`;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden border-b border-[rgba(234,227,210,0.12)] bg-[#070606]"
    >
      {/* Layer 1: Dark ambient cinema video + Classical Renaissance chiaroscuro backdrop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-22 mix-blend-screen"
          src={AMBIENT_HERO_VIDEO}
        />
        <img
          src={assetPath("/images/t1/renaissance-canvas.jpg")}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-18 mix-blend-luminosity scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 44%, rgba(168,19,35,0.14) 0%, rgba(7,6,6,0.78) 54%, #070606 100%)",
          }}
        />
      </div>

      {/* Giant Ghosted Museum Watermark */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center overflow-hidden select-none z-0"
        aria-hidden="true"
      >
        <span className="font-serif italic font-semibold text-[18vw] leading-none tracking-[-0.04em] text-[#EAE3D2]/[0.035] whitespace-nowrap">
          IMMORTAL
        </span>
      </div>

      {/* Quiet Editorial Museum Header */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 pt-6 pb-5 flex items-center justify-between gap-4 border-b border-[rgba(234,227,210,0.1)]">
        <div className="flex items-center gap-4">
          <img
            src={assetPath("/images/t1/t1-logo.svg")}
            alt="T1 Official Crest"
            className="h-5 w-auto brightness-0 invert opacity-90"
          />
          <span className="hidden md:inline-block h-3.5 w-px bg-[rgba(234,227,210,0.2)]" />
          <span className="hidden md:inline-block font-mono text-[10px] tracking-[0.24em] text-[#9A9284] uppercase">
            TRIỂN LÃM TƯ LIỆU // 2013 — 2026
          </span>
        </div>

        <nav
          aria-label="Mục lục triển lãm"
          className="hidden lg:flex items-center gap-7"
        >
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => scrollToChapter(ch.id)}
              className="editorial-link font-mono text-[11px] tracking-[0.16em] uppercase text-[#EAE3D2]/75 hover:text-[#EAE3D2] transition-colors cursor-pointer"
            >
              <span className="text-[#C5A059] mr-1.5">{ch.roman}.</span>
              {ch.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleSound}
          aria-label={soundEnabled ? "Tắt âm thanh" : "Bật âm thanh"}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full museum-glass font-mono text-[10px] tracking-[0.18em] text-[#EAE3D2]/80 hover:border-[#C5A059]/60 transition-colors cursor-pointer"
        >
          {soundEnabled ? (
            <Volume2 className="w-3.5 h-3.5 text-[#C5A059]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-[#9A9284]" />
          )}
          <span>{soundEnabled ? "ÂM THANH: BẬT" : "ÂM THANH: TẮT"}</span>
        </button>
      </header>

      {/* Main Exhibition Composition */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-14 py-8 lg:py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
        {/* Left & Bottom-Anchored Literary Headline */}
        <div className="lg:col-span-6 pb-2 lg:pb-8 order-2 lg:order-1">
          <div className="hero-fade inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-[#C5A059] uppercase mb-5">
            <span>★★★★★★</span>
            <span className="h-px w-8 bg-[#C5A059]/45" />
            <span>SEOUL · BẮC KINH · SAN FRANCISCO · LONDON · THÀNH ĐÔ · 2026</span>
          </div>

          <h1 className="hero-fade font-serif font-normal text-4xl sm:text-6xl xl:text-[4.6rem] leading-[0.98] tracking-[-0.02em] text-[#EAE3D2] [text-shadow:0_12px_32px_rgba(0,0,0,0.65)]">
            <span className="block">Mười bốn năm.</span>
            <span className="block italic text-[#C5A059] mt-1">
              Sáu ngôi sao.
            </span>
            <span className="block mt-1">
              Và những giọt nước mắt{" "}
              <span className="italic text-[#A81323]">không bao giờ khô.</span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-sm sm:text-base text-[#EAE3D2]/72 leading-relaxed font-sans font-light">
            Từ cậu thiếu niên 17 tuổi vô danh tại Staples Center 2013, đêm Bắc
            Kinh gục đầu khóc nức nở 2017, kỳ tích Three-Peat tại Thành Đô 2025
            đến khúc tráng ca bi tráng năm 2026 — khi những người anh em ZOFGK
            lần lượt rẽ lối, chỉ còn vị vua già giữ lại ngọn lửa đỏ.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => scrollToChapter("hall-of-frames")}
              onMouseEnter={() => soundFx.playTick(680)}
              className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#EAE3D2] text-[#070606] hover:bg-[#C5A059] font-mono text-[11px] font-medium tracking-[0.18em] uppercase transition-colors cursor-pointer"
            >
              Mở Cuộn Phim Tư Liệu
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToChapter("epilogue-2026")}
              className="editorial-link font-mono text-[11px] tracking-[0.18em] uppercase text-[#EAE3D2]/75 hover:text-[#EAE3D2] cursor-pointer"
            >
              Xem Hồi Kết 2026 →
            </button>
          </div>
        </div>

        {/* Right: Layered Archival Portrait Exhibition (Real Photographs) */}
        <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 min-h-[380px] sm:min-h-[480px] lg:min-h-[560px]">
          {/* Left Floating Flanking Plate: 2013 Rookie Faker */}
          <div
            ref={leftPlateRef}
            className="hidden sm:block absolute left-0 xl:-left-4 bottom-8 w-36 md:w-44 archival-frame overflow-hidden z-10 -rotate-3"
          >
            <img
              src={assetPath("/images/t1/faker-2013.jpg")}
              alt="Faker năm 2013 tại Chung kết Thế giới Mùa 3"
              className="w-full aspect-[3/4] object-cover object-top archival-photo"
            />
            <div className="px-2.5 py-1.5 bg-[#090808] font-mono text-[9px] tracking-[0.16em] text-[#9A9284]">
              2013 // TUỔI 17
            </div>
          </div>

          {/* Right Floating Flanking Plate: 2025 Chengdu Three-Peat */}
          <div
            ref={rightPlateRef}
            className="hidden sm:block absolute right-0 xl:-right-4 top-6 w-36 md:w-44 archival-frame overflow-hidden z-10 rotate-3"
          >
            <img
              src={assetPath("/images/t1/faker-2025-worlds.jpg")}
              alt="Faker tại Chung kết Worlds 2025 Thành Đô"
              className="w-full aspect-[3/4] object-cover object-top archival-photo"
            />
            <div className="px-2.5 py-1.5 bg-[#090808] font-mono text-[9px] tracking-[0.16em] text-[#C5A059]">
              2025 // THÀNH ĐÔ ★6
            </div>
          </div>

          {/* Centerpiece Portrait: 2026 Faker */}
          <div
            ref={portraitWrapRef}
            className="hero-fade relative w-[270px] sm:w-[340px] lg:w-[390px] archival-frame overflow-hidden z-20 transition-transform duration-300 ease-out"
          >
            <div className="relative overflow-hidden">
              <img
                src={assetPath("/images/t1/faker-2026.png")}
                alt="Lee Sang-hyeok (Faker) năm 2026"
                className="w-full aspect-[3/4] object-cover object-top archival-photo archival-photo-active"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,6,6,0.92) 0%, rgba(7,6,6,0.18) 42%, transparent 75%)",
                }}
              />
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 z-10">
              <div className="font-mono text-[10px] tracking-[0.2em] text-[#C5A059]">
                CHƯƠNG VẬT LÝ // TƯ LIỆU 2026
              </div>
              <div className="mt-1 font-serif italic text-xl sm:text-2xl text-[#EAE3D2]">
                Lee &ldquo;Faker&rdquo; Sang-hyeok
              </div>
              <div className="mt-0.5 font-mono text-[10px] text-[#9A9284]">
                MÙA GIẢI THỨ 14 · HỢP ĐỒNG ĐẾN 2029
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
