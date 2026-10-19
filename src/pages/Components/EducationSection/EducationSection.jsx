import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useEducation } from '../../../hooks/usePortfolioData';

const EducationSection = () => {
  const { data: education, isLoading } = useEducation();

  if (isLoading || !education) return null;

  return (
    <section id='education' className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]' aria-label='Education'>
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <SectionHeader className='md:col-span-4' eyebrow='Education' title='Academic background.' />

          <div className='md:col-span-8'>
            <ol className='relative border-l border-[var(--border)] pl-6 space-y-8'>
              {education.map((e, i) => {
                const isActive = e.status === 'In progress' || i === 0;
                return (
                  <Reveal as='li' key={e._id || i} delay={i * 0.05}>
                    {isActive ? (
                      <span className='absolute -left-[6px] mt-1.5 w-3 h-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 shadow-[0_0_10px_rgba(52,211,153,0.4)]'>
                        <span className='animate-ping absolute inset-0 rounded-full bg-emerald-400 opacity-50' />
                      </span>
                    ) : (
                      <span className='absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700 ring-4 ring-[var(--bg)] dark:ring-zinc-900' />
                    )}
                    <div className='flex flex-wrap items-baseline justify-between gap-x-4'>
                      <div className='text-[15.5px] font-semibold text-[var(--text)]'>{e.degree}</div>
                      <div className='font-mono text-[12px] text-[var(--text-muted)]'>{e.period}</div>
                    </div>
                  <div className='mt-1 text-[13.5px] text-[var(--text-muted)]'>
                    {e.institute} · {e.status}
                  </div>
                    {e.notes?.length > 0 && (
                      <ul className='mt-3 space-y-1.5'>
                        {e.notes.map((n, idx) => (
                          <li key={idx} className='text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                            {n}
                          </li>
                        ))}
                      </ul>
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
