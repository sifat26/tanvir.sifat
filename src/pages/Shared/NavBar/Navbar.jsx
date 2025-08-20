import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <header
        className="w-full fixed top-0 left-0 z-50 shadow-lg bg-[#25262F] font-fontPrimary



"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-2xl font-bold text-white tracking-wide">
              Sifat<span className="text-[#28E98C]">.</span>
            </a>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-10 text-white text-lg font-medium">
              <a href="#about" className="hover:text-[#28E98C] transition">
                About
              </a>
              <a href="#projects" className="hover:text-[#28E98C] transition">
                Projects
              </a>
              <a href="#skills" className="hover:text-[#28E98C] transition">
                Skills
              </a>
              <a href="#contact" className="hover:text-[#28E98C] transition">
                Contact
              </a>
            </nav>
            <div className="hidden md:block">
              <a
                href="#contact"
                className="px-5 py-2 border border-[#0ef] hover:bg-[#0ef] hover:text-black text-white font-semibold rounded-lg shadow-md transition"
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-200 hover:text-[#28E98C] focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#03045E] text-gray-200 border-t border-[#0077B6]">
            <nav className="flex flex-col items-center py-6 space-y-6 text-lg">
              <a href="#about" className="hover:text-[#28E98C] transition">
                About
              </a>
              <a href="#projects" className="hover:text-[#28E98C] transition">
                Projects
              </a>
              <a href="#skills" className="hover:text-[#28E98C] transition">
                Skills
              </a>
              <a href="#contact" className="hover:text-[#28E98C] transition">
                Contact
              </a>
              <a
                href="#contact"
                className="px-5 py-2 border border-[#28E98C] hover:bg-[#28E98C] text-white font-semibold rounded-lg shadow-md transition"
              >
                Hire Me
              </a>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
