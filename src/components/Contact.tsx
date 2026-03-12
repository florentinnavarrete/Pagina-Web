
import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Icons } from './Icons';
import { COMPANY_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-oksap-light section-shell relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-oksap-silver/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-oksap-dark/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-oksap-navy/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 md:mb-16 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-oksap-silver font-bold mb-3">Contacto</p>
          <h2 className="text-4xl md:text-5xl font-bold text-oksap-navy mb-4 leading-tight">
            Contáctanos
          </h2>
          <div className="w-24 h-1 bg-oksap-silver mb-5 rounded-full"></div>
          <p className="text-oksap-accent text-lg max-w-2xl">
            Estamos disponibles para escuchar sobre nuevas oportunidades y proyectos de consultoría
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="bg-oksap-primary/15 rounded-xl p-8 shadow-md border border-oksap-navy/20 hover:border-oksap-silver/60 hover:shadow-lg transition-all border-t-4 border-t-oksap-silver ignite-hover">
              <div className="w-14 h-14 rounded-lg bg-oksap-silver/20 flex items-center justify-center mb-4">
                <Mail className="text-oksap-navy" size={28} />
              </div>
              <h3 className="text-lg font-bold text-oksap-navy mb-2">Email</h3>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="text-oksap-accent hover:text-oksap-navy transition-colors break-all font-medium"
              >
                {COMPANY_INFO.email}
              </a>
            </div>

            {/* Location */}
            <div className="bg-oksap-primary/15 rounded-xl p-8 shadow-md border border-oksap-navy/20 hover:border-oksap-silver/60 hover:shadow-lg transition-all border-t-4 border-t-oksap-silver ignite-hover">
              <div className="w-14 h-14 rounded-lg bg-oksap-silver/20 flex items-center justify-center mb-4">
                <MapPin className="text-oksap-navy" size={28} />
              </div>
              <h3 className="text-lg font-bold text-oksap-navy mb-2">Ubicación</h3>
              <p className="text-oksap-accent">{COMPANY_INFO.address}</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 bg-oksap-primary/15 rounded-xl p-8 shadow-md border border-oksap-navy/20 border-t-4 border-t-oksap-silver">
            {submitted && (
              <div className="mb-6 p-4 bg-oksap-silver/10 border border-oksap-navy rounded-lg flex items-center gap-3">
                <CheckCircle className="text-oksap-navy" size={24} />
                <p className="text-oksap-navy font-medium">¡Mensaje enviado correctamente! Te contactaremos pronto.</p>
              </div>
            )}

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-bold text-oksap-navy mb-2">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-oksap-primary/30 bg-oksap-light focus:border-oksap-navy focus:outline-none focus:ring-2 focus:ring-oksap-silver/30 transition-all"
                  placeholder="Tu nombre"
                  style={{ color: 'var(--oksap-accent-hex)' }}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-bold text-oksap-navy mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-oksap-primary/30 bg-oksap-light focus:border-oksap-navy focus:outline-none focus:ring-2 focus:ring-oksap-silver/30 transition-all"
                  placeholder="tu@email.com"
                  style={{ color: 'var(--oksap-accent-hex)' }}
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-bold text-oksap-navy mb-2">Mensaje</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-oksap-primary/30 bg-oksap-light focus:border-oksap-navy focus:outline-none focus:ring-2 focus:ring-oksap-silver/30 transition-all resize-none"
                  placeholder="Tu mensaje aquí..."
                  style={{ color: 'var(--oksap-accent-hex)' }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-8 py-4 bg-oksap-silver text-black rounded-full font-bold hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Enviar Mensaje
              </button>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-oksap-primary/30">
                <p className="text-sm font-bold text-oksap-navy mb-4 text-center">O conéctate con nosotros en:</p>
                <div className="grid grid-cols-5 gap-3">
                  {/* Website */}
                  <a
                    href={COMPANY_INFO.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-lg bg-oksap-navy text-white hover:shadow-lg hover:-translate-y-1 transition-all flame-glow-hover"
                    title="Sitio Web"
                  >
                    <Icons.Globe size={20} />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={COMPANY_INFO.socials.find((s: any) => s.id === 'linkedin')?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-lg bg-[#0A66C2] text-white hover:shadow-lg hover:-translate-y-1 transition-all flame-glow-hover"
                    title="LinkedIn"
                  >
                    <Icons.Linkedin size={20} />
                  </a>

                  {/* Instagram */}
                  <a
                    href={COMPANY_INFO.socials.find((s: any) => s.id === 'instagram')?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:shadow-lg hover:-translate-y-1 transition-all"
                    title="Instagram"
                  >
                    <Icons.Instagram size={20} />
                  </a>

                  {/* TikTok */}
                  <a
                    href={COMPANY_INFO.socials.find((s: any) => s.id === 'tiktok')?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-black to-pink-500 text-white hover:shadow-lg hover:-translate-y-1 transition-all"
                    title="TikTok"
                  >
                    <Icons.TikTok size={20} />
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href={COMPANY_INFO.socials.find((s: any) => s.id === 'x')?.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-br from-gray-900 to-black text-white hover:shadow-lg hover:-translate-y-1 transition-all"
                    title="X"
                  >
                    <Icons.XIcon size={20} />
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;