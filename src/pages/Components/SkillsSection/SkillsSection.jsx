import { Boxes, Cloud, Code2, Cpu, Database, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef } from 'react';
import SectionHeader from '../../../components/ui/SectionHeader';
import { skills } from '../../../data/portfolio';
import { fadeUpDelay } from '../../../lib/motion';

/**
 * Icon lookup per group. Palette is anchored on emerald and stays within
 * a cool, cohesive range (emerald → teal → sky → slate) instead of the
 * previous rainbow — reads as a professional product surface.
 */
const GROUP_META = {
  Frontend: { icon: Code2, accent: '#10b981' },
  Backend: { icon: Boxes, accent: '#0d9488' },
  'AI / ML': { icon: Cpu, accent: '#0ea5e9' },
  Databases: { icon: Database, accent: '#0891b2' },
  Deployment: { icon: Cloud, accent: '#059669' },
  Tools: { icon: Wrench, accent: '#64748b' },
};

/**
 * BentoSkill — a single group tile with a mouse-tracked spotlight,
 * accent icon, and chip cluster.
 */
const BentoSkill = ({ group, items, index }) => {
  const ref = useRef(null);
  const meta = GROUP_META[group] || { icon: Code2, accent: 'var(--accent)' };
  const Icon = meta.icon;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      {...fadeUpDelay(index, { duration: 0.4, step: 0.05 })}
      className='bento group'
    >
      <div className='flex items-center justify-between'>
        <div
          className='w-9 h-9 rounded-lg grid place-items-center border transition-colors'
          style={{
            borderColor: `color-mix(in oklab, ${meta.accent} 35%, var(--border))`,
            background: `color-mix(in oklab, ${meta.accent} 12%, transparent)`,
            color: meta.accent,
          }}
        >
          <Icon className='w-4 h-4' />
        </div>
        <div className='text-[10.5px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
          {items.length} tools
        </div>
      </div>

      <div className='mt-4 text-[15px] font-semibold text-[var(--text)]'>{group}</div>

      <ul className='mt-3 flex flex-wrap gap-1.5'>
        {items.map((item) => (
          <li
            key={item}
            className='font-mono text-[11.5px] px-2 py-1 rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] transition-colors group-hover:text-[var(--text)]'
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const SkillsSection = () => {
  return (
    <section
      id='skills'
      className='relative py-14 sm:py-20 md:py-28 border-b border-[var(--border)] overflow-hidden'
      aria-label='Technical skills'
    >
      {/* Subtle dot texture */}
      <div aria-hidden className='absolute inset-0 bg-dots opacity-40 pointer-events-none' />

      <div className='container-page relative'>
        <SectionHeader
          className='max-w-2xl mb-10 sm:mb-14'
          eyebrow='Technical Skills'
          title='A focused toolkit — depth over breadth.'
          subtitle='Tools I use daily in production and research.'
        />

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
          {skills.map((g, i) => (
            <BentoSkill key={g.group} group={g.group} items={g.items} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
