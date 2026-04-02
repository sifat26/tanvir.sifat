import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "M.Sc. Engineering, ICT",
    institute: "Mawlana Bhashani Science & Technology University",
    year: "2025 — Present",
    status: "current",
    description: "Pursuing graduate studies with focus on advanced computing and research.",
  },
  {
    degree: "B.Sc. Engineering, ICT",
    institute: "Mawlana Bhashani Science & Technology University",
    year: "2020 — 2025",
    status: "completed",
    description: "Studied core computer science, software engineering, and information systems.",
  },
  {
    degree: "Higher Secondary Certificate, Science",
    institute: "Major General Mahmudul Hasan Adarsha College, Tangail",
    year: "2017 — 2019",
    status: "completed",
    gpa: "GPA: 4.83 (A)",
    description: "Science stream with focus on mathematics, physics, and chemistry.",
  },
  {
    degree: "Secondary School Certificate, Science",
    institute: "Adi-Tangail High School, Tangail",
    year: "2017",
    status: "completed",
    gpa: "GPA: 5.00 (A+)",
    description: "Achieved perfect GPA with distinction in all science subjects.",
  },
];

const EducationSection = () => {
  return (
    <section
      id="education"
      className="w-full py-24 relative overflow-hidden font-fontPrimary"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-dots opacity-25" />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
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
            <GraduationCap className="w-3 h-3" />
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Educational <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
            A track record of academic excellence and continuous learning.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5 rounded-full"
            style={{ background: "linear-gradient(to bottom, #6366f1, #06b6d4, rgba(6,182,212,0.1))" }}
          />

          <div className="space-y-8 pl-16">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[46px] top-6 w-4 h-4 rounded-full border-2 border-[#0d1117] shadow-lg flex items-center justify-center"
                  style={{
                    background: edu.status === "current"
                      ? "linear-gradient(135deg, #6366f1, #06b6d4)"
                      : "linear-gradient(135deg, #4f46e5, #0891b2)",
                    boxShadow: edu.status === "current"
                      ? "0 0 12px rgba(99,102,241,0.7)"
                      : "0 0 8px rgba(99,102,241,0.3)",
                  }}
                >
                  {edu.status === "current" && (
                    <span className="absolute" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white", animation: "ping 1.5s ease-in-out infinite" }} />
                  )}
                </div>

                {/* Card */}
                <div
                  className="glass-card p-6 border rounded-2xl transition-all duration-300 group-hover:border-indigo-500/30"
                  style={{ background: "rgba(30, 45, 69, 0.9)" }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">
                        {edu.degree}
                      </h3>
                      <p className="text-indigo-300 font-medium text-sm mt-1">
                        {edu.institute}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                      <span className="text-xs text-slate-500 font-medium bg-slate-800/60 px-2.5 py-1 rounded-full">
                        {edu.year}
                      </span>
                      {edu.status === "current" && (
                        <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  {edu.gpa && (
                    <div className="inline-flex items-center gap-1.5 mb-2.5">
                      <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                        🏆 {edu.gpa}
                      </span>
                    </div>
                  )}

                  <p className="text-slate-500 text-sm leading-relaxed">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
