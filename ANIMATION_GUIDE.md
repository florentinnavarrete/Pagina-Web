# ANIMATION GUIDE

## Naming Convention

Use this pattern across timelines, ScrollTriggers, and CSS classes:

- **Family prefix:** `reveal-`, `parallax-`, `sticky-`, `hover-`, `ambient-`
- **Intent suffix:** `-up`, `-float`, `-pin`, `-drift`, `-lift`
- **Scope token:** `hero`, `section`, `card`, `media`, `nav`
- **Final format:** `<family>-<intent>-<scope>`

Examples:
- `reveal-up-hero`
- `parallax-float-media`
- `sticky-pin-section`
- `hover-magnetic-card`
- `ambient-drift-bg`

---

## Animation Catalog

### 1) Name: The Reveal-Up

- **Behavior:** Characters start below a clipping mask (`translateY(120%)`) and slide to `0%` with stagger timing for cinematic headline entrances.
- **Trigger:** Scroll (section enters viewport) or Page Load (hero only).
- **Best Practices:**
  - Use `ease: power4.out`.
  - Duration: `0.9s` to `1.2s`.
  - Stagger: `0.012` to `0.025`.
  - Prefer masks over clip-path for broad browser stability.

### 2) Name: The Parallax-Float

- **Behavior:** Media layer moves at a slower/faster rate than document scroll (`yPercent` from negative to positive) to create depth.
- **Trigger:** Scroll (scrubbed via ScrollTrigger).
- **Best Practices:**
  - Use `ease: none` with `scrub`.
  - Keep range subtle (`8%` to `16%`) to avoid nausea.
  - Animate only transforms; avoid filter-heavy effects in scroll loops.

### 3) Name: The Sticky-Pin

- **Behavior:** A key panel stays pinned while sibling content scrolls, creating editorial storytelling progression.
- **Trigger:** Scroll (ScrollTrigger `pin`).
- **Best Practices:**
  - Use `anticipatePin: 1` to reduce jump artifacts.
  - Start/end offsets should account for fixed headers.
  - Keep pinned content visually stable (minimal internal reflow).

### 4) Name: The Stream-Reveal

- **Behavior:** Sequential cards fade + lift into place (`opacity` + `translateY`) as they enter viewport.
- **Trigger:** Scroll.
- **Best Practices:**
  - Use `ease: power3.out`.
  - Duration: `0.7s` to `1.0s`.
  - Vertical offset: `24px` to `42px`.
  - Trigger once in long pages unless content can re-enter often.

### 5) Name: The Magnetic-Hover

- **Behavior:** Interactive elements subtly chase pointer position using spring-like interpolation for premium tactile feel.
- **Trigger:** Hover / pointer move.
- **Best Practices:**
  - Keep max displacement low (`4px` to `10px`).
  - Snap back with `power3.out` under `0.35s`.
  - Disable on touch devices or reduced-motion mode.

### 6) Name: The Ambient-Drift

- **Behavior:** Background gradients/ornaments drift slowly to avoid static dead zones and add scene life.
- **Trigger:** Page Load (continuous) or scroll-progress mapping.
- **Best Practices:**
  - Long cycles (`14s` to `28s`).
  - Keep amplitude low; ambient must not compete with content.
  - Avoid multiple overlapping expensive blurs.

---

## GSAP + Lenis Integration Standard

- Use one global Lenis instance via `useSmoothScroll`.
- Sync scroll engine with GSAP using `lenis.on('scroll', ScrollTrigger.update)`.
- Run Lenis from GSAP ticker for coherent timing:
  - `gsap.ticker.add((t) => lenis.raf(t * 1000))`
- Disable GSAP lag smoothing for tighter scroll sync:
  - `gsap.ticker.lagSmoothing(0)`

---

## Performance Rules (60fps+)

1. Animate only `transform` and `opacity` in scroll-driven timelines.
2. Apply `will-change` only on actively animated nodes (`char`, `parallax image`, `stream item`).
3. Avoid animating `filter` inside scrubbed timelines unless absolutely necessary.
4. Keep `ScrollTrigger` count scoped to actual animated elements.
5. Use `once: true` for one-time reveals where possible.
6. Respect reduced motion:
   - Skip smooth scrolling and heavy timelines if `prefers-reduced-motion` is enabled.

---

## Quick Usage Reference

- Install:
  - `npm install gsap @gsap/react lenis`
- Smooth engine hook:
  - `src/hooks/useSmoothScroll.ts`
- Reusable immersive section:
  - `src/components/CreativeSection.tsx`
- Component styles:
  - `src/components/CreativeSection.css`
