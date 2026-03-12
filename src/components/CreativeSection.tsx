'use client';

import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CreativeSection.css';
import sapssffImage from '../assets/SAPSSFF.png';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type CreativeSectionProps = {
  eyebrow?: string;
  title: string;
  stickyTitle: string;
  stickyText: string;
  items: Array<{
    title: string;
    body: string;
  }>;
};

const CreativeSection: React.FC<CreativeSectionProps> = ({
  eyebrow,
  title,
  stickyTitle,
  stickyText,
  items,
}) => {
  const scopeRef = useRef<HTMLElement | null>(null);
  const stickyStageRef = useRef<HTMLDivElement | null>(null);
  const stickyPinRef = useRef<HTMLDivElement | null>(null);

  const titleChars = useMemo(() => Array.from(title), [title]);
  const missionVisual = useMemo(
    () => ({ id: 'sapssff', src: sapssffImage, alt: 'SAP SuccessFactors' }),
    [],
  );

  useGSAP(
    () => {
      let pinTrigger: ScrollTrigger | null = null;
      let sequence: gsap.core.Timeline | null = null;

      const chars = gsap.utils.toArray<HTMLElement>('.creative-char', scopeRef.current ?? undefined);
      if (chars.length) {
        gsap.fromTo(
          chars,
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1.15,
            stagger: 0.018,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: scopeRef.current,
              start: 'top 78%',
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      if (stickyStageRef.current && stickyPinRef.current) {
        pinTrigger = ScrollTrigger.create({
          trigger: stickyStageRef.current,
          start: 'top top+=72',
          end: 'bottom bottom-=72',
          pin: stickyPinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      }

      const streamItems = gsap.utils.toArray<HTMLElement>('.creative-stream-item', scopeRef.current ?? undefined);

      if (streamItems.length) {
        sequence = gsap.timeline({
          defaults: { ease: 'power4.out' },
          scrollTrigger: {
            trigger: '.creative-stream',
            start: 'top 86%',
            once: true,
            invalidateOnRefresh: true,
          },
        });

        if (streamItems.length) {
          sequence.fromTo(
            streamItems,
            { y: 38, opacity: 0, scale: 0.975 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.92,
              stagger: 0.13,
            },
            0,
          );
        }
      }

      return () => {
        sequence?.kill();
        pinTrigger?.kill();
      };
    },
    {
      scope: scopeRef,
      dependencies: [title, stickyTitle, stickyText, items.length],
      revertOnUpdate: true,
    },
  );

  return (
    <section ref={scopeRef} className="creative-section relative px-3 sm:px-4 lg:px-6 pt-4 sm:pt-5 lg:pt-6 pb-14 sm:pb-16 lg:pb-20">
      <div className="max-w-[1680px] mx-auto space-y-3 sm:space-y-4 lg:space-y-5">
        <header className="max-w-5xl">
          {eyebrow ? (
            <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-oksap-silver/80 mb-4">{eyebrow}</p>
          ) : null}
          <h1 className="font-hero text-[clamp(2rem,6vw,5.5rem)] leading-[0.95] text-oksap-navy creative-title">
            {titleChars.map((char, index) => (
              <span key={`${char}-${index}`} className="creative-char-mask">
                <span className="creative-char">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            ))}
          </h1>
        </header>

        <div ref={stickyStageRef} className="creative-sticky-stage grid grid-cols-1 lg:grid-cols-[minmax(280px,0.78fr)_1fr] gap-3 sm:gap-4 lg:gap-8">
          <div ref={stickyPinRef} className="creative-essence-column self-start">
            <div className="creative-sticky-pin creative-sticky-pin--featured rounded-3xl p-6 sm:p-7">
              <h3 className="font-hero text-2xl sm:text-3xl text-oksap-navy mb-3">{stickyTitle}</h3>
              <p className="text-white/80 leading-relaxed text-base sm:text-lg">{stickyText}</p>
            </div>

            {/* La imagen SAP queda fija con la tarjeta mientras el resto hace scroll */}
            <div className="creative-mission-gallery mt-2 sm:mt-3">
              <article key={missionVisual.id} className="creative-mission-image">
                <img src={missionVisual.src} alt={missionVisual.alt} className="h-full w-full object-cover" loading="lazy" />
              </article>
            </div>
          </div>

          <div className="creative-stream space-y-3 sm:space-y-4">
            {items.map((item, index) => (
              <article
                key={item.title}
                className="creative-stream-item rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="text-2xl sm:text-3xl text-oksap-navy font-semibold">{item.title}</h4>
                  <span className="creative-stream-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-white/78 leading-relaxed text-base sm:text-lg">{item.body}</p>
                <div className="creative-stream-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeSection;