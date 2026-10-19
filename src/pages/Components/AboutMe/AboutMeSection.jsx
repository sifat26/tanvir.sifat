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
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)] bg-[var(--bg-subtle)]'
      aria-label='About Tanvir Ahmmed Sifat'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
          <div className='md:col-span-4'>
            <SectionHeader eyebrow='About' title={about.headline} />

            {/* Engineering Philosophy & Core Metrics bento card */}
            <div className='mt-6 sm:mt-8 p-5 rounded-2xl border border-[var(--border)] dark:border-white/[0.08] bg-[var(--bg-elevated)] dark:bg-zinc-900/40 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] space-y-4'>
              <div className='flex items-center justify-between border-b border-[var(--border)] dark:border-white/[0.07] pb-3'>
                <div className='flex items-center gap-2'>
                  <div className='w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 grid place-items-center text-xs'>
                    <Zap className='w-3.5 h-3.5' />
                  </div>
                  <span className='font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]'>
                    Core Philosophy
                  </span>
                </div>
                <span className='inline-flex items-center gap-1.5 text-[10.5px] font-mono text-emerald-400'>
                  <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                  Active
                </span>
              </div>

              <div className='space-y-3'>
                <div className='flex items-start gap-2.5'>
                  <span className='text-[10px] text-zinc-500 font-mono font-bold mt-0.5'>01</span>
                  <div>
                    <div className='text-[var(--text)] font-medium text-[13px]'>Performance-First Architecture</div>
                    <div className='text-[var(--text-muted)] text-[12px] mt-0.5 leading-snug'>
                      Sub-50ms interactions, zero unneeded re-renders, and tree-shaken bundles.
                    </div>
                  </div>
                </div>

                <div className='flex items-start gap-2.5'>
                  <span className='text-[10px] text-zinc-500 font-mono font-bold mt-0.5'>02</span>
                  <div>
                    <div className='text-[var(--text)] font-medium text-[13px]'>End-to-End Ownership</div>
                    <div className='text-[var(--text-muted)] text-[12px] mt-0.5 leading-snug'>
                      From component design and typed APIs to production server deployments.
                    </div>
                  </div>
                </div>

                <div className='flex items-start gap-2.5'>
                  <span className='text-[10px] text-zinc-500 font-mono font-bold mt-0.5'>03</span>
                  <div>
                    <div className='text-[var(--text)] font-medium text-[13px]'>Rigorous Research</div>
                    <div className='text-[var(--text-muted)] text-[12px] mt-0.5 leading-snug'>
                      Springer-published hybrid deep learning model with 98% CT accuracy.
                    </div>
                  </div>
                </div>
              </div>

              <div className='pt-2.5 border-t border-[var(--border)] dark:border-white/[0.07] grid grid-cols-2 gap-2 text-center'>
                <div className='p-2 rounded-lg bg-[var(--bg-subtle)] dark:bg-white/[0.02] border border-[var(--border)] dark:border-white/[0.05]'>
                  <div className='text-[15px] font-semibold text-[var(--text)] font-mono'>3+</div>
                  <div className='text-[10px] text-[var(--text-muted)] font-mono uppercase tracking-wider mt-0.5'>Platforms Shipped</div>
                </div>
                <div className='p-2 rounded-lg bg-[var(--bg-subtle)] dark:bg-white/[0.02] border border-[var(--border)] dark:border-white/[0.05]'>
                  <div className='text-[15px] font-semibold text-[var(--text)] font-mono'>98%</div>
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
