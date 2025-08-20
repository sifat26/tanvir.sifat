import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
      <div>
  <footer className="w-full bg-[#25262F] py-12 font-fontPrimary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-12 border-b border-cyan-500/20 pb-10 items-center">
          
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Sifat<span className="text-cyan-400">.</span>
            </h2>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <ul className="flex justify-center space-x-8 text-white">
              <li>
                <a href="#about" className="hover:text-cyan-400 transition">About</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#28E98C] transition">Skills</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
              </li>
            </ul>
          </div>

          {/* Social Icons */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-6 text-white text-xl">
              <a href="https://www.facebook.com/sifat.7847/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
                <FaFacebook />
              </a>
              <a href="https://www.linkedin.com/in/sifat26/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
                <FaLinkedin />
              </a>
              <a href="https://github.com/sifat26" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
                <FaGithub />
              </a>
              <a href="https://x.com/tanvirahmmedsi2" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-gray-300 text-sm pt-6">
          <p>© 2025 Tanvir Ahmmed Sifat. All rights reserved.</p>
        </div>
      </div>
    </footer>
</div>

    );
};

export default Footer;