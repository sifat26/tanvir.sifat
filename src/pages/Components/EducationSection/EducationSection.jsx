import { motion } from 'motion/react';
import { education } from '../../../data/portfolio';
import SectionHeader from '../../../components/ui/SectionHeader';

const EducationSection = () => {
  return (
    <section id='education' className='py-20 md:py-28 border-b border-[var(--border)]' aria-label='Education'>
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-10 md:gap-14'>
          <SectionHeader className='md:col-span-4' eyebrow='Education' title='Academic background.' />

          <div className='md:col-span-8'>
            <ol className='relative border-l border-[var(--border)] pl-6 space-y-8'>
              {education.map((e, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                >
                  <span className='absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--text)] ring-4 ring-[var(--bg)]' />
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
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
