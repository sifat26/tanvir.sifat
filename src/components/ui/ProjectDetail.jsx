import { Users, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import ProjectLinks from './ProjectLinks';
import ProjectPreview from './ProjectPreview';
import { TagList } from './Tag';

const Block = ({ label, children }) =>
  children ? (
    <div>
      <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5'>{label}</div>
      <p className='text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>{children}</p>
    </div>
  ) : null;

const BulletList = ({ label, items }) =>
  items?.length ? (
    <div>
      <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>{label}</div>
      <ul className='space-y-2'>
        {items.map((item, i) => (
          <li key={i} className='flex gap-2.5 text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>
            <span aria-hidden='true' className='mt-2 h-1 w-1 rounded-full shrink-0' style={{ background: 'var(--accent)' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

/**
 * ProjectDetail — the full case study as a centered modal dialog. Full-screen
 * sheet on phones, centered card from `sm` up. Closes on backdrop click, Escape,
 * and the X button; traps focus and restores it to the trigger on close.
 *
 * Chosen over per-project routes because the site has no SPA rewrite config for
 * its cPanel/IIS/Vercel targets, so deep links would 404 on direct load.
 */
const ProjectDetail = ({ project, onClose }) => {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  useEffect(() => {
    if (!project) return;

    restoreRef.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreRef.current?.focus?.();
    };
  }, [project, onClose]);

  const isClient = project?.type === 'client';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key='overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className='fixed inset-0 z-[70] flex sm:items-center sm:justify-center sm:p-6'
        >
          <button
            type='button'
            tabIndex={-1}
            aria-label='Close project details'
            onClick={onClose}
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
          />

          <motion.div
            ref={panelRef}
            role='dialog'
            aria-modal='true'
            aria-labelledby='project-detail-title'
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className='relative flex flex-col w-full sm:max-w-[680px] sm:max-h-[88vh] max-h-full bg-[var(--bg-elevated)] sm:border border-[var(--border)] sm:rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] overflow-hidden'
          >
            <div className='flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-[var(--border)] shrink-0 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-4'>
              <div className='flex flex-wrap items-center gap-2 font-mono text-[12px] text-[var(--text-muted)] min-w-0'>
                <span
                  className='inline-flex items-center px-1.5 py-0.5 rounded border'
                  style={{
                    color: 'var(--accent)',
                    borderColor: 'color-mix(in oklab, var(--accent) 30%, transparent)',
                    background: 'var(--accent-soft)',
                  }}
                >
                  {project.year}
                </span>
                <span className='truncate'>{project.category}</span>
              </div>
              <button
                ref={closeRef}
                type='button'
                onClick={onClose}
                aria-label='Close project details'
                className='w-9 h-9 -mr-2 grid place-items-center rounded-md text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)] transition-colors shrink-0'
              >
                <X className='w-4 h-4' />
              </button>
            </div>

            <div className='flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-7 py-6 space-y-6'>
              <div>
                <h2
                  id='project-detail-title'
                  className='text-2xl font-semibold tracking-tight text-[var(--text)] leading-tight'
                >
                  {project.title}
                </h2>
                <p className='mt-1.5 text-[15px] leading-relaxed text-[var(--text-secondary)]'>{project.tagline}</p>
                {isClient && project.team && (
                  <div className='mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-muted)]'>
                    <Users className='w-3.5 h-3.5 shrink-0' />
                    {project.team}
                  </div>
                )}
              </div>

              <ProjectPreview project={project} interactive={false} />

              {isClient ? (
                <>
                  <Block label='Overview'>{project.overview}</Block>
                  <BulletList label='My contributions' items={project.contributions} />
                </>
              ) : (
                <>
                  <Block label='Problem'>{project.problem}</Block>
                  <Block label='Solution'>{project.solution}</Block>
                  <BulletList label='Key features' items={project.features} />
                  <Block label='Challenges'>{project.challenges}</Block>
                </>
              )}

              <div>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>
                  Tech stack
                </div>
                <TagList items={project.tech} variant='muted' />
              </div>
            </div>

            <div className='shrink-0 border-t border-[var(--border)] px-5 sm:px-7 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
              <ProjectLinks project={project} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetail;
