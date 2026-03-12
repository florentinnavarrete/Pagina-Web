import { useEffect, useRef } from 'react';
import Lenis, { type LenisOptions } from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const DEFAULT_LENIS_OPTIONS: LenisOptions = {
  duration: 1,
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 1,
  wheelMultiplier: 0.85,
};

export const useSmoothScroll = (options?: LenisOptions) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ ...DEFAULT_LENIS_OPTIONS, ...options });
    lenisRef.current = lenis;

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef;
};

export default useSmoothScroll;