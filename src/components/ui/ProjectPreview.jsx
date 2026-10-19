import { ExternalLink } from 'lucide-react';
import { isRealLink } from '../../lib/links';

/**
 * ProjectPreview — the single source of truth for a project's visual: browser
 * chrome bar, then either a real screenshot or the branded letter-mark tile.
 *
 * Used by BOTH the compact card and the detail modal so the two can never
 * diverge. `interactive` controls only the live-link wrapper and hover CTA —
 * never the preview contents themselves, which is what previously let the card
 * and modal drift apart.
 */
const ProjectPreview = ({ project, interactive = true, className = '' }) => {
  const live = project.links?.live;
  const hasLive = isRealLink(live);

  const inner = project.image ? (
    <div className='relative w-full h-full ring-1 ring-inset ring-[var(--border-subtle)] overflow-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-12 after:bg-gradient-to-t after:from-white/70 dark:after:from-[#0F1219]/90 after:to-transparent after:pointer-events-none'>
      <img
        src={project.image}
        alt={`${project.title} — product screenshot`}
        loading='lazy'
        decoding='async'
        className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]'
      />
    </div>
  ) : (
    <div className='w-full h-full grid place-items-center bg-[var(--bg-subtle)] relative overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-40'
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className='text-center px-6 relative'>
        <div
          className='mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-xl grid place-items-center text-xl sm:text-2xl font-semibold shadow-lg'
          style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
        >
          {project.title.charAt(0)}
        </div>
        <div className='mt-3 font-mono text-[11px] sm:text-[12px] uppercase tracking-wider text-[var(--text-muted)]'>
          {project.category}
        </div>
      </div>
    </div>
  );

  const frame = (
    <div className={`project-media aspect-[16/10] shrink-0 ${className}`}>
      <div className='absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3 py-2 bg-zinc-100 dark:bg-zinc-900/90 backdrop-blur border-b border-[var(--border-subtle)]'>
        <span className='w-2.5 h-2.5 rounded-full shrink-0' style={{ background: '#ff5f57' }} />
        <span className='w-2.5 h-2.5 rounded-full shrink-0' style={{ background: '#febc2e' }} />
        <span className='w-2.5 h-2.5 rounded-full shrink-0' style={{ background: '#28c840' }} />
        {hasLive && (
          <>
            <div className='ml-2 flex-1 min-w-0 truncate font-mono text-[10.5px] text-[var(--text-muted)]'>
              {live.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </div>
            <span className='inline-flex items-center gap-1 text-[10px] font-mono shrink-0' style={{ color: 'var(--accent)' }}>
              <span className='relative flex h-1.5 w-1.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full opacity-70' style={{ background: 'var(--accent)' }} />
                <span className='relative inline-flex rounded-full h-1.5 w-1.5' style={{ background: 'var(--accent)' }} />
              </span>
              LIVE
            </span>
          </>
        )}
      </div>

      <div className='absolute inset-0 pt-8'>{inner}</div>

      {interactive && hasLive && (
        <div className='absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
          <div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/70 backdrop-blur text-white text-[12px] font-medium'>
            <ExternalLink className='w-3.5 h-3.5' />
            Open live
          </div>
        </div>
      )}
    </div>
  );

  return interactive && hasLive ? (
    <a
      href={live}
      target='_blank'
      rel='noopener noreferrer'
      className='block group'
      title={`${project.title} — open live site`}
    >
      {frame}
    </a>
  ) : (
    <div className='group'>{frame}</div>
  );
};

export default ProjectPreview;
