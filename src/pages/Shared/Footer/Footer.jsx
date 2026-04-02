import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: <FaFacebook />, href: "https://www.facebook.com/sifat.7847/", label: "Facebook" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/sifat26/", label: "LinkedIn" },
  { icon: <FaGithub />, href: "https://github.com/sifat26", label: "GitHub" },
  { icon: <FaXTwitter />, href: "https://x.com/tanvirahmmedsi2", label: "X (Twitter)" },
];

const Footer = () => {
  return (
    <footer
      className="w-full font-fontPrimary relative overflow-hidden"
      style={{ background: "var(--color-bg-primary)" }}
    >
      {/* Top border gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2 w-fit group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-glow-sm">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white tracking-wide group-hover:text-indigo-300 transition-colors duration-300">
                Sifat<span className="text-indigo-400">.</span>
              </span>
            </a>
            <p className="text-slate-500 text-sm mt-2 max-w-xs leading-relaxed">
              Full-Stack Developer building modern, scalable web applications.
            </p>
          </div>

          {/* Links */}
          <nav className="flex justify-center" aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-indigo-300 text-sm font-medium transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="flex md:justify-end justify-center gap-3">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-9 h-9 rounded-xl border border-white/5 text-slate-500 hover:text-white hover:border-indigo-500/30 hover:bg-indigo-500/5 flex items-center justify-center text-sm transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-600 text-xs">
            © 2025 Tanvir Ahmmed Sifat. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs">
            Built with <span className="text-indigo-400">React</span> & <span className="text-indigo-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;