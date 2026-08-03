import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

/**
 * DisclosureToggle — the single expand/collapse affordance used across About,
 * Experience, and Research. Chevron rotates 180° on open. "Show more" /
 * "Show less" is the site-wide wording; override only with good reason.
 */
export const DisclosureToggle = ({
  open,
  onClick,
  controls,
  id,
  moreLabel = 'Show more',
  lessLabel = 'Show less',
  className = '',
}) => (
  <button
    type='button'
    id={id}
    onClick={onClick}
    aria-expanded={open}
    aria-controls={controls}
    className={`inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] rounded-md transition-colors duration-[220ms] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)] ${className}`}
  >
    {open ? lessLabel : moreLabel}
    <ChevronDown
      aria-hidden='true'
      className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    />
  </button>
);

/**
 * Disclosure — an accessible expand/collapse region with a smooth height
 * animation. `overflow-hidden` during the transition prevents the content from
 * spilling out mid-animation, which is what causes the usual layout jank.
 *
 * Pass `renderToggle` to place the button yourself (Experience puts it inside a
 * card header); otherwise the default toggle renders above the content.
 */
const Disclosure = ({
  children,
  moreLabel,
  lessLabel,
  defaultOpen = false,
  toggleClassName = '',
  panelClassName = '',
  renderToggle,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const panelId = `disclosure-panel-${uid}`;
  const buttonId = `disclosure-button-${uid}`;
  const toggle = () => setOpen((v) => !v);

  const toggleProps = { open, onClick: toggle, controls: panelId, id: buttonId, moreLabel, lessLabel };

  return (
    <>
      {renderToggle ? (
        renderToggle(toggleProps)
      ) : (
        <DisclosureToggle {...toggleProps} className={toggleClassName} />
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='panel'
            id={panelId}
            role='region'
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.22 } }}
            className='overflow-hidden'
          >
            <div className={panelClassName}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Disclosure;
