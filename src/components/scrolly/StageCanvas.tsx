"use client";

import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { STORY_SCENES } from "@/data/storyData";
import { T1LogoSvg } from "@/components/ui/T1LogoSvg";
import { WebGLStageBackdrop } from "@/components/scrolly/WebGLStageBackdrop";

interface StageCanvasProps {
  activeScene: number;
  sceneProgress: number;
  scrollVelocity: number;
  onNavigateScene?: (sceneIndex: number) => void;
}

const ROSTER_BADGES: Record<number, string> = {
  0: "4UNION // SKT T1",
  1: "SKT T1 K · JUDGMENT DAY",
  2: "MA-BE-FA-BA-WO",
  3: "SKT T1 → T1 REBUILD",
  4: "ZOFGK · 20-0 PEAK",
  5: "ZOFGK · BACK-TO-BACK",
  6: "DOFGK · THREE-PEAT",
  7: "DOFPK · TWILIGHT ERA",
  8: "6x WORLD CHAMPIONS",
};

const SIX_STAR_YEARS = ["2013", "2015", "2016", "2023", "2024", "2025"];

export function StageCanvas({
  activeScene,
  sceneProgress,
  scrollVelocity,
  onNavigateScene,
}: StageCanvasProps) {
  const stageRef = useRef<HTMLElement>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement>(null);

  const clampedProg = Math.min(Math.max(sceneProgress, 0), 1);

  // Smooth 60fps pointer 3D tilt + specular sheen without React re-renders
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let rafId = 0;
    let curX = 0;
    let curY = 0;
    let tgtX = 0;
    let tgtY = 0;

    const onPointerMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      tgtX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      tgtY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const onPointerLeave = () => {
      tgtX = 0;
      tgtY = 0;
    };

    const tick = () => {
      curX += (tgtX - curX) * 0.08;
      curY += (tgtY - curY) * 0.08;
      stage.style.setProperty("--tilt-rx", `${(-curY * 5.2).toFixed(3)}deg`);
      stage.style.setProperty("--tilt-ry", `${(curX * 6.8).toFixed(3)}deg`);
      stage.style.setProperty("--sheen-x", `${(50 + curX * 38).toFixed(2)}%`);
      stage.style.setProperty("--sheen-y", `${(50 + curY * 38).toFixed(2)}%`);
      rafId = requestAnimationFrame(tick);
    };

    stage.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  // Scene 3: Bird's Nest angled cold rain overlay
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas || activeScene !== 3) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const sync = () => {
      canvas.width = Math.max(canvas.offsetWidth, 1);
      canvas.height = Math.max(canvas.offsetHeight, 1);
    };
    sync();

    const drops = Array.from({ length: 110 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: 14 + Math.random() * 24,
      speed: 8 + Math.random() * 9,
      alpha: 0.14 + Math.random() * 0.34,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;
      for (const d of drops) {
        ctx.strokeStyle = `rgba(176, 214, 255, ${d.alpha})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - d.len * 0.18, d.y + d.len);
        ctx.stroke();

        d.y += d.speed;
        d.x -= d.speed * 0.18;
        if (d.y > canvas.height + 24 || d.x < -20) {
          d.y = -24;
          d.x = Math.random() * (canvas.width + 60);
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", sync);
    };
  }, [activeScene]);

  // Scene 7: Twilight rising golden ember dust
  useEffect(() => {
    const canvas = dustCanvasRef.current;
    if (!canvas || activeScene !== 7) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    const sync = () => {
      canvas.width = Math.max(canvas.offsetWidth, 1);
      canvas.height = Math.max(canvas.offsetHeight, 1);
    };
    sync();

    const motes = Array.from({ length: 65 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.9 + Math.random() * 2.1,
      vy: 0.4 + Math.random() * 0.85,
      vx: (Math.random() - 0.5) * 0.3,
      alpha: 0.25 + Math.random() * 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const m of motes) {
        ctx.fillStyle = `rgba(229, 184, 75, ${m.alpha})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();

        m.y -= m.vy;
        m.x += m.vx;
        if (m.y < -10) {
          m.y = canvas.height + 10;
          m.x = Math.random() * canvas.width;
        }
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", sync);
    };
  }, [activeScene]);

  const currentSceneMeta = STORY_SCENES[activeScene] ?? STORY_SCENES[0];
  const sceneCode = String(activeScene).padStart(2, "0");
  const progressPct = Math.round(clampedProg * 100);

  // Scene 0 progression: BoxeR -> SKT 2013
  const showSkt2013Crt = clampedProg >= 0.52;

  // Scene 1 progression: Ryu HP drain & Zed outplay climax
  const ryuHpPercent = Math.max(0, Math.round(100 - clampedProg * 112));
  const outplayClimax = clampedProg >= 0.58;

  // Scene 2 progression: monochrome -> golden imperial color
  const dynastyGrayscale = Math.max(0, 1 - clampedProg * 1.45);

  // Scene 4 progression: San Francisco quake beyond 0.65
  const sfShockwave = clampedProg >= 0.65;

  // Scene 5 progression: Seoul 2023 -> London 2024 crossfade + ECG trace
  const showLondon2024 = clampedProg >= 0.48;
  const ecgDashOffset = Math.round(620 * (1 - clampedProg));

  // Scene 7 progression: DOFGK -> DOFPK morph
  const showDofpk = clampedProg >= 0.45;

  const handleJump = (idx: number) => {
    const safeIdx = Math.max(0, Math.min(STORY_SCENES.length - 1, idx));
    if (onNavigateScene) {
      onNavigateScene(safeIdx);
      return;
    }
    const el = document.getElementById(`scene-${safeIdx}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside
      ref={stageRef}
      aria-label="Sân khấu thị giác T1 Dynasty"
      className="stage-shell sticky top-14 z-20 h-[35vh] min-h-[250px] w-full shrink-0 overflow-hidden border-b border-white/10 lg:h-[calc(100vh-3.5rem)] lg:w-[58%] lg:border-b-0 lg:border-r lg:border-white/[0.07]"
    >
      {/* 1. Real-time 60fps Three.js WebGL stage atmosphere */}
      <WebGLStageBackdrop
        activeScene={activeScene}
        sceneProgress={clampedProg}
        scrollVelocity={scrollVelocity}
      />

      {/* Ambient radial light & vignette blending into WebGL canvas */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-700"
        style={{
          background:
            activeScene === 3
              ? "radial-gradient(ellipse at center, rgba(15,23,34,0.18) 0%, rgba(7,7,9,0.82) 100%)"
              : activeScene === 6
              ? "radial-gradient(circle at 50% 48%, rgba(228,0,43,0.14) 0%, rgba(12,10,14,0.68) 72%, rgba(7,7,9,0.88) 100%)"
              : "radial-gradient(circle at 50% 45%, rgba(229,184,75,0.06) 0%, rgba(7,7,9,0.72) 85%)",
        }}
      />

      {/* ================================================================= */}
      {/* SCENE 0: 2003–2012 · KHỞI NGUYÊN CRT (BoxeR -> SKT T1 2013)        */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 0
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div
          className="monolith-3d relative w-[250px] sm:w-[440px] lg:w-[520px] transition-transform duration-300"
          style={{
            transform: `perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg)) scale(${(
              1 +
              clampedProg * 0.05
            ).toFixed(3)})`,
          }}
        >
          {/* Outer CRT television bezel */}
          <div className="relative aspect-[4/3] w-full rounded-xl border border-emerald-400/35 bg-[#050806] p-2 sm:p-3 shadow-[0_0_80px_rgba(32,190,110,0.22),inset_0_0_32px_rgba(32,190,110,0.18)]">
            <div className="relative h-full w-full overflow-hidden rounded-lg border border-emerald-300/20 bg-black crt-scanlines">
              <img
                src="images/t1/boxer-founder.jpg"
                alt="Lim Yo-hwan BoxeR thời kỳ đầu StarCraft"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
                  showSkt2013Crt ? "opacity-0" : "opacity-100"
                }`}
                style={{
                  filter: "contrast(1.18) saturate(0.88) hue-rotate(-6deg)",
                }}
              />
              <img
                src="images/t1/skt-2013-team.jpg"
                alt="Đội hình SK Telecom T1 K năm 2013"
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                  showSkt2013Crt ? "opacity-100" : "opacity-0"
                }`}
                style={{ filter: "contrast(1.14) saturate(0.95)" }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at var(--sheen-x, 50%) var(--sheen-y, 50%), rgba(53,208,127,0.16), rgba(0,0,0,0.58) 85%)",
                }}
              />
              {/* CRT HUD stamp */}
              <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between font-mono text-[9px] sm:text-[10.5px] tracking-[0.2em] text-emerald-300/90">
                <span className="flex items-center gap-1.5 bg-black/75 px-2 py-0.5 border border-emerald-400/25">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CH 04 // {showSkt2013Crt ? "SKT T1 2013" : "4UNION → T1"}
                </span>
                <span className="bg-black/75 px-2 py-0.5 text-emerald-200/80">
                  {showSkt2013Crt ? "2012-2013" : "2003-2004"}
                </span>
              </div>
              <div className="hidden sm:flex absolute bottom-3 left-3 right-3 items-end justify-between gap-3">
                <div className="bg-black/80 px-3 py-1.5 border-l-2 border-emerald-400">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-emerald-300 uppercase">
                    {showSkt2013Crt
                      ? "BÌNH MINH LEAGUE OF LEGENDS"
                      : "THE EMPEROR · LIM YO-HWAN"}
                  </p>
                  <p className="font-serif text-sm text-[#F2EFE9]/90 mt-0.5">
                    {showSkt2013Crt
                      ? "Hạt giống SK Telecom T1 K chính thức hình thành"
                      : "Từ căn phòng nhỏ đến ngọn cờ đầu thể thao điện tử"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2.5 sm:mt-4 text-center font-mono text-[10px] sm:text-xs tracking-[0.26em] text-emerald-300/80 uppercase">
            2003 — 2012 · KHỞI NGUYÊN CỦA MỘT ĐẾ CHẾ
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 1: 2013 · TIẾNG SÉT FAKER & ZED OUTPLAY                    */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 1
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Crossed SVG Zed shadow-slash blades */}
        <svg
          viewBox="0 0 800 500"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="80"
            y1="440"
            x2="720"
            y2="60"
            stroke="#E4002B"
            strokeWidth={outplayClimax ? "3.2" : "1.8"}
            strokeDasharray="900"
            strokeDashoffset={Math.round(900 * (1 - clampedProg))}
          />
          <line
            x1="80"
            y1="60"
            x2="720"
            y2="440"
            stroke="#E5B84B"
            strokeWidth={outplayClimax ? "2.4" : "1.2"}
            strokeDasharray="900"
            strokeDashoffset={Math.round(900 * (1 - clampedProg))}
          />
        </svg>

        <div
          className="monolith-3d relative flex flex-col items-center w-full max-w-[540px]"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          <div className="relative h-[145px] sm:h-[340px] lg:h-[400px] w-[200px] sm:w-[330px] lg:w-[375px] overflow-hidden border border-[#E4002B]/55 bg-[#08070a] shadow-[0_0_90px_rgba(228,0,43,0.34)]">
            <img
              src="images/t1/faker-2013.jpg"
              alt="Faker Lee Sang-hyeok năm 2013"
              className="h-full w-full object-cover object-top transition-transform duration-500"
              style={{
                transform: `scale(${(1.03 + clampedProg * 0.06).toFixed(3)})`,
                filter: "contrast(1.16) saturate(0.95)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,7,9,0.92) 0%, rgba(228,0,43,0.12) 45%, rgba(7,7,9,0.22) 100%)",
              }}
            />
            <div className="absolute top-2.5 left-2.5 bg-black/80 px-2.5 py-1 border border-[#E4002B]/50 font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-[#E4002B]">
              17 TUỔI · STAPLES CENTER 2013
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <p
                className={`font-serif italic text-base sm:text-3xl font-semibold tracking-wide transition-colors duration-300 ${
                  outplayClimax
                    ? "text-[#E5B84B] drop-shadow-[0_0_24px_rgba(229,184,75,0.65)]"
                    : "text-[#F2EFE9]"
                }`}
              >
                “FAKER! WHAT WAS THAT?!”
              </p>
            </div>
          </div>

          {/* Interactive Ryu Zed HP Drain */}
          <div className="mt-2.5 sm:mt-4 w-[240px] sm:w-[390px] liquid-glass px-3.5 py-2 sm:px-4 sm:py-2.5 border border-[#E4002B]/40">
            <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10.5px] tracking-[0.2em] mb-1.5">
              <span className="text-white/80">RYU · ZED SHADOW DUEL</span>
              <span
                className={
                  ryuHpPercent <= 15
                    ? "text-[#E4002B] font-bold animate-pulse"
                    : "text-[#E5B84B]"
                }
              >
                {ryuHpPercent}% HP
              </span>
            </div>
            <div className="h-2 w-full bg-white/10 overflow-hidden rounded-sm">
              <div
                className="h-full transition-all duration-150 bg-gradient-to-r from-[#E4002B] via-[#ff4b5c] to-[#E5B84B]"
                style={{ width: `${ryuHpPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 2: 2015–2016 · ĐẾ CHẾ TUYỆT ĐỐI (Trophy + Bengi + kkOma)    */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 2
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div
          className="monolith-3d relative w-full max-w-[590px] flex flex-col items-center"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          {/* Overlapping Monumental Diptych */}
          <div className="relative flex items-center justify-center w-full h-[145px] sm:h-[340px] lg:h-[400px]">
            <div className="relative h-full w-[225px] sm:w-[445px] lg:w-[500px] overflow-hidden border border-[#E5B84B]/55 bg-[#090807] shadow-[0_0_95px_rgba(229,184,75,0.22)]">
              <img
                src="images/t1/skt-2015-trophy.jpg"
                alt="SKT T1 nâng cao cúp vô địch thế giới 2015"
                className="h-full w-full object-cover object-center transition-all duration-300"
                style={{
                  filter: `grayscale(${(dynastyGrayscale * 100).toFixed(
                    0
                  )}%) contrast(1.1) brightness(${(
                    0.9 +
                    clampedProg * 0.14
                  ).toFixed(2)})`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,7,9,0.88) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                <span className="font-mono text-[9.5px] sm:text-[11px] tracking-[0.22em] text-[#E5B84B]">
                  MA-BE-FA-BA-WO · 2015–2016
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/75">
                  ★ ★ ★
                </span>
              </div>
            </div>

            {/* Bengi Left Inset Plaque (Desktop & Tablet) */}
            <div className="hidden sm:block absolute -left-2 lg:-left-4 bottom-6 w-[140px] lg:w-[165px] overflow-hidden border border-[#E5B84B]/45 bg-[#09090c] shadow-2xl">
              <img
                src="images/t1/bengi-legend.jpg"
                alt="Bengi bàn tay phải của Chúa"
                className="h-[135px] lg:h-[160px] w-full object-cover object-top"
                style={{
                  filter: `grayscale(${(dynastyGrayscale * 80).toFixed(0)}%)`,
                }}
              />
              <div className="px-2.5 py-1.5 font-mono text-[9px] tracking-[0.18em] text-[#E5B84B] bg-black/90">
                BENGI · THE JUNGLE
              </div>
            </div>

            {/* kkOma Top Right Inset Plaque (Desktop & Tablet) */}
            <div className="hidden sm:block absolute -right-1 lg:-right-3 top-4 w-[130px] lg:w-[155px] overflow-hidden border border-white/25 bg-[#09090c] shadow-2xl">
              <img
                src="images/t1/kkoma-2015.jpg"
                alt="HLV kkOma thời kỳ SKT T1"
                className="h-[115px] lg:h-[140px] w-full object-cover object-top"
              />
              <div className="px-2.5 py-1.5 font-mono text-[9px] tracking-[0.18em] text-white/80 bg-black/90">
                HLV KKOMA · 2016
              </div>
            </div>
          </div>

          <p className="mt-2.5 sm:mt-4 font-serif text-sm sm:text-2xl tracking-[0.12em] text-[#E5B84B] text-center">
            NHÀ VUA VĨ ĐẠI NHẤT MỌI THỜI ĐẠI
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 3: 2017–2021 · ĐÊM MƯA TỔ CHIM (Chiaroscuro + Canvas Rain) */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 3
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Bird's Nest atmospheric background watermark */}
        <img
          src="images/t1/birds-nest-2017.jpg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          style={{ filter: "contrast(1.2) blur(1px)" }}
        />

        <canvas
          ref={rainCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full z-[2]"
          aria-hidden="true"
        />

        <div
          className="monolith-3d relative z-[3] flex flex-col items-center"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          <div className="relative h-[145px] sm:h-[340px] lg:h-[405px] w-[195px] sm:w-[325px] lg:w-[365px] overflow-hidden border border-sky-300/25 bg-[#080d14] shadow-[0_0_80px_rgba(120,175,240,0.22)]">
            <img
              src="images/t1/faker-2015.jpg"
              alt="Faker trong ánh sáng chiaroscuro thời kỳ đen tối"
              className="h-full w-full object-cover object-top"
              style={{
                filter: "grayscale(100%) contrast(1.28) brightness(0.88)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,11,18,0.92) 0%, transparent 55%)",
              }}
            />
            <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/75 border border-sky-300/30 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-sky-200/85">
              BIRD&apos;S NEST · 04.11.2017
            </div>
            <div className="hidden sm:block absolute bottom-3 left-3 right-3 text-center">
              <p className="font-serif italic text-lg lg:text-xl text-sky-100/90 leading-snug">
                “Giọt nước mắt rơi xuống bàn phím,
                <br />
                khắc vào lịch sử sự khắc nghiệt của ngai vàng.”
              </p>
            </div>
          </div>

          <p className="mt-2 sm:mt-4 font-mono text-[9.5px] sm:text-xs tracking-[0.24em] text-sky-200/75 text-center uppercase">
            2017 — 2021 · ĐÊM TRƯỜNG BẮC KINH → TÁI THIẾT T1
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 4: 2022–2023 · ZOFGK 5 CỘT TRỤ & CÚ VẤP SAN FRANCISCO       */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-3 sm:p-8 lg:pb-16 ${
          activeScene === 4
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div
          className={`monolith-3d relative w-full max-w-[660px] flex flex-col items-center ${
            sfShockwave ? "translate-y-0.5" : ""
          }`}
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          {/* 20-0 & Year Header */}
          <div className="mb-2 sm:mb-4 flex items-center gap-3 sm:gap-5">
            <span className="font-serif text-xl sm:text-5xl font-semibold tracking-[0.14em] text-[#F2EFE9]">
              ZOFGK
            </span>
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 border border-[#E5B84B]/60 bg-[#E5B84B]/10 font-mono text-[10px] sm:text-xs tracking-[0.22em] text-[#E5B84B]">
              20 – 0 LCK SPRING
            </span>
          </div>

          {/* 5 Towering Vertical Roster Columns */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 w-full items-end">
            {[
              { name: "ZEUS", img: "images/t1/zeus-2024.jpg", h: "h-[105px] sm:h-[260px] lg:h-[330px]", yOff: -12 },
              { name: "ONER", img: "images/t1/oner-solo.jpg", h: "h-[115px] sm:h-[285px] lg:h-[355px]", yOff: -6 },
              { name: "FAKER", img: "images/t1/faker-2024-worlds.jpg", h: "h-[126px] sm:h-[310px] lg:h-[385px]", yOff: 0 },
              { name: "GUMA", img: "images/t1/gumayusi-2023.jpg", h: "h-[115px] sm:h-[285px] lg:h-[355px]", yOff: 6 },
              { name: "KERIA", img: "images/t1/keria-2023.jpg", h: "h-[105px] sm:h-[260px] lg:h-[330px]", yOff: 12 },
            ].map((player, idx) => (
              <div
                key={player.name}
                className={`group relative ${player.h} overflow-hidden border transition-all duration-500 ${
                  sfShockwave
                    ? "border-[#E4002B]/75 shadow-[0_0_25px_rgba(228,0,43,0.3)]"
                    : idx === 2
                    ? "border-[#E5B84B]/65 shadow-[0_0_35px_rgba(229,184,75,0.25)]"
                    : "border-white/20"
                }`}
                style={{
                  transform: `translateY(${(
                    player.yOff *
                    (1 - clampedProg)
                  ).toFixed(1)}px)`,
                }}
              >
                <img
                  src={player.img}
                  alt={player.name}
                  className="h-full w-full object-cover object-top"
                  style={{
                    filter: sfShockwave
                      ? "contrast(1.18) saturate(0.85)"
                      : "contrast(1.08) saturate(1.06)",
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(7,7,9,0.92) 0%, rgba(228,0,43,0.16) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute bottom-1 sm:bottom-2 left-0 right-0 text-center font-mono text-[8px] sm:text-[10.5px] tracking-[0.2em] text-[#F2EFE9]">
                  {player.name}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 sm:mt-4 flex items-center gap-3 font-mono text-[9.5px] sm:text-xs tracking-[0.22em]">
            <span
              className={`px-2.5 py-1 border ${
                sfShockwave
                  ? "border-[#E4002B] bg-[#E4002B]/20 text-white"
                  : "border-white/15 bg-black/60 text-white/75"
              }`}
            >
              {sfShockwave
                ? "CHASE CENTER · SAN FRANCISCO · 1-3 DRX"
                : "NGŨ QUÁI KỲ LÂN · 2022–2023"}
            </span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 5: 2023–2024 · SEOUL 2023 -> LONDON O2 2024 + ECG WAVE       */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 5
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Full-stage live ECG Heartbeat Line scrubbed by sceneProgress */}
        <svg
          viewBox="0 0 1000 180"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-32 sm:h-44 w-full opacity-65 z-[1]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 0 90 L 210 90 L 245 90 L 270 52 L 292 140 L 325 18 L 352 162 L 380 72 L 408 90 L 620 90 L 650 48 L 675 138 L 705 14 L 732 164 L 760 76 L 792 90 L 1000 90"
            fill="none"
            stroke="#E4002B"
            strokeWidth="2.6"
            strokeDasharray="620"
            strokeDashoffset={ecgDashOffset}
          />
        </svg>

        <div
          className="monolith-3d relative z-[2] w-full max-w-[600px] flex flex-col items-center"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          {/* Main Crossfading Monument (Seoul 2023 -> London 2024) */}
          <div className="relative h-[145px] sm:h-[330px] lg:h-[390px] w-[245px] sm:w-[500px] lg:w-[560px] overflow-hidden border border-[#E5B84B]/55 bg-[#0a0709] shadow-[0_0_90px_rgba(228,0,43,0.3)]">
            <img
              src="images/t1/t1-2023-awards.jpg"
              alt="T1 thống trị đêm trao giải LCK & CKTG Seoul 2023"
              className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
                showLondon2024 ? "opacity-0" : "opacity-100"
              }`}
            />
            <img
              src="images/t1/t1-worlds-2024-team.jpg"
              alt="Đội hình T1 vô địch thế giới 2024 tại The O2 Arena London"
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                showLondon2024 ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(7,7,9,0.92) 0%, transparent 55%)",
              }}
            />

            {/* Inset London O2 Stage Plaque in Second Half */}
            {showLondon2024 && (
              <div className="hidden sm:block absolute top-3 right-3 w-[165px] overflow-hidden border border-[#E5B84B]/60 bg-black/85 shadow-2xl">
                <img
                  src="images/t1/t1-2024-stage.jpg"
                  alt="Sân khấu The O2 Arena London 2024"
                  className="h-[100px] w-full object-cover"
                />
                <div className="px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-[#E5B84B]">
                  SYLAS / GALIO · GAME 4–5
                </div>
              </div>
            )}

            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 border border-[#E4002B]/55 font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.2em] text-[#E4002B]">
              {showLondon2024
                ? "LONDON · 02.11.2024"
                : "SEOUL GOCHEOK SKY DOME · 2023"}
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
              <p className="font-serif text-sm sm:text-2xl text-[#E5B84B] font-semibold">
                {showLondon2024
                  ? "T1 3 – 2 BLG · BẢO VỆ THÀNH CÔNG NGAI VÀNG"
                  : "MỘT MÌNH T1 CHỐNG LẠI TOÀN BỘ LPL"}
              </p>
              <span className="hidden sm:inline font-mono text-xs tracking-[0.2em] text-[#E5B84B]">
                {showLondon2024 ? "★ ★ ★ ★ ★" : "★ ★ ★ ★"}
              </span>
            </div>
          </div>

          <p className="mt-2 sm:mt-4 font-serif italic text-xs sm:text-lg text-[#F2EFE9]/85 text-center">
            {showLondon2024
              ? "“Ngọn núi cao nhất luôn lạnh giá nhất, nhưng kẻ đứng trên đỉnh vẫn là Faker.”"
              : "“Mọi con đường đều dẫn về với anh.”"}
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 6: 2025 · NỘI CHIẾN THÀNH ĐÔ & THREE-PEAT                    */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 6
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        {/* Diagonal SVG laser split */}
        <svg
          viewBox="0 0 800 500"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-45 z-[1]"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="400"
            y1="0"
            x2="400"
            y2="500"
            stroke="#E5B84B"
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />
        </svg>

        <div
          className="monolith-3d relative z-[2] w-full max-w-[630px] flex flex-col items-center"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          {/* Overlapping Monumental Stage + Finals MVP Card */}
          <div className="relative flex items-center justify-center w-full gap-3 sm:gap-5">
            <div className="relative h-[120px] sm:h-[270px] lg:h-[320px] w-[180px] sm:w-[375px] lg:w-[420px] overflow-hidden border border-[#E4002B]/65 bg-[#0b0709] shadow-[0_0_80px_rgba(228,0,43,0.34)]">
              <img
                src="images/t1/t1-dofgk-2025.jpg"
                alt="T1 trên sân khấu Thành Đô năm 2025"
                className="h-full w-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,7,9,0.85) 0%, transparent 50%)",
                }}
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 border border-[#E4002B]/50 font-mono text-[8.5px] sm:text-[10px] tracking-[0.2em] text-[#E4002B]">
                CHENGDU 2025 · TELECOM WAR
              </span>
            </div>

            <div className="relative h-[120px] sm:h-[270px] lg:h-[320px] w-[96px] sm:w-[200px] lg:w-[225px] overflow-hidden border border-[#E5B84B]/65 bg-[#09090c] shadow-[0_0_60px_rgba(229,184,75,0.28)]">
              <img
                src="images/t1/gumayusi-mvp.jpg"
                alt="Gumayusi Finals MVP Chung kết thế giới 2025"
                className="h-full w-full object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(7,7,9,0.92) 0%, transparent 55%)",
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 font-mono text-[8px] sm:text-[10px] tracking-[0.18em] text-[#E5B84B] text-center">
                FMVP GUMAYUSI
              </div>
            </div>
          </div>

          {/* Roster Morph: D O F G K */}
          <div className="my-2 sm:my-4 flex items-center gap-3 sm:gap-6 font-sans text-xl sm:text-4xl font-extrabold tracking-[0.24em]">
            <span className="text-[#E5B84B] drop-shadow-[0_0_20px_rgba(229,184,75,0.65)]">
              D
            </span>
            <span className="text-white">O</span>
            <span className="text-[#E4002B]">F</span>
            <span className="text-[#E5B84B]">G</span>
            <span className="text-white">K</span>
          </div>

          {/* Legible Frosted Glass Quote Plaque */}
          <div className="w-full max-w-[560px] liquid-glass px-4 py-2 sm:px-6 sm:py-3.5 text-center border border-[#E5B84B]/30">
            <p className="font-serif italic text-[11px] sm:text-lg text-[#E5B84B] leading-snug">
              “Cuối cùng tôi cũng đã chứng minh được với chính bản thân mình rằng
              tôi là xạ thủ giỏi nhất thế giới.”
            </p>
            <p className="mt-1 font-mono text-[8.5px] sm:text-[10px] tracking-[0.22em] text-white/70">
              GUMAYUSI · THÀNH ĐÔ 09.11.2025 · THREE-PEAT ★★★★★★
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 7: 2026 · BÌNH MINH HAY HOÀNG HÔN? (Twilight 3-Pillar)      */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 7
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <canvas
          ref={dustCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full z-[1]"
          aria-hidden="true"
        />

        <div
          className="monolith-3d relative z-[2] w-full max-w-[610px] flex flex-col items-center"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          {/* Roster Transition */}
          <div className="mb-2 sm:mb-4 flex items-center gap-3 sm:gap-5 font-mono text-xs sm:text-lg tracking-[0.24em]">
            <span className={showDofpk ? "text-white/40 line-through" : "text-white"}>
              DOFGK
            </span>
            <span className="text-[#E5B84B]">→</span>
            <span className="font-bold text-[#E5B84B] drop-shadow-[0_0_16px_rgba(229,184,75,0.5)]">
              DOFPK
            </span>
          </div>

          {/* Elevated 3-Pillar Twilight Museum Triptych */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full items-center">
            <div className="relative h-[115px] sm:h-[260px] lg:h-[310px] overflow-hidden border border-[#E5B84B]/30 bg-[#0d0a08]">
              <img
                src="images/t1/oner-2025.jpg"
                alt="Oner tại mùa giải 2025-2026"
                className="h-full w-full object-cover object-top"
                style={{ filter: "sepia(14%) contrast(1.06)" }}
              />
              <div className="absolute bottom-1.5 left-2 font-mono text-[8.5px] sm:text-[10px] tracking-[0.2em] text-[#E5B84B]/90 bg-black/75 px-1.5 py-0.5">
                ONER
              </div>
            </div>

            <div className="relative h-[135px] sm:h-[315px] lg:h-[365px] overflow-hidden border border-[#E5B84B]/70 bg-[#0d0a08] shadow-[0_0_75px_rgba(229,184,75,0.28)]">
              <img
                src="images/t1/faker-2026.png"
                alt="Faker năm 2026 chương cuối cùng hay bình minh mới"
                className="h-full w-full object-cover object-top"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,9,7,0.88) 0%, transparent 45%)",
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 text-center font-mono text-[8.5px] sm:text-[10px] tracking-[0.2em] text-[#E5B84B]">
                FAKER · 2026
              </div>
            </div>

            <div className="relative h-[115px] sm:h-[260px] lg:h-[310px] overflow-hidden border border-[#E5B84B]/30 bg-[#0d0a08]">
              <img
                src="images/t1/keria-2023.jpg"
                alt="Keria hỗ trợ thiên tài của T1"
                className="h-full w-full object-cover object-top"
                style={{ filter: "sepia(14%) contrast(1.06)" }}
              />
              <div className="absolute bottom-1.5 left-2 font-mono text-[8.5px] sm:text-[10px] tracking-[0.2em] text-[#E5B84B]/90 bg-black/75 px-1.5 py-0.5">
                KERIA
              </div>
            </div>
          </div>

          <p className="mt-2 sm:mt-4 font-serif italic text-xs sm:text-lg text-[#E5B84B]/90 text-center">
            {showDofpk
              ? "Peyz bước lên thay thế Gumayusi — vương triều bước vào phép thử thời gian."
              : "Ánh hoàng hôn ấm hay bình minh của một chu kỳ mới?"}
          </p>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SCENE 8: LỜI KẾT · BIỂU TƯỢNG T1 & VÒNG CUNG 6 NGÔI SAO VÀNG      */}
      {/* ================================================================= */}
      <div
        className={`stage-layer flex flex-col items-center justify-center p-4 sm:p-8 lg:pb-16 ${
          activeScene === 8
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div
          className="monolith-3d relative flex flex-col items-center"
          style={{
            transform:
              "perspective(1200px) rotateX(var(--tilt-rx, 0deg)) rotateY(var(--tilt-ry, 0deg))",
          }}
        >
          {/* Curved Crescent Constellation of 6 Championship Stars */}
          <div className="relative h-12 sm:h-20 w-[260px] sm:w-[440px] mb-1 sm:mb-2">
            {SIX_STAR_YEARS.map((year, idx) => {
              const offsetNorm = (idx - 2.5) / 2.5; // -1 .. +1
              const leftPct = 50 + offsetNorm * 41;
              const topPx = Math.pow(offsetNorm, 2) * 26;
              return (
                <div
                  key={year}
                  className="absolute -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${leftPct}%`, top: `${topPx}px` }}
                >
                  <span className="text-lg sm:text-3xl text-[#E5B84B] drop-shadow-[0_0_18px_rgba(229,184,75,0.8)]">
                    ★
                  </span>
                  <span className="font-mono text-[8px] sm:text-[9.5px] tracking-[0.16em] text-[#E5B84B]/80">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>

          <T1LogoSvg
            className="w-40 sm:w-80 lg:w-96 t1-glow my-2 sm:my-4"
            fill="#E2012D"
          />

          <p className="font-mono text-[10px] sm:text-xs tracking-[0.34em] text-[#E5B84B] uppercase text-center">
            2003 — 2026 · VĨNH CỬU TRONG KÝ ỨC
          </p>
          <p className="hidden sm:block mt-2 font-serif italic text-lg text-[#F2EFE9]/80 text-center max-w-md">
            Sáu vì sao trên ngực áo. Một ngọn lửa bất diệt mang tên T1.
          </p>

          <button
            type="button"
            onClick={() => handleJump(0)}
            className="mt-3 sm:mt-6 inline-flex items-center gap-2 border border-[#E5B84B]/50 bg-[#E5B84B]/10 hover:bg-[#E5B84B]/25 px-4 py-1.5 sm:px-5 sm:py-2.5 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#E5B84B] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            CUỘN LẠI TỪ ĐẦU HÀNH TRÌNH
          </button>
        </div>
      </div>

      {/* ================================================================= */}
      {/* DESKTOP STAGE TELEMETRY FOOTER BAR                                 */}
      {/* ================================================================= */}
      <div className="hidden lg:flex absolute bottom-0 inset-x-0 z-20 items-center justify-between border-t border-white/[0.08] bg-[#070709]/80 backdrop-blur-md px-6 py-2.5">
        <div className="flex items-center gap-3 font-mono text-[10.5px] tracking-[0.22em]">
          <span className="text-[#E4002B] font-semibold">
            SCENE {sceneCode}
          </span>
          <span className="text-white/25">{"//"}</span>
          <span className="text-[#E5B84B]">{progressPct}%</span>
          <span className="text-white/25">·</span>
          <span className="text-white/70 truncate max-w-[230px]">
            {currentSceneMeta.eraTag}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="border border-white/15 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] tracking-[0.2em] text-[#F2EFE9]/85">
            {ROSTER_BADGES[activeScene] ?? "T1"}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleJump(activeScene - 1)}
              disabled={activeScene === 0}
              aria-label="Chương trước"
              className="flex h-7 w-7 items-center justify-center border border-white/15 bg-black/50 text-white/75 hover:border-[#E5B84B]/60 hover:text-[#E5B84B] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleJump(activeScene + 1)}
              disabled={activeScene === STORY_SCENES.length - 1}
              aria-label="Chương tiếp theo"
              className="flex h-7 w-7 items-center justify-center border border-white/15 bg-black/50 text-white/75 hover:border-[#E5B84B]/60 hover:text-[#E5B84B] disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
