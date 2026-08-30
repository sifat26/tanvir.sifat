import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { usePersonal, useSocials } from '../../hooks/usePortfolioData';

/**
 * SocialLinks — the row of icon links duplicated in Hero, Footer, and Contact.
 * Pass `links` to control which appear and their order. `email` maps to the
 * mailto: address; the rest come from the `socials` data.
 */

const SocialLinks = ({ links = ['github', 'linkedin'], className = '' }) => {
  const { data: personal } = usePersonal();
  const { data: socials } = useSocials();

  if (!personal || !socials) return null;

  const ICONS = {
    email: { Icon: Mail, label: 'Email', href: `mailto:${personal.email}` },
    github: { Icon: Github, label: 'GitHub', href: socials.github },
    linkedin: { Icon: Linkedin, label: 'LinkedIn', href: socials.linkedin },
    twitter: { Icon: Twitter, label: 'X (Twitter)', href: socials.twitter },
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
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
            className='w-9 h-9 grid place-items-center rounded-md text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)] transition-colors'
          >
            <Icon className='w-4 h-4' />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
