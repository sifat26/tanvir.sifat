import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import {
  FaAngular, FaReact, FaNodeJs, FaBootstrap, FaPython, FaArrowDown, FaGithub,
} from "react-icons/fa";
import {
  SiTailwindcss, SiExpress, SiMongodb, SiMysql, SiTensorflow, SiNextdotjs,
  SiVercel, SiCpanel,
} from "react-icons/si";
import { TbServer2 } from "react-icons/tb";
import ContactSection from "../../Components/ContactSection/ContactSection";
import { ToastContainer } from "react-toastify";
import EducationSection from "../../Components/EducationSection/EducationSection";
import AboutMeSection from "../../Components/AboutMe/AboutMeSection";
import ProjectsSection from "../../Components/ProjectsSection/ProjectsSection";
import ExperienceSection from "../../Components/ExperienceSection/ExperienceSection";

const webSkills = [
  { name: "React", icon: <FaReact className="text-sky-400" />, level: 90 },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" />, level: 82 },
  { name: "Angular", icon: <FaAngular className="text-red-500" />, level: 80 },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" />, level: 92 },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, level: 85 },
  { name: "Express.js", icon: <SiExpress className="text-slate-300" />, level: 82 },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" />, level: 80 },
  { name: "SQL Database", icon: <SiMysql className="text-blue-400" />, level: 75 },
  { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" />, level: 85 },
];

const deploymentSkills = [
  { name: "Vercel", icon: <SiVercel className="text-white" />, level: 88 },
  { name: "cPanel", icon: <SiCpanel className="text-orange-400" />, level: 80 },
  { name: "IIS Server", icon: <TbServer2 className="text-blue-400" />, level: 75 },
];

const mlSkills = [
  { name: "Python", icon: <FaPython className="text-yellow-400" />, level: 78 },
  { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" />, level: 70 },
];

const stats = [
  { value: "5+", label: "Projects Built" },
  { value: "1+", label: "Years Experience" },
  { value: "12+", label: "Tech Stack" },
];

const SkillCard = ({ skill, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    viewport={{ once: true }}
    className="skill-badge group"
  >
    <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
      {skill.icon}
    </div>
    <p className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
      {skill.name}
    </p>
    <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
        viewport={{ once: true }}
        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
      />
    </div>
    <span className="text-xs text-slate-500">{skill.level}%</span>
  </motion.div>
);

const Home = () => {
  return (
    <div className="font-fontPrimary">
      <ToastContainer />

      {/* ==================== HERO SECTION ==================== */}
      <section
        id="home"
        className="w-full min-h-screen relative flex items-center justify-center overflow-hidden"
        style={{ background: "var(--color-bg-primary)" }}
      >
        {/* Background Grid Dots */}
        <div className="absolute inset-0 grid-dots opacity-40" />

        {/* Glow Orbs */}
        <div className="orb-1 orb" />
        <div className="orb-2 orb" />

        {/* Extra glow effects */}
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center md:justify-start mb-6"
            >
              <span className="section-label">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for Work
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight tracking-tight"
            >
              Hi, I'm{" "}
              <span className="text-gradient">Sifat</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-400 mb-6 font-medium min-h-[2rem]"
            >
              <span className="text-indigo-300">
                <Typewriter
                  words={[
                    "Full-Stack Web Developer",
                    "React & Angular Specialist",
                    "UI/UX Focused Engineer",
                    "Machine Learning Enthusiast",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={55}
                  deleteSpeed={35}
                  delaySpeed={1800}
                />
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg mx-auto md:mx-0"
            >
              I craft modern, scalable web applications with clean code and
              exceptional user experiences. Passionate about turning ideas into
              elegant digital solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-10"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#projects"
                id="hero-view-projects-btn"
                className="btn-primary"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#contact"
                id="hero-contact-btn"
                className="btn-outline"
              >
                Let's Talk
              </motion.a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex justify-center md:justify-start gap-8"
            >
              {stats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80 }}
            className="flex justify-center items-center relative"
          >
            {/* Background glow ring */}
            <div
              className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Rotating border */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/30 animate-spin"
                   style={{ animation: "spin 20s linear infinite" }} />
              <div className="absolute inset-2 rounded-full border border-cyan-500/20 animate-spin"
                   style={{ animation: "spin 15s linear infinite reverse" }} />

              {/* Gradient border container */}
              <div className="absolute inset-3 gradient-border">
                <div className="gradient-border-inner">
                  <img
                    src="https://i.postimg.cc/NfX7Kp1F/Prof.png"
                    onError={(e) => { e.target.src = '/profile.png'; }}
                    alt="Tanvir Ahmmed Sifat - Full-Stack Developer"
                    className="w-full h-full object-cover"
                    id="hero-profile-image"
                  />
                </div>
              </div>

              {/* Floating badges — Angular, Next.js, React, Node.js */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -right-4 top-8 bg-[#1e2d45] border border-slate-500/25 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <FaAngular className="text-red-400 text-lg" />
                  <span className="text-xs font-semibold text-slate-200">Angular</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.4 }}
                className="absolute -left-6 bottom-12 bg-[#1e2d45] border border-slate-500/25 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <SiNextdotjs className="text-white text-lg" />
                  <span className="text-xs font-semibold text-slate-200">Next.js</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
                className="absolute -right-4 bottom-12 bg-[#1e2d45] border border-slate-500/25 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <FaReact className="text-sky-400 text-lg" />
                  <span className="text-xs font-semibold text-slate-200">React</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 1.2 }}
                className="absolute -left-4 top-10 bg-[#1e2d45] border border-slate-500/25 rounded-xl px-3 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <FaNodeJs className="text-green-400 text-lg" />
                  <span className="text-xs font-semibold text-slate-200">Node.js</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 w-full flex flex-col items-center gap-2"
        >
          <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll Down</span>
          <a href="#about" aria-label="Scroll to About section" className="scroll-indicator text-indigo-400">
            <FaArrowDown className="w-5 h-5" />
          </a>
        </motion.div>
      </section>

      {/* ==================== OTHER SECTIONS ==================== */}
      <AboutMeSection />

      <div className="section-divider" />

      <ExperienceSection />

      <div className="section-divider" />

      <EducationSection />

      <div className="section-divider" />

      {/* ==================== SKILLS SECTION ==================== */}
      <section
        id="skills"
        className="w-full py-24 relative overflow-hidden font-fontPrimary"
        style={{ background: "var(--color-bg-secondary)" }}
      >
        {/* Background */}
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="section-label mx-auto">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Technical Skills
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              My <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
              Technologies I work with to build scalable, high-performance applications.
            </p>
          </motion.div>

          {/* Web Development */}
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-cyan-400 rounded-full" />
              <h3 className="text-xl font-semibold text-white">Web Development</h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {webSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Deployment & Hosting */}
          <div className="mb-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-6 bg-gradient-to-b from-orange-400 to-indigo-500 rounded-full" />
              <h3 className="text-xl font-semibold text-white">Deployment & Hosting</h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {deploymentSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Machine Learning */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-full" />
              <h3 className="text-xl font-semibold text-white">Machine Learning & AI</h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mlSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <ProjectsSection />

      <div className="section-divider" />

      <ContactSection />
    </div>
  );
};

export default Home;