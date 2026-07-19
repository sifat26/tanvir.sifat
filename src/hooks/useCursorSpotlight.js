import { useEffect } from 'react';

/**
 * Global cursor-spotlight tracker.
 *
 * Registers a single passive `pointermove` listener on the document and
 * writes the cursor's local position into `--mx` / `--my` on every
 * spotlight-target element the cursor is currently over. CSS then paints
 * a radial highlight at that position.
 *
 * This is far cheaper than mounting a React handler per card, and it
 * makes the effect just work for any element with the `data-spotlight`
 * attribute or the .bento / .card / .project-media class.
 */
export const useCursorSpotlight = () => {
  useEffect(() => {
    // Respect reduced-motion preference — no spotlight tracking.
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return;

    // Skip on coarse pointer devices (touch) — hover effects don't apply.
    const coarse = window.matchMedia('(pointer: coarse)');
    if (coarse.matches) return;

    const SELECTOR = '.bento, .card, .project-media, [data-spotlight]';
    let queued = false;
    let lastEvent = null;

    const paint = () => {
      queued = false;
      if (!lastEvent) return;
      const { clientX, clientY } = lastEvent;
      // `elementsFromPoint` returns everything under the cursor — we style
      // every ancestor that opts in, so nested cards all light up.
      const stack = document.elementsFromPoint(clientX, clientY);
      for (const el of stack) {
        if (!el.matches?.(SELECTOR)) continue;
        const rect = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${clientX - rect.left}px`);
        el.style.setProperty('--my', `${clientY - rect.top}px`);
      }
    };

    const onMove = (event) => {
      lastEvent = event;
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    return () => document.removeEventListener('pointermove', onMove);
  }, []);
};
