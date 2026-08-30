import {
  SiAngular,
  SiBootstrap,
  SiCpanel,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGoogleanalytics,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpencv,
  SiPostman,
  SiPython,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import {
  TbApi,
  TbBrain,
  TbCreditCard,
  TbEye,
  TbServer,
  TbServer2,
  TbShieldLock,
} from 'react-icons/tb';
import { VscAzure, VscVscode } from 'react-icons/vsc';
import { Code } from 'lucide-react';

export const TECH_MAP = {
  // Frontend
  angular: { icon: SiAngular, color: '#DD0031' },
  'next.js': { icon: SiNextdotjs, color: 'currentColor' },
  nextjs: { icon: SiNextdotjs, color: 'currentColor' },
  next: { icon: SiNextdotjs, color: 'currentColor' },
  react: { icon: SiReact, color: '#61DAFB' },
  'redux toolkit': { icon: SiRedux, color: '#764ABC' },
  redux: { icon: SiRedux, color: '#764ABC' },
  typescript: { icon: SiTypescript, color: '#3178C6' },
  'tailwind css': { icon: SiTailwindcss, color: '#06B6D4' },
  tailwind: { icon: SiTailwindcss, color: '#06B6D4' },
  bootstrap: { icon: SiBootstrap, color: '#7952B3' },
  html: { icon: SiHtml5, color: '#E34F26' },
  html5: { icon: SiHtml5, color: '#E34F26' },
  javascript: { icon: SiJavascript, color: '#F7DF1E' },
  js: { icon: SiJavascript, color: '#F7DF1E' },

  // Backend
  'node.js': { icon: SiNodedotjs, color: '#5FA04E' },
  nodejs: { icon: SiNodedotjs, color: '#5FA04E' },
  node: { icon: SiNodedotjs, color: '#5FA04E' },
  'express.js': { icon: SiExpress, color: 'currentColor' },
  express: { icon: SiExpress, color: 'currentColor' },
  'rest apis': { icon: TbApi, color: '#0EA5E9' },
  'rest api': { icon: TbApi, color: '#0EA5E9' },
  rest: { icon: TbApi, color: '#0EA5E9' },
  zod: { icon: TbShieldLock, color: '#3E67B1' },
  supabase: { icon: SiSupabase, color: '#3ECF8E' },
  authentication: { icon: TbShieldLock, color: '#10B981' },
  auth: { icon: TbShieldLock, color: '#10B981' },
  'payment gateways': { icon: TbCreditCard, color: '#6366F1' },
  payments: { icon: TbCreditCard, color: '#6366F1' },

  // AI / ML
  python: { icon: SiPython, color: '#3776AB' },
  tensorflow: { icon: SiTensorflow, color: '#FF6F00' },
  'deep learning': { icon: TbBrain, color: '#8B5CF6' },
  'computer vision': { icon: TbEye, color: '#EC4899' },
  opencv: { icon: SiOpencv, color: '#5C3EE8' },

  // Databases
  mongodb: { icon: SiMongodb, color: '#47A248' },
  mysql: { icon: SiMysql, color: '#4479A1' },
  firebase: { icon: SiFirebase, color: '#FFCA28' },

  // Deployment & Cloud
  vercel: { icon: SiVercel, color: 'currentColor' },
  azure: { icon: VscAzure, color: '#0078D4' },
  vps: { icon: TbServer, color: '#0EA5E9' },
  'iis server': { icon: TbServer2, color: '#0284C7' },
  iis: { icon: TbServer2, color: '#0284C7' },
  cpanel: { icon: SiCpanel, color: '#FF6C2C' },
  docker: { icon: SiDocker, color: '#2496ED' },
  cloudinary: { icon: TbServer2, color: '#3448C5' },

  // Tools
  git: { icon: SiGit, color: '#F05032' },
  github: { icon: SiGithub, color: 'currentColor' },
  'vs code': { icon: VscVscode, color: '#007ACC' },
  vscode: { icon: VscVscode, color: '#007ACC' },
  postman: { icon: SiPostman, color: '#FF6C37' },
  figma: { icon: SiFigma, color: '#F24E1E' },
  'google analytics': { icon: SiGoogleanalytics, color: '#E37400' },
};

export const getTechMeta = (name) => {
  if (!name) return null;
  const key = String(name).trim().toLowerCase();
  return TECH_MAP[key] || null;
};

export const TechIcon = ({ name, className = 'w-3.5 h-3.5', colored = true, style = {} }) => {
  const meta = getTechMeta(name);
  if (!meta) {
    return <Code className={`${className} opacity-60`} style={style} />;
  }

  const IconComponent = meta.icon;
  const iconStyle = colored && meta.color !== 'currentColor' ? { color: meta.color, ...style } : style;

  return <IconComponent className={className} style={iconStyle} />;
};

/**
 * Tag — the monospace pill used for tech stacks, categories, and interests.
 */
const VARIANTS = {
  muted: 'text-[11.5px] px-2.5 py-1 text-[var(--text-muted)]',
  secondary: 'text-[11.5px] px-2.5 py-1 text-[var(--text-secondary)]',
  solid: 'text-[12px] px-2.5 py-1 text-[var(--text)]',
};

const Tag = ({ as = 'span', variant = 'muted', children, withIcon = true, className = '' }) => {
  const Element = as;
  const isString = typeof children === 'string';
  const hasMeta = isString && withIcon ? getTechMeta(children) : null;

  return (
    <Element
      className={`inline-flex items-center gap-1.5 font-mono rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] ${VARIANTS[variant]} ${className}`}
    >
      {hasMeta && <TechIcon name={children} className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </Element>
  );
};

export const TagList = ({ items = [], variant = 'muted', as = 'div', itemAs = 'span', withIcon = true, className = '' }) => {
  const Wrapper = as;
  return (
    <Wrapper className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <Tag key={item} as={itemAs} variant={variant} withIcon={withIcon}>
          {item}
        </Tag>
      ))}
    </Wrapper>
  );
};

export default Tag;
