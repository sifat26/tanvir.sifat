import { ArrowRight, Code2, MapPin, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import ResumeButton from '../../../components/ui/ResumeButton';
import SocialLinks from '../../../components/ui/SocialLinks';
import { personal } from '../../../data/portfolio';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * A tiny live "type-writer" demo of code — proves this is a builder,
 * not a blog. Cycles through short frontend snippets.
 */
const CODE_LINES = [
  { k: 'const', v: ' role', op: ' = ', val: "'Frontend Engineer'" },
  { k: 'const', v: ' stack', op: ' = ', val: "['React','Next','Node']" },
  { k: 'const', v: ' shipped', op: ' = ', val: '3 // production apps' },
  { k: 'const', v: ' focus', op: ' = ', val: "'UI · UX · Performance'" },
];

const LiveCodeCard = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % CODE_LINES.length), 2200);
    return () => clearInterval(id);
  }, []);
  const line = CODE_LINES[i];
  return (
    <div className='demo-window'>
      <div className='demo-window-bar'>
        <span className='demo-window-dot' style={{ background: '#ff5f57' }} />
        <span className='demo-window-dot' style={{ background: '#febc2e' }} />
        <span className='demo-window-dot' style={{ background: '#28c840' }} />
        <span className='ml-2 font-mono text-[11px] text-[var(--text-muted)]'>~/sifat/portfolio.tsx</span>
      </div>
      <div className='p-4 sm:p-5 font-mono text-[13px] leading-relaxed'>
        <div className='text-[var(--text-muted)]'>// live component, updates every 2s</div>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='mt-2 flex flex-wrap'
        >
          <span style={{ color: 'var(--accent)' }}>{line.k}</span>
          <span className='text-[var(--text)]'>{line.v}</span>
          <span className='text-[var(--text-muted)]'>{line.op}</span>
          <span className='text-[var(--text-secondary)]'>{line.val}</span>
        </motion.div>
        <div className='mt-3 text-[var(--text-muted)]'>
          <span className='text-green-500'>{'>'}</span> ready in <span className='text-[var(--text)]'>42ms</span>
        </div>
      </div>
    </div>
  );
};

const StatCell = ({ label, value, icon: Icon }) => (
  <div className='bento p-4'>
    <div className='flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
      {Icon && <Icon className='w-3.5 h-3.5' />}
      {label}
    </div>
    <div className='mt-2 text-[15px] font-semibold text-[var(--text)]'>{value}</div>
  </div>
);

const HeroSection = () => {
  const hasResume = personal.resumeUrl && personal.resumeUrl !== '[ADD_RESUME_URL]';
  const reduced = useReducedMotion();
  // Above the fold: a short fade only, no transform, so nothing delays the
  // first paint. Skipped entirely under prefers-reduced-motion.
  const intro = (delay) =>
    reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.35, delay } };

  return (
    <section
      id='top'
      className='relative pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 md:pb-28 border-b border-[var(--border)] overflow-hidden'
      aria-label='Introduction'
    >
      {/* Signature background — grid + gradient blobs */}
      <div aria-hidden className='absolute inset-0 bg-grid opacity-60 pointer-events-none' />
      <div
        aria-hidden
        className='gradient-blob'
        style={{
          width: 420,
          height: 420,
          top: -100,
          right: -80,
          background: 'radial-gradient(circle, #22c55e, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className='gradient-blob'
        style={{
          width: 360,
          height: 360,
          bottom: -80,
          left: -60,
          background: 'radial-gradient(circle, #4ade80, transparent 70%)',
          animationDelay: '-4s',
        }}
      />

      <div className='container-page relative'>
        <div className='grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center'>
          {/* Copy */}
          <motion.div {...intro(0)} className='lg:col-span-7'>
            {/* Availability pill */}
            <div className='inline-flex items-center gap-2 mb-6 sm:mb-8 px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-subtle)] text-[12px] font-medium text-[var(--text-secondary)]'>
              <span className='relative flex h-1.5 w-1.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full dot-live opacity-70' />
                <span className='relative inline-flex rounded-full h-1.5 w-1.5 dot-live' />
              </span>
              Available for new opportunities
            </div>

            {/* Headline with gradient accent */}
            <h1 className='text-[clamp(2rem,8vw,2.7rem)] sm:text-5xl md:text-6xl font-semibold tracking-tightest leading-[1.05] text-[var(--text)]'>
              Building <span className='text-gradient'>scalable</span> web applications.
            </h1>

            {/* Intro */}
            <p className='mt-5 sm:mt-6 max-w-2xl text-[15.5px] sm:text-[17px] md:text-[18px] leading-relaxed text-[var(--text-secondary)]'>
              Frontend-focused full-stack engineer shipping production apps with{' '}
              <span className='font-medium text-[var(--text)]'>React, Next.js, and Node</span>.
            </p>

            {/* Meta */}
            <div className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-[var(--text-muted)]'>
              <div className='inline-flex items-center gap-1.5'>
                <MapPin className='w-3.5 h-3.5' />
                {personal.location}
              </div>
              <div className='font-mono'>2+ yrs shipping</div>
            </div>

            {/* CTAs */}
            <div className='mt-7 sm:mt-9 flex flex-wrap items-center gap-2.5 sm:gap-3'>
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
              <SocialLinks className='sm:ml-1' links={['github', 'linkedin']} />
            </div>
          </motion.div>

          {/* Interactive bento visual */}
          <motion.div {...intro(0.08)} className='lg:col-span-5 order-first lg:order-last'>
            <div className='grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0 lg:ml-auto'>
              {/* Portrait tile — spans full width row */}
              <div className='col-span-2 bento p-0 overflow-hidden'>
                <div className='relative aspect-[16/10]'>
                  <picture>
                    <source srcSet={personal.portraitWebp} type='image/webp' />
                    <img
                      src={personal.portrait}
                      alt={`${personal.name} — portrait`}
                      width='960'
                      height='600'
                      fetchpriority='high'
                      decoding='async'
                      className='w-full h-full object-cover'
                    />
                  </picture>
                  <div
                    aria-hidden
                    className='absolute inset-0'
                    style={{
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%)',
                    }}
                  />
                  <div className='absolute bottom-3 left-3 right-3 flex items-center justify-between'>
                    <div>
                      <div className='text-[11px] font-mono uppercase tracking-wider text-white/70'>Currently</div>
                      <div className='text-white text-[13px] font-medium'>Web Developer · UTRDL</div>
                    </div>
                    <div className='inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/15 backdrop-blur border border-white/20 text-white text-[11px] font-mono'>
                      <Sparkles className='w-3 h-3' />
                      Open to roles
                    </div>
                  </div>
                </div>
              </div>

              {/* Live code demo */}
              <div className='col-span-2'>
                <LiveCodeCard />
              </div>

              {/* Small stats */}
              <StatCell label='Shipped' value='3 platforms' icon={Zap} />
              <StatCell label='Stack' value='React · Next · Node' icon={Code2} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
