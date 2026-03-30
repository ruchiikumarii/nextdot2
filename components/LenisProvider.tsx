"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type LenisProviderProps = {
  children: React.ReactNode;
};

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });

    let rafId = 0;
    const syncWithGsap = () => ScrollTrigger.update();

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = window.requestAnimationFrame(raf);
    };

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(syncWithGsap);
    rafId = window.requestAnimationFrame(raf);

    return () => {
      gsap.ticker.remove(syncWithGsap);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
