import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

type LogoItem = {
  id: number;
  src: string;
  alt: string;
};

const Portfolio: React.FC = () => {
  const scopeRef = useRef<HTMLElement | null>(null);
  const clientsTrackRef = useRef<HTMLDivElement | null>(null);
  const itTrackRef = useRef<HTMLDivElement | null>(null);

  const clientLogoModules = import.meta.glob('../assets/Clients/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const logos: LogoItem[] = useMemo(
    () =>
      Object.keys(clientLogoModules)
        .sort()
        .map((path, index) => ({
          id: index + 1,
          src: clientLogoModules[path],
          alt: `Logo cliente ${index + 1}`,
        })),
    [clientLogoModules],
  );

  const itLogoModules = import.meta.glob('../assets/IT/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const itLogos: LogoItem[] = useMemo(
    () =>
      Object.keys(itLogoModules)
        .sort()
        .map((path, index) => ({
          id: index + 1,
          src: itLogoModules[path],
          alt: `Logo partner IT ${index + 1}`,
        })),
    [itLogoModules],
  );

  const clientMarqueeLogos = useMemo(() => [...logos, ...logos], [logos]);
  const itMarqueeLogos = useMemo(() => [...itLogos, ...itLogos], [itLogos]);

  useGSAP(
    () => {
      const clientsTrack = clientsTrackRef.current;
      const itTrack = itTrackRef.current;
      const logoCards = gsap.utils.toArray<HTMLElement>('.clients-logo-card', scopeRef.current ?? undefined);
      if (!clientsTrack || !itTrack) return;

      // Marquee infinito usando lista duplicada para no generar saltos.
      const marqueeTween = gsap.to(clientsTrack, {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: 'none',
        force3D: true,
      });

      const reverseMarqueeTween = gsap.fromTo(
        itTrack,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 26,
          repeat: -1,
          ease: 'none',
          force3D: true,
        },
      );

      const slowDown = () => gsap.to(marqueeTween, { timeScale: 0.22, duration: 0.45, ease: 'power3.out' });
      const speedUp = () => gsap.to(marqueeTween, { timeScale: 1, duration: 0.45, ease: 'power3.out' });

      const slowDownReverse = () => gsap.to(reverseMarqueeTween, { timeScale: 0.22, duration: 0.45, ease: 'power3.out' });
      const speedUpReverse = () => gsap.to(reverseMarqueeTween, { timeScale: 1, duration: 0.45, ease: 'power3.out' });

      clientsTrack.addEventListener('pointerenter', slowDown);
      clientsTrack.addEventListener('pointerleave', speedUp);
      itTrack.addEventListener('pointerenter', slowDownReverse);
      itTrack.addEventListener('pointerleave', speedUpReverse);

      const cardListeners: Array<{ card: HTMLElement; enter: () => void; leave: () => void }> = [];
      logoCards.forEach((card) => {
        const logo = card.querySelector<HTMLElement>('.clients-logo-image');
        if (!logo) return;

        const enter = () => {
          gsap.to(card, { scale: 1.05, duration: 0.38, ease: 'power3.out', force3D: true });
          gsap.to(logo, { filter: 'grayscale(0%)', opacity: 1, duration: 0.38, ease: 'power3.out' });
        };

        const leave = () => {
          gsap.to(card, { scale: 1, duration: 0.38, ease: 'power3.out', force3D: true });
          gsap.to(logo, { filter: 'grayscale(100%)', opacity: 0.82, duration: 0.38, ease: 'power3.out' });
        };

        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        cardListeners.push({ card, enter, leave });
      });

      return () => {
        clientsTrack.removeEventListener('pointerenter', slowDown);
        clientsTrack.removeEventListener('pointerleave', speedUp);
        itTrack.removeEventListener('pointerenter', slowDownReverse);
        itTrack.removeEventListener('pointerleave', speedUpReverse);
        cardListeners.forEach(({ card, enter, leave }) => {
          card.removeEventListener('pointerenter', enter);
          card.removeEventListener('pointerleave', leave);
        });
      };
    },
    { scope: scopeRef },
  );

  return (
    <section id="clients" ref={scopeRef} className="py-28 sm:py-32 lg:py-40 px-3 sm:px-4 lg:px-6 bg-transparent section-shell overflow-hidden">
      <div className="max-w-[1680px] mx-auto">
        <div className="mb-12 sm:mb-16 lg:mb-20 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.22em] text-oksap-silver font-bold mb-4">Network</p>
          <h2 className="font-hero text-[clamp(2.3rem,5.2vw,5.4rem)] leading-[0.94] text-oksap-navy mb-5">
            Empresas que confían en nosotros,
            <br />
            Partners IT que respaldan nuestro trabajo
          </h2>
          <p className="text-oksap-accent text-lg sm:text-xl max-w-2xl leading-relaxed">
            Mostramos dos carruseles con roles distintos: clientes finales de OKSAP y compañías IT de referencia con las que colaboramos en proyectos de alto impacto.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-md py-8 sm:py-10 lg:py-12 space-y-5 sm:space-y-6">
          <div className="px-5 sm:px-7 lg:px-8">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-oksap-silver font-bold mb-3">Our Clients</p>
          </div>
          <div ref={clientsTrackRef} className="flex w-max items-center gap-4 sm:gap-5 lg:gap-6 pr-6 will-change-transform">
            {clientMarqueeLogos.map((logo, index) => (
              <article
                key={`${logo.id}-${index}`}
                className="clients-logo-card flex h-[7.5rem] w-[11rem] sm:h-[8.5rem] sm:w-[13rem] lg:h-[10rem] lg:w-[15rem] items-center justify-center rounded-[1.4rem] border border-white/12 bg-white/[0.05] px-5 py-4 shadow-[0_16px_36px_rgba(0,0,0,0.14)] transform-gpu will-change-transform"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="clients-logo-image max-h-full max-w-full object-contain opacity-[0.82] grayscale will-change-[filter,opacity]"
                  loading="lazy"
                />
              </article>
            ))}
          </div>

          <div className="px-5 sm:px-7 lg:px-8 pt-2">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-oksap-silver font-bold mb-3">Contracted by the Best IT Companies</p>
          </div>
          <div ref={itTrackRef} className="flex w-max items-center gap-4 sm:gap-5 lg:gap-6 pr-6 will-change-transform">
            {itMarqueeLogos.map((logo, index) => (
              <article
                key={`it-${logo.id}-${index}`}
                className="clients-logo-card flex h-[6.7rem] w-[10rem] sm:h-[7.2rem] sm:w-[11.5rem] lg:h-[8.1rem] lg:w-[13rem] items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.12)] transform-gpu will-change-transform"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="clients-logo-image max-h-full max-w-full object-contain opacity-[0.8] grayscale will-change-[filter,opacity]"
                  loading="lazy"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
