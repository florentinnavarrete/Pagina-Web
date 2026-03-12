import React, { useEffect, useMemo, useState } from 'react';

interface ProjectItem {
  id: number;
  src: string;
  alt: string;
}

interface ProjectsCarouselProps {
  title: string;
  items: ProjectItem[];
  delay?: number;
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ title, items, delay = 3600 }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const logoOrangeFilter = 'brightness(0) saturate(100%) invert(49%) sepia(48%) saturate(1145%) hue-rotate(341deg) brightness(94%) contrast(86%)';

  const carouselItems = useMemo(() => {
    if (items.length === 0) {
      return [];
    }

    return [...items, ...items.slice(0, visibleCount)];
  }, [items, visibleCount]);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(6);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    setActiveSlide(0);
    setIsTransitionEnabled(true);
  }, [visibleCount, items.length]);

  useEffect(() => {
    if (items.length <= visibleCount || isPaused) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => currentSlide + 1);
    }, delay);

    return () => {
      window.clearInterval(interval);
    };
  }, [items.length, visibleCount, delay, isPaused]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      const frame = window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }
  }, [isTransitionEnabled]);

  const handleTrackTransitionEnd = () => {
    if (activeSlide >= items.length) {
      setIsTransitionEnabled(false);
      setActiveSlide(0);
    }
  };

  return (
    <div
      className="bg-oksap-primary/15 rounded-3xl border border-oksap-navy/20 p-6 md:p-8 shadow-md"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="text-left mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-oksap-navy mb-3">{title}</h3>
        <div className="w-10 h-1 bg-oksap-silver rounded-full"></div>
      </div>

      <div className="overflow-hidden">
        <div
          className={`flex ${isTransitionEnabled ? 'transition-transform duration-700 ease-in-out' : 'transition-none'}`}
          style={{ transform: `translateX(-${(activeSlide * 100) / visibleCount}%)` }}
          onTransitionEnd={handleTrackTransitionEnd}
        >
          {carouselItems.map((project, index) => (
            <article key={`${project.id}-${index}`} className="group w-1/2 md:w-1/3 lg:w-1/6 flex-shrink-0 px-3 py-5 text-center">
              <div className="h-20 md:h-24 flex items-center justify-center overflow-hidden transition-transform duration-300 ease-out group-hover:scale-125">
                <img
                  src={project.src}
                  alt={project.alt}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: logoOrangeFilter }}
                  loading="lazy"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const clientLogoModules = import.meta.glob('../assets/Clients/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const itLogoModules = import.meta.glob('../assets/IT/*.png', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const implementedProjects: ProjectItem[] = Object.keys(clientLogoModules)
    .sort()
    .map((path, index) => ({
      id: index + 1,
      src: clientLogoModules[path],
      alt: `Logo cliente ${index + 1}`,
    }));

  const partnerProjects: ProjectItem[] = Object.keys(itLogoModules)
    .sort()
    .map((path, index) => ({
      id: index + 101,
      src: itLogoModules[path],
      alt: `Logo IT ${index + 1}`,
    }));

  return (
    <section id="portfolio" className="py-24 px-4 bg-oksap-light section-shell">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-oksap-silver font-bold mb-3">Clientes y partners</p>
          <h2 className="text-4xl md:text-5xl font-bold text-oksap-navy mb-4 leading-tight">
            Confianza construida en proyectos reales
          </h2>
          <p className="text-oksap-accent text-lg">
            Compañías con las que colaboramos y ecosistema tecnológico con el que entregamos valor.
          </p>
        </div>
        <div className="space-y-10">
          <ProjectsCarousel title="Our Clients" items={implementedProjects} delay={5600} />
          <ProjectsCarousel title="Contracted by the best IT companies." items={partnerProjects} delay={6200} />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
