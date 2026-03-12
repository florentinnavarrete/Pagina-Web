import React, { useEffect, useMemo, useState } from 'react';
import { Award, Briefcase, Users, TrendingUp } from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import AnimatedImage from './AnimatedImage';

const About: React.FC = () => {
  const aboutImageModules = import.meta.glob('../assets/nosotros/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    import: 'default',
  }) as Record<string, string>;

  const aboutImages = useMemo(
    () =>
      Object.keys(aboutImageModules)
        .sort()
        .map((path) => aboutImageModules[path]),
    [aboutImageModules]
  );

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (aboutImages.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % aboutImages.length);
    }, 3500);

    return () => {
      window.clearInterval(interval);
    };
  }, [aboutImages.length]);

  const achievements = [
    {
      icon: Award,
      label: 'Años de Experiencia',
      value: '10+',
      description: 'En consultoría SAP especializada'
    },
    {
      icon: Users,
      label: 'Clientes Satisfechos',
      value: '50+',
      description: 'Empresas en diversos sectores'
    },
    {
      icon: TrendingUp,
      label: 'Proyectos Exitosos',
      value: '100+',
      description: 'Implementaciones completadas'
    },
    {
      icon: Briefcase,
      label: 'Especialidades',
      value: '5+',
      description: 'Áreas de consultoría'
    }
  ];

  return (
    <section id="about" className="py-24 px-4 bg-oksap-light section-shell">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 md:mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-oksap-silver font-bold mb-3">Sobre nosotros</p>
          <h2 className="text-4xl md:text-5xl font-bold text-oksap-navy mb-4 leading-tight">
            Sobre Nosotros
          </h2>
          <div className="w-24 h-1 bg-oksap-silver mb-5 rounded-full"></div>
          <p className="text-oksap-accent text-lg">
            Consultoría especializada en SAP HR con foco en impacto operativo y cumplimiento local.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div>
            <h3 className="text-3xl font-bold text-oksap-navy mb-6">
              Líderes en Consultoría SAP HR
            </h3>
            <p className="text-oksap-accent text-lg leading-relaxed mb-6">
              {COMPANY_INFO.description}
            </p>
            <p className="text-oksap-accent text-lg leading-relaxed mb-8">
              Nuestra misión es ser referentes en soluciones SAP HR, proporcionando expertise senior y conocimiento profundo de los requisitos legales españoles. Transformamos la gestión de recursos humanos de nuestros clientes.
            </p>
            
            {/* Key Points */}
            <div className="space-y-4 mb-8">
              {[
                'Especialización en SAP HR y Success Factors',
                'Experiencia con legislación española',
                'Implementaciones personalizadas',
                'Soporte continuo post-implementación'
              ].map((point, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-oksap-silver mt-2 flex-shrink-0"></div>
                  <p className="text-oksap-accent font-medium">{point}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="px-8 py-3 bg-oksap-silver text-black rounded-full font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
              Conocer Más
            </button>
          </div>

          {/* Visual Element */}
          <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-oksap-silver/20 rounded-3xl blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-oksap-navy/10 rounded-3xl blur-2xl"></div>
            
            <div className="relative bg-oksap-primary/20 rounded-3xl p-12 border border-oksap-silver/70">
              <div className="aspect-square bg-oksap-dark rounded-2xl flex items-center justify-center">
                {aboutImages.length > 0 ? (
                  <AnimatedImage
                    key={aboutImages[activeImage]}
                    src={aboutImages[activeImage]}
                    alt="Imagen de Sobre Nosotros"
                    className="w-full h-full"
                    imageClassName="object-cover"
                    roundedClassName="rounded-2xl"
                  />
                ) : (
                  <div className="text-center px-4">
                    <p className="text-3xl font-black text-white mb-2">Carrusel</p>
                    <p className="text-sm text-white/80 font-semibold">Agrega imágenes en src/assets/nosotros</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, idx) => {
            const Icon = achievement.icon;
            return (
              <div
                key={idx}
                className="bg-oksap-primary/15 rounded-2xl p-6 border border-oksap-navy/20 hover:border-oksap-silver hover:shadow-xl transition-all text-center group hover:scale-105"
              >
                <div className="w-12 h-12 rounded-lg bg-oksap-primary/20 group-hover:bg-oksap-silver flex items-center justify-center text-oksap-navy group-hover:text-white mx-auto mb-4 transition-all">
                  <Icon size={24} />
                </div>
                <p className="text-3xl font-black text-oksap-navy mb-2">{achievement.value}</p>
                <p className="text-sm font-bold text-oksap-accent mb-2">{achievement.label}</p>
                <p className="text-xs text-oksap-accent">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
