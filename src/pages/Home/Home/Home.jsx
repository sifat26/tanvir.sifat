import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import {
  FaAngular,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaPython,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiTensorflow,
} from "react-icons/si";
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
        <section
          id="home"
          className="w-full min-h-screen bg-[#25262F] flex items-center font-fontPrimary"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center md:text-left mt-8 md:mt-0"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Hi, I’m <span className="text-[#0ef]">Sifat</span>
              </h1>

              <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
                <Typewriter
                  words={[
                    "Full-Stack Web Developer",
                    "React & Next.js Specialist",
                    "UI/UX Focused Engineer",
                  ]}
                  loop={true}
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={1500}
                />
              </h2>

              <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl">
                I build modern, responsive, and scalable web applications with a
                focus on clean code and great user experience.
              </p>

              <div className="flex justify-center md:justify-start space-x-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  className="px-6 py-3 bg-[#0ef] text-black font-semibold rounded-lg shadow-md hover:shadow-[0_0_15px_#0ef] transition"
                >
                  View Projects
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#0ef",
                    color: "#000",
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="px-6 py-3 border-2 border-[#0ef] text-white font-semibold rounded-lg transition"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>

            {/* Right content (Profile Image) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 flex justify-center max-h-[500px]"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                src="https://i.postimg.cc/NfX7Kp1F/Prof.png"
                alt="Sifat"
                className="rounded-2xl shadow-[0_0_25px_rgba(0,238,255,0.35)]"
              />
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-10 w-full flex justify-center"
          >
            {/* <a href="#about" className="text-[#0ef] hover:text-white transition">
          <ArrowDownCircle className="w-8 h-8 animate-bounce" />
        </a> */}
          </motion.div>
        </section>
        <section
          id="about"
          className="w-full bg-[#25262F] py-20 text-white font-fontPrimary"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            {/* Section Header */}
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              About Me
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* About Text */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">Hi, I'm Sifat</h3>
                <p className="text-gray-300 mb-4">
                  I am a passionate web developer and machine learning
                  enthusiast, specializing in creating modern, responsive, and
                  interactive web applications. I enjoy building clean and
                  maintainable code while delivering great user experiences.
                </p>
                <p className="text-gray-300">
                  I am continuously learning and exploring new technologies in
                  software development and AI to improve my skills and deliver
                  innovative solutions.
                </p>
              </div>

              {/* Education & Experience */}
              <div className="space-y-8">
                {/* Education */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Education</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <span className="font-semibold">
                        M.Sc. Engineering, ICT
                      </span>{" "}
                      <br />
                      Mawlana Bhashani Science & Technology University, 2025
                    </li>
                    <li>
                      <span className="font-semibold">
                        B.Sc. Engineering, ICT
                      </span>{" "}
                      <br />
                      Mawlana Bhashani Science & Technology University, 2020 -
                      2025
                    </li>
                    <li>
                      <span className="font-semibold">
                        Higher Secondary Certificate, Science
                      </span>{" "}
                      <br />
                      Major General Mahmudul Hasan Adarsha College, Tangail,
                      2017 - 2019, GPA: 4.83
                    </li>
                    <li>
                      <span className="font-semibold">
                        Secondary School Certificate, Science
                      </span>{" "}
                      <br />
                      Adi-Tangail High School, Tangail, GPA: 5.00
                    </li>
                  </ul>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Experience</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li>
                      <span className="font-semibold">Jr Web Developer</span>{" "}
                      <br />
                      Universaltech Research & Development | Jun 2024 - Present
                      | Remote <br />
                      <span className="text-gray-400">
                        Building dynamic, responsive web applications with
                        Angular. Passionate about clean code, UX, and continuous
                        learning.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
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
      </div>
    );
};

export default Home;