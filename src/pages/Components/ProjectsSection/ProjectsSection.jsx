import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaServer } from 'react-icons/fa';
import { SiReact, SiFirebase, SiMongodb, SiExpress, SiTailwindcss, SiNodedotjs } from 'react-icons/si';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "BlogNest",
      description: "A modern and dynamic blogging platform designed to provide a seamless and engaging user experience. Built using React and Firebase with comprehensive blog management and user authentication.",
      image: "https://i.postimg.cc/2yxXm5S4/blognestss.png",
      liveLink: "https://blognest-d41ff.web.app/",
      githubClient: "https://github.com/sifat26/BlogNest_Client",
      githubServer: "https://github.com/sifat26/BlogNest_Project_Server_Side",
      technologies: [
        { name: "React", icon: <SiReact /> },
        { name: "Firebase", icon: <SiFirebase /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Node.js", icon: <SiNodedotjs /> }
      ],
      features: [
        "Create and Post Blogs with rich content",
        "Personalized Wishlists for favorite posts",
        "Interactive Comments system",
        "Search and Filter functionality",
        "Top 10 Featured Blogs showcase",
        "Secure Authentication with Google Sign-in"
      ]
    },
    {
      id: 2,
      title: "Woven Earth",
      description: "An elegant platform dedicated to Textile Arts showcasing handcrafted items. Features dynamic homepage with rotating banners, curated craft collections, and personalized item management.",
      image: "https://i.postimg.cc/fLc8jbmM/woben.png",
      liveLink: "https://art-and-craft-b1839.web.app/",
      githubClient: "https://github.com/sifat26/Woven-earth-client",
      githubServer: "https://github.com/sifat26/Woven-earth-server",
      technologies: [
        { name: "React", icon: <SiReact /> },
        { name: "Firebase", icon: <SiFirebase /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Express", icon: <SiExpress /> },
        { name: "Tailwind", icon: <SiTailwindcss /> }
      ],
      features: [
        "Dynamic Homepage with banner slideshow",
        "Curated Craft Collection display",
        "Effortless Craft Item Submission",
        "Accessible Art & Craft Gallery",
        "Personalized Item Details Page",
        "My Art & Craft Collection management"
      ]
    },
    {
      id: 3,
      title: "RoyalStays",
      description: "A comprehensive hospitality portal offering diverse accommodations from luxury hotels to cozy guesthouses. Features seamless browsing experience with detailed property listings and interactive exploration.",
      image: "https://i.postimg.cc/d1VhnHTR/royal.png",
      liveLink: "https://real-state-hospitality.web.app/",
      githubClient: "https://github.com/sifat26/A9-RoyalStays",
      // githubServer: "https://github.com/sifat26/A9-RoyalStays-Server",
      technologies: [
        { name: "React", icon: <SiReact /> },
        { name: "Firebase", icon: <SiFirebase /> },
        { name: "Tailwind", icon: <SiTailwindcss /> },
        { name: "Node.js", icon: <SiNodedotjs /> }
      ],
      features: [
        "Responsive design for any screen",
        "Secure login with Google/Github",
        "Interactive property exploration",
        "Detailed property listings",
        "Virtual tours and photo galleries",
        "Smooth animations with AOS"
      ]
    }
  ];

  return (
    <section 
      id="projects" 
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
          Featured <span className="text-[#0ef]">Projects</span>
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="projectCard group relative bg-[#2E2F39] rounded-xl overflow-hidden shadow-md hover:shadow-[0_0_20px_#0ef] transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E2F39] via-[#2E2F39]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkButton bg-[#0ef] hover:bg-[#0ef]/80 text-[#25262F] p-3 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label="Live Site"
                  >
                    <FaExternalLinkAlt size={18} />
                  </a>
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkButton bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label="Client Repository"
                  >
                    <FaGithub size={18} />
                  </a>
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkButton bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label="Server Repository"
                  >
                    <FaServer size={18} />
                  </a>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#0ef] mb-2 group-hover:text-[#0ef]/80 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="techStack mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="techBadge flex items-center gap-1 bg-[#25262F] text-[#0ef] px-2 py-1 rounded-md text-xs font-medium hover:bg-[#1a1b23] transition-colors duration-300"
                      >
                        <span className="text-sm">{tech.icon}</span>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="featuresSection mb-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">
                    Key Features
                  </p>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-gray-300 text-xs flex items-start"
                      >
                        <span className="text-[#0ef] mr-2 mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Links Section */}
                <div className="bottomLinks flex gap-2 mt-5">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0ef] hover:bg-[#0ef]/80 text-[#25262F] text-center py-2 rounded-lg text-xs font-semibold transition-all duration-300 shadow-md"
                  >
                    View Live
                  </a>
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-600 hover:border-[#0ef] text-gray-300 hover:text-[#0ef] text-center py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                  >
                    Client Code
                  </a>
                  <a
                    href={project.githubServer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-600 hover:border-[#0ef] text-gray-300 hover:text-[#0ef] text-center py-2 rounded-lg text-xs font-semibold transition-all duration-300"
                  >
                    Server Code
                  </a>
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
