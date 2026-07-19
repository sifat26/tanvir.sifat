import { ArrowUpRight, ExternalLink, Github, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { TagList } from './Tag';

/** A link is "real" only once its [ADD_*_URL] placeholder token is replaced. */
const isRealLink = (url) => Boolean(url) && !url.startsWith('[ADD');

/**
 * ProjectMedia — screenshot with hover zoom + browser chrome + accent
 * gradient overlay + live badge. When no screenshot, an elegant branded
 * placeholder keeps the shape.
 */
const ProjectMedia = ({ project }) => {
  const inner = project.image ? (
    <img
      src={project.image}
      alt={`${project.title} — product screenshot`}
      loading='lazy'
      decoding='async'
      className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]'
    />
  ) : (
    <div className='w-full h-full grid place-items-center bg-[var(--bg-subtle)] relative overflow-hidden'>
      <div
        aria-hidden
        className='absolute inset-0 opacity-40'
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className='text-center px-6 relative'>
        <div
          className='mx-auto w-14 h-14 rounded-xl grid place-items-center text-xl font-semibold text-white shadow-lg'
          style={{ background: 'var(--gradient-brand)' }}
        >
          {project.title.charAt(0)}
        </div>
        <div className='mt-3 font-mono text-[12px] uppercase tracking-wider text-[var(--text-muted)]'>
          {project.category}
        </div>
      </div>
    </div>
  );

  const frame = (
    <div className='project-media aspect-[16/10]'>
      {/* Browser chrome bar */}
      <div className='absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3 py-2 bg-[var(--bg-muted)]/90 backdrop-blur border-b border-[var(--border)]'>
        <span className='w-2.5 h-2.5 rounded-full' style={{ background: '#ff5f57' }} />
        <span className='w-2.5 h-2.5 rounded-full' style={{ background: '#febc2e' }} />
        <span className='w-2.5 h-2.5 rounded-full' style={{ background: '#28c840' }} />
        {isRealLink(project.links?.live) && (
          <div className='ml-2 flex-1 min-w-0 truncate font-mono text-[10.5px] text-[var(--text-muted)]'>
            {project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '')}
          </div>
        )}
        {isRealLink(project.links?.live) && (
          <span className='inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500'>
            <span className='relative flex h-1.5 w-1.5'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70' />
              <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500' />
            </span>
            LIVE
          </span>
        )}
      </div>

      <div className='absolute inset-0 pt-8'>{inner}</div>

      {/* Hover CTA */}
      {isRealLink(project.links?.live) && (
        <div className='absolute inset-0 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
          <div className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/70 backdrop-blur text-white text-[12px] font-medium'>
            <ExternalLink className='w-3.5 h-3.5' />
            Open live
          </div>
        </div>
      )}
    </div>
  );

  return isRealLink(project.links?.live) ? (
    <a
      href={project.links.live}
      target='_blank'
      rel='noopener noreferrer'
      className='block group'
      aria-label={`${project.title} — live demo`}
    >
      {frame}
    </a>
  ) : (
    <div className='group'>{frame}</div>
  );
};

const CaseBlock = ({ label, children }) =>
  children ? (
    <div>
      <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1'>{label}</div>
      <p className='text-[var(--text-secondary)]'>{children}</p>
    </div>
  ) : null;

/**
 * ProjectCard — one case study. Handles both client projects
 * (overview / contributions + role) and personal projects
 * (problem / solution / challenges). Media left, narrative right.
 */
const ProjectCard = ({ project, index = 0, flip = false }) => {
  const isClient = project.type === 'client';
  const mediaOrder = flip ? 'md:order-2' : '';
  const textOrder = flip ? 'md:order-1' : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className='grid md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center'
    >
      {/* Media */}
      <div className={`md:col-span-7 ${mediaOrder}`}>
        <ProjectMedia project={project} />
      </div>

      {/* Narrative */}
      <div className={`md:col-span-5 ${textOrder}`}>
        <div className='flex flex-wrap items-center gap-2 text-[12px] font-mono text-[var(--text-muted)]'>
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
          <span aria-hidden='true'>·</span>
          <span>{project.category}</span>
          {isClient && project.role && (
            <>
              <span aria-hidden='true'>·</span>
              <span className='text-[var(--text)]'>{project.role}</span>
            </>
          )}
        </div>

        <h3 className='mt-2 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text)]'>
          {project.title}
        </h3>
        <p className='mt-1 text-[14.5px] sm:text-[15px] text-[var(--text-secondary)]'>{project.tagline}</p>

        {/* Team context — makes the collaborative nature explicit */}
        {isClient && project.team && (
          <div className='mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-muted)]'>
            <Users className='w-3.5 h-3.5' />
            {project.team}
          </div>
        )}

        <div className='mt-6 space-y-4 text-[14.5px] leading-relaxed'>
          {isClient ? (
            <>
              <CaseBlock label='Overview'>{project.overview}</CaseBlock>
              {project.contributions?.length > 0 && (
                <div>
                  <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>
                    My contributions
                  </div>
                  <ul className='space-y-2'>
                    {project.contributions.map((c, idx) => (
                      <li key={idx} className='flex gap-2.5 text-[var(--text-secondary)]'>
                        <span
                          aria-hidden='true'
                          className='mt-2 h-1 w-1 rounded-full shrink-0'
                          style={{ background: 'var(--accent)' }}
                        />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <CaseBlock label='Problem'>{project.problem}</CaseBlock>
              <CaseBlock label='Solution'>{project.solution}</CaseBlock>
              <CaseBlock label='Challenges'>{project.challenges}</CaseBlock>
            </>
          )}
        </div>

        <TagList className='mt-6' items={project.tech} variant='muted' />

        {/* Links — only render when the URL is real */}
        <div className='mt-6 flex flex-wrap gap-2'>
          {isRealLink(project.links?.live) && (
            <a
              href={project.links.live}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-primary text-[13px]'
            >
              Live demo
              <ArrowUpRight className='w-3.5 h-3.5' />
            </a>
          )}
          {isRealLink(project.links?.github) && (
            <a
              href={project.links.github}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary text-[13px]'
            >
              <Github className='w-3.5 h-3.5' />
              {isClient ? 'Code' : 'Client'}
            </a>
          )}
          {isRealLink(project.links?.githubServer) && (
            <a
              href={project.links.githubServer}
              target='_blank'
              rel='noopener noreferrer'
              className='btn btn-secondary text-[13px]'
            >
              <Github className='w-3.5 h-3.5' />
              Server
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
