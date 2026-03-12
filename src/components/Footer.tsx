import React, { useEffect, useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { Icons } from './Icons';
import { COMPANY_INFO } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const getSocialUrl = (id: string) => COMPANY_INFO.socials.find((s: any) => s.id === id)?.url || '#';

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      const heroHeight = heroSection?.offsetHeight ?? window.innerHeight;
      setShowScrollTop(window.scrollY > heroHeight - 120);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="bg-black text-oksap-navy border-t border-oksap-navy/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] text-oksap-silver font-bold mb-3">OKSAP</p>
            <h3 className="text-3xl font-bold mb-4 text-oksap-navy">
              {COMPANY_INFO.name.split(' ')[0]}
            </h3>
            <p className="text-oksap-accent leading-relaxed mb-6 max-w-xl">
              {COMPANY_INFO.description}
            </p>
            <div className="flex gap-4">
              {/* Website */}
              <a
                href={COMPANY_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-oksap-navy/40 hover:bg-oksap-primary/20 rounded-full flex items-center justify-center text-oksap-navy transition-all hover:shadow-lg"
              >
                <Icons.Globe size={18} />
              </a>
              {/* LinkedIn */}
              <a
                href={getSocialUrl('linkedin')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-oksap-navy/40 hover:bg-oksap-primary/20 rounded-full flex items-center justify-center text-oksap-navy transition-all hover:shadow-lg"
              >
                <Icons.Linkedin size={18} />
              </a>
              {/* Instagram */}
              <a
                href={getSocialUrl('instagram')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-oksap-navy/40 hover:bg-oksap-primary/20 rounded-full flex items-center justify-center text-oksap-navy transition-all hover:shadow-lg"
              >
                <Icons.Instagram size={18} />
              </a>
              {/* TikTok */}
              <a
                href={getSocialUrl('tiktok')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-oksap-navy/40 hover:bg-oksap-primary/20 rounded-full flex items-center justify-center text-oksap-navy transition-all hover:shadow-lg"
              >
                <Icons.TikTok size={18} />
              </a>
              {/* X (Twitter) */}
              <a
                href={getSocialUrl('x')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-oksap-navy/40 hover:bg-oksap-primary/20 rounded-full flex items-center justify-center text-oksap-navy transition-all hover:shadow-lg"
              >
                <Icons.XIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-oksap-navy">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#hero" className="text-oksap-accent hover:text-oksap-navy transition-colors font-medium">Inicio</a></li>
              <li><a href="#services" className="text-oksap-accent hover:text-oksap-navy transition-colors font-medium">Servicios</a></li>
              <li><a href="#portfolio" className="text-oksap-accent hover:text-oksap-navy transition-colors font-medium">Proyectos</a></li>
              <li><a href="#about" className="text-oksap-accent hover:text-oksap-navy transition-colors font-medium">Nosotros</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-oksap-navy">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={20} className="flex-shrink-0 mt-1 text-oksap-navy" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-oksap-accent hover:text-oksap-navy transition-colors break-all">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-oksap-navy" />
                <span className="text-oksap-accent">{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-oksap-navy/25"></div>

        {/* Bottom Info */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-oksap-accent text-sm">
            © {currentYear} {COMPANY_INFO.name}. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-oksap-accent hover:text-oksap-navy transition-colors">
              Política de Privacidad
            </a>
            <a href="#" className="text-oksap-accent hover:text-oksap-navy transition-colors">
              Términos de Servicio
            </a>
            <a href="#" className="text-oksap-accent hover:text-oksap-navy transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-oksap-silver text-white flex items-center justify-center hover:shadow-xl transition-all font-bold hover:scale-110"
          aria-label="Subir al inicio"
        >
          ↑
        </button>
      )}
    </footer>
  );
};

export default Footer;
