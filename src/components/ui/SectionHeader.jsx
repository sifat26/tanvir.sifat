/**
 * SectionHeader — the eyebrow + heading (+ optional subtitle) pattern shared
 * by most sections. Keeps the exact type scale/classes used across the site.
 *
 * size="md" → md:text-4xl (default)   size="lg" → md:text-5xl
 */
const SectionHeader = ({ eyebrow, title, subtitle, size = 'md', className = '' }) => {
  const titleSize = size === 'lg' ? 'md:text-5xl' : 'md:text-4xl';

  return (
    <div className={className}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className={`mt-4 text-3xl ${titleSize} font-semibold tracking-tight text-[var(--text)] leading-tight`}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeader;
