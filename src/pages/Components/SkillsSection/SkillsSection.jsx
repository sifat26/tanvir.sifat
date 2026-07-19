import { motion } from 'motion/react';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TagList } from '../../../components/ui/Tag';
import { skills } from '../../../data/portfolio';
import { fadeUpDelay } from '../../../lib/motion';

const SkillsSection = () => {
  return (
    <section
      id='skills'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='Technical skills'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <SectionHeader
            className='md:col-span-4'
            eyebrow='Technical Skills'
            title='A focused toolkit.'
            subtitle='What I use in production and in research. Depth over breadth.'
          />

          <div className='md:col-span-8 grid sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8'>
            {skills.map((g, i) => (
              <motion.div key={g.group} {...fadeUpDelay(i, { duration: 0.35, step: 0.04 })}>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3'>
                  {g.group}
                </div>
                <TagList as='ul' itemAs='li' items={g.items} variant='solid' />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
