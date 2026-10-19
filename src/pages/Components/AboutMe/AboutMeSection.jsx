import { Brain, Layers, MapPin, Server, Sparkles, Zap } from 'lucide-react';
import Disclosure from '../../../components/ui/Disclosure';
import ResumeButton from '../../../components/ui/ResumeButton';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useAbout, usePersonal } from '../../../hooks/usePortfolioData';

const PILLARS = [
  {
    num: '01',
    category: 'Scale',
    title: 'Full-Stack Delivery',
    description:
      'Production React, Next.js, and Angular interfaces backed by Node.js, Express, and relational databases. Deployed to IIS, VPS, and cloud.',
    metric: '3+ Platforms Shipped',
    icon: Layers,
  },
  {
    num: '02',
    category: 'AI Research',
    title: 'Published AI Research',
    description:
      'Graduate M.Sc. research in deep learning, medical image analysis, and network security. Peer-reviewed paper presented at ITSS-IoE 2025 (UK).',
    metric: '98% Model Accuracy',
    icon: Brain,
  },
  {
    num: '03',
    category: 'Architecture',
    title: 'End-to-End Ownership',
    description:
      'From database schemas and typed REST API contracts to production deployments, automated builds, and server management.',
    metric: 'Zero-Handoff Dev',
    icon: Server,
  },
  {
    num: '04',
    category: 'Craft',
    title: 'Clean UI Craft',
    description:
      'Obsession with sub-50ms micro-interactions, dark mode surface depth, fluid responsiveness, and accessible semantic components.',
    metric: 'WCAG AA & Polish',
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

        {/* Bottom Bento: Engineering Pillars & Core Metrics */}
        <div className='mt-12 sm:mt-16 md:mt-20'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[var(--border-subtle)]'>
            <div className='flex items-center gap-2.5'>
              <div className='w-6 h-6 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] grid place-items-center text-xs'>
                <Zap className='w-3.5 h-3.5' />
              </div>
              <span className='font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]'>
                Engineering Pillars & Technical Focus
              </span>
            </div>
            <div className='flex items-center gap-2 font-mono text-[11px] text-[var(--text-dim)]'>
              <span className='w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse' />
              Production Systems · Applied Deep Learning
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'>
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal
                  key={pillar.num}
                  delay={i * 0.07}
                  className='surface-card group p-5 sm:p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-[var(--border-card-hover)] transition-all duration-300'
                >
                  <div>
                    <div className='flex items-center justify-between'>
                      <span className='font-mono text-[10.5px] font-bold text-[var(--accent)] uppercase tracking-wider'>
                        {pillar.num} · {pillar.category}
                      </span>
                      <div className='w-8 h-8 rounded-lg bg-[var(--bg-pill)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:border-[var(--accent-border)] transition-colors'>
                        <Icon className='w-4 h-4' />
                      </div>
                    </div>

                    <h3 className='mt-3.5 text-[15px] sm:text-[16px] font-semibold text-[var(--text-main)] transition-colors'>
                      {pillar.title}
                    </h3>

                    <p className='mt-2 text-[12.5px] sm:text-[13px] text-[var(--text-muted)] leading-relaxed'>
                      {pillar.description}
                    </p>
                  </div>

                  <div className='mt-5 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between'>
                    <span className='inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-[var(--text-main)] bg-[var(--bg-pill)] px-2.5 py-1 rounded-md border border-[var(--border-subtle)] group-hover:border-[var(--accent-border)] transition-colors'>
                      <span className='w-1.5 h-1.5 rounded-full bg-[var(--accent)]' />
                      {pillar.metric}
                    </span>
                    <span className='text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-wider'>
                      Pillar
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
