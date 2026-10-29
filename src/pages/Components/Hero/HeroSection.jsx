import { ArrowRight, Briefcase, Code2, GraduationCap, MapPin, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import ResumeButton from '../../../components/ui/ResumeButton';
import SocialLinks from '../../../components/ui/SocialLinks';
import { usePersonal } from '../../../hooks/usePortfolioData';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

/**
 * A tiny live "type-writer" demo of code — proves this is a builder,
 * not a blog. Cycles through short frontend snippets.
 */
const CODE_LINES = [
  { k: 'const', v: 'role', op: '=', val: "'Frontend Engineer'" },
  { k: 'const', v: 'stack', op: '=', val: "['React', 'Next', 'Node']" },
  { k: 'const', v: 'shipped', op: '=', val: '3 // production apps' },
  { k: 'const', v: 'focus', op: '=', val: "'UI · UX · Performance'" },
];

const LiveCodeCard = () => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % CODE_LINES.length), 2200);
    return () => clearInterval(id);
  }, []);
  const line = CODE_LINES[i];
  return (
    /* demo-window CSS is always-dark in both themes — see .demo-window in index.css */
    <div className='demo-window rounded-2xl overflow-hidden'>
      <div className='demo-window-bar px-4 py-2.5 flex items-center gap-1.5'>
        <span className='demo-window-dot' style={{ background: '#ff5f57' }} />
        <span className='demo-window-dot' style={{ background: '#febc2e' }} />
        <span className='demo-window-dot' style={{ background: '#28c840' }} />
        <span className='ml-2 font-mono text-[11px] text-white/40'>~/sifat/portfolio.tsx</span>
      </div>
      <div className='p-4 sm:p-5 font-mono text-[11.5px] sm:text-[13px] leading-relaxed'>
        <div className='text-white/30'>// live component, updates every 2s</div>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='mt-2 flex flex-wrap items-center'
        >
          <span className='text-purple-400 font-medium'>{line.k}</span>
          <span className='text-zinc-100 font-medium mx-1.5'>{line.v}</span>
          <span className='text-zinc-500 mr-1.5'>{line.op}</span>
          <span className='text-emerald-400'>{line.val}</span>
        </motion.div>
        <div className='mt-3 text-white/40'>
          <span className='text-emerald-400'>{'>'}</span> ready in <span className='text-white font-medium'>42ms</span>
        </div>
      </div>
    </div>
  );
};

const StatCell = ({ label, value, icon: Icon }) => (
  <div className='rounded-2xl border border-[var(--border-card)] p-4 bg-[var(--bg-card)] dark:backdrop-blur-md shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] hover:border-[var(--border-card-hover)] transition-all duration-300'>
    <div className='flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]'>
      {Icon && <Icon className='w-3.5 h-3.5' />}
      {label}
    </div>
    <div className='mt-2 text-[15px] font-semibold text-[var(--text)]'>{value}</div>
  </div>
);

const HeroSection = () => {
  const { data: personal, isLoading } = usePersonal();
  const reduced = useReducedMotion();

  if (isLoading || !personal) {
    return <div className='min-h-[80vh] flex items-center justify-center text-[var(--text-muted)]'>Loading...</div>;
  }

  const hasResume = personal.resumeUrl && personal.resumeUrl !== '[ADD_RESUME_URL]';
  // Above the fold: a short fade only, no transform, so nothing delays the
  // first paint. Skipped entirely under prefers-reduced-motion.
  const intro = (delay) =>
    reduced ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.35, delay } };

  return (
    <section
      id='top'
      className='relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 md:pb-20 border-b border-[var(--border-card)] overflow-hidden'
      aria-label='Introduction'
    >
      {/* Signature background — grid + gradient blobs */}
      <div aria-hidden className='absolute inset-0 bg-grid opacity-60 pointer-events-none' />
      <div
        aria-hidden
        className='gradient-blob'
        style={{
          width: 520,
          height: 520,
          top: -140,
          right: -120,
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.07), rgba(20, 184, 166, 0.03) 50%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className='gradient-blob'
        style={{
          width: 380,
          height: 380,
          bottom: -80,
          left: -100,
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.05), transparent 70%)',
          animationDelay: '-4s',
        }}
      />

      <div className='container-page relative'>
        <div className='grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start'>
          {/* Copy */}
          <motion.div {...intro(0)} className='lg:col-span-7'>
            {/* Availability pill — emerald badge-accent */}
            {personal.availability && (
              <div className='badge-accent mb-6 sm:mb-8'>
                <span className='badge-accent-dot' />
                {personal.availability}
              </div>
            )}

            {/* Headline with metallic gradient accent */}
            <h1 className='text-[clamp(2rem,8vw,2.7rem)] sm:text-5xl md:text-6xl font-semibold tracking-tightest leading-[1.05] text-[var(--text)]'>
              {personal.headline.split('scalable')[0]}
              <span className='bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent drop-shadow-sm font-semibold'>
                scalable
              </span>
              {personal.headline.split('scalable')[1]}
            </h1>

            {/* Intro */}
            <p className='mt-5 sm:mt-6 max-w-2xl text-[15.5px] sm:text-[17px] md:text-[18px] leading-relaxed text-[var(--text-secondary)]'>
              {personal.intro}
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
                <ResumeButton variant='secondary' label='Download resume' url={personal.resumeUrl} />
              ) : (
                <a href='#contact' className='btn btn-secondary'>
                  Get in touch
                </a>
              )}
              <SocialLinks className='sm:ml-1' variant='tactile' />
            </div>
          </motion.div>

          {/* Interactive bento visual */}
          <motion.div {...intro(0.08)} className='lg:col-span-5 order-last lg:order-last'>
            <div className='grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0 lg:ml-auto'>
              {/* Portrait tile — compact balanced profile card */}
              <div className='col-span-1 rounded-2xl border border-[var(--border-card)] hover:border-[var(--border-card-hover)] p-0 overflow-hidden bg-[var(--bg-card)] shadow-xs transition-all duration-300'>
                <div className='relative aspect-[4/5] sm:aspect-square overflow-hidden group'>
                  <picture>
                    {personal.portraitWebp && <source srcSet={personal.portraitWebp} type='image/webp' />}
                    <img
                      src={personal.portrait}
                      alt={`${personal.name} — portrait`}
                      width='800'
                      height='1000'
                      fetchpriority='high'
                      decoding='async'
                      className='w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]'
                    />
                  </picture>
                  <div
                    aria-hidden
                    className='absolute inset-0 pointer-events-none'
                    style={{
                      background: 'linear-gradient(180deg, transparent 65%, rgba(0,0,0,0.5) 100%)',
                    }}
                  />
                  <div className='absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-center pointer-events-none'>
                    <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-emerald-300 text-[11px] font-mono'>
                      <span className='w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse' />
                      Open to roles
                    </div>
                  </div>
                </div>
              </div>

              {/* Small stats stacked beside portrait */}
              <div className='col-span-1 flex flex-col justify-between gap-3 sm:gap-4'>
                <StatCell label='Shipped' value='3 platforms' icon={Zap} />
                <StatCell label='Stack' value='React · Next · Node' icon={Code2} />
              </div>

              {/* Live code demo across full width */}
              <div className='col-span-2'>
                <LiveCodeCard />
              </div>

              {/* Bottom metric cells — fills the blank space and perfectly aligns with CTAs */}
              <StatCell label='Current Role' value='Web Dev @ UTRDL' icon={Briefcase} />
              <StatCell label='Research' value='3 Papers · ICT' icon={GraduationCap} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
