import ResumeCard from '../../../components/ui/ResumeCard';
import { personal } from '../../../data/portfolio';

/**
 * ResumeSection — thin wrapper that drops the ResumeCard into the page flow
 * between Education and Contact. Renders nothing until a resume URL is set, so
 * the section disappears cleanly if the resume is ever removed.
 */
const ResumeSection = () => {
  if (!personal.resumeUrl || personal.resumeUrl === '[ADD_RESUME_URL]') return null;

  return (
    <section id='resume' className='py-20 md:py-28 border-b border-[var(--border)]' aria-label='Resume'>
      <div className='container-page max-w-3xl'>
        <ResumeCard />
      </div>
    </section>
  );
};

export default ResumeSection;
