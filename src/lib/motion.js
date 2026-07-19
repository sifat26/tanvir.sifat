/**
 * Shared Framer Motion (motion/react) presets.
 * Centralizes the fade-up-on-scroll pattern repeated across sections so
 * timing/easing stays consistent. `prefers-reduced-motion` is already
 * handled globally in index.css.
 */

// Viewport config for whileInView animations.
export const viewportOnce = { once: true, margin: '-80px' };

// Fade up from a small offset. Use as `variants={fadeUp}` with
// initial="hidden" and whileInView/animate="show".
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/**
 * Build a fade-up transition object for inline use, with an optional
 * stagger delay based on list index.
 */
export const fadeUpDelay = (index = 0, { duration = 0.4, step = 0.05 } = {}) => ({
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportOnce,
  transition: { duration, delay: index * step, ease: 'easeOut' },
});
