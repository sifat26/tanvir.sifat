import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Reveal — the site-wide scroll-in entrance: fade + 16px rise, 500ms ease-out,
 * triggered once when ~20% of the element enters the viewport.
 *
 * Framer Motion's `whileInView` is backed by IntersectionObserver; `amount: 0.2`
 * maps to a 20% threshold and `once: true` stops it re-triggering on scroll-up.
 *
 * When `prefers-reduced-motion` is set, this renders a plain element with no
 * transform or opacity animation — content is immediately visible. That check
 * has to happen here in JS because Framer animates inline styles, which the
 * global CSS reduced-motion rule cannot reach.
 */
const Reveal = ({ as = 'div', delay = 0, amount = 0.2, className = '', children, ...rest }) => {
  const reduced = useReducedMotion();
  const Component = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Component
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
