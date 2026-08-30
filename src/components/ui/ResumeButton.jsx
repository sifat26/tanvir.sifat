import { Download } from 'lucide-react';
import { usePersonal } from '../../hooks/usePortfolioData';

/**
 * ResumeButton — the single source of truth for "download my resume" across
 * the site (Hero, About, Contact, preview card). The `download` attribute
 * triggers a direct file download; `target="_blank"` is the fallback for
 * browsers/contexts that don't honor it (e.g. in-app browsers), which then
 * open the PDF in a new tab. Renders nothing until a real resume URL is set.
 */
const ResumeButton = ({
  variant = 'primary',
  className = '',
  label = 'Download Resume',
  showIcon = true,
  url: propUrl,
}) => {
  const { data: personal } = usePersonal();

  const url = propUrl || personal?.resumeUrl;
  if (!url || url === '[ADD_RESUME_URL]') return null;

  const handleClick = () => {
    fetch(`${import.meta.env.VITE_API_URL}/analytics/resume`, { method: 'POST' }).catch(console.error);
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      download
      target='_blank'
      rel='noopener noreferrer'
      className={`btn btn-${variant} ${className}`}
    >
      {showIcon && <Download className='w-3.5 h-3.5' />}
      {label}
    </a>
  );
};

export default ResumeButton;
