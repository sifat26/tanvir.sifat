import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useEducation } from '../../../hooks/usePortfolioData';

const EducationSection = () => {
  const { data: education, isLoading } = useEducation();

  if (isLoading || !education) return null;

  return (
    <section id='education' className='py-14 sm:py-20 md:py-28 border-b border-[var(--border-card)]' aria-label='Education'>
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <SectionHeader className='md:col-span-4' eyebrow='Education' title='Academic background.' />

          <div className='md:col-span-8'>
            <ol
              className='relative border-l border-[var(--border-card)] pl-6 space-y-8'
              style={{
                borderImageSource: 'linear-gradient(to bottom, var(--accent), var(--border-card) 75%, transparent)',
                borderImageSlice: 1,
              }}
            >
              {education.map((e, i) => {
                const isActive = e.status === 'In progress' || i === 0;
                return (
                  <Reveal as='li' key={e._id || i} delay={i * 0.05} className='relative'>
                    {/* Timeline Node */}
                    {isActive ? (
                      <span
                        className='absolute -left-[30px] mt-1.5 w-3 h-3 rounded-full ring-4 ring-emerald-500/20 shadow-[0_0_12px_var(--accent-glow)]'
                        style={{ background: 'var(--accent)' }}
                      >
                        <span
                          className='animate-ping absolute inset-0 rounded-full opacity-50'
                          style={{ background: 'var(--accent)' }}
                        />
                      </span>
                    ) : (
                      <span className='absolute -left-[29px] mt-1.5 w-2.5 h-2.5 rounded-full bg-[var(--bg-pill)] ring-4 ring-[var(--bg-page)] border border-[var(--border-card)]' />
                    )}

                    {/* Entry content: M.Sc. is wrapped in highlighted surface-card */}
                    {isActive ? (
                      <div className='surface-card border border-[var(--accent-border)] p-4 sm:p-5 rounded-2xl'>
                        <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                          <div className='text-[15.5px] font-semibold text-[var(--accent)]'>{e.degree}</div>
                          <div className='font-mono text-[12px] text-[var(--accent)] bg-[var(--accent-soft)] border border-[var(--accent-border)] px-2.5 py-1 rounded-md'>
                            {e.period}
                          </div>
                        </div>
                        <div className='mt-1 text-[13.5px] text-[var(--text-muted)]'>
                          {e.institute} · <span className='text-[var(--accent)] font-medium'>{e.status}</span>
                        </div>
                        {e.notes?.length > 0 && (
                          <ul className='mt-3 space-y-2'>
                            {e.notes.map((n, idx) => (
                              <li key={idx} className='text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                                {n}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <div className='py-0.5'>
                        <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                          <div className='text-[15.5px] font-semibold text-[var(--text-main)]'>{e.degree}</div>
                          <div className='font-mono text-[12px] text-[var(--text-muted)] bg-[var(--bg-pill)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-md'>
                            {e.period}
                          </div>
                        </div>
                        <div className='mt-1 text-[13.5px] text-[var(--text-muted)]'>
                          {e.institute} · {e.status}
                        </div>
                        {e.notes?.length > 0 && (
                          <ul className='mt-3 space-y-2'>
                            {e.notes.map((n, idx) => {
                              const isGpa = /GPA/i.test(n);
                              return (
                                <li key={idx} className='text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                                  {isGpa ? (
                                    <span className='inline-flex items-center bg-[var(--bg-pill)] border border-[var(--border-subtle)] px-2.5 py-1 rounded-md font-mono text-xs text-[var(--text-main)] font-semibold'>
                                      {n.trim()}
                                    </span>
                                  ) : (
                                    n
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    )}
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
