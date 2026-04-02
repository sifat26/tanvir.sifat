import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaServer } from 'react-icons/fa';
import { SiReact, SiFirebase, SiMongodb, SiExpress, SiTailwindcss, SiNodedotjs } from 'react-icons/si';

const projects = [
  {
    id: 1,
    title: "BlogNest",
    tagline: "Modern Blogging Platform",
    description: "A dynamic blogging platform with seamless user experience. Built with React and Firebase featuring blog management, comments, and secure authentication.",
    image: "https://i.postimg.cc/2yxXm5S4/blognestss.png",
    liveLink: "https://blognest-d41ff.web.app/",
    githubClient: "https://github.com/sifat26/BlogNest_Client",
    githubServer: "https://github.com/sifat26/BlogNest_Project_Server_Side",
    technologies: [
      { name: "React", icon: <SiReact /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
    ],
    features: [
      "Rich content blog creation",
      "Personalized wishlists",
      "Interactive comments system",
      "Search & filter functionality",
      "Top 10 featured blogs",
      "Google Sign-in auth",
    ],
    color: "indigo",
  },
  {
    id: 2,
    title: "Woven Earth",
    tagline: "Textile Arts Showcase",
    description: "An elegant platform dedicated to Textile Arts showcasing handcrafted items with dynamic homepage, rotating banners, and personalized collections.",
    image: "https://i.postimg.cc/fLc8jbmM/woben.png",
    liveLink: "https://art-and-craft-b1839.web.app/",
    githubClient: "https://github.com/sifat26/Woven-earth-client",
    githubServer: "https://github.com/sifat26/Woven-earth-server",
    technologies: [
      { name: "React", icon: <SiReact /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
    ],
    features: [
      "Dynamic homepage with slideshow",
      "Curated craft collections",
      "Item submission portal",
      "Accessible art gallery",
      "Personalized item details",
      "Collection management",
    ],
    color: "cyan",
  },
  {
    id: 3,
    title: "RoyalStays",
    tagline: "Hospitality Portal",
    description: "Comprehensive hospitality portal for diverse accommodations from luxury hotels to guesthouses with detailed listings and interactive exploration.",
    image: "https://i.postimg.cc/d1VhnHTR/royal.png",
    liveLink: "https://real-state-hospitality.web.app/",
    githubClient: "https://github.com/sifat26/A9-RoyalStays",
    githubServer: null,
    technologies: [
      { name: "React", icon: <SiReact /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
    ],
    features: [
      "Responsive on all screens",
      "Google/GitHub authentication",
      "Interactive property exploration",
      "Detailed property listings",
      "Virtual tours & galleries",
      "Smooth AOS animations",
    ],
    color: "purple",
  },
];

const colorMap = {
  indigo: {
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    tag: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    glow: "group-hover:shadow-[0_8px_40px_rgba(99,102,241,0.2)]",
    border: "group-hover:border-indigo-500/40",
    tech: "bg-indigo-500/10 text-indigo-300 border-indigo-500/15",
    dot: "text-indigo-400",
  },
  cyan: {
    badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    tag: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    glow: "group-hover:shadow-[0_8px_40px_rgba(6,182,212,0.2)]",
    border: "group-hover:border-cyan-500/40",
    tech: "bg-cyan-500/10 text-cyan-300 border-cyan-500/15",
    dot: "text-cyan-400",
  },
  purple: {
    badge: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    tag: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    glow: "group-hover:shadow-[0_8px_40px_rgba(168,85,247,0.2)]",
    border: "group-hover:border-purple-500/40",
    tech: "bg-purple-500/10 text-purple-300 border-purple-500/15",
    dot: "text-purple-400",
  },
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[project.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#1e2d45] transition-all duration-500 ${c.glow} ${c.border}`}
      id={`project-card-${project.id}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
        {/* Image overlay */}
        <div className="project-img-overlay" />

        {/* Top badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${c.badge}`}>
            {project.tagline}
          </span>
        </div>

        {/* Hover action links */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-3 bg-[#080b14]/70 backdrop-blur-sm"
            >
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#2c3e5a] hover:bg-[#364d6e] text-slate-200 border border-slate-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-lg"
                aria-label={`View ${project.title} live`}
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
              <a
                href={project.githubClient}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-lg"
                aria-label={`${project.title} GitHub code`}
              >
                <FaGithub /> Code
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-indigo-500/12 border-indigo-400/25 text-indigo-200"
              >
                <span className="text-sm">{tech.icon}</span>
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-5">
          <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-2">Key Features</p>
          <ul className="space-y-1">
            {project.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <span className={`mt-1 ${c.dot}`}>▸</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-auto grid grid-cols-3 gap-2">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#2c3e5a] hover:bg-[#364d6e] text-slate-200 border border-slate-500/20 hover:border-slate-400/30 text-center py-2 rounded-xl text-xs font-semibold transition-all duration-300"
          >
            Live
          </a>
          <a
            href={project.githubClient}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 border border-slate-700 hover:border-indigo-500/40 text-slate-400 hover:text-white text-center py-2 rounded-xl text-xs font-medium transition-all duration-300"
          >
            <FaGithub className="text-xs" /> Client
          </a>
          {project.githubServer ? (
            <a
              href={project.githubServer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 border border-slate-700 hover:border-indigo-500/40 text-slate-400 hover:text-white text-center py-2 rounded-xl text-xs font-medium transition-all duration-300"
            >
              <FaServer className="text-xs" /> Server
            </a>
          ) : (
            <div className="flex items-center justify-center border border-slate-800 text-slate-600 rounded-xl text-xs font-medium">
              Client Only
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="w-full py-24 relative overflow-hidden font-fontPrimary"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-dots opacity-25" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mx-auto">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
            A selection of projects that demonstrate my skills in building
            full-stack applications.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 mb-4 text-sm">Want to see more of my work?</p>
          <a
            href="https://github.com/sifat26"
            id="github-profile-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <FaGithub className="text-lg" />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
