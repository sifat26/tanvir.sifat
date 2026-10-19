import { Brain, Layers, MapPin, Server, Sparkles } from 'lucide-react';
import Disclosure from '../../../components/ui/Disclosure';
import ResumeButton from '../../../components/ui/ResumeButton';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useAbout, usePersonal } from '../../../hooks/usePortfolioData';

const PILLARS = [
  {
    num: '01',
    category: 'SCALE',
    title: 'Full-Stack Delivery',
    description:
      'Production React, Next.js, and Angular interfaces backed by Node.js, Express, and relational databases. Deployed to IIS, VPS, and cloud.',
    metric: '3+ Platforms Shipped',
    context: 'React · Next.js · Node',
    icon: Layers,
  },
  {
    num: '02',
    category: 'AI RESEARCH',
    title: 'Published AI Research',
    description:
      'Graduate M.Sc. research in deep learning, medical image analysis, and network security. Peer-reviewed paper presented at ITSS-IoE 2025 (UK).',
    metric: '98% Model Accuracy',
    context: 'Springer · ITSS-IoE',
    icon: Brain,
  },
  {
    num: '03',
    category: 'ARCHITECTURE',
    title: 'End-to-End Ownership',
    description:
      'From database schemas and typed REST API contracts to production deployments, automated builds, and server management.',
    metric: 'Zero-Handoff Dev',
    context: 'Schema → Cloud',
    icon: Server,
  },
  {
    num: '04',
    category: 'CRAFT',
    title: 'Clean UI Craft',
    description:
      'Obsession with sub-50ms micro-interactions, dark mode surface depth, fluid responsiveness, and accessible semantic components.',
    metric: 'WCAG AA & Polish',
    context: '< 50ms Interactions',
    icon: Sparkles,
  },
];

const AboutMeSection = () => {
  const { data: about, isLoading: isAboutLoading } = useAbout();
  const { data: personal, isLoading: isPersonalLoading } = usePersonal();

  if (isAboutLoading || isPersonalLoading || !about || !personal) {
    return null;
  }

  return (
    <section
      id='about'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border-card)] bg-[var(--bg-page)]'
      aria-label='About Tanvir Ahmmed Sifat'
    >
      <div className='container-page'>
        {/* Top Split: Section Header & Narrative Bio */}
        <div className='grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start'>
          <div className='lg:col-span-5 space-y-5'>
            <SectionHeader eyebrow='About' title={about.headline} />

            {/* Quick Badges: Status & Location */}
            <div className='flex flex-wrap items-center gap-2.5 pt-1'>
              <span className='badge-accent'>
                <span className='badge-accent-dot' />
                {personal.availability || 'Open to roles'}
              </span>
              {personal.location && (
                <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11.5px] font-mono text-[var(--text-muted)] bg-[var(--bg-pill)] border border-[var(--border-subtle)]'>
                  <MapPin className='w-3 h-3 text-[var(--accent)]' />
                  {personal.location}
                </span>
              )}
            </div>
          </div>

          <Reveal className='lg:col-span-7 space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-[var(--text-secondary)] lg:pt-3'>
            {(about.short || []).map((p, i) => (
              <p key={i} className='first:text-[var(--text-main)] first:font-medium'>
                {p}
              </p>
            ))}

            {(about.paragraphs || []).length > 0 && (
              <Disclosure panelClassName='space-y-5 pt-4' toggleClassName='mt-1'>
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Disclosure>
            )}

            <div className='pt-2 flex flex-wrap items-center gap-3'>
              <ResumeButton variant='secondary' url={personal.resumeUrl} />
              <a
                href='#contact'
                className='btn-ghost px-5 py-2.5 text-xs font-mono tracking-wide'
              >
                Get in touch →
              </a>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bento: Engineering Pillars (Spacious 2x2 Grid) */}
        <div className='mt-12 sm:mt-16 md:mt-20'>
          {/* Minimal Section Header Bar */}
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[var(--border-subtle)]'>
            <span className='font-mono text-xs uppercase tracking-widest text-[var(--accent)]'>
              • Engineering Pillars
            </span>
            <span className='font-mono text-xs text-[var(--text-dim)]'>
              Production Systems · Applied Deep Learning
            </span>
          </div>

          {/* Balanced 2x2 Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5'>
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.num}
                  delay={i * 0.08}
                  className='surface-card group bg-[var(--bg-card)] border border-[var(--border-card)] hover:border-[var(--border-card-hover)] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200'
                >
                  <div>
                    {/* Top Row: Icon Left, Index Label Right */}
                    <div className='flex items-center justify-between'>
                      <div className='w-9 h-9 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent-border)] transition-colors'>
                        <Icon className='w-4 h-4' />
                      </div>
                      <span className='font-mono text-[11px] tracking-widest uppercase text-[var(--text-dim)]'>
                        <span className='text-[var(--accent)] font-semibold'>{pillar.num}</span> · {pillar.category}
                      </span>
                    </div>

                    <h3 className='mt-4 text-[16px] sm:text-[17px] font-semibold text-[var(--text-main)] transition-colors'>
                      {pillar.title}
                    </h3>

                    <p className='mt-2 text-[13px] sm:text-[13.5px] text-[var(--text-muted)] leading-relaxed'>
                      {pillar.description}
                    </p>
                  </div>

                  {/* Footer Row: Metric Pill Left, Tech Context Right */}
                  <div className='pt-4 mt-6 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3'>
                    <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] font-mono text-xs whitespace-nowrap shrink-0'>
                      <span className='w-1.5 h-1.5 rounded-full bg-[var(--accent)]' />
                      {pillar.metric}
                    </span>
                    <span className='font-mono text-[11px] text-[var(--text-dim)] truncate min-w-0 text-right'>
                      {pillar.context}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
