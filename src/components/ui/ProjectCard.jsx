import { ArrowRight, Users } from 'lucide-react';
import ProjectLinks from './ProjectLinks';
import ProjectPreview from './ProjectPreview';
import Reveal from './Reveal';
import { TagList } from './Tag';

/**
 * ProjectCard — the compact grid card: preview, title, one-line tagline, tech
 * tags, and exactly two actions ("View details" + "Live demo"). Repo links live
 * in the modal so every card's action row is the same height.
 */
const ProjectCard = ({ project, index = 0, onOpen }) => {
  const isClient = project.type === 'client';

  return (
    <Reveal
      as='article'
      delay={index * 0.07}
      className='card p-4 sm:p-5 flex flex-col h-full group'
    >
      <ProjectPreview project={project} />

      <div className='mt-5 flex flex-wrap items-center gap-2 font-mono text-[12px] text-[var(--text-muted)]'>
        <span
          className='inline-flex items-center px-1.5 py-0.5 rounded border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text)]'
        >
          {project.year}
        </span>
        <span aria-hidden='true'>·</span>
        <span>{project.category}</span>
      </div>

      <h3 className='mt-2 text-xl font-semibold tracking-tight text-[var(--text)]'>{project.title}</h3>
      <p className='mt-1.5 text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>{project.tagline}</p>

      {isClient && project.team && (
        <div className='mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-muted)]'>
          <Users className='w-3.5 h-3.5 shrink-0' />
          {project.team}
        </div>
      )}

      <TagList className='mt-4' items={project.tech} variant='muted' />

      {/* mt-auto pins the action row to the card bottom so cards in the same
          grid row align regardless of tagline or tag count. */}
      <div className='mt-auto pt-5 flex flex-wrap items-center gap-2'>
        <button
          type='button'
          onClick={() => onOpen(project)}
          className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] sm:text-[13px] font-medium bg-[var(--bg-subtle)] dark:bg-white/[0.06] hover:bg-[var(--bg-muted)] dark:hover:bg-white/[0.12] text-[var(--text)] dark:text-zinc-200 border border-[var(--border)] dark:border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-all'
          aria-label={`View details for ${project.title}`}
        >
          View details
          <ArrowRight className='w-3.5 h-3.5' />
        </button>
        <ProjectLinks project={project} only='live' />
      </div>
    </Reveal>
  );
};

export default ProjectCard;
