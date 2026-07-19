import { useEffect, useRef } from 'react';

/**
 * useMagnetic — attaches a lightweight cursor-follow effect to any element.
 * The element gently drifts toward the cursor when the pointer is nearby,
 * then springs back on leave. Respects `prefers-reduced-motion`.
 *
 * strength — how far the element can shift (px). Default 12.
 */
export const useMagnetic = (strength = 12) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Bail out entirely for reduced-motion users and touch devices.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      tx = (dx / r.width) * strength;
      ty = (dy / r.height) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${tx}px, ${ty}px)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    el.style.transition = 'transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)';
    el.style.willChange = 'transform';

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
};
