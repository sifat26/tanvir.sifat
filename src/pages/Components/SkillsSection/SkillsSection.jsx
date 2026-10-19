import { Boxes, Cloud, Code2, Cpu, Database, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TechIcon } from '../../../components/ui/Tag';
import { useSkills } from '../../../hooks/usePortfolioData';

/**
 * Icon lookup per group — monochrome, uses design tokens only.
 * All groups share the same neutral accent so the section feels cohesive.
 */
const GROUP_META = {
  Frontend: { icon: Code2 },
  Backend: { icon: Boxes },
  'AI / ML': { icon: Cpu },
  Databases: { icon: Database },
  Deployment: { icon: Cloud },
  Tools: { icon: Wrench },
};

/**
 * Proportional column spans on desktop to create a perfectly balanced
 * 12-column bento grid where cards with fewer items don't have empty dead space.
 */
const SPAN_BY_GROUP = {
  Frontend: 'lg:col-span-8',
  Databases: 'lg:col-span-4',
  Backend: 'lg:col-span-6',
  Deployment: 'lg:col-span-6',
  'AI / ML': 'lg:col-span-5',
  Tools: 'lg:col-span-7',
};

const BENTO_ORDER = ['Frontend', 'Databases', 'Backend', 'Deployment', 'AI / ML', 'Tools'];

/**
 * BentoSkill — a single group tile with mouse-tracked spotlight,
 * accent icon, and tech-icon chips.
 */
const BentoSkill = ({ group, items, index }) => {
  const meta = GROUP_META[group] || { icon: Code2 };
  const Icon = meta.icon;
  const spanClass = SPAN_BY_GROUP[group] || 'lg:col-span-6';

  return (
    <Reveal delay={index * 0.05} className={`bento group ${spanClass} flex flex-col`}>
      <div>
        <div className='flex items-center justify-between'>
          <div className='w-9 h-9 rounded-lg grid place-items-center border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--accent)] transition-colors shadow-xs'>
            <Icon className='w-4 h-4' />
          </div>
          <div className='text-[10.5px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
            {items.length} tools
          </div>
        </div>

        <div className='mt-4 text-[15px] font-semibold text-[var(--text-main)]'>{group}</div>

        <ul className='mt-3.5 flex flex-wrap gap-2'>
          {items.map((item) => (
            <li
              key={item}
              className='inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-pill)] hover:border-[var(--border-card-hover)] hover:bg-[var(--bg-pill-hover)] text-[var(--text-secondary)] hover:text-[var(--text-main)] transition-colors group/item shadow-xs cursor-default'
            >
              <TechIcon
                name={item}
                className='w-3.5 h-3.5 shrink-0 transition-transform group-hover/item:scale-110'
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
};

const SkillsSection = () => {
  const { data: skills, isLoading } = useSkills();

  const orderedSkills = useMemo(() => {
    if (!skills) return [];
    return [...skills].sort((a, b) => {
      const idxA = BENTO_ORDER.indexOf(a.group);
      const idxB = BENTO_ORDER.indexOf(b.group);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      return 0;
    });
  }, [skills]);

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

        <div className='grid sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5'>
          {orderedSkills.map((g, i) => (
            <BentoSkill key={g._id || g.group} group={g.group} items={g.items || []} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
