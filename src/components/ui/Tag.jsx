/**
 * Tag — the monospace pill used for tech stacks, categories, and interests.
 * Variants map to the exact styles already used across sections:
 *   muted     → text-[11.5px], text-muted   (Experience / Projects / Research tech)
 *   secondary → text-[11.5px], text-secondary (Research interests)
 *   solid     → text-[12.5px], full text color, roomier padding (Skills)
 */
const VARIANTS = {
  muted: 'text-[11.5px] px-2 py-1 text-[var(--text-muted)]',
  secondary: 'text-[11.5px] px-2 py-1 text-[var(--text-secondary)]',
  solid: 'text-[12.5px] px-2.5 py-1 text-[var(--text)]',
};

const Tag = ({ as = 'span', variant = 'muted', children, className = '' }) => {
  const Element = as;
  return (
    <Element
      className={`font-mono rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Element>
  );
};

/**
 * TagList — renders an array of strings as Tags in a flex-wrap row.
 * Pass `as="ul"`/`as="li"` for semantic lists (e.g. Skills).
 */
export const TagList = ({ items = [], variant = 'muted', as = 'div', itemAs = 'span', className = '' }) => {
  const Wrapper = as;
  return (
    <Wrapper className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <Tag key={item} as={itemAs} variant={variant}>
          {item}
        </Tag>
      ))}
    </Wrapper>
  );
};

export default Tag;
