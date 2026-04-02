import { motion } from "framer-motion";
import { Code2, Brain, Lightbulb, MapPin, Download } from "lucide-react";

const highlights = [
  {
    icon: <Lightbulb className="w-6 h-6 text-indigo-300" />,
    title: "Innovator",
    description: "Always exploring new technologies to deliver creative and impactful digital solutions.",
    color: "indigo",
  },
  {
    icon: <Code2 className="w-6 h-6 text-cyan-300" />,
    title: "Full-Stack Developer",
    description: "Skilled in building responsive, secure, and scalable web apps with modern frameworks.",
    color: "cyan",
  },
  {
    icon: <Brain className="w-6 h-6 text-purple-300" />,
    title: "AI & ML Enthusiast",
    description: "Researching and applying machine learning models to real-world challenges using TensorFlow.",
    color: "purple",
  },
];

const colorMap = {
  indigo: {
    border: "border-indigo-500/20",
    bg: "bg-indigo-500/5",
    icon: "bg-indigo-500/10 border-indigo-500/20",
    glow: "group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]",
  },
  cyan: {
    border: "border-cyan-500/20",
    bg: "bg-cyan-500/5",
    icon: "bg-cyan-500/10 border-cyan-500/20",
    glow: "group-hover:border-cyan-500/40 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  purple: {
    border: "border-purple-500/20",
    bg: "bg-purple-500/5",
    icon: "bg-purple-500/10 border-purple-500/20",
    glow: "group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
};

const AboutMeSection = () => {
  return (
    <section
      id="about"
      className="w-full py-24 relative overflow-hidden font-fontPrimary"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-dots opacity-25" />
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
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
          <span className="section-label mx-auto">Who I Am</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-400 text-sm">Bangladesh</span>
            </div>

            <h3 className="text-2xl font-bold mb-5 text-white">
              Passionate Developer &{" "}
              <span className="text-gradient">Researcher</span>
            </h3>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                I am a highly motivated{" "}
                <span className="text-indigo-300 font-medium">full-stack developer</span>{" "}
                and{" "}
                <span className="text-indigo-300 font-medium">machine learning enthusiast</span>.
                My passion lies in building modern, scalable, and user-friendly
                applications, while also exploring the world of AI to solve
                real-world problems.
              </p>
              <p>
                Over the years, I have worked with a wide range of technologies
                including{" "}
                <span className="text-cyan-300 font-medium">
                  Angular, React, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, MySQL
                </span>
                , as well as programming languages like{" "}
                <span className="text-cyan-300 font-medium">
                  C, C++, JavaScript, and Python
                </span>
                . I also have hands-on experience deploying websites on{" "}
                <span className="text-indigo-300 font-medium">
                  Vercel, cPanel, and IIS Server
                </span>
                .
              </p>
              <p>
                My research interests include{" "}
                <span className="text-purple-300 font-medium">
                  machine learning and deep learning frameworks like TensorFlow
                </span>
                , with a focus on practical AI applications.
              </p>
            </div>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href="#contact"
                id="about-contact-btn"
                className="btn-primary text-sm"
              >
                <span>Get In Touch</span>
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#projects"
                id="about-projects-btn"
                className="btn-outline text-sm"
              >
                View Projects
              </a>
            </div>
          </motion.div>

          {/* Right - Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-4"
          >
            {highlights.map((item, i) => {
              const c = colorMap[item.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  viewport={{ once: true }}
                  className={`group flex items-start gap-4 p-5 rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm transition-all duration-300 ${c.glow} cursor-default`}
                >
                  <div className={`shrink-0 w-12 h-12 rounded-xl border ${c.icon} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
