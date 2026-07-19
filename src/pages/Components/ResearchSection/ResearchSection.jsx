import { motion } from 'motion/react';
import { BookOpen, Calendar, MapPin } from 'lucide-react';
import { research } from '../../../data/portfolio';
import SectionHeader from '../../../components/ui/SectionHeader';
import { TagList } from '../../../components/ui/Tag';

const ResearchSection = () => {
  return (
    <section
      id='research'
      className='py-20 md:py-28 border-b border-[var(--border)]'
      aria-label='Research and publications'
    >
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-10 md:gap-14 mb-12'>
          <SectionHeader
            className='md:col-span-4'
            eyebrow='Research & Publications'
            title='Graduate research in applied AI.'
            subtitle='Studying how deep learning models can be built responsibly for real-world diagnostic imaging and security-critical systems.'
          />

          <div className='md:col-span-8'>
            {/* Publication card */}
            {research.publications.map((pub) => (
              <motion.article
                key={pub.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4 }}
                className='card p-6 md:p-8'
                aria-labelledby={`pub-${pub.id}-title`}
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
                  id={`pub-${pub.id}-title`}
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
                  <div>
                    <span className='text-[var(--text-muted)] font-mono text-[12px] uppercase tracking-wider mr-2'>
                      Context
                    </span>
                    {pub.context}
                  </div>
                </div>

                <p className='mt-5 pt-5 border-t border-[var(--border)] text-[15px] leading-relaxed text-[var(--text-secondary)]'>
                  {pub.abstract}
                </p>

                <TagList className='mt-5' items={pub.tags} variant='muted' />
              </motion.article>
            ))}

            {/* Research interests + thesis + future direction */}
            <div className='mt-8 grid sm:grid-cols-2 gap-6'>
              <div className='card p-5'>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3'>
                  Research interests
                </div>
                <TagList items={research.interests} variant='secondary' />
              </div>

              <div className='card p-5'>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>
                  Current thesis
                </div>
                <div className='text-[14.5px] font-medium text-[var(--text)]'>{research.thesis.title}</div>
                <p className='mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]'>
                  {research.thesis.description}
                </p>
              </div>

              <div className='card p-5 sm:col-span-2'>
                <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2'>
                  Future direction
                </div>
                <p className='text-[14px] leading-relaxed text-[var(--text-secondary)]'>{research.futureDirection}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className='mt-6'>
          <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-6'>
            Research timeline
          </div>
          <ol className='relative border-l border-[var(--border)] pl-6 space-y-8'>
            {research.timeline.map((t, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <span className='absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-[var(--text)] ring-4 ring-[var(--bg)]' />
                <div className='font-mono text-[12px] text-[var(--text-muted)]'>{t.year}</div>
                <div className='mt-1 text-[15.5px] font-medium text-[var(--text)]'>{t.title}</div>
                <p className='mt-1 text-[14px] leading-relaxed text-[var(--text-secondary)] max-w-2xl'>
                  {t.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
