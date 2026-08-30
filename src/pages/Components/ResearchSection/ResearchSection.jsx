import { BookOpen, Calendar, MapPin } from 'lucide-react';
import Disclosure, { DisclosureToggle } from '../../../components/ui/Disclosure';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TagList } from '../../../components/ui/Tag';
import { useResearch } from '../../../hooks/usePortfolioData';

const ResearchSection = () => {
  const { data: research, isLoading } = useResearch();

  if (isLoading || !research) return null;

  return (
    <section
      id='research'
      className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='Research and publications'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14 mb-10 sm:mb-12'>
          <SectionHeader
            className='md:col-span-4'
            eyebrow='Research & Publications'
            title='Graduate research in applied AI.'
            subtitle='Studying how deep learning models can be built responsibly for real-world diagnostic imaging and security-critical systems.'
          />

          <div className='md:col-span-8'>
            {/* Publication card */}
            {(research.publications || []).map((pub, i) => (
              <Reveal
                as='article'
                key={pub._id || i}
                className='card p-5 sm:p-6 md:p-8'
                aria-labelledby={`pub-${pub._id || i}-title`}
              >
                {/* Conference badge row */}
                <div className='flex flex-wrap items-center gap-2 mb-5'>
                  <span className='inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-subtle)] text-[var(--text)]'>
                    <BookOpen className='w-3 h-3' />
                    Peer-reviewed
                  </span>
                  <span className='inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-md border border-[var(--border)] text-[var(--text-secondary)]'>
                    <Calendar className='w-3 h-3' />
                    {pub.year}
                  </span>
                  <span className='inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-1 rounded-md border border-[var(--border)] text-[var(--text-secondary)]'>
                    <MapPin className='w-3 h-3' />
                    United Kingdom
                  </span>
                </div>

                <h3
                  id={`pub-${pub._id || i}-title`}
                  className='text-[19px] md:text-[22px] font-semibold text-[var(--text)] leading-snug tracking-tight'
                >
                  {pub.title}
                </h3>

                <div className='mt-4 space-y-2 text-[14px] text-[var(--text-secondary)]'>
                  <div>
                    <span className='text-[var(--text-muted)] font-mono text-[12px] uppercase tracking-wider mr-2'>
                      Conference
                    </span>
                    {pub.conference}
                  </div>
                  <div>
                    <span className='text-[var(--text-muted)] font-mono text-[12px] uppercase tracking-wider mr-2'>
                      Venue
                    </span>
                    {pub.venue}
                  </div>
                </div>

                <p className='mt-5 pt-5 border-t border-[var(--border)] text-[15px] leading-relaxed text-[var(--text-secondary)]'>
                  {pub.summary}
                </p>

                <Disclosure
                  renderToggle={(props) => <DisclosureToggle {...props} className='mt-4' />}
                  panelClassName='pt-4 space-y-4'
                >
                  <div>
                    <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5'>
                      Context
                    </div>
                    <p className='text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>{pub.context}</p>
                  </div>

                  <div>
                    <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5'>
                      Why it matters
                    </div>
                    <p className='text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>{pub.abstract}</p>
                  </div>

                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-subtle)] p-4'>
                      <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3'>
                        Research interests
                      </div>
                      <TagList items={research.interests || []} variant='secondary' />
                    </div>

                    <div className='rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-subtle)] p-4'>
                      <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>
                        Current thesis
                      </div>
                      <div className='text-[14.5px] font-medium text-[var(--text)]'>{research.thesis?.title}</div>
                      <p className='mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]'>
                        {research.thesis?.description}
                      </p>
                    </div>

                    <div className='sm:col-span-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-subtle)] p-4'>
                      <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>
                        Future direction
                      </div>
                      <p className='text-[14px] leading-relaxed text-[var(--text-secondary)]'>
                        {research.futureDirection}
                      </p>
                    </div>
                  </div>

                  <TagList items={pub.tags || []} variant='muted' />
                </Disclosure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
