import { Zap } from 'lucide-react';
import Disclosure from '../../../components/ui/Disclosure';
import ResumeButton from '../../../components/ui/ResumeButton';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { useAbout, usePersonal } from '../../../hooks/usePortfolioData';

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
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <div className='md:col-span-4'>
            <SectionHeader eyebrow='About' title={about.headline} />

            {/* Engineering Pillars & Quick Metrics — surface-card */}
            <div className='surface-card mt-6 sm:mt-8 p-5 space-y-4'>
              <div className='flex items-center justify-between border-b border-[var(--border-card)] pb-3'>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] grid place-items-center text-xs'>
                    <Zap className='w-3.5 h-3.5' />
                  </div>
                  <span className='font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]'>
                    Engineering Pillars
                  </span>
                </div>
                <span className='badge-accent'>
                  <span className='badge-accent-dot' />
                  Active
                </span>
              </div>

              {/* 2x2 Pillars Grid */}
              <div className='grid grid-cols-2 gap-2.5'>
                <div className='p-3 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] space-y-1'>
                  <div className='text-[10px] text-[var(--accent)] font-mono font-bold uppercase tracking-wider'>01 · Scale</div>
                  <div className='text-[var(--text-main)] font-semibold text-[13px] leading-tight'>Full-Stack Delivery</div>
                  <div className='text-[var(--text-muted)] text-[11.5px] leading-snug'>Production React, Next.js & Node.js systems.</div>
                </div>

                <div className='p-3 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] space-y-1'>
                  <div className='text-[10px] text-[var(--accent)] font-mono font-bold uppercase tracking-wider'>02 · AI</div>
                  <div className='text-[var(--text-main)] font-semibold text-[13px] leading-tight'>Published AI Research</div>
                  <div className='text-[var(--text-muted)] text-[11.5px] leading-snug'>Springer-published deep learning with 98% accuracy.</div>
                </div>

                <div className='p-3 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] space-y-1'>
                  <div className='text-[10px] text-[var(--accent)] font-mono font-bold uppercase tracking-wider'>03 · Architecture</div>
                  <div className='text-[var(--text-main)] font-semibold text-[13px] leading-tight'>End-to-End Ownership</div>
                  <div className='text-[var(--text-muted)] text-[11.5px] leading-snug'>From DB models & typed APIs to cloud deploys.</div>
                </div>

                <div className='p-3 rounded-xl bg-[var(--bg-pill)] border border-[var(--border-subtle)] space-y-1'>
                  <div className='text-[10px] text-[var(--accent)] font-mono font-bold uppercase tracking-wider'>04 · Craft</div>
                  <div className='text-[var(--text-main)] font-semibold text-[13px] leading-tight'>Clean UI Craft</div>
                  <div className='text-[var(--text-muted)] text-[11.5px] leading-snug'>Sub-50ms interactions, dark mode & polish.</div>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className='pt-2.5 border-t border-[var(--border-card)] grid grid-cols-2 gap-2 text-center'>
                <div className='p-2 rounded-lg bg-[var(--bg-pill)] border border-[var(--border-card)]'>
                  <div className='text-[15px] font-semibold text-[var(--text-main)] font-mono'>3+</div>
                  <div className='text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider mt-0.5'>Platforms Shipped</div>
                </div>
                <div className='p-2 rounded-lg bg-[var(--bg-pill)] border border-[var(--border-card)]'>
                  <div className='text-[15px] font-semibold text-[var(--text-main)] font-mono'>98%</div>
                  <div className='text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider mt-0.5'>Model Accuracy</div>
                </div>
              </div>
            </div>
          </div>

          <Reveal className='md:col-span-8 space-y-5 text-[15px] sm:text-[16px] leading-[1.7] text-[var(--text-secondary)]'>
            {(about.short || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {(about.paragraphs || []).length > 0 && (
              <Disclosure panelClassName='space-y-5 pt-5' toggleClassName='mt-1'>
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Disclosure>
            )}

            <div className='pt-2'>
              <ResumeButton variant='secondary' url={personal.resumeUrl} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
