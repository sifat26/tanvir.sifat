import { ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import SocialLinks from '../../../components/ui/SocialLinks';
import ResumeButton from '../../../components/ui/ResumeButton';
import { personal } from '../../../data/portfolio';

const HeroSection = () => {
  const hasResume = personal.resumeUrl && personal.resumeUrl !== '[ADD_RESUME_URL]';

  return (
    <section
      id='top'
      className='relative pt-32 md:pt-40 pb-20 md:pb-28 border-b border-[var(--border)]'
      aria-label='Introduction'
    >
      <div className='container-page'>
        <div className='grid lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='lg:col-span-8'
          >
            {/* Availability pill */}
            <div className='inline-flex items-center gap-2 mb-8 px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[12px] font-medium text-[var(--text-secondary)]'>
              <span className='relative flex h-1.5 w-1.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70' />
                <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500' />
              </span>
              Available for new opportunities
            </div>

            {/* Headline */}
            <h1 className='text-[2.4rem] sm:text-5xl md:text-6xl font-semibold tracking-tightest leading-[1.05] text-[var(--text)]'>
              Building scalable web applications
              <br className='hidden sm:block' />{' '}
              <span className='text-[var(--text-muted)]'>and intelligent systems.</span>
            </h1>

            {/* Intro */}
            <p className='mt-6 max-w-2xl text-[17px] md:text-[18px] leading-relaxed text-[var(--text-secondary)]'>
              I&apos;m {personal.name.split(' ').slice(0, 2).join(' ')} — a full-stack engineer shipping production web
              applications with React, Next.js, Node.js, and Express, and a graduate researcher applying deep learning
              to medical imaging, computer vision, and network security.
            </p>

            {/* Meta */}
            <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-[var(--text-muted)]'>
              <div className='inline-flex items-center gap-1.5'>
                <MapPin className='w-3.5 h-3.5' />
                {personal.location}
              </div>
              <div className='font-mono'>M.Sc. ICT — MBSTU</div>
              <div className='font-mono'>Full-stack · Frontend · AI</div>
            </div>

            {/* CTAs */}
            <div className='mt-9 flex flex-wrap items-center gap-3'>
              <a href='#projects' className='btn btn-primary'>
                View selected work
                <ArrowRight className='w-3.5 h-3.5' />
              </a>
              {hasResume ? (
                <ResumeButton variant='secondary' label='Download resume' />
              ) : (
                <a href='#contact' className='btn btn-secondary'>
                  Get in touch
                </a>
              )}
              <SocialLinks className='ml-1' links={['github', 'linkedin']} />
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className='lg:col-span-4 order-first lg:order-last'
          >
            <div className='relative w-40 h-40 sm:w-52 sm:h-52 lg:w-full lg:h-auto lg:max-w-[320px] lg:ml-auto aspect-square overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-subtle)]'>
              <img
                src={personal.portrait}
                alt={`${personal.name} — portrait`}
                width='320'
                height='320'
                fetchpriority='high'
                decoding='async'
                className='w-full h-full object-cover'
              />
            </div>
          </motion.div>
        </div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className='mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 border-t border-[var(--border)] pt-8'
        >
          {[
            { k: 'Current role', v: 'Web Developer, UTRDL' },
            { k: 'Client work', v: '3 production platforms shipped' },
            { k: 'Stack', v: 'React · Next.js · Node · Express' },
            { k: 'Publication', v: 'ITSS-IoE 2025, UK' },
          ].map((item) => (
            <div key={item.k}>
              <div className='text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-mono'>{item.k}</div>
              <div className='mt-1.5 text-[14px] text-[var(--text)]'>{item.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
