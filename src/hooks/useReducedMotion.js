import { useEffect, useState } from 'react';

/**
 * Tracks the user's `prefers-reduced-motion` setting reactively.
 *
 * The global CSS rule in index.css only neutralizes CSS transitions and
 * keyframes — Framer Motion animates via inline styles, so it sails straight
 * past that rule. Components must therefore opt out in JS, which is what this
 * hook exists for.
 */
export const useReducedMotion = () => {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
};
