import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://sifat-portfolio-backend.vercel.app/api/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Server error");

      toast.success(
        " Message sent successfully! A confirmation email has been sent to you.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error(`⚠️ ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#1e1f26] py-16 md:py-24 text-white font-fontPrimary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-[#0077B6] to-[#0ef] bg-clip-text text-transparent"
        >
          Let’s Connect
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#2e3039]/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg border border-[#0ef]/30"
          >
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-[#0ef]">
              Get in Touch
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
              I’m excited to hear from you! Whether it’s a project idea,
              collaboration, or just a friendly hello, reach out anytime.
            </p>
            <div className="space-y-4 text-gray-300 text-sm md:text-base">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-[#0ef] w-5 h-5" />
                <a
                  href="mailto:sifatict26@gmail.com"
                  className="hover:text-[#0ef] transition"
                >
                  sifatict26@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#0ef] w-5 h-5" />
                <a
                  href="tel:+8801521565259"
                  className="hover:text-[#0ef] transition"
                >
                  +880 1521565259
                </a>
              </p>
              <p className="flex items-center gap-3">
                <FaWhatsapp className="text-[#0ef] w-5 h-5" />
                <a
                  href="https://wa.me/8801521565259"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0ef] transition"
                  aria-label="WhatsApp"
                >
                  +880 1521565259
                </a>
              </p>
              <div className="flex gap-4 md:gap-6 mt-6 text-xl md:text-2xl">
                <a
                  href="https://linkedin.com/in/sifat26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0ef] transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/sifat26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0ef] transition"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.facebook.com/sifat.7847/" // Replace with your actual Facebook URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0ef] transition"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/tanvir_ahmmed_sifat/" // Replace with your actual Instagram URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0ef] transition"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://x.com/tanvirahmmedsi2" // Replace with your actual X URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0ef] transition"
                  aria-label="X"
                >
                  <FaXTwitter />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-[#2e3039]/80 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg border border-[#0ef]/30"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <motion.input
                whileFocus={{
                  borderColor: "#0ef",
                  boxShadow: "0 0 10px rgba(0, 238, 255, 0.3)",
                }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 md:p-4 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition text-sm md:text-base"
                required
              />
              <motion.input
                whileFocus={{
                  borderColor: "#0ef",
                  boxShadow: "0 0 10px rgba(0, 238, 255, 0.3)",
                }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 md:p-4 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition text-sm md:text-base"
                required
              />
              <motion.input
                whileFocus={{
                  borderColor: "#0ef",
                  boxShadow: "0 0 10px rgba(0, 238, 255, 0.3)",
                }}
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 md:p-4 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition text-sm md:text-base"
              />
              <motion.input
                whileFocus={{
                  borderColor: "#0ef",
                  boxShadow: "0 0 10px rgba(0, 238, 255, 0.3)",
                }}
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-3 md:p-4 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition text-sm md:text-base"
              />
              <motion.textarea
                whileFocus={{
                  borderColor: "#0ef",
                  boxShadow: "0 0 10px rgba(0, 238, 255, 0.3)",
                }}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="md:col-span-2 p-3 md:p-4 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition text-sm md:text-base h-32 md:h-40"
                required
              ></motion.textarea>
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 15px rgba(0, 238, 255, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-[#0077B6] to-[#0ef] text-black font-semibold rounded-lg shadow-lg hover:from-[#0ef] hover:to-[#0077B6] transition"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
