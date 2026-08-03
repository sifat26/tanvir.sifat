import { motion } from 'motion/react';
import Disclosure, { DisclosureToggle } from '../../../components/ui/Disclosure';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TagList } from '../../../components/ui/Tag';
import { experiences } from '../../../data/portfolio';
import { fadeUpDelay } from '../../../lib/motion';

const ExperienceSection = () => {
  return (
    <section
      id='experience'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='Professional experience'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <SectionHeader
            className='md:col-span-4'
            eyebrow='Experience'
            title="Where I've built."
            subtitle='Roles focused on shipping production frontend to real users.'
          />

          <div className='md:col-span-8 space-y-5 sm:space-y-6'>
            {experiences.map((exp, i) => (
              <motion.article key={exp.id} {...fadeUpDelay(i)} className='card p-5 sm:p-6 md:p-7'>
                <div className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1'>
                  <h3 className='text-[17px] font-semibold text-[var(--text)]'>
                    {exp.role} · {exp.shortName}
                  </h3>
                  <span className='font-mono text-[12px] text-[var(--text-muted)]'>{exp.period}</span>
                </div>
                <div className='mt-1 text-[13px] text-[var(--text-muted)]'>
                  {exp.company} · {exp.location} · {exp.type}
                </div>

                <p className='mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]'>{exp.summary}</p>

                {/* Each card owns its own open state — independent accordions. */}
                <Disclosure
                  renderToggle={(props) => <DisclosureToggle {...props} className='mt-4' />}
                  panelClassName='pt-4'
                >
                  <ul className='space-y-2.5'>
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className='flex gap-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>
                        <span
                          aria-hidden='true'
                          className='mt-2 h-1 w-1 rounded-full bg-[var(--text-muted)] shrink-0'
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <TagList className='mt-5' items={exp.tech} variant='muted' />
                </Disclosure>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
