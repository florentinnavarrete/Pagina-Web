
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  MapPin,
  ArrowUpRight,
  CheckCircle,
  Linkedin,
  Instagram,
  Twitter,
} from 'lucide-react';
import { COMPANY_INFO } from '../constants';
import './Contact.css';

type Locale = 'es' | 'en';

interface ContactProps {
  locale: Locale;
}

// ── Floating-label field ──────────────────────────────────────────────────────
interface FieldProps {
  id: string;
  label: string;
  type?: string;
  multiline?: boolean;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  type = 'text',
  multiline,
  required,
}) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const floatUp = () => {
    if (!labelRef.current) return;
    gsap.to(labelRef.current, {
      y: -22,
      scale: 0.74,
      color: 'rgba(203, 238, 243, 0.72)',
      duration: 0.28,
      ease: 'power2.out',
      transformOrigin: 'left center',
    });
  };

  const floatDown = (value: string) => {
    if (!labelRef.current || value) return;
    gsap.to(labelRef.current, {
      y: 0,
      scale: 1,
      color: 'rgba(255, 255, 255, 0.36)',
      duration: 0.28,
      ease: 'power2.out',
      transformOrigin: 'left center',
    });
  };

  return (
    <div className="contact-new__field contact-new__form-field">
      {multiline ? (
        <textarea
          id={id}
          name={id}
          required={required}
          rows={4}
          className="contact-new__textarea"
          onFocus={floatUp}
          onBlur={(e) => floatDown(e.target.value)}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          className="contact-new__input"
          onFocus={floatUp}
          onBlur={(e) => floatDown(e.target.value)}
          autoComplete="off"
        />
      )}
      <label ref={labelRef} htmlFor={id} className="contact-new__label">
        {label}
      </label>
      <div className="contact-new__field-line" aria-hidden="true" />
    </div>
  );
};

// ── Contact Section ───────────────────────────────────────────────────────────
const Contact: React.FC<ContactProps> = ({ locale }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const magneticZoneRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const headlines =
    locale === 'es'
      ? ['Ready to', 'scale tu', 'SAP HR?']
      : ['Ready to', 'scale your', 'SAP HR?'];

  const fields =
    locale === 'es'
      ? [
          { id: 'name', label: 'Tu nombre', type: 'text', required: true },
          { id: 'email', label: 'Email de empresa', type: 'email', required: true },
          { id: 'message', label: 'Cuéntanos tu proyecto', multiline: true, required: true },
        ]
      : [
          { id: 'name', label: 'Your name', type: 'text', required: true },
          { id: 'email', label: 'Company email', type: 'email', required: true },
          { id: 'message', label: 'Tell us about your project', multiline: true, required: true },
        ];

  const btnLabel = locale === 'es' ? 'Enviar' : 'Send';
  const successTitle = locale === 'es' ? '¡Mensaje enviado!' : 'Message sent!';
  const successSub =
    locale === 'es'
      ? 'Nos pondremos en contacto contigo muy pronto.'
      : "We'll get back to you very soon.";

  // ── Scroll-triggered reveal ──
  useGSAP(
    () => {
      gsap.from('.contact-new__headline-inner', {
        y: '106%',
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: '.contact-new__headline-wrap',
          start: 'top 84%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      gsap.from('.contact-new__info-row', {
        y: 20,
        opacity: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: {
          trigger: '.contact-new__info',
          start: 'top 86%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      gsap.from('.contact-new__form-field', {
        y: 36,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.09,
        scrollTrigger: {
          trigger: '.contact-new__form',
          start: 'top 82%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      gsap.from('.contact-new__submit-magnetic', {
        scale: 0.66,
        opacity: 0,
        duration: 0.84,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.contact-new__submit-area',
          start: 'top 92%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  // ── Magnetic button ──
  useEffect(() => {
    const zone = magneticZoneRef.current;
    const btn = submitBtnRef.current;
    if (!zone || !btn) return;

    const onMove = (e: MouseEvent) => {
      const rect = zone.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      gsap.to(btn, {
        x: (e.clientX - cx) * 0.46,
        y: (e.clientY - cy) * 0.46,
        duration: 0.27,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const onLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.72,
        ease: 'elastic.out(1, 0.45)',
        overwrite: 'auto',
      });
    };

    zone.addEventListener('mousemove', onMove);
    zone.addEventListener('mouseleave', onLeave);
    return () => {
      zone.removeEventListener('mousemove', onMove);
      zone.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ── Form submission ──
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitted) return;

    const form = formRef.current;
    const success = successRef.current;
    const particles = particlesRef.current.filter(
      (p): p is HTMLSpanElement => p !== null,
    );
    if (!form || !success) return;

    const tl = gsap.timeline();

    tl.to(form, { y: -40, opacity: 0, duration: 0.48, ease: 'power3.in' });

    tl.fromTo(
      particles,
      { scale: 0, opacity: 1, x: 0, y: 0 },
      {
        scale: 1,
        opacity: 0,
        x: (_i: number) => Math.cos((_i * 2 * Math.PI) / 8) * 68,
        y: (_i: number) => Math.sin((_i * 2 * Math.PI) / 8) * 68,
        duration: 0.88,
        ease: 'power2.out',
        stagger: 0.04,
      },
      '-=0.1',
    );

    tl.fromTo(
      success,
      { scale: 0.7, opacity: 0, y: 24 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.84,
        ease: 'back.out(1.7)',
        onStart: () => {
          setSubmitted(true);
          success.classList.add('is-visible');
        },
      },
      '-=0.46',
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-new relative px-3 sm:px-4 lg:px-6"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(203,238,243,0.1) 40%, rgba(245,167,203,0.1) 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1680px] mx-auto w-full">
        <div className="contact-new__grid">
          {/* ── Left ── */}
          <div className="contact-new__left">
            <p className="contact-new__eyebrow">
              {locale === 'es' ? 'Hablemos' : 'Get in touch'}
            </p>

            <div className="contact-new__headline-wrap" aria-label={headlines.join(' ')}>
              {headlines.map((line, i) => (
                <span key={i} className="contact-new__headline-line">
                  <span
                    className={`contact-new__headline-inner${
                      i === headlines.length - 1
                        ? ' contact-new__headline-inner--accent'
                        : ''
                    }`}
                    aria-hidden="true"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </div>

            <div className="contact-new__info">
              <div className="contact-new__info-row">
                <MapPin
                  size={12}
                  className="shrink-0"
                  style={{ color: 'rgba(203,238,243,0.42)' }}
                  aria-hidden="true"
                />
                <span className="contact-new__info-label">
                  {locale === 'es' ? 'Sede' : 'Office'}
                </span>
                <span className="contact-new__info-value">{COMPANY_INFO.address}</span>
              </div>

              <div className="contact-new__info-row">
                <span className="contact-new__info-label">Email</span>
                <a href={`mailto:${COMPANY_INFO.email}`} className="contact-new__info-value">
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="contact-new__info-row contact-new__socials-row">
                {COMPANY_INFO.socials.map((social) => {
                  const Icon =
                    social.id === 'linkedin'
                      ? Linkedin
                      : social.id === 'instagram'
                        ? Instagram
                        : social.id === 'x'
                          ? Twitter
                          : null;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-new__social-link"
                    >
                      {Icon && <Icon size={10} strokeWidth={2} aria-hidden="true" />}
                      {social.id === 'x' ? 'X / Twitter' : social.name}
                      <ArrowUpRight size={9} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="contact-new__right">
            <div className="contact-new__form-area">
              <form
                ref={formRef}
                className="contact-new__form"
                onSubmit={handleSubmit}
                noValidate
              >
                {fields.map((f) => (
                  <Field
                    key={f.id}
                    id={f.id}
                    label={f.label}
                    type={f.type}
                    multiline={f.multiline}
                    required={f.required}
                  />
                ))}

                <div className="contact-new__submit-area">
                  <div ref={magneticZoneRef} className="contact-new__submit-magnetic">
                    <button
                      ref={submitBtnRef}
                      type="submit"
                      className="contact-new__submit"
                      aria-label={btnLabel}
                    >
                      <span className="contact-new__submit-label">{btnLabel}</span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.5}
                        className="contact-new__submit-arrow"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </form>

              <div
                ref={successRef}
                className="contact-new__success"
                aria-live="polite"
              >
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    ref={(el) => { particlesRef.current[i] = el; }}
                    className="contact-new__particle"
                    aria-hidden="true"
                  />
                ))}
                <CheckCircle size={44} strokeWidth={1.2} className="contact-new__success-check" aria-hidden="true" />
                <p className="contact-new__success-title">{successTitle}</p>
                <p className="contact-new__success-sub">{successSub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
