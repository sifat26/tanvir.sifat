import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projectsData = [
  {
    name: "Portfolio Website",
    description: "A modern, responsive personal portfolio built with React and Tailwind CSS.",
    image: "https://i.postimg.cc/XYZ123/portfolio.png",
    technologies: ["React", "Tailwind", "Framer Motion"],
    liveLink: "https://your-live-site.com",
    githubFront: "https://github.com/yourusername/portfolio",
    githubServer: null,
  },
  {
    name: "E-commerce Platform",
    description: "Full-stack e-commerce platform with cart, payment gateway, and admin dashboard.",
    image: "https://i.postimg.cc/XYZ456/ecommerce.png",
    technologies: ["Angular", "Node.js", "Express.js", "MongoDB"],
    liveLink: "https://your-ecommerce-site.com",
    githubFront: "https://github.com/yourusername/ecommerce-frontend",
    githubServer: "https://github.com/yourusername/ecommerce-server",
  },
  {
    name: "Machine Learning Project",
    description: "Image classification model using TensorFlow and Python, deployed with Flask.",
    image: "https://i.postimg.cc/XYZ789/ml.png",
    technologies: ["Python", "TensorFlow", "Flask"],
    liveLink: null,
    githubFront: "https://github.com/yourusername/ml-project",
    githubServer: null,
  },
];

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="w-full bg-[#1e1f26] py-16 md:py-24 text-white font-fontPrimary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-12 md:mb-16"
        >
          My{" "}
          <span className="bg-gradient-to-r from-[#0077B6] to-[#0ef] bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, boxShadow: "0 0 20px rgba(0, 238, 255, 0.3)" }}
              className="bg-[#2e3039] rounded-xl overflow-hidden border border-[#0ef]/20 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative w-full h-48 md:h-56 group">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1e1f26] flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0ef]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">{project.name}</span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-semibold text-[#0ef] mb-3">
                  {project.name}
                </h3>
                <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-[#0ef]/10 text-[#0ef] text-xs md:text-sm px-3 py-1.5 rounded-full hover:bg-[#0ef]/20 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0077B6] to-[#0ef] text-black rounded-md font-medium hover:from-[#0ef] hover:to-[#0077B6] transition"
                    >
                      Live <FiExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubFront && (
                    <a
                      href={project.githubFront}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-[#0ef] text-[#0ef] rounded-md font-medium hover:bg-[#0ef] hover:text-black transition"
                    >
                      GitHub FE <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubServer && (
                    <a
                      href={project.githubServer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-[#0ef] text-[#0ef] rounded-md font-medium hover:bg-[#0ef] hover:text-black transition"
                    >
                      GitHub BE <FiGithub className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;