import React, { useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Linkedin, Mail } from 'lucide-react';
import './Team.css';

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  linkedin: string;
  mail: string;
}

export const teamMembers: TeamMember[] = [
  { id: 1, name: 'Florentin Navarrete Moya', position: 'Computer Engineer, SAP SuccessFactors & HCM Consultant Principal', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'florentin.navarrete@oksap.es' },
  { id: 2, name: 'Rodrigo Corrales Martinez', position: 'Computer Engineer, SAP SuccessFactors & HCM Consultant', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'rodrigo.corrales@oksap.es' },
  { id: 3, name: 'Sergio Vilar Perez', position: 'Computer Engineer, SAP SuccessFactors & HCM Consultant', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'sergio.vilar@oksap.es' },
  { id: 4, name: 'Celia Quiles Ramirez', position: 'Computer Engineer, SAP SuccessFactors & HCM Consultant', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'celia.quiles@oksap.es' },
  { id: 5, name: 'Maria del Rocio Vinas Velasco', position: 'Spanish Payroll Specialist & SAP HXM Consultant', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'rocio.vinas@oksap.es' },
  { id: 6, name: 'Maria Cristina Ramirez Quiros', position: 'HR Generalist & SAP HXM Consultant', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'cristina.ramirez@oksap.es' },
  { id: 7, name: 'Milagros Elisabeth Barros Chacaltana', position: 'SAP SuccessFactors Junior Consultant', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'milagros.barros@oksap.es' },
  { id: 8, name: 'Martin Nava', position: '', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'martin.nava@oksap.es' },
  { id: 9, name: 'Paula Claraco Ramirez', position: 'SAP Trainee', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'paula.claraco@oksap.es' },
  { id: 10, name: 'Ines Pleguezuelos Salcedo', position: 'SAP Trainee', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'ines.pleguezuelos@oksap.es' },
  { id: 11, name: 'Paolo Puga De Patto', position: 'SAP Trainee', image: '', linkedin: 'https://www.linkedin.com/company/oksap-spain/', mail: 'paolo.puga@oksap.es' },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

const Team: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const yToRef = useRef<((value: number) => gsap.core.Tween) | null>(null);
  const [activeMember, setActiveMember] = useState<TeamMember | null>(teamMembers[0]);

  const previewInitials = useMemo(
    () => getInitials(activeMember?.name ?? ''),
    [activeMember],
  );

  useGSAP(
    () => {
      if (previewRef.current) {
        xToRef.current = gsap.quickTo(previewRef.current, 'x', {
          duration: 0.28,
          ease: 'power3.out',
        });
        yToRef.current = gsap.quickTo(previewRef.current, 'y', {
          duration: 0.28,
          ease: 'power3.out',
        });
        gsap.set(previewRef.current, { autoAlpha: 0, scale: 0.92 });
      }

      gsap.to('.team-bg-text', {
        y: '-22%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.6,
          invalidateOnRefresh: true,
        },
      });

      gsap.from('.team-headline', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.team-headline',
          start: 'top 88%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });

      gsap.from('[data-team-row]', {
        y: 28,
        opacity: 0,
        duration: 0.68,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: '.team-list',
          start: 'top 86%',
          toggleActions: 'play none none none',
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: sectionRef },
  );

  const movePreview = (clientX: number, clientY: number) => {
    if (!xToRef.current || !yToRef.current) return;
    const previewWidth = 272;
    const previewHeight = 336;
    const nextX = Math.min(clientX + 28, window.innerWidth - previewWidth - 20);
    const nextY = Math.max(20, Math.min(clientY - previewHeight * 0.42, window.innerHeight - previewHeight - 20));
    xToRef.current(nextX);
    yToRef.current(nextY);
  };

  const showPreview = (member: TeamMember, clientX: number, clientY: number) => {
    setActiveMember(member);
    movePreview(clientX, clientY);
    if (previewRef.current && window.innerWidth >= 1024) {
      gsap.to(previewRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.34,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const hidePreview = () => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        autoAlpha: 0,
        scale: 0.92,
        duration: 0.24,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }
  };

  const handleRowMove = (
    event: React.MouseEvent<HTMLDivElement>,
    member: TeamMember,
  ) => {
    const row = event.currentTarget;
    const target = event.target as HTMLElement;
    if (target.closest('[data-team-actions]')) {
      hidePreview();
      return;
    }

    const nameNode = row.querySelector<HTMLElement>('[data-team-name]');
    const rect = row.getBoundingClientRect();
    const offsetX = (event.clientX - (rect.left + rect.width / 2)) * 0.035;
    const offsetY = (event.clientY - (rect.top + rect.height / 2)) * 0.18;

    if (nameNode) {
      gsap.to(nameNode, {
        x: offsetX,
        y: offsetY,
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    movePreview(event.clientX, event.clientY);
    showPreview(member, event.clientX, event.clientY);
  };

  const handleRowLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const nameNode = event.currentTarget.querySelector<HTMLElement>('[data-team-name]');
    if (nameNode) {
      gsap.to(nameNode, {
        x: 0,
        y: 0,
        duration: 0.38,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
    hidePreview();
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="team-section relative overflow-hidden px-3 sm:px-4 lg:px-6"
    >
      <div className="team-bg-text-wrap absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <span className="team-bg-text" aria-hidden="true">
          OUR TALENT
        </span>
      </div>

      <div className="max-w-[1680px] mx-auto relative z-10">
        <div className="team-layout pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-18 lg:pb-20">
          <div className="team-headline">
            <p className="team-headline__eyebrow">Nuestro equipo</p>
            <h2 className="team-headline__title">The Talent</h2>
            <p className="team-headline__copy">
              Un formato mas ligero, directo y editorial: lista compacta con preview flotante y enlaces discretos.
            </p>
          </div>

          <div className="team-list" role="list">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                role="listitem"
                data-team-row
                className="team-row"
                onMouseEnter={(event) => showPreview(member, event.clientX, event.clientY)}
                onMouseMove={(event) => handleRowMove(event, member)}
                onMouseLeave={handleRowLeave}
              >
                <div className="team-row__identity">
                  <span className="team-row__index">{String(member.id).padStart(2, '0')}</span>
                  <span className="team-row__name" data-team-name>
                    {member.name}
                  </span>
                </div>

                <div className={`team-row__meta${member.position ? '' : ' team-row__meta--icons-only'}`}>
                  {member.position ? (
                    <span className="team-row__position">{member.position}</span>
                  ) : null}
                  <div
                    className="team-row__actions"
                    data-team-actions
                    onMouseEnter={hidePreview}
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-row__icon"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin size={14} strokeWidth={1.8} />
                    </a>
                    <a
                      href={`mailto:${member.mail}`}
                      className="team-row__icon"
                      aria-label={`Email de ${member.name}`}
                    >
                      <Mail size={14} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={previewRef} className="team-preview" aria-hidden="true">
        <div className="team-preview__media">
          {activeMember?.image ? (
            <img
              src={activeMember.image}
              alt={activeMember.name}
              className="team-preview__image"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="team-preview__placeholder">
              <span className="team-preview__initials">{previewInitials}</span>
            </div>
          )}
        </div>

        <div className="team-preview__caption">
          <p className="team-preview__name">{activeMember?.name}</p>
          {activeMember?.position ? (
            <p className="team-preview__role">{activeMember.position}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Team;
