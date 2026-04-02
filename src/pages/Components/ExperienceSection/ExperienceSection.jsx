import { motion } from "framer-motion";
import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import { FaAngular } from "react-icons/fa";
import { SiNextdotjs, SiVercel, SiCpanel } from "react-icons/si";
import { TbServer2 } from "react-icons/tb";

const experiences = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Universal Technology Research and Development limited",
    shortName: "UTRDL",
    location: "Bangladesh",
    period: "Recent",
    type: "Professional",
    status: "experience",
    description:
      "Worked as a frontend developer building and maintaining web applications with Angular and Next.js. Responsible for developing responsive UI components and deploying frontend projects to production environments.",
    responsibilities: [
      "Developed modern web applications using Angular and Next.js frameworks",
      "Built reusable, responsive UI components for production-grade applications",
      "Deployed frontend websites to IIS Server environments",
      "Configured domain settings, build pipelines, and hosting infrastructure",
      "Collaborated with backend teams to integrate REST APIs",
    ],
    technologies: [
      { name: "Angular", icon: <FaAngular className="text-red-500" />, color: "text-red-400" },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" />, color: "text-white" },
      // { name: "Vercel", icon: <SiVercel className="text-white" />, color: "text-white" },
      // { name: "cPanel", icon: <SiCpanel className="text-orange-400" />, color: "text-orange-400" },
      { name: "IIS Server", icon: <TbServer2 className="text-blue-400" />, color: "text-blue-400" },
    ],
    color: "indigo",
  },
];

const colorMap = {
  indigo: {
    border: "border-indigo-500/20",
    dot: "shadow-[0_0_12px_rgba(99,102,241,0.7)]",
    dotBg: "linear-gradient(135deg, #6366f1, #06b6d4)",
    tag: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    badge: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    hover: "hover:border-indigo-500/40 hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)]",
    line: "from-indigo-500 to-cyan-400",
    icon: "bg-indigo-500/10 border-indigo-500/20",
    bullet: "text-indigo-400",
  },
};

const ExperienceCard = ({ exp, index }) => {
  const c = colorMap[exp.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      className={`relative glass-card p-6 md:p-8 rounded-2xl border ${c.border} ${c.hover} transition-all duration-300 group`}
    >
      {/* Top Row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div className="flex items-start gap-4">
          {/* Company Icon */}
          <div className={`shrink-0 w-12 h-12 rounded-xl border ${c.icon} flex items-center justify-center`}>
            <Briefcase className="w-5 h-5 text-indigo-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-snug">{exp.role}</h3>
            <p className="text-indigo-300 font-semibold text-sm mt-0.5">{exp.company}</p>
            <div className="flex items-center gap-1.5 mt-1 text-slate-500 text-xs">
              <MapPin className="w-3 h-3" />
              <span>{exp.location}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${c.badge}`}>
            {exp.type}
          </span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-800/60 text-slate-400 border border-slate-700/40">
            {exp.period}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{exp.description}</p>

      {/* Responsibilities */}
      <div className="mb-5">
        <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-3">Key Responsibilities</p>
        <ul className="space-y-2">
          {exp.responsibilities.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
              <span className={`mt-1 shrink-0 ${c.bullet}`}>▸</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Tags */}
      <div>
        <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-3">Technologies Used</p>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech, i) => (
            <span
              key={i}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${c.tag}`}
            >
              <span className="text-base">{tech.icon}</span>
              {tech.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="w-full py-24 relative overflow-hidden font-fontPrimary"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-dots opacity-25" />
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full pointer-events-none -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mx-auto">
            <Briefcase className="w-3 h-3" />
            Work History
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
            Real-world experience building and deploying production applications.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceCard key={exp.id} exp={exp} index={index} />
          ))}
        </div>

        {/* Decorative note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-slate-600 text-xs">
            Open to new opportunities — freelance, part-time, or full-time roles.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
