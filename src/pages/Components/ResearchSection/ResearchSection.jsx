import { ArrowRight, BookOpen, Calendar, ExternalLink, FileText, MapPin, Sparkles } from 'lucide-react';
import { useState } from 'react';
import PublicationDetail from '../../../components/ui/PublicationDetail';
import Reveal from '../../../components/ui/Reveal';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TagList } from '../../../components/ui/Tag';
import { useResearch } from '../../../hooks/usePortfolioData';

const ResearchSection = () => {
  const { data: research, isLoading } = useResearch();
  const [selectedPub, setSelectedPub] = useState(null);

  if (isLoading || !research) return null;

  const publications = research.publications || [];

  return (
    <>
      <section
        id='research'
        className='py-14 sm:py-20 md:py-28 border-b border-[var(--border)]'
        aria-label='Research and publications'
      >
        <div className='container-page'>
          <div className='grid md:grid-cols-12 gap-8 sm:gap-10 md:gap-14'>
            {/* Left Column: Section Header, Thesis & Research Pillars */}
            <div className='md:col-span-4 space-y-6'>
              <SectionHeader
                eyebrow='Research & Publications'
                title='Graduate research in applied AI.'
                subtitle='Studying how deep learning models can be built responsibly for real-world diagnostic imaging and security-critical systems.'
              />

              {/* Thesis Card */}
              {research.thesis && (
                <div className='surface-card p-5 rounded-2xl space-y-3'>
                  <div className='flex items-center gap-2'>
                    <div className='w-6 h-6 rounded-md bg-[var(--accent-soft)] border border-[var(--accent-border)] text-[var(--accent)] grid place-items-center text-xs'>
                      <Sparkles className='w-3.5 h-3.5' />
                    </div>
                    <span className='font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] font-semibold'>
                      Current Thesis
                    </span>
                  </div>
                  <h4 className='text-[15px] font-semibold text-[var(--text-main)] leading-snug'>
                    {research.thesis.title}
                  </h4>
                  <p className='text-[13px] leading-relaxed text-[var(--text-muted)]'>
                    {research.thesis.description}
                  </p>
                </div>
              )}

              {/* Research Interests Cloud */}
              {research.interests?.length > 0 && (
                <div className='surface-card p-5 rounded-2xl space-y-3'>
                  <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-dim)] font-semibold'>
                    Research Interests
                  </div>
                  <TagList items={research.interests} variant='secondary' />
                </div>
              )}

              {/* Future Direction Note */}
              {research.futureDirection && (
                <div className='p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[12.5px] leading-relaxed text-[var(--text-secondary)]'>
                  <span className='font-mono text-[10.5px] uppercase tracking-wider text-[var(--text-dim)] block mb-1 font-semibold'>
                    Future Direction
                  </span>
                  {research.futureDirection}
                </div>
              )}
            </div>

            {/* Right Column: Publication Cards */}
            <div className='md:col-span-8 space-y-5 sm:space-y-6'>
              <div className='flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]'>
                <span className='font-mono text-xs uppercase tracking-wider text-[var(--text-dim)]'>
                  Peer-Reviewed Publications ({publications.length})
                </span>
                <span className='badge-accent'>
                  <span className='badge-accent-dot' />
                  Active Scholar
                </span>
              </div>

              {publications.map((pub, i) => {
                const targetUrl = pub.url || pub.doiUrl || (pub.doi ? `https://doi.org/${pub.doi}` : null);
                return (
                  <Reveal
                    as='article'
                    key={pub._id || pub.id || i}
                    delay={i * 0.08}
                    className='surface-card group p-5 sm:p-6 md:p-7 flex flex-col justify-between hover:border-[var(--border-card-hover)] transition-all duration-300'
                    aria-labelledby={`pub-${pub._id || pub.id || i}-title`}
                  >
                    <div>
                      {/* Badge Row */}
                      <div className='flex flex-wrap items-center gap-2 mb-4'>
                        <span className='inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--accent)] font-medium'>
                          <BookOpen className='w-3 h-3' />
                          Peer-reviewed
                        </span>
                        <span className='inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--text-secondary)]'>
                          <Calendar className='w-3 h-3' />
                          {pub.year}
                        </span>
                        {pub.publisher && (
                          <span className='inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--text-main)] font-semibold'>
                            {pub.publisher}
                          </span>
                        )}
                        {pub.venue && (
                          <span className='inline-flex items-center gap-1 font-mono text-[11px] text-[var(--text-dim)] ml-auto hidden sm:inline-flex'>
                            <MapPin className='w-3 h-3 text-[var(--accent)]' />
                            {pub.venue}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        id={`pub-${pub._id || pub.id || i}-title`}
                        onClick={() => setSelectedPub(pub)}
                        className='text-[18px] sm:text-[20px] font-semibold text-[var(--text-main)] group-hover:text-[var(--text-main)] leading-snug tracking-tight cursor-pointer transition-colors'
                      >
                        {pub.title}
                      </h3>

                      {/* Authors & Outlet */}
                      <div className='mt-2.5 text-[13px] sm:text-[13.5px] text-[var(--text-secondary)] font-mono'>
                        <span className='text-[var(--accent)] font-medium mr-1.5'>
                          [{pub.role || 'Co-author'}]
                        </span>
                        <span className='text-[var(--text-muted)]'>
                          {pub.journal || pub.conference}
                        </span>
                      </div>

                      {/* Summary */}
                      <p className='mt-3.5 text-[14px] sm:text-[14.5px] leading-relaxed text-[var(--text-secondary)]'>
                        {pub.summary}
                      </p>

                      {/* Tags / Keywords */}
                      {pub.tags?.length > 0 && (
                        <div className='mt-4'>
                          <TagList items={pub.tags.slice(0, 5)} variant='muted' />
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Row */}
                    <div className='mt-6 pt-4 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3'>
                      <button
                        type='button'
                        onClick={() => setSelectedPub(pub)}
                        className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] sm:text-[13px] font-medium bg-[var(--bg-pill)] hover:bg-[var(--bg-pill-hover)] text-[var(--text-main)] border border-[var(--border-card)] hover:border-[var(--border-card-hover)] shadow-xs transition-all'
                        aria-label={`View abstract and details for ${pub.title}`}
                      >
                        <FileText className='w-3.5 h-3.5 text-[var(--accent)]' />
                        View abstract & details
                        <ArrowRight className='w-3.5 h-3.5' />
                      </button>

                      {targetUrl && (
                        <a
                          href={targetUrl}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='btn-ghost px-3.5 py-1.5 text-xs font-mono inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-main)]'
                        >
                          Read on {pub.publisher || 'Publisher'}
                          <ExternalLink className='w-3 h-3' />
                        </a>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Abstract & Publication Details Popup Modal */}
      {selectedPub && (
        <PublicationDetail
          publication={selectedPub}
          onClose={() => setSelectedPub(null)}
        />
      )}
    </>
  );
};

export default ResearchSection;
