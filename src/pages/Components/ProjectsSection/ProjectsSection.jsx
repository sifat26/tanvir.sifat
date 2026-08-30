import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ProjectCard from '../../../components/ui/ProjectCard';
import ProjectDetail from '../../../components/ui/ProjectDetail';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useProjects } from '../../../hooks/usePortfolioData';

const GroupLabel = ({ badge, title, note, count, accent }) => (
  <div className='flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8'>
    <div className='flex items-center gap-3'>
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
      {note && <span className='text-[13px] text-[var(--text-muted)] hidden sm:inline'>{note}</span>}
    </div>
    {count !== undefined && (
      <span className='font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-subtle)] border border-[var(--border)] px-2 py-0.5 rounded'>
        {count} {count === 1 ? 'project' : 'projects'}
      </span>
    )}
  </div>
);

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);
  const [filterTech, setFilterTech] = useState(null);
  const [showAllPersonal, setShowAllPersonal] = useState(false);

  const { data: clientProjects, isLoading: isClientLoading } = useProjects('client');
  const { data: personalProjects, isLoading: isPersonalLoading } = useProjects('personal');

  if (isClientLoading || isPersonalLoading) return null;

  const hasClient = clientProjects && clientProjects.length > 0;
  const hasPersonal = personalProjects && personalProjects.length > 0;

  if (!hasClient && !hasPersonal) return null;

  // Extract unique technologies and sort by frequency
  const allProjects = [...(clientProjects || []), ...(personalProjects || [])];
  const techCount = {};
  allProjects.forEach((p) => {
    (p.tech || []).forEach((t) => {
      techCount[t] = (techCount[t] || 0) + 1;
    });
  });
  const allTechs = Object.keys(techCount).sort((a, b) => techCount[b] - techCount[a]);

  const filteredClient = filterTech
    ? clientProjects.filter((p) => (p.tech || []).includes(filterTech))
    : clientProjects;

  const filteredPersonal = filterTech
    ? personalProjects.filter((p) => (p.tech || []).includes(filterTech))
    : personalProjects;

  // When filtering by tech, always show all matching items; otherwise respect showAllPersonal
  const displayedPersonal = filterTech || showAllPersonal
    ? filteredPersonal
    : filteredPersonal.slice(0, 3);

  const canTogglePersonal = !filterTech && filteredPersonal.length > 3;

  return (
    <>
      <section
        id='projects'
        className='relative py-14 sm:py-20 md:py-28 border-b border-[var(--border)] overflow-hidden'
        aria-label='Selected projects'
      >
        <div aria-hidden className='absolute inset-0 bg-dots opacity-30 pointer-events-none' />

        <div className='container-page relative'>
          <SectionHeader
            className='max-w-2xl mb-8'
            eyebrow='Selected Work'
            title="Production platforms I've shipped."
          />

          {allTechs.length > 0 && (
            <div className='flex flex-wrap items-center gap-2 mb-10 sm:mb-14'>
              <button
                onClick={() => setFilterTech(null)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
                  !filterTech
                    ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)]'
                    : 'bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--text)]'
                }`}
              >
                All Projects
              </button>
              {allTechs.slice(0, 15).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilterTech(tech)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${
                    filterTech === tech
                      ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                      : 'bg-transparent text-[var(--text-muted)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--text)]'
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}

          {/* Professional client work — completely unchanged */}
          {hasClient && filteredClient.length > 0 && (
            <div className='mb-14 sm:mb-20'>
              <GroupLabel
                badge='● Client Work'
                title='Client projects'
                note='Live in production'
                count={filteredClient.length}
                accent='var(--accent)'
              />
              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
                {filteredClient.map((p, i) => (
                  <ProjectCard key={p._id || p.id || i} project={p} index={i} onOpen={setSelected} />
                ))}
              </div>
            </div>
          )}

          {/* Personal projects — curated with top 3 priority + expandable view all */}
          {hasPersonal && filteredPersonal.length > 0 && (
            <div>
              <GroupLabel
                badge='Personal'
                title='Personal projects'
                note='Full-stack · self-directed'
                count={filteredPersonal.length}
              />
              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
                {displayedPersonal.map((p, i) => (
                  <ProjectCard key={p._id || p.id || i} project={p} index={i} onOpen={setSelected} />
                ))}
              </div>

              {canTogglePersonal && (
                <div className='mt-8 sm:mt-10 flex justify-center'>
                  <button
                    onClick={() => setShowAllPersonal((prev) => !prev)}
                    className='btn btn-secondary text-xs sm:text-sm py-2.5 px-5 flex items-center gap-2 group'
                  >
                    <span>
                      {showAllPersonal
                        ? 'Show featured only'
                        : `View all ${filteredPersonal.length} personal projects`}
                    </span>
                    {showAllPersonal ? (
                      <ChevronUp className='w-4 h-4 transition-transform group-hover:-translate-y-0.5' />
                    ) : (
                      <ChevronDown className='w-4 h-4 transition-transform group-hover:translate-y-0.5' />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {filterTech && filteredClient.length === 0 && filteredPersonal.length === 0 && (
            <div className='text-center py-12 text-[var(--text-muted)]'>
              No projects found using {filterTech}.
            </div>
          )}
        </div>
      </section>

      {/* Detail drawer modal */}
      <ProjectDetail project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default ProjectsSection;
