
import React, { useState } from 'react';
import ShareModal from './ShareModal';
import { Icons } from './Icons';
import { COMPANY_INFO } from '../constants';
import { Download, Share2, ArrowRight } from 'lucide-react';
import testImage from '../assets/test.png';

const Hero: React.FC = () => {
  const generateVCardData = () => {
    return `BEGIN:VCARD\r\n` +
      `VERSION:3.0\r\n` +
      `FN:${COMPANY_INFO.name}\r\n` +
      `ORG:${COMPANY_INFO.name}\r\n` +
      `TITLE:${COMPANY_INFO.role}\r\n` +
      (COMPANY_INFO.phone ? `TEL;TYPE=WORK,VOICE:${COMPANY_INFO.phone}\r\n` : '') +
      `EMAIL:${COMPANY_INFO.email}\r\n` +
      `URL:${COMPANY_INFO.website}\r\n` +
      `ADR;TYPE=WORK:;;${COMPANY_INFO.address}\r\n` +
      `NOTE:${COMPANY_INFO.tagline}\r\n` +
      `END:VCARD`;
  };

  const handleSaveContact = () => {
    const vCardData = generateVCardData();
    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "oksap_contact.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleShare = async () => {
    const canNativeShare = typeof navigator !== 'undefined' && 'share' in navigator;
    if (canNativeShare) {
      try {
        await (navigator as any).share({
          title: COMPANY_INFO.name,
          text: `${COMPANY_INFO.name} - Echa un vistazo: ${COMPANY_INFO.website}`,
          url: COMPANY_INFO.website
        });
      } catch (err: any) {
        if (err && err.name !== 'AbortError') {
          setShareModalOpen(true);
        }
      }
    } else {
      setShareModalOpen(true);
    }
  };

  return (
    <section id="hero" className="pt-32 pb-24 px-4 bg-oksap-light hero-pattern relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-oksap-silver/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-oksap-dark/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-oksap-navy/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center px-4 py-1.5 rounded-full border border-oksap-navy/30 text-oksap-silver text-xs uppercase tracking-[0.18em] font-bold mb-6">
              Consultoría SAP HR en España
            </p>
            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-oksap-navy mb-5 leading-[0.95]">
              {COMPANY_INFO.name}
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl font-bold text-oksap-accent mb-5">
              {COMPANY_INFO.role}
            </p>

            {/* Divider */}
            <div className="h-1.5 w-28 bg-oksap-silver rounded-full mb-7 lg:ml-0 mx-auto"></div>

            {/* Description */}
            <p className="text-lg text-oksap-navy mb-9 leading-relaxed max-w-xl">
              {COMPANY_INFO.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <button
                onClick={handleSaveContact}
                className="px-8 py-3 border-2 border-oksap-silver bg-oksap-silver text-black rounded-full font-bold hover:bg-oksap-silver/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-oksap-silver/20"
              >
                <Download size={20} />
                Guardar Contacto
              </button>
              <button
                onClick={handleShare}
                className="px-8 py-3 border-2 border-oksap-silver bg-oksap-silver text-black rounded-full font-bold hover:bg-oksap-silver/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-oksap-silver/20"
              >
                <Share2 size={20} />
                Compartir
              </button>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-3 justify-center lg:justify-start">
              {/* Website */}
              <a
                href={COMPANY_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-oksap-navy text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all flame-glow-hover"
                title="Sitio Web"
              >
                <Icons.Globe size={22} />
              </a>

              {/* LinkedIn */}
              <a
                href={COMPANY_INFO.socials.find((s: any) => s.id === 'linkedin')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all flame-glow-hover"
                title="LinkedIn"
              >
                <Icons.Linkedin size={22} />
              </a>

              {/* Instagram */}
              <a
                href={COMPANY_INFO.socials.find((s: any) => s.id === 'instagram')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all"
                title="Instagram"
              >
                <Icons.Instagram size={22} />
              </a>

              {/* TikTok */}
              <a
                href={COMPANY_INFO.socials.find((s: any) => s.id === 'tiktok')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-pink-500 text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all"
                title="TikTok"
              >
                <Icons.TikTok size={22} />
              </a>

              {/* X (Twitter) */}
              <a
                href={COMPANY_INFO.socials.find((s: any) => s.id === 'x')?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-black text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all"
                title="X"
              >
                <Icons.XIcon size={22} />
              </a>
            </div>
          </div>

          {/* Right Content - Company Card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-oksap-silver/20 rounded-3xl blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-oksap-primary/40 rounded-3xl blur-2xl"></div>

              {/* Main Card */}
              <div className="relative bg-oksap-primary/15 rounded-3xl p-8 xl:p-10 shadow-2xl border border-oksap-navy/20">
                <div className="mb-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-oksap-silver font-bold mb-4">Perfil corporativo</p>
                  <div className="w-24 h-24 mb-6 rounded-2xl overflow-hidden">
                    <img src={testImage} alt="OKSAP" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-bold text-oksap-accent mb-2">{COMPANY_INFO.name}</h3>
                  <p className="text-oksap-navy font-semibold mb-4">{COMPANY_INFO.tagline}</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-oksap-dark/20">
                  <div className="text-center">
                    <p className="text-3xl font-black text-oksap-silver">10+</p>
                    <p className="text-xs text-oksap-navy font-medium mt-1">Años Exp.</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-oksap-silver">50+</p>
                    <p className="text-xs text-oksap-navy font-medium mt-1">Clientes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-oksap-silver">100%</p>
                    <p className="text-xs text-oksap-navy font-medium mt-1">Calidad</p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 text-sm text-oksap-navy">
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-oksap-silver flex-shrink-0" />
                    Especialistas en SAP HR
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-oksap-silver flex-shrink-0" />
                    Soluciones Personalizadas
                  </li>
                  <li className="flex items-center gap-2">
                    <ArrowRight size={16} className="text-oksap-silver flex-shrink-0" />
                    Soporte 24/7
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Company Card */}
        <div className="lg:hidden mt-12">
          <div className="bg-oksap-primary/15 rounded-3xl p-6 shadow-xl border border-oksap-navy/20 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
              <img src={testImage} alt="OKSAP" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div>
                <p className="text-2xl font-black text-oksap-silver">10+</p>
                <p className="text-xs text-oksap-navy font-medium">Años</p>
              </div>
              <div>
                <p className="text-2xl font-black text-oksap-silver">50+</p>
                <p className="text-xs text-oksap-navy font-medium">Clientes</p>
              </div>
              <div>
                <p className="text-2xl font-black text-oksap-silver">100%</p>
                <p className="text-xs text-oksap-navy font-medium">Calidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} url={COMPANY_INFO.website} title={COMPANY_INFO.name} />
    </section>
  );
};

export default Hero;
