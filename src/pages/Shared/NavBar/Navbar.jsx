import { ArrowUpRight, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import SocialLinks from '../../../components/ui/SocialLinks';
import { navLinks, personal } from '../../../data/portfolio';
import { useTheme } from '../../../hooks/useTheme';

// The full link row only fits from this width up; below it we use the drawer.
const DESKTOP_BP = 1024;

const panelVariants = {
  hidden: { x: '100%' },
  show: {
    x: 0,
    transition: { type: 'spring', stiffness: 320, damping: 34, mass: 0.9, staggerChildren: 0.045, delayChildren: 0.08 },
  },
  exit: { x: '100%', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close the drawer when the viewport grows past the desktop breakpoint.
  useEffect(() => {
    const handleResize = () => window.innerWidth >= DESKTOP_BP && setOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll while the drawer is open so background content doesn't
  // scroll under the fingers when swiping the menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on ESC for keyboard users, and move focus into the drawer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    closeButtonRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const hasResume = personal.resumeUrl && personal.resumeUrl !== '[ADD_RESUME_URL]';

  return (
    <>
      {/* Scroll progress */}
      <motion.div className='scroll-progress' style={{ scaleX: scrollYProgress }} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 pt-[env(safe-area-inset-top)] ${
          scrolled
            ? 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        role='banner'
      >
        <div className='container-page'>
          <div className='flex items-center justify-between h-14 sm:h-16 gap-2'>
            {/* Logo */}
            {/* No aria-label here: the visible text ("Sifat") is the accessible
                name, so voice-control users can say what they see. */}
            <a href='#top' onClick={close} className='flex items-center gap-2 group min-w-0 shrink'>
              <span
                aria-hidden='true'
                className='w-8 h-8 rounded-md bg-[var(--text)] text-[var(--bg)] grid place-items-center font-semibold text-sm shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105'
              >
                S
              </span>
              <span className='text-[15px] font-semibold tracking-tight text-[var(--text)] truncate'>
                {personal.shortName}
              </span>
            </a>

            {/* Desktop nav */}
            <nav className='hidden lg:flex items-center gap-0.5' aria-label='Primary'>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={`nav-link ${active === link.href ? 'active' : ''}`}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
              <motion.button
                type='button'
                onClick={toggle}
                whileTap={{ scale: 0.88 }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className='w-10 h-10 grid place-items-center rounded-md text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors overflow-hidden'
              >
                <AnimatePresence mode='wait' initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className='grid place-items-center'
                  >
                    {theme === 'dark' ? <Sun className='w-4 h-4' /> : <Moon className='w-4 h-4' />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {hasResume && (
                <a
                  href={personal.resumeUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hidden xl:inline-flex btn btn-secondary text-sm'
                >
                  Resume
                  <ArrowUpRight className='w-3.5 h-3.5' />
                </a>
              )}

              <a href='#contact' className='hidden md:inline-flex btn btn-primary'>
                Get in touch
              </a>

              <motion.button
                type='button'
                onClick={() => setOpen(true)}
                whileTap={{ scale: 0.88 }}
                aria-label='Open menu'
                aria-expanded={open}
                aria-controls='mobile-menu'
                className='lg:hidden w-10 h-10 grid place-items-center rounded-md text-[var(--text)] hover:bg-[var(--accent-soft)] transition-colors shrink-0'
              >
                <Menu className='w-5 h-5' />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key='nav-backdrop'
              type='button'
              tabIndex={-1}
              aria-label='Close menu'
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='lg:hidden fixed inset-0 z-[60] bg-[var(--bg)]/60 backdrop-blur-sm'
            />

            <motion.div
              key='nav-drawer'
              id='mobile-menu'
              role='dialog'
              aria-modal='true'
              aria-label='Site menu'
              variants={panelVariants}
              initial='hidden'
              animate='show'
              exit='exit'
              drag='x'
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0, right: 0.4 }}
              onDragEnd={(_, info) => (info.offset.x > 90 || info.velocity.x > 500) && close()}
              className='lg:hidden fixed top-0 right-0 bottom-0 z-[61] w-[min(20rem,86vw)] flex flex-col bg-[var(--bg-elevated)] border-l border-[var(--border)] shadow-[var(--shadow-lg)]'
            >
              <div className='flex items-center justify-between px-5 min-h-14 shrink-0 border-b border-[var(--border)] pt-[env(safe-area-inset-top)]'>
                <span className='eyebrow'>Menu</span>
                <motion.button
                  ref={closeButtonRef}
                  type='button'
                  onClick={close}
                  whileTap={{ scale: 0.88 }}
                  aria-label='Close menu'
                  className='w-10 h-10 -mr-2 grid place-items-center rounded-md text-[var(--text)] hover:bg-[var(--accent-soft)] transition-colors'
                >
                  <X className='w-5 h-5' />
                </motion.button>
              </div>

              <nav
                className='flex-1 overflow-y-auto overscroll-contain px-3 py-3 flex flex-col gap-0.5'
                aria-label='Mobile'
              >
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    variants={itemVariants}
                    whileTap={{ scale: 0.97 }}
                    className={`drawer-link ${active === link.href ? 'active' : ''}`}
                  >
                    <span className='drawer-link-index'>{String(i + 1).padStart(2, '0')}</span>
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                variants={itemVariants}
                className='shrink-0 border-t border-[var(--border)] px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] flex flex-col gap-3'
              >
                <div className='grid gap-2'>
                  {hasResume && (
                    <a
                      href={personal.resumeUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      onClick={close}
                      className='btn btn-secondary justify-center'
                    >
                      Resume
                      <ArrowUpRight className='w-3.5 h-3.5' />
                    </a>
                  )}
                  <a href='#contact' onClick={close} className='btn btn-primary justify-center'>
                    Get in touch
                  </a>
                </div>

                <div className='flex items-center justify-between gap-2'>
                  <a
                    href={`mailto:${personal.email}`}
                    className='inline-flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors min-w-0'
                  >
                    <Mail className='w-3.5 h-3.5 shrink-0' />
                    <span className='truncate'>{personal.email}</span>
                  </a>
                  <SocialLinks links={['github', 'linkedin']} className='-mr-2 shrink-0' />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
