import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { usePersonal, useSocials } from '../../hooks/usePortfolioData';

/**
 * SocialLinks — the row of icon links duplicated in Hero, Footer, and Contact.
 * Pass `links` to control which appear and their order. `email` maps to the
 * mailto: address; the rest come from the `socials` data.
 */

const SocialLinks = ({ links = ['github', 'linkedin'], variant = 'tactile', className = '' }) => {
  const { data: personal } = usePersonal();
  const { data: socials } = useSocials();

  if (!personal || !socials) return null;

  const ICONS = {
    email: { Icon: Mail, label: 'Email', href: `mailto:${personal.email}` },
    github: { Icon: Github, label: 'GitHub', href: socials.github },
    linkedin: { Icon: Linkedin, label: 'LinkedIn', href: socials.linkedin },
    twitter: { Icon: Twitter, label: 'X (Twitter)', href: socials.twitter },
  };

  const isTactile = variant === 'tactile';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {links.map((key) => {
        const item = ICONS[key];
        if (!item || !item.href) return null;
        const { Icon, label, href } = item;
        const isExternal = !href.startsWith('mailto:');
        return (
          <a
            key={key}
            href={href}
            aria-label={label}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className={
              isTactile
                ? 'w-10 h-10 rounded-xl border border-[var(--border)] dark:border-white/10 bg-[var(--bg-subtle)] dark:bg-white/[0.02] hover:bg-[var(--bg-muted)] dark:hover:bg-white/[0.08] hover:border-[var(--border-strong)] dark:hover:border-white/20 text-[var(--text-muted)] hover:text-[var(--text)] dark:text-zinc-400 dark:hover:text-white flex items-center justify-center transition-all shadow-xs dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
                : 'w-9 h-9 grid place-items-center rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)] transition-colors'
            }
          >
            <Icon className='w-4 h-4' />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
