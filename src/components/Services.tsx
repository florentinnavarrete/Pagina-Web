
import React, { useRef } from 'react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: 'AI' | 'SAP' | 'HR' | 'SUCCESS';
};

const SERVICES: ServiceCard[] = [
  {
    id: '01',
    title: 'Artificial Intelligence',
    description: 'AI applied to Human Resources processes',
    icon: 'AI',
  },
  {
    id: '02',
    title: 'SAP HCM and Employee Central Payroll',
    description: 'New Implementations and Maintenances',
    icon: 'SAP',
  },
  {
    id: '03',
    title: 'Success Factors Employee Central',
    description: 'Employee Central Core, Workshops, Requirements Definition, Functional Design, Business Blue Print, Build',
    icon: 'SUCCESS',
  },
  {
    id: '04',
    title: 'Human Resources Processes',
    description: 'Spanish Payroll, Social Security, Taxes, HR Processes',
    icon: 'HR',
  },
];

const Services: React.FC = () => {
  const scopeRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.services-card', scopeRef.current ?? undefined);
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (!trackRef.current || !pinRef.current) return;

        const getMaxShift = () => {
          if (!trackRef.current || !pinRef.current) return 0;
          return Math.max(0, trackRef.current.scrollWidth - pinRef.current.clientWidth);
        };

        gsap.to(trackRef.current, {
          x: () => -getMaxShift(),
          ease: 'none',
          scrollTrigger: {
            trigger: scopeRef.current,
            start: 'top top',
            end: () => `+=${getMaxShift() + window.innerHeight * 0.7}`,
            scrub: 1,
            pin: pinRef.current,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.fromTo(
          cards,
          { y: 36, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: scopeRef.current,
              start: 'top 82%',
              once: true,
            },
          },
        );

        cards.forEach((card) => {
          const xTo = gsap.quickTo(card, 'x', { duration: 0.28, ease: 'power3.out' });
          const yTo = gsap.quickTo(card, 'y', { duration: 0.28, ease: 'power3.out' });

          const move = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            xTo(px * 12);
            yTo(py * 12);
          };

          const leave = () => {
            xTo(0);
            yTo(0);
          };

          card.addEventListener('pointermove', move);
          card.addEventListener('pointerleave', leave);

          return () => {
            card.removeEventListener('pointermove', move);
            card.removeEventListener('pointerleave', leave);
          };
        });
      });

      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          cards,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: scopeRef.current,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  const renderIcon = (icon: ServiceCard['icon']) => {
    if (icon === 'SUCCESS') {
      return (
        <span className="inline-flex items-center gap-1.5">
          <Heart size={15} />
          Success
        </span>
      );
    }

    return icon;
  };

  return (
    <section id="services" ref={scopeRef} className="relative px-3 sm:px-4 lg:px-6 py-20 sm:py-24 lg:py-28">
      <div className="max-w-[1680px] mx-auto">
        <header className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h2 className="font-hero text-[clamp(2rem,4.8vw,4.4rem)] leading-[0.95] text-oksap-navy tracking-[0.01em]">
            What We Know to Do
          </h2>
        </header>

        <div ref={pinRef} className="relative overflow-hidden rounded-[2rem] lg:min-h-[72svh]">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-4 sm:gap-5 lg:gap-6 lg:w-max lg:pr-[12vw]"
          >
            {SERVICES.map((service) => (
              <article
                key={service.id}
                className="services-card relative overflow-hidden rounded-[1.6rem] border border-white/18 bg-white/8 backdrop-blur-xl shadow-[0_20px_44px_rgba(0,0,0,0.22)] p-6 sm:p-7 lg:p-8 lg:w-[min(34rem,78vw)] lg:min-h-[24rem]"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-8 -right-2 font-hero text-[6rem] sm:text-[7.5rem] leading-none text-white/7 select-none"
                >
                  {service.id}
                </span>

                <div className="relative z-10 h-full flex flex-col">
                  <div className="inline-flex w-fit items-center rounded-full border border-oksap-accent/40 bg-oksap-accent/15 px-3 py-1 text-xs sm:text-sm uppercase tracking-[0.12em] text-oksap-silver mb-5">
                    {renderIcon(service.icon)}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-oksap-navy mb-4 leading-tight max-w-[22ch]">
                    {service.title}
                  </h3>

                  <p className="text-base sm:text-lg text-white/82 leading-relaxed max-w-[48ch]">
                    {service.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-oksap-silver to-oksap-accent" aria-hidden="true" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;