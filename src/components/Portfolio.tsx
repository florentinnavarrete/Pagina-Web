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
  const marquee1Ref = useRef<HTMLDivElement | null>(null);
  const marquee2Ref = useRef<HTMLDivElement | null>(null);

  const clientLogoModules = import.meta.glob('../assets/Clients/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const clientLogos: LogoItem[] = useMemo(
    () =>
      Object.keys(clientLogoModules)
        .sort()
        .map((path, index) => ({
          id: index + 1,
          src: clientLogoModules[path],
          alt: `Client logo ${index + 1}`,
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
          alt: `IT company logo ${index + 1}`,
        })),
    [itLogoModules],
  );

  const clientMarqueeLogos = useMemo(() => [...clientLogos, ...clientLogos], [clientLogos]);
  const itMarqueeLogos = useMemo(() => [...itLogos, ...itLogos], [itLogos]);

  useGSAP(
    () => {
      const marquee1 = marquee1Ref.current;
      const marquee2 = marquee2Ref.current;
      if (!marquee1 || !marquee2) return;

      // Animación infinita del carrusel 1 (izquierda).
      const tween1 = gsap.to(marquee1, {
        xPercent: -50,
        duration: 28,
        repeat: -1,
        ease: 'none',
        force3D: true,
      });

      // Animación infinita del carrusel 2 (derecha).
      const tween2 = gsap.fromTo(
        marquee2,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 26,
          repeat: -1,
          ease: 'none',
          force3D: true,
        },
      );

      // Pausa suave por hover por carrusel (sin afectar títulos ni layout).
      const pause1 = () => gsap.to(tween1, { timeScale: 0, duration: 0.35, ease: 'power2.out' });
      const play1 = () => gsap.to(tween1, { timeScale: 1, duration: 0.35, ease: 'power2.out' });
      const pause2 = () => gsap.to(tween2, { timeScale: 0, duration: 0.35, ease: 'power2.out' });
      const play2 = () => gsap.to(tween2, { timeScale: 1, duration: 0.35, ease: 'power2.out' });

      marquee1.addEventListener('pointerenter', pause1);
      marquee1.addEventListener('pointerleave', play1);
      marquee2.addEventListener('pointerenter', pause2);
      marquee2.addEventListener('pointerleave', play2);

      // Hover limpio sin flicker: sólo clases CSS, sin tweens de color en GSAP.
      const hoverListeners: Array<{ card: HTMLElement; enter: () => void; leave: () => void }> = [];

      const wireCarouselHover = (marquee: HTMLDivElement) => {
        const cards = Array.from(marquee.querySelectorAll<HTMLElement>('.clients-logo-card'));

        cards.forEach((card) => {
          const enter = () => {
            marquee.classList.add('clients-track-hover');
            cards.forEach((c) => c.classList.remove('is-active'));
            card.classList.add('is-active');
          };

          const leave = () => {
            card.classList.remove('is-active');
            if (!marquee.querySelector('.clients-logo-card.is-active')) {
              marquee.classList.remove('clients-track-hover');
            }
          };

          card.addEventListener('pointerenter', enter);
          card.addEventListener('pointerleave', leave);
          hoverListeners.push({ card, enter, leave });
        });
      };

      wireCarouselHover(marquee1);
      wireCarouselHover(marquee2);

      return () => {
        marquee1.removeEventListener('pointerenter', pause1);
        marquee1.removeEventListener('pointerleave', play1);
        marquee2.removeEventListener('pointerenter', pause2);
        marquee2.removeEventListener('pointerleave', play2);
        marquee1.classList.remove('clients-track-hover');
        marquee2.classList.remove('clients-track-hover');
        hoverListeners.forEach(({ card, enter, leave }) => {
          card.classList.remove('is-active');
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
            Confianza que se traduce
            <br />
            en resultados reales
          </h2>
          <p className="text-oksap-accent text-lg sm:text-xl max-w-2xl leading-relaxed">
            Aquí mostramos la red que impulsa nuestro trabajo: clientes que confían en OKSAP y compañías IT de referencia con las que colaboramos en proyectos SAP HR.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-md py-8 sm:py-10 lg:py-12 space-y-8 sm:space-y-10">
          <div className="px-5 sm:px-7 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-oksap-silver font-bold">Our Clients</p>
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-oksap-silver/80"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-oksap-silver/55"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-oksap-silver/35"></span>
              </div>
            </div>

            {/* Máscara estática: sólo se mueve la fila interna de logos. */}
            <div className="overflow-hidden">
              <div
                ref={marquee1Ref}
                className="clients-marquee-track marquee-1 flex w-max items-center gap-4 sm:gap-5 lg:gap-6 pr-6 will-change-transform"
                style={{ whiteSpace: 'nowrap' }}
              >
                {clientMarqueeLogos.map((logo, index) => (
                  <article
                    key={`${logo.id}-${index}`}
                    className="clients-logo-card relative inline-flex h-[6.7rem] w-[10rem] sm:h-[7.2rem] sm:w-[11.5rem] lg:h-[8.1rem] lg:w-[13rem] items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.12)] transform-gpu will-change-transform"
                  >
                    <span className="clients-logo-glow pointer-events-none absolute inset-0 rounded-[1.2rem] opacity-0 bg-oksap-silver/55 mix-blend-screen" aria-hidden="true" />
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="clients-logo-image max-h-full max-w-full object-contain opacity-[0.84] grayscale transition-[filter,opacity] duration-300"
                      loading="lazy"
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-7 lg:px-8">
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-oksap-silver font-bold">Contracted by the Best IT Companies</p>
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-oksap-silver/80"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-oksap-silver/55"></span>
                <span className="h-1.5 w-1.5 rounded-full bg-oksap-silver/35"></span>
              </div>
            </div>

            {/* Máscara estática: sólo se mueve la fila interna de logos. */}
            <div className="overflow-hidden">
              <div
                ref={marquee2Ref}
                className="clients-marquee-track marquee-2 flex w-max items-center gap-4 sm:gap-5 lg:gap-6 pr-6 will-change-transform"
                style={{ whiteSpace: 'nowrap' }}
              >
                {itMarqueeLogos.map((logo, index) => (
                  <article
                    key={`it-${logo.id}-${index}`}
                    className="clients-logo-card relative inline-flex h-[6.7rem] w-[10rem] sm:h-[7.2rem] sm:w-[11.5rem] lg:h-[8.1rem] lg:w-[13rem] items-center justify-center rounded-[1.2rem] border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.12)] transform-gpu will-change-transform"
                  >
                    <span className="clients-logo-glow pointer-events-none absolute inset-0 rounded-[1.2rem] opacity-0 bg-oksap-silver/55 mix-blend-screen" aria-hidden="true" />
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="clients-logo-image max-h-full max-w-full object-contain opacity-[0.84] grayscale transition-[filter,opacity] duration-300"
                      loading="lazy"
                    />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
