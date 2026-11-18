"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CHAPTERS } from "@/data/t1EditionData";
import { soundFx } from "@/lib/soundFx";

interface SmoothScrollContextValue {
  progress: number;
  activeChapter: string;
  soundEnabled: boolean;
  toggleSound: () => void;
  scrollToChapter: (chapterId: string) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  progress: 0,
  activeChapter: "hero",
  soundEnabled: false,
  toggleSound: () => {},
  scrollToChapter: () => {},
});

export function useEditionScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState("hero");
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundFx.setEnabled(next);
      return next;
    });
  }, []);

  const scrollToChapter = useCallback((chapterId: string) => {
    soundFx.playChime(523.25, 0.14);
    const el = document.getElementById(chapterId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const lenis = new Lenis({
      lerp: prefersReduced ? 1 : 0.08,
      smoothWheel: !prefersReduced,
      wheelMultiplier: 0.92,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", (e: { progress: number }) => {
      ScrollTrigger.update();
      setProgress(Number.isFinite(e.progress) ? e.progress : 0);
    });

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveChapter(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0.01,
      }
    );

    CHAPTERS.forEach((chapter) => {
      const node = document.getElementById(chapter.id);
      if (node) observer.observe(node);
    });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider
      value={{
        progress,
        activeChapter,
        soundEnabled,
        toggleSound,
        scrollToChapter,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
