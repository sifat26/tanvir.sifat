import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import {
  FaAngular,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaPython,
  FaArrowDown,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTensorflow,
} from "react-icons/si";
import ContactSection from "../../Components/ContactSection/ContactSection";
import { ToastContainer } from "react-toastify";
import EducationSection from "../../Components/EducationSection/EducationSection";
import AboutMeSection from "../../Components/AboutMe/AboutMeSection";
import ProjectsSection from "../../Components/ProjectsSection/ProjectsSection";
import SEO from "../../Components/SEO/SEO";
const webSkills = [
    { name: "Angular", icon: <FaAngular className="text-red-500" /> },
    { name: "React", icon: <FaReact className="text-sky-400" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
    { name: "SQL Database", icon: <SiMysql className="text-blue-500" /> },
    { name: "Bootstrap", icon: <FaBootstrap className="text-purple-500" /> },
  ];

  const mlSkills = [
    { name: "Python", icon: <FaPython className="text-yellow-400" /> },
    { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
  ];

const Home = () => {
    return (
      <div>
        <SEO />
        <ToastContainer />
        <section
      id="home"
      className="w-full min-h-screen bg-gradient-to-b from-[#1e1f26] to-[#25262F] flex items-center justify-center font-fontPrimary relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left w-full md:w-1/2"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Hi, I’m <span className="text-[#0ef]">Sifat</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 font-medium"
          >
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
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-gray-400 text-base md:text-lg lg:text-xl mb-8 max-w-md mx-auto md:mx-0"
          >
            I craft modern, responsive, and scalable web applications with a focus on clean code and exceptional user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex justify-center md:justify-start space-x-4"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px #0ef" }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-6 py-3 bg-gradient-to-r from-[#0077B6] to-[#0ef] text-black font-semibold rounded-lg shadow-md transition"
            >
              View Projects
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.05,
                backgroundColor: "#0ef",
                color: "#000",
                borderColor: "#0ef",
              }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-6 py-3 border-2 border-[#0ef] text-white font-semibold rounded-lg transition"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right content (Profile Image) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex justify-center items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 238, 255, 0.5)" }}
            transition={{ type: "spring", stiffness: 200 }}
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#0ef] shadow-[0_0_25px_rgba(0,238,255,0.4)]"
          >
            <img
              src="https://i.postimg.cc/NfX7Kp1F/Prof.png"
              alt="Sifat"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 w-full flex justify-center"
      >
        <a href="#about" className="text-[#0ef] hover:text-white transition">
          <FaArrowDown className="w-6 h-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
        <AboutMeSection />
        <EducationSection />
        
        <section
          id="skills"
          className="w-full min-h-screen bg-[#25262F] text-white py-20 font-fontPrimary"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-center mb-16"
            >
              My <span className="text-[#0ef]">Skills</span>
            </motion.h2>

            {/* Web Development Skills */}
            <h3 className="text-2xl font-semibold mb-8 text-gray-200">
              Web Development
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-16">
              {webSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center p-6 bg-[#2E2F39] rounded-xl shadow-md hover:shadow-[0_0_20px_#0ef] transition"
                >
                  <div className="text-5xl mb-3">{skill.icon}</div>
                  <p className="text-lg font-medium text-gray-200">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Machine Learning Skills */}
            <h3 className="text-2xl font-semibold mb-8 text-gray-200">
              Machine Learning
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {mlSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center justify-center p-6 bg-[#2E2F39] rounded-xl shadow-md hover:shadow-[0_0_20px_#0ef] transition"
                >
                  <div className="text-5xl mb-3">{skill.icon}</div>
                  <p className="text-lg font-medium text-gray-200">
                    {skill.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* <ProjectsSection /> */}
        <ContactSection />
      </div>
    );
};

export default Home;