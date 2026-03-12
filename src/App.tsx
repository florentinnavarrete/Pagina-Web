import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Instagram, Twitter, Mail, Globe, Menu, X } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { COMPANY_INFO } from './constants';
import logoImage from './assets/logo.png';
import CreativeSection from './components/CreativeSection';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import useSmoothScroll from './hooks/useSmoothScroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

type Locale = 'es' | 'en';

type NavItem = {
  label: string;
  type: 'anchor' | 'external' | 'static';
  target?: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', type: 'anchor', target: 'home' },
  { label: 'AI Videos', type: 'static' },
  { label: 'Blog', type: 'external', target: COMPANY_INFO.blog },
  { label: 'About Us', type: 'static' },
  { label: 'Contacta', type: 'anchor', target: 'contact' },
];

const App: React.FC = () => {
  const cursorTrailRef = useRef<HTMLDivElement | null>(null);
  const cursorTrailFadeTimeoutRef = useRef<number | null>(null);
  const cursorTrailRafRef = useRef<number | null>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const headerLogoButtonRef = useRef<HTMLButtonElement | null>(null);
  const heroLogoSlotRef = useRef<HTMLDivElement | null>(null);
  const heroLogoOverlayRef = useRef<HTMLImageElement | null>(null);

  const lenisRef = useSmoothScroll();

  const [orbitStep, setOrbitStep] = useState(0);
  const [locale, setLocale] = useState<Locale>('es');
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(section, { offset: -24 });
        return;
      }

      section.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
  };

  const handleNavItem = (item: NavItem) => {
    if (item.type === 'anchor' && item.target) {
      scrollToSection(item.target);
    }

    if (item.type === 'external' && item.target) {
      window.open(item.target, '_blank', 'noopener,noreferrer');
      setMenuOpen(false);
    }
  };

  const interstitialText = locale === 'es'
    ? 'Especialistas en soluciones SAP HR con experiencia senior en requisitos legales españoles. SuccessFactors, SAP HCM, Nómina Española.'
    : 'SAP HR solution specialists with senior experience in Spanish legal requirements. SuccessFactors, SAP HCM, Spanish Payroll.';

  const contactCopy = locale === 'es'
    ? {
      description: 'Ya sea para planificar crecimiento, explorar nuevas oportunidades o impulsar tu operación de SAP HR, nuestro equipo está listo para ayudarte.',
      sectionTitle: 'Conecta con nosotros',
      subtitle: 'Síguenos en nuestras redes sociales y contáctanos para conocer cómo podemos ayudarte.',
      website: 'Web',
      address: 'Dirección',
      connect: 'Conecta',
    }
    : {
      description: 'Whether you are planning growth, exploring new opportunities, or scaling your SAP HR operations, our team is ready to help.',
      sectionTitle: 'Get in Touch',
      subtitle: 'Follow us on social media and reach out to learn how we can help you.',
      website: 'Website',
      address: 'Address',
      connect: 'Connect',
    };

  const orbitIconItems: Array<{ id: string; label: string; Icon: React.ComponentType<{ size?: number; className?: string }> }> = [
    { id: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
    { id: 'instagram', label: 'Instagram', Icon: Instagram },
    { id: 'twitter', label: 'X', Icon: Twitter },
    { id: 'tiktok', label: 'TikTok', Icon: SiTiktok },
    { id: 'email', label: 'Email', Icon: Mail },
    { id: 'web', label: locale === 'es' ? 'Web' : 'Website', Icon: Globe }
  ];
  const orbitPositions = ['top', 'left', 'right'] as const;
  const activeOrbitCircleIndex = orbitStep % orbitPositions.length;
  const activeOrbitItem = orbitIconItems[orbitStep % orbitIconItems.length];

  const purposeContent = locale === 'es'
    ? {
      eyebrow: 'Nuestros pilares',
      title: 'Misión, visión y valores',
      subtitle: 'Construimos una consultoría SAP HR de alto rendimiento, con foco real en negocio, personas y cumplimiento legal en España.',
      cards: [
        {
          title: 'Misión',
          text: COMPANY_INFO.mission,
        },
        {
          title: 'Visión',
          text: COMPANY_INFO.vision,
        },
        {
          title: 'Valores',
          text: COMPANY_INFO.values,
        },
      ],
    }
    : {
      eyebrow: 'Core principles',
      title: 'Mission, vision and values',
      subtitle: 'We build a high-performance SAP HR consultancy focused on business impact, people growth, and Spanish legal compliance.',
      cards: [
        {
          title: 'Mission',
          text: 'To become the preferred destination for professionals seeking continuous growth in SAP HR and delivering additional value to clients.',
        },
        {
          title: 'Vision',
          text: 'To build exceptional teams and enhance their performance in SAP consulting, constantly raising their level of expertise.',
        },
        {
          title: 'Values',
          text: 'Deep specialization in SAP HR solutions with senior expertise in Spanish legal requirements and operational excellence.',
        },
      ],
    };

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      const heroLogoSlot = heroLogoSlotRef.current;
      const heroLogoOverlay = heroLogoOverlayRef.current;
      const headerLogoButton = headerLogoButtonRef.current;
      const heroSection = heroSectionRef.current;

      let heroRect = { left: 0, top: 0, width: 0, height: 0 };
      let headerRect = { left: 0, top: 0, width: 0, height: 0 };

      const measureLogos = () => {
        if (!heroLogoSlot || !headerLogoButton) return;
        const heroBounds = heroLogoSlot.getBoundingClientRect();
        const headerBounds = headerLogoButton.getBoundingClientRect();
        heroRect = {
          left: heroBounds.left,
          top: heroBounds.top,
          width: heroBounds.width,
          height: heroBounds.height,
        };
        headerRect = {
          left: headerBounds.left,
          top: headerBounds.top,
          width: headerBounds.width,
          height: headerBounds.height,
        };
      };

      const setLogoToHero = () => {
        if (!heroLogoOverlay) return;
        gsap.set(heroLogoOverlay, {
          x: heroRect.left,
          y: heroRect.top,
          width: heroRect.width,
          height: heroRect.height,
          autoAlpha: 1,
          opacity: 1,
          scale: 1,
          force3D: true,
          transformOrigin: 'top left',
        });
      };

      tl.fromTo(
        '.hero-modern-orb',
        { opacity: 0, scale: 0.84, y: 30, force3D: true },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.12, force3D: true },
      ).fromTo(
        '.hero-modern-item',
        { y: 56, opacity: 0, force3D: true },
        { y: 0, opacity: 1, duration: 1.05, stagger: 0.14, force3D: true },
        '-=0.9',
      );

      if (heroLogoSlot && heroLogoOverlay && headerLogoButton && heroSection) {
        measureLogos();
        setLogoToHero();
        gsap.set(headerLogoButton, { autoAlpha: 0, force3D: true });

        const logoTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top+=88',
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });

        logoTimeline
          .to(heroLogoOverlay, {
            x: () => headerRect.left,
            y: () => headerRect.top,
            scale: () => headerRect.width / heroRect.width,
            opacity: 0.92,
            ease: 'expo.out',
            force3D: true,
          }, 0)
          .to(heroLogoOverlay, {
            opacity: 0,
            ease: 'power4.out',
            force3D: true,
          }, 0.84)
          .to(headerLogoButton, {
            autoAlpha: 1,
            ease: 'power4.out',
            force3D: true,
          }, 0.7);

        const refreshLogoMetrics = () => {
          measureLogos();
          setLogoToHero();
        };

        ScrollTrigger.addEventListener('refreshInit', refreshLogoMetrics);

        return () => {
          ScrollTrigger.removeEventListener('refreshInit', refreshLogoMetrics);
        };
      }
    },
    { scope: heroSectionRef },
  );

  useEffect(() => {
    const trailNode = cursorTrailRef.current;
    if (!trailNode) return;

    const renderTrail = () => {
      const { x, y } = cursorTargetRef.current;
      trailNode.style.transform = `translate3d(${x - 32}px, ${y - 32}px, 0)`;
      cursorTrailRafRef.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorTargetRef.current = { x: e.clientX, y: e.clientY };

      if (cursorTrailRafRef.current === null) {
        cursorTrailRafRef.current = window.requestAnimationFrame(renderTrail);
      }

      trailNode.style.opacity = '0.65';

      if (cursorTrailFadeTimeoutRef.current !== null) {
        window.clearTimeout(cursorTrailFadeTimeoutRef.current);
      }

      cursorTrailFadeTimeoutRef.current = window.setTimeout(() => {
        trailNode.style.opacity = '0';
      }, 260);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (cursorTrailFadeTimeoutRef.current !== null) {
        window.clearTimeout(cursorTrailFadeTimeoutRef.current);
      }

      if (cursorTrailRafRef.current !== null) {
        window.cancelAnimationFrame(cursorTrailRafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setOrbitStep((previous) => (previous + 1) % 6);
    }, 2300);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-oksap-light font-sans relative overflow-x-clip" style={{ cursor: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI2IiBzdHJva2U9IiNDQkVFRjMiIHN0cm9rZS13aWR0aD0iMS41IiBmaWxsPSJub25lIi8+PC9zdmc+) 12 12, auto' }}>
      <img
        ref={heroLogoOverlayRef}
        src={logoImage}
        alt="OKSAP transition"
        className="oksap-logo-transition fixed top-0 left-0 z-[135] pointer-events-none h-auto object-contain"
      />
      <div
        ref={cursorTrailRef}
        className="fixed w-16 h-16 rounded-full pointer-events-none z-40"
        style={{
          transform: 'translate3d(-999px, -999px, 0)',
          background: 'radial-gradient(circle, rgba(245, 167, 203, 0.34) 0%, rgba(245, 167, 203, 0.2) 48%, transparent 72%)',
          filter: 'blur(7px)',
          transition: 'opacity 0.22s linear',
          opacity: 0,
          pointerEvents: 'none',
          willChange: 'transform, opacity'
        }}
      />
      <div className="global-ambient-bg" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-[120] px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4">
        <div className="max-w-[1680px] mx-auto">
          <div className="flex items-center justify-between gap-4 px-1 sm:px-2 py-1">
            {/* Logo a la izquierda */}
            <button
              ref={headerLogoButtonRef}
              type="button"
              onClick={() => scrollToSection('home')}
              aria-label="OKSAP SPAIN"
              className="pointer-events-auto shrink-0"
            >
              <img src={logoImage} alt="OKSAP" className="h-9 sm:h-10 lg:h-10 w-auto object-contain transform-gpu will-change-transform" />
            </button>

            {/* Nav en el centro */}
            <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
              {NAV_ITEMS.map((item) => (
                item.type === 'static' ? (
                  <span
                    key={item.label}
                    className="text-sm font-semibold tracking-[0.08em] uppercase text-white/68 cursor-default"
                  >
                    {item.label}
                  </span>
                ) : (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavItem(item)}
                    className="text-sm font-semibold tracking-[0.08em] uppercase text-white/82 transition-colors hover:text-oksap-silver"
                  >
                    {item.label}
                  </button>
                )
              ))}
            </nav>

            {/* Lang toggle a la derecha */}
            <div className="flex items-center gap-2">
              <div className="lang-toggle pointer-events-auto" role="group" aria-label="Cambiar idioma">
                <button
                  type="button"
                  className={`lang-toggle-btn ${locale === 'es' ? 'is-active' : ''}`}
                  onClick={() => setLocale('es')}
                  aria-pressed={locale === 'es'}
                >
                  ES
                </button>
                <button
                  type="button"
                  className={`lang-toggle-btn ${locale === 'en' ? 'is-active' : ''}`}
                  onClick={() => setLocale('en')}
                  aria-pressed={locale === 'en'}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {menuOpen ? (
            <div className="lg:hidden px-4 sm:px-6 pb-4 border-t border-white/10">
              <div className="flex flex-col gap-2 pt-4">
                {NAV_ITEMS.map((item) => (
                  item.type === 'static' ? (
                    <span
                      key={item.label}
                      className="px-4 py-3 rounded-2xl border border-white/8 bg-white/5 text-white/64 font-semibold tracking-[0.05em] uppercase"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleNavItem(item)}
                      className="text-left px-4 py-3 rounded-2xl border border-white/8 bg-white/5 text-white/88 font-semibold tracking-[0.05em] uppercase transition-colors hover:bg-white/10"
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="home"
          ref={heroSectionRef}
          className="nfc-parallax relative px-3 sm:px-4 lg:px-6 bg-transparent overflow-hidden group"
          style={{ minHeight: '100svh', cursor: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI4IiBzdHJva2U9IiNDQkVFRjMiIHN0cm9rZS13aWR0aD0iMS41Ii8+PC9zdmc+) 16 16, auto', perspective: '1000px' }}
        >
          {/* Animated gradient background elements - más llamativos */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="hero-modern-orb absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-oksap-silver/15 blur-3xl" style={{animation: 'float-up 16s ease-in-out infinite'}} />
            <div className="hero-modern-orb absolute -bottom-1/3 -right-1/2 w-full h-full rounded-full bg-oksap-accent/12 blur-3xl" style={{animation: 'float-up 18s ease-in-out infinite 1s'}} />
            <div className="hero-modern-orb absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-oksap-silver/8 blur-3xl" style={{animation: 'float-up 20s ease-in-out infinite 2s'}} />
            <div className="hero-modern-orb absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-oksap-accent/6 blur-3xl" style={{animation: 'float-up 22s ease-in-out infinite 3s'}} />
          </div>

          <div className="max-w-[1680px] mx-auto sticky top-0 h-[100svh] overflow-hidden">
            <div className="h-full relative z-10 flex flex-col justify-between pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-10 lg:pb-12">
              {/* Texto superior derecha - más compacto con más espacios en bordes */}
              <div className="flex justify-end pr-8 sm:pr-12 lg:pr-16">
                <div className="max-w-sm">
                  <p className="hero-modern-item font-hero text-[clamp(0.9rem,3vw,1.4rem)] text-oksap-silver leading-snug text-left">
                    {locale === 'es' ? 'SuccessFactors, SAP HCM, Nómina Española' : 'SuccessFactors, SAP HCM, Spanish Payroll'}
                  </p>

                  <p
                    className="hero-modern-item mt-2 sm:mt-3 text-oksap-primary text-[0.85rem] sm:text-sm lg:text-base leading-tight text-left"
                  >
                    {interstitialText}
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-end flex-1 pb-6 sm:pb-8 lg:pb-10">
                <div ref={heroLogoSlotRef} className="w-[min(520px,88vw)] sm:w-[min(620px,78vw)] lg:w-[min(700px,62vw)] h-auto opacity-0">
                  <img
                    src={logoImage}
                    alt="OKSAP SPAIN"
                    className="hero-logo-primary w-full h-auto object-contain transform-gpu will-change-transform"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Separador inferior */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-oksap-silver/40 to-transparent" />
        </section>

        <CreativeSection
          eyebrow={purposeContent.eyebrow}
          title={purposeContent.title}
          stickyTitle={locale === 'es' ? 'Nuestra esencia' : 'Our core'}
          stickyText={purposeContent.subtitle}
          items={purposeContent.cards.map((card) => ({
            title: card.title,
            body: card.text,
          }))}
        />

        <Portfolio />

        <Services />

        <section id="contact" className="contact-section-center relative px-3 sm:px-4 lg:px-6 bg-oksap-background/40 nfc-parallax">
          <div className="max-w-[1680px] mx-auto w-full">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="font-hero text-4xl sm:text-5xl lg:text-6xl font-semibold text-oksap-navy mb-4 tracking-[0.01em]">
                {contactCopy.sectionTitle}
              </h2>
            </div>

            <div className="contact-showcase-grid max-w-6xl mx-auto">
              <div className="contact-showcase-copy">
                <p className="contact-showcase-description">
                  {contactCopy.description}
                </p>

                <div className="contact-showcase-line">
                  <span className="contact-showcase-line-label">Email</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="contact-showcase-line-value">{COMPANY_INFO.email}</a>
                </div>

                <div className="contact-showcase-line">
                  <span className="contact-showcase-line-label">{contactCopy.website}</span>
                  <a href={COMPANY_INFO.website} target="_blank" rel="noopener noreferrer" className="contact-showcase-line-value">
                    {COMPANY_INFO.website}
                  </a>
                </div>

                <div className="contact-showcase-line">
                  <span className="contact-showcase-line-label">{contactCopy.address}</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-showcase-line-value"
                  >
                    {COMPANY_INFO.address}
                  </a>
                </div>

                <div className="contact-showcase-line">
                  <span className="contact-showcase-line-label">{contactCopy.connect}</span>
                  <div className="contact-showcase-socials">
                    {COMPANY_INFO.socials.map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-showcase-social-link"
                      >
                        {social.id === 'x' ? 'X' : social.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="contact-orbit" aria-hidden="true">
                {orbitPositions.map((position, index) => {
                  const isActiveCircle = index === activeOrbitCircleIndex;
                  const ActiveIcon = activeOrbitItem.Icon;

                  return (
                    <div key={position} className={`contact-orbit-circle contact-orbit-circle--${position}`}>
                      {isActiveCircle ? (
                        <span key={`${position}-${activeOrbitItem.id}-${orbitStep}`} className="contact-orbit-rotating-icon" aria-hidden="true">
                          <ActiveIcon size={40} />
                        </span>
                      ) : null}
                      <span className="sr-only">{activeOrbitItem.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="contact-showcase-subtitle text-base sm:text-xl text-oksap-silver max-w-2xl mt-6 sm:mt-8 mx-auto text-center sm:text-left">
              {contactCopy.subtitle}
            </p>
          </div>
        </section>


      </main>

    </div>
  );
};

export default App;