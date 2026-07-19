import ProjectCard from '../../../components/ui/ProjectCard';
import SectionHeader from '../../../components/ui/SectionHeader';
import { clientProjects, projects } from '../../../data/portfolio';

const GroupLabel = ({ badge, title, note }) => (
  <div className='flex flex-wrap items-center gap-3 mb-10 md:mb-12'>
    <span className='inline-flex items-center font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text)]'>
      {badge}
    </span>
    <h3 className='text-[17px] font-semibold text-[var(--text)]'>{title}</h3>
    {note && <span className='text-[13px] text-[var(--text-muted)]'>{note}</span>}
  </div>
);

const ProjectsSection = () => {
  return (
    <section
      id='projects'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='Selected projects'
    >
      <div className='container-page'>
        <SectionHeader
          className='max-w-xl mb-10 sm:mb-14 md:mb-20'
          eyebrow='Selected Work'
          title="Production platforms and things I've built."
          subtitle='Paid client work first, then personal projects — each a short read on the problem, the approach, and what shipped.'
        />

        {/* Professional client work */}
        <div className='mb-14 sm:mb-20 md:mb-28'>
          <GroupLabel badge='Client Work' title='Professional Client Projects' note='Paid, live in production' />
          <p className='-mt-4 sm:-mt-6 mb-8 sm:mb-10 md:mb-12 max-w-2xl text-[14px] sm:text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>
            Paid client projects delivered collaboratively with a 3-member development team. The points below highlight
            my individual contributions within each project.
          </p>
          <div className='space-y-12 sm:space-y-16 md:space-y-24'>
            {clientProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} flip={i % 2 === 1} />
            ))}
          </div>
        </div>

        {/* Personal projects */}
        <div>
          <GroupLabel badge='Personal' title='Selected personal projects' note='Full-stack, self-directed' />
          <div className='space-y-12 sm:space-y-16 md:space-y-24'>
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
