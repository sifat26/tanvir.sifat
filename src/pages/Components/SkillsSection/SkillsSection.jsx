import { Boxes, Cloud, Code2, Cpu, Database, Wrench } from 'lucide-react';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TechIcon } from '../../../components/ui/Tag';
import { useSkills } from '../../../hooks/usePortfolioData';

/**
 * Icon lookup per group with refined palette.
 */
const GROUP_META = {
  Frontend: { icon: Code2, accent: '#6366f1' },
  Backend: { icon: Boxes, accent: '#8b5cf6' },
  'AI / ML': { icon: Cpu, accent: '#0ea5e9' },
  Databases: { icon: Database, accent: '#06b6d4' },
  Deployment: { icon: Cloud, accent: '#10b981' },
  Tools: { icon: Wrench, accent: '#f59e0b' },
};

/**
 * BentoSkill — a single group tile with mouse-tracked spotlight,
 * accent icon, and tech-icon chips.
 */
const BentoSkill = ({ group, items, index }) => {
  const meta = GROUP_META[group] || { icon: Code2, accent: 'var(--accent)' };
  const Icon = meta.icon;

  return (
    <Reveal delay={index * 0.05} className='bento group'>
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

      <ul className='mt-3.5 flex flex-wrap gap-2'>
        {items.map((item) => (
          <li
            key={item}
            className='inline-flex items-center gap-1.5 font-mono text-[12px] px-2.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-all group/item shadow-xs cursor-default'
          >
            <TechIcon
              name={item}
              className='w-3.5 h-3.5 shrink-0 transition-transform group-hover/item:scale-115'
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
};

const SkillsSection = () => {
  const { data: skills, isLoading } = useSkills();

  if (isLoading || !skills) return null;

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
            <BentoSkill key={g._id || g.group} group={g.group} items={g.items || []} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
