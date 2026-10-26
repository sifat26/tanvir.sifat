import { BookOpen, Calendar, ExternalLink, Globe, MapPin, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { TagList } from './Tag';

const PublicationDetail = ({ publication, onClose }) => {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const restoreRef = useRef(null);

  useEffect(() => {
    if (!publication) return;

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
  }, [publication, onClose]);

  if (!publication) return null;

  const targetUrl = publication.url || publication.doiUrl || (publication.doi ? `https://doi.org/${publication.doi}` : null);

  return (
    <AnimatePresence>
      <motion.div
        key='pub-overlay'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6'
      >
        {/* Backdrop */}
        <button
          type='button'
          tabIndex={-1}
          aria-label='Close publication details'
          onClick={onClose}
          className='absolute inset-0 bg-black/60 backdrop-blur-sm'
        />

        {/* Modal Dialog */}
        <motion.div
          ref={panelRef}
          role='dialog'
          aria-modal='true'
          aria-labelledby='pub-detail-title'
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className='relative flex flex-col w-full sm:max-w-[720px] max-h-[92vh] sm:max-h-[88vh] bg-[var(--bg-card)] border border-[var(--border-card)] rounded-2xl shadow-[var(--shadow-card)] overflow-hidden'
        >
          {/* Header Bar */}
          <div className='flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-[var(--border-card)] shrink-0 pt-[max(1rem,env(safe-area-inset-top))] sm:pt-4'>
            <div className='flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-[12px] min-w-0'>
              <span className='inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] font-medium'>
                <BookOpen className='w-3 h-3' />
                Peer-reviewed
              </span>
              <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--text-muted)]'>
                <Calendar className='w-3 h-3' />
                {publication.year}
              </span>
              {publication.publisher && (
                <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--text-main)] font-semibold'>
                  {publication.publisher}
                </span>
              )}
            </div>

            <button
              ref={closeRef}
              type='button'
              onClick={onClose}
              aria-label='Close publication details'
              className='w-9 h-9 -mr-2 grid place-items-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-pill)] transition-colors shrink-0'
            >
              <X className='w-4 h-4' />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className='flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-7 py-6 space-y-6'>
            {/* Title & Authors */}
            <div>
              <h2
                id='pub-detail-title'
                className='text-[20px] sm:text-[23px] font-semibold tracking-tight text-[var(--text-main)] leading-snug'
              >
                {publication.title}
              </h2>

              {publication.authors && (
                <p className='mt-2.5 text-[13px] sm:text-[13.5px] text-[var(--text-secondary)] font-mono leading-relaxed'>
                  <span className='text-[var(--text-dim)] uppercase tracking-wider text-[11px] block sm:inline sm:mr-2'>
                    Authors:
                  </span>
                  {publication.authors}
                </p>
              )}
            </div>

            {/* Venue & Metadata Grid */}
            <div className='p-4 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-3 text-[13px]'>
              <div>
                <span className='block text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)]'>
                  {publication.journal ? 'Journal' : 'Conference'}
                </span>
                <span className='font-medium text-[var(--text-main)] mt-0.5 block leading-snug'>
                  {publication.journal || publication.conference}
                </span>
              </div>

              {publication.venue && (
                <div>
                  <span className='block text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)]'>
                    Location / Venue
                  </span>
                  <span className='inline-flex items-center gap-1.5 text-[var(--text-secondary)] mt-0.5'>
                    <MapPin className='w-3.5 h-3.5 text-[var(--accent)] shrink-0' />
                    {publication.venue}
                  </span>
                </div>
              )}

              {publication.doi && (
                <div className='sm:col-span-2 pt-2 border-t border-[var(--border-subtle)]'>
                  <span className='block text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)]'>
                    DOI
                  </span>
                  <a
                    href={publication.doiUrl || `https://doi.org/${publication.doi}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[var(--accent)] hover:underline font-mono text-[12.5px] inline-flex items-center gap-1.5 break-all mt-0.5'
                  >
                    {publication.doi}
                    <ExternalLink className='w-3 h-3 shrink-0' />
                  </a>
                </div>
              )}
            </div>

            {/* Executive Summary */}
            {publication.summary && (
              <div>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-1.5'>
                  Overview
                </div>
                <p className='text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>
                  {publication.summary}
                </p>
              </div>
            )}

            {/* Abstract */}
            {publication.abstract && (
              <div className='p-4 sm:p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]'>
                <div className='flex items-center gap-2 text-[11.5px] font-mono uppercase tracking-wider text-[var(--accent)] mb-2.5 font-bold'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[var(--accent)]' />
                  Abstract
                </div>
                <p className='text-[14px] sm:text-[14.5px] leading-[1.75] text-[var(--text-secondary)] text-justify'>
                  {publication.abstract}
                </p>
              </div>
            )}

            {/* Technical Highlights */}
            {publication.highlights?.length > 0 && (
              <div>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2.5'>
                  Key Technical Contributions & Metrics
                </div>
                <ul className='space-y-2'>
                  {publication.highlights.map((h, i) => (
                    <li key={i} className='flex gap-2.5 text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                      <span aria-hidden='true' className='mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0' />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags / Keywords */}
            {publication.tags?.length > 0 && (
              <div>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] mb-2'>
                  Keywords & Domains
                </div>
                <TagList items={publication.tags} variant='muted' />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className='shrink-0 border-t border-[var(--border-card)] px-5 sm:px-7 py-4 flex flex-wrap items-center justify-between gap-3 pb-[max(1rem,env(safe-area-inset-bottom))]'>
            <div className='flex flex-wrap items-center gap-3'>
              {targetUrl && (
                <a
                  href={targetUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-primary text-xs sm:text-sm font-medium'
                >
                  <Globe className='w-3.5 h-3.5' />
                  Read on {publication.publisher || 'Publisher'}
                  <ExternalLink className='w-3.5 h-3.5' />
                </a>
              )}
              {publication.doiUrl && publication.doiUrl !== targetUrl && (
                <a
                  href={publication.doiUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn-ghost px-4 py-2 text-xs font-mono'
                >
                  DOI Link ↗
                </a>
              )}
            </div>

            <button
              type='button'
              onClick={onClose}
              className='btn btn-secondary text-xs sm:text-sm font-medium ml-auto'
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PublicationDetail;

