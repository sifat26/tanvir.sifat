import { motion } from 'motion/react';
import { ArrowUpRight, Github, Users } from 'lucide-react';
import { TagList } from './Tag';

/** A link is "real" only once its [ADD_*_URL] placeholder token is replaced. */
const isRealLink = (url) => Boolean(url) && !url.startsWith('[ADD');

/**
 * ProjectMedia — screenshot when available, otherwise an elegant branded
 * placeholder (monogram + category) so nothing looks broken before assets land.
 */
const ProjectMedia = ({ project }) => {
  const inner = project.image ? (
    <img
      src={project.image}
      alt={`${project.title} — product screenshot`}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
    />
  ) : (
    <div className="w-full h-full grid place-items-center bg-[var(--bg-subtle)]">
      <div className="text-center px-6">
        <div className="mx-auto w-12 h-12 rounded-lg bg-[var(--text)] text-[var(--bg)] grid place-items-center text-lg font-semibold">
          {project.title.charAt(0)}
        </div>
        <div className="mt-3 font-mono text-[12px] uppercase tracking-wider text-[var(--text-muted)]">
          {project.category}
        </div>
      </div>
    </div>
  );

  const frame = (
    <div className="relative overflow-hidden rounded-xl border border-[var(--border)] aspect-[16/10]">
      {inner}
    </div>
  );

  // Only wrap in a link when there's a real live URL to point at.
  return isRealLink(project.links?.live) ? (
    <a
      href={project.links.live}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      aria-label={`${project.title} — live demo`}
    >
      {frame}
    </a>
  ) : (
    frame
  );
};

const CaseBlock = ({ label, children }) =>
  children ? (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">{label}</div>
      <p className="text-[var(--text-secondary)]">{children}</p>
    </div>
  ) : null;

/**
 * ProjectCard — one case study. Handles both client projects
 * (overview / challenge / solution + role) and personal projects
 * (problem / solution / challenges). Media left, narrative right.
 */
const ProjectCard = ({ project, index = 0, flip = false }) => {
  const isClient = project.type === 'client';
  const mediaOrder = flip ? 'md:order-2' : '';
  const textOrder = flip ? 'md:order-1' : '';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="grid md:grid-cols-12 gap-8 md:gap-12 items-center"
    >
      {/* Media */}
      <div className={`md:col-span-7 ${mediaOrder}`}>
        <ProjectMedia project={project} />
      </div>

      {/* Narrative */}
      <div className={`md:col-span-5 ${textOrder}`}>
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-mono text-[var(--text-muted)]">
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{project.category}</span>
          {isClient && project.role && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[var(--text)]">{project.role}</span>
            </>
          )}
        </div>

        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text)]">{project.title}</h3>
        <p className="mt-1 text-[15px] text-[var(--text-secondary)]">{project.tagline}</p>

        {/* Team context — makes the collaborative nature explicit */}
        {isClient && project.team && (
          <div className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] text-[var(--text-muted)]">
            <Users className="w-3.5 h-3.5" />
            {project.team}
          </div>
        )}

        <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed">
          {isClient ? (
            <>
              <CaseBlock label="Overview">{project.overview}</CaseBlock>
              {project.contributions?.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                    My contributions
                  </div>
                  <ul className="space-y-2">
                    {project.contributions.map((c, idx) => (
                      <li key={idx} className="flex gap-2.5 text-[var(--text-secondary)]">
                        <span aria-hidden="true" className="mt-2 h-1 w-1 rounded-full bg-[var(--text-muted)] shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <CaseBlock label="Problem">{project.problem}</CaseBlock>
              <CaseBlock label="Solution">{project.solution}</CaseBlock>
              <CaseBlock label="Challenges">{project.challenges}</CaseBlock>
            </>
          )}
        </div>

        <TagList className="mt-6" items={project.tech} variant="muted" />

        {/* Links — only render when the URL is real */}
        <div className="mt-6 flex flex-wrap gap-2">
          {isRealLink(project.links?.live) && (
            <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-[13px]">
              Live demo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
          {isRealLink(project.links?.github) && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-[13px]">
              <Github className="w-3.5 h-3.5" />
              {isClient ? 'Code' : 'Client'}
            </a>
          )}
          {isRealLink(project.links?.githubServer) && (
            <a href={project.links.githubServer} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-[13px]">
              <Github className="w-3.5 h-3.5" />
              Server
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
