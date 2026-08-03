import { ArrowUpRight, Github } from 'lucide-react';
import { isRealLink } from '../../lib/links';

/**
 * ProjectLinks — external links for a project.
 *
 * The compact card only ever shows "Live demo" (see `only='live'`) so every
 * card lands on exactly two actions and rows stay even. The repo links are
 * deep-dive material and render in the modal.
 */
const ProjectLinks = ({ project, only, className = '' }) => {
  const isClient = project.type === 'client';
  const { live, github, githubServer } = project.links || {};
  const showRepos = only !== 'live';

  const visible = [live, ...(showRepos ? [github, githubServer] : [])];
  if (!visible.some(isRealLink)) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {isRealLink(live) && (
        <a href={live} target='_blank' rel='noopener noreferrer' className='btn btn-primary text-[13px]'>
          Live demo
          <ArrowUpRight className='w-3.5 h-3.5' />
        </a>
      )}
      {showRepos && isRealLink(github) && (
        <a href={github} target='_blank' rel='noopener noreferrer' className='btn btn-secondary text-[13px]'>
          <Github className='w-3.5 h-3.5' />
          {isClient ? 'Code' : 'Client'}
        </a>
      )}
      {showRepos && isRealLink(githubServer) && (
        <a href={githubServer} target='_blank' rel='noopener noreferrer' className='btn btn-secondary text-[13px]'>
          <Github className='w-3.5 h-3.5' />
          Server
        </a>
      )}
    </div>
  );
};

export default ProjectLinks;
