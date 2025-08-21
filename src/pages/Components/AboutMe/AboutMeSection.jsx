import { motion } from "framer-motion";
import { Code2, Brain, Lightbulb } from "lucide-react";

const AboutMeSection = () => {
  return (
    <section
      id="about"
      className="w-full bg-[#25262F] py-20 text-white font-fontPrimary"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          About <span className="text-[#0ef]">Me</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-[#0ef]">
              Passionate Developer & Researcher
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              I am a highly motivated <span className="text-[#0ef]">full-stack developer</span> 
              and <span className="text-[#0ef]">machine learning enthusiast</span>.  
              My passion lies in building modern, scalable, and user-friendly applications, 
              while also exploring the world of AI to solve real-world problems.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Over the years, I have learned and worked with a wide range of 
              technologies including <span className="text-[#0ef]">
              Angular, React, Tailwind CSS, Node.js, Express.js, MongoDB, MySQL,</span> 
              as well as programming languages like <span className="text-[#0ef]">
              C, C++, JavaScript, and Python</span>.  
              My research interests include <span className="text-[#0ef]">
              machine learning and deep learning frameworks like TensorFlow</span>.
            </p>
          </motion.div>

          {/* Right Side - Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            <div className="flex items-start gap-4 bg-[#2E2F39] p-6 rounded-xl shadow-md hover:shadow-[0_0_15px_#0ef] transition">
              <Lightbulb className="text-[#0ef] w-8 h-8" />
              <div>
                <h4 className="text-lg font-semibold">Innovator</h4>
                <p className="text-gray-400 text-sm">
                  Always exploring new technologies to deliver creative and 
                  impactful solutions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#2E2F39] p-6 rounded-xl shadow-md hover:shadow-[0_0_15px_#0ef] transition">
              <Code2 className="text-[#0ef] w-8 h-8" />
              <div>
                <h4 className="text-lg font-semibold">Full-Stack Developer</h4>
                <p className="text-gray-400 text-sm">
                  Skilled in building responsive, secure, and scalable web apps 
                  with modern frameworks.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 bg-[#2E2F39] p-6 rounded-xl shadow-md hover:shadow-[0_0_15px_#0ef] transition">
              <Brain className="text-[#0ef] w-8 h-8" />
              <div>
                <h4 className="text-lg font-semibold">AI & ML Enthusiast</h4>
                <p className="text-gray-400 text-sm">
                  Researching and applying machine learning models to real-world 
                  challenges using TensorFlow.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;
