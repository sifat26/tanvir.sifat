import SocialLinks from '../../../components/ui/SocialLinks';
import { navLinks } from '../../../data/portfolio';
import { usePersonal } from '../../../hooks/usePortfolioData';

const Footer = () => {
  const year = new Date().getFullYear();
  const { data: personal } = usePersonal();

  return (
    <footer className='border-t border-[var(--border)] py-10 sm:py-12 md:py-16' role='contentinfo'>
      <div className='container-page'>
        <div className='grid md:grid-cols-12 gap-8 sm:gap-10'>
          {/* Brand */}
          <div className='md:col-span-5'>
            {/* No aria-label: the visible name is the accessible name, so
                voice-control users can activate it by what they see. */}
            <a href='#top' className='inline-flex items-center gap-2' title='Back to top'>
              <div
                aria-hidden='true'
                className='w-8 h-8 rounded-md bg-[var(--text)] text-[var(--bg)] grid place-items-center font-semibold text-sm'
              >
                {personal ? personal.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <span className='text-[15px] font-semibold tracking-tight text-[var(--text)]'>
                {personal ? personal.name : 'Loading...'}
              </span>
            </a>
            <p className='mt-4 max-w-sm text-[14px] leading-relaxed text-[var(--text-secondary)]'>
              Frontend Engineer &amp; AI Researcher. Building modern web applications and intelligent systems.
            </p>
            <SocialLinks className='mt-5 -ml-2' />
          </div>

          {/* Sitemap */}
          <div className='md:col-span-4'>
            <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3'>Sitemap</div>
            <ul className='grid grid-cols-2 gap-y-2'>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className='text-[14px] text-[var(--text-secondary)] hover:text-[var(--text)]'>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Availability */}
          <div className='md:col-span-3'>
            <div className='text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-3'>
              Availability
            </div>
            {personal?.availability && (
              <div className='inline-flex items-center gap-2 text-[13.5px] text-[var(--text-secondary)]'>
                <span className='relative flex h-1.5 w-1.5'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-70' />
                  <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500' />
                </span>
                {personal.availability}
              </div>
            )}
          </div>
        </div>

        <div className='mt-8 sm:mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left'>
          <p className='text-[12.5px] text-[var(--text-muted)]'>
            © {year} {personal?.name}. All rights reserved.
          </p>
          <p className='text-[12.5px] text-[var(--text-muted)] font-mono'>Built with React, Vite, Tailwind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
