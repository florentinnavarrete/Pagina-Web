import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type AnimatedImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  roundedClassName?: string;
  effect?: 'rgb' | 'liquid';
  enableScrollFx?: boolean;
  enableHoverFx?: boolean;
};

const AnimatedImage: React.FC<AnimatedImageProps> = ({
  src,
  alt,
  className = '',
  imageClassName = '',
  roundedClassName = 'rounded-[1.6rem]',
  effect = 'rgb',
  enableScrollFx = true,
  enableHoverFx = true,
}) => {
  const scopeRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const rgbLeftRef = useRef<HTMLImageElement | null>(null);
  const rgbRightRef = useRef<HTMLImageElement | null>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);

  useGSAP(
    () => {
      const scope = scopeRef.current;
      const media = mediaRef.current;
      const rgbLeft = rgbLeftRef.current;
      const rgbRight = rgbRightRef.current;
      if (!scope || !media) return;

      if (enableScrollFx) {
        // Reveal con clip-path para dar una entrada más editorial.
        gsap.fromTo(
          scope,
          {
            clipPath: 'inset(10% 8% 14% 8% round 1.6rem)',
            opacity: 0.001,
          },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.6rem)',
            opacity: 1,
            duration: 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: scope,
              start: 'top 86%',
              once: true,
            },
          },
        );

        // Parallax vertical muy sutil para añadir profundidad sin penalizar.
        gsap.fromTo(
          media,
          {
            yPercent: -6,
            scale: 1.06,
            force3D: true,
          },
          {
            yPercent: 6,
            scale: 1,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: scope,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        );
      }

      if (!enableHoverFx) return;

      const hoverTl = gsap.timeline({ paused: true });

      if (effect === 'liquid') {
        const turbulence = turbulenceRef.current;
        hoverTl
          .to(media, {
            scale: 1.035,
            duration: 0.45,
            ease: 'power3.out',
            force3D: true,
          }, 0)
          .to(scope, {
            '--liquid-scale': '32',
            duration: 0.45,
            ease: 'power3.out',
          } as gsap.TweenVars, 0);

        if (turbulence) {
          hoverTl.to(
            turbulence,
            {
              attr: { baseFrequency: '0.018 0.034' },
              duration: 0.45,
              ease: 'power3.out',
            },
            0,
          );
        }
      } else {
        if (!rgbLeft || !rgbRight) return;
        // Timeline de hover con leve RGB shift para personalidad Awwwards.
        hoverTl
          .to(media, {
            scale: 1.03,
            duration: 0.45,
            ease: 'power3.out',
            force3D: true,
          }, 0)
          .to(rgbLeft, {
            x: -6,
            opacity: 0.16,
            duration: 0.45,
            ease: 'power3.out',
            force3D: true,
          }, 0)
          .to(rgbRight, {
            x: 6,
            opacity: 0.16,
            duration: 0.45,
            ease: 'power3.out',
            force3D: true,
          }, 0);
      }

      const handleEnter = () => hoverTl.play();
      const handleLeave = () => hoverTl.reverse();

      scope.addEventListener('pointerenter', handleEnter);
      scope.addEventListener('pointerleave', handleLeave);

      return () => {
        scope.removeEventListener('pointerenter', handleEnter);
        scope.removeEventListener('pointerleave', handleLeave);
      };
    },
    { scope: scopeRef },
  );

  return (
    <div
      ref={scopeRef}
      className={`relative overflow-hidden ${roundedClassName} ${className}`}
      style={{ willChange: 'clip-path, opacity', ['--liquid-scale' as string]: 0 }}
    >
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true" focusable="false">
        <filter id={`liquid-distortion-${alt.replace(/\s+/g, '-').toLowerCase()}`}>
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.01 0.02"
            numOctaves={2}
            seed={2}
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="var(--liquid-scale)" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div
        ref={mediaRef}
        className="relative h-full w-full transform-gpu will-change-transform"
        style={effect === 'liquid' ? { filter: `url(#liquid-distortion-${alt.replace(/\s+/g, '-').toLowerCase()})` } : undefined}
      >
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${imageClassName}`}
          loading="lazy"
        />
        {effect === 'rgb' && (
          <>
            <img
              ref={rgbLeftRef}
              src={src}
              alt=""
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 mix-blend-screen ${imageClassName}`}
              style={{ filter: 'hue-rotate(-28deg) saturate(1.35)' }}
              loading="lazy"
            />
            <img
              ref={rgbRightRef}
              src={src}
              alt=""
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 mix-blend-screen ${imageClassName}`}
              style={{ filter: 'hue-rotate(22deg) saturate(1.3)' }}
              loading="lazy"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AnimatedImage;