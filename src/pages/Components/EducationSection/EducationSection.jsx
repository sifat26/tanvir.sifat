import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const educationData = [
  {
    degree: "M.Sc. Engineering, ICT",
    institute: "Mawlana Bhashani Science & Technology University",
    year: "2025",
  },
  {
    degree: "B.Sc. Engineering, ICT",
    institute: "Mawlana Bhashani Science & Technology University",
    year: "2020 - 2025",
  },
  {
    degree: "Higher Secondary School Certificate, Science",
    institute:
      "Major General Mahmudul Hasan Adarsha College, Tangail",
    year: "2017 - 2019",
    gpa: "GPA: 4.83 (A)",
  },
  {
    degree: "Secondary School Certificate, Science",
    institute: "Adi-Tangail High School, Tangail",
    year: "2017",
    gpa: "GPA: 5.00 (A+)",
  },
];

const EducationSection = () => {
  return (
    <section
      id="education"
      className="w-full bg-[#25262F] py-20 text-white font-fontPrimary"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          Educational <span className="text-[#0ef]">Qualifications</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#0ef] pl-6">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="mb-10 ml-4"
            >
              {/* Icon */}
              <div className="absolute -left-5 flex items-center justify-center w-10 h-10 rounded-full bg-[#0ef] text-black shadow-lg">
                <GraduationCap size={20} />
              </div>

              {/* Card */}
              <div className="bg-[#2E2F39] p-6 rounded-xl shadow-md hover:shadow-[0_0_20px_#0ef] transition">
                <h3 className="text-xl md:text-2xl font-semibold mb-1 text-[#0ef]">
                  {edu.degree}
                </h3>
                <p className="text-gray-300 font-medium mb-1">{edu.institute}</p>
                <p className="text-gray-400 text-sm">{edu.year}</p>
                {edu.gpa && (
                  <p className="text-gray-400 text-sm mt-1">{edu.gpa}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
