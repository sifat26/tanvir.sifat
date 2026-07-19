import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { Menu, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import { navLinks, personal } from "../../../data/portfolio";
import { useTheme } from "../../../hooks/useTheme";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const { theme, toggle } = useTheme();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasResume = personal.resumeUrl && personal.resumeUrl !== "[ADD_RESUME_URL]";

  return (
    <>
      {/* Scroll progress */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)]"
            : "bg-transparent border-b border-transparent"
        }`}
        role="banner"
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group" aria-label={`${personal.name} — home`}>
              <div className="w-8 h-8 rounded-md bg-[var(--text)] text-[var(--bg)] grid place-items-center font-semibold text-sm">
                S
              </div>
              <span className="text-[15px] font-semibold tracking-tight text-[var(--text)]">
                {personal.shortName}
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${active === link.href ? "active" : ""}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="w-9 h-9 grid place-items-center rounded-md text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--bg-muted)] transition-colors"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {hasResume && (
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex btn btn-secondary text-sm"
                >
                  Resume
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <a href="#contact" className="hidden sm:inline-flex btn btn-primary">
                Get in touch
              </a>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="md:hidden w-9 h-9 grid place-items-center rounded-md text-[var(--text)] hover:bg-[var(--bg-muted)] transition-colors"
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-[var(--border)] bg-[var(--bg)]"
            >
              <nav className="container-page py-3 flex flex-col" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-[15px] text-[var(--text-secondary)] hover:text-[var(--text)]"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex gap-2 pt-3 pb-2">
                  {hasResume && (
                    <a
                      href={personal.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary flex-1 justify-center"
                    >
                      Resume
                    </a>
                  )}
                  <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary flex-1 justify-center">
                    Get in touch
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
