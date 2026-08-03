import { useEffect } from 'react';

/**
 * Ambient cursor glow — a single soft halo that eases toward the pointer.
 * Driven by one rAF loop writing a transform, so React never re-renders on
 * pointer movement.
 *
 * Gated on `any-pointer: fine` rather than `pointer: coarse` — on a Windows
 * touchscreen the *primary* pointer reports as coarse even when a mouse is
 * attached, which would silently disable the effect entirely.
 */
export const useCursorFollower = () => {
  useEffect(() => {
    if (!window.matchMedia('(any-pointer: fine)').matches) return;

    // Reduced motion keeps the glow but drops the trailing lag.
    const ease = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0.12;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.append(glow);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;

    const tick = () => {
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const root = document.documentElement;
    const onMove = (e) => {
      // Touch and pen contacts shouldn't drag the glow around.
      if (e.pointerType && e.pointerType !== 'mouse') return;
      targetX = e.clientX;
      targetY = e.clientY;
      root.classList.add('cursor-active');
    };
    const onOut = (e) => !e.relatedTarget && root.classList.remove('cursor-active');

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
      root.classList.remove('cursor-active');
      glow.remove();
    };
  }, []);
};
