import { useState } from 'react';
import ProjectCard from '../../../components/ui/ProjectCard';
import ProjectDetail from '../../../components/ui/ProjectDetail';
import SectionHeader from '../../../components/ui/SectionHeader';
import { clientProjects, projects } from '../../../data/portfolio';

const GroupLabel = ({ badge, title, note, accent }) => (
  <div className='flex flex-wrap items-center gap-3 mb-6 sm:mb-8'>
    <span
      className='inline-flex items-center font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-md border'
      style={{
        color: accent || 'var(--text)',
        borderColor: accent ? `color-mix(in oklab, ${accent} 35%, transparent)` : 'var(--border-strong)',
        background: accent ? `color-mix(in oklab, ${accent} 10%, transparent)` : 'var(--bg-subtle)',
      }}
    >
      {badge}
    </span>
    <h3 className='text-[17px] font-semibold text-[var(--text)]'>{title}</h3>
    {note && <span className='text-[13px] text-[var(--text-muted)]'>{note}</span>}
  </div>
);

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section
        id='projects'
        className='relative py-14 sm:py-20 md:py-28 border-b border-[var(--border)] overflow-hidden'
        aria-label='Selected projects'
      >
        {/* Subtle backdrop */}
        <div aria-hidden className='absolute inset-0 bg-dots opacity-30 pointer-events-none' />

        <div className='container-page relative'>
          <SectionHeader
            className='max-w-2xl mb-10 sm:mb-14'
            eyebrow='Selected Work'
            title="Production platforms I've shipped."
          />

          {/* Professional client work */}
          <div className='mb-14 sm:mb-20'>
            <GroupLabel
              badge='● Client Work'
              title='Client projects'
              note='Team of 3 · live in production'
              accent='var(--accent)'
            />
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
              {clientProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
              ))}
            </div>
          </div>

          {/* Personal projects */}
          <div>
            <GroupLabel badge='Personal' title='Personal projects' note='Full-stack · self-directed' />
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
              {projects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outside the section: its `overflow-hidden` would otherwise risk
          clipping the fixed-position panel. */}
      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default ProjectsSection;
