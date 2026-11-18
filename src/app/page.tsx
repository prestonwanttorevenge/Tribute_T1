"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_SCENES } from "@/data/storyData";
import { TopTimelineHud } from "@/components/scrolly/TopTimelineHud";
import { StageCanvas } from "@/components/scrolly/StageCanvas";
import { NarrativeColumn } from "@/components/scrolly/NarrativeColumn";

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [maxUnlockedStars, setMaxUnlockedStars] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  const scrollToScene = useCallback((sceneIndex: number) => {
    const safeIdx = Math.max(0, Math.min(STORY_SCENES.length - 1, sceneIndex));
    const target = document.getElementById(`scene-${safeIdx}`);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -72, duration: 1.0 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { progress: number; velocity?: number }) => {
      ScrollTrigger.update();
      setScrollProgress(Number.isFinite(e.progress) ? e.progress : 0);
      setScrollVelocity(
        typeof e.velocity === "number" && Number.isFinite(e.velocity)
          ? e.velocity
          : 0
      );
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Chapter triggers -> sync active scene, continuous sceneProgress (0..1) & championship stars
    const chapters = gsap.utils.toArray<HTMLElement>(".story-chapter");
    const chapterTriggers = chapters.map((chapter) => {
      const sceneIdx = Number(chapter.dataset.scene ?? 0);
      const starsForScene = STORY_SCENES[sceneIdx]?.unlocksStarsUpTo ?? 0;

      return ScrollTrigger.create({
        trigger: chapter,
        start: "top 40%",
        end: "bottom 40%",
        onEnter: () => {
          setActiveScene(sceneIdx);
          setSceneProgress(0);
          setMaxUnlockedStars((prev) => Math.max(prev, starsForScene));
        },
        onEnterBack: () => {
          setActiveScene(sceneIdx);
          setSceneProgress(1);
          setMaxUnlockedStars((prev) => Math.max(prev, starsForScene));
        },
        onUpdate: (self) => {
          if (self.isActive) {
            setActiveScene(sceneIdx);
            setSceneProgress(self.progress);
            setMaxUnlockedStars((prev) => Math.max(prev, starsForScene));
          }
        },
      });
    });

    // Paragraph reading highlight: opacity 0.35 -> 1 in center viewport
    const paras = gsap.utils.toArray<HTMLElement>(".story-para");
    const paraTriggers = paras.map((para) =>
      ScrollTrigger.create({
        trigger: para,
        start: "top 78%",
        end: "bottom 22%",
        onEnter: () => para.classList.replace("opacity-35", "opacity-100"),
        onLeave: () => para.classList.replace("opacity-100", "opacity-35"),
        onEnterBack: () => para.classList.replace("opacity-35", "opacity-100"),
        onLeaveBack: () => para.classList.replace("opacity-100", "opacity-35"),
      })
    );

    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "auto" });
          ScrollTrigger.refresh();
        }, 120);
      }
    }

    return () => {
      chapterTriggers.forEach((t) => t.kill());
      paraTriggers.forEach((t) => t.kill());
      gsap.ticker.remove(onTick);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  const currentBg = STORY_SCENES[activeScene]?.bgHex ?? "#070709";

  return (
    <div
      className="relative min-h-screen w-full max-w-full overflow-x-clip text-[#F2EFE9] transition-colors duration-700"
      style={{ backgroundColor: currentBg }}
    >
      {/* Film grain & 4-corner vignette */}
      <div className="fixed inset-0 z-40 film-grain" aria-hidden="true" />
      <div className="fixed inset-0 z-30 vignette-overlay" aria-hidden="true" />

      <TopTimelineHud
        activeScene={activeScene}
        maxUnlockedStars={maxUnlockedStars}
        scrollProgress={scrollProgress}
      />

      <main className="relative flex flex-col lg:flex-row pt-14 w-full max-w-full">
        <StageCanvas
          activeScene={activeScene}
          sceneProgress={sceneProgress}
          scrollVelocity={scrollVelocity}
          onNavigateScene={scrollToScene}
        />
        <NarrativeColumn
          activeScene={activeScene}
          sceneProgress={sceneProgress}
        />
      </main>
    </div>
  );
}
