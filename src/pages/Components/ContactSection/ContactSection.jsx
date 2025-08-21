import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again later.");
      }
    } catch (error) {
      setStatus("⚠️ Error connecting to server.");
    }
  };

  return (
    <section id="contact" className="w-full bg-[#25262F] py-20 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16"
        >
          Let’s <span className="text-[#0ef]">Connect</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#2e3039]/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#0ef]/20"
          >
            <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
            <p className="text-gray-300 mb-6">
              I’d love to hear from you! Whether you have a project idea, want to
              collaborate, or just say hi, feel free to reach out.
            </p>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-center gap-3">
                <FaEnvelope className="text-[#0ef]" /> <a href="mailto:sifatict26@gmail.com">sifatict26@gmail.com</a>
              </p>
              <p className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#0ef]" /> <a href="tel:+8801521565259">+880 1521565259</a>
              </p>
              <div className="flex gap-5 mt-6 text-xl">
                <a
                  href="https://linkedin.com/in/sifat26"
                  target="_blank"
                  className="hover:text-[#0ef] transition"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  className="hover:text-[#0ef] transition"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-[#2e3039]/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-[#0ef]/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="md:col-span-2 p-3 rounded-lg bg-[#1e1f26] border border-gray-600 focus:outline-none focus:border-[#0ef] transition h-40"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-[#0077B6] to-[#0ef] text-black font-semibold rounded-lg shadow-lg hover:opacity-90 transition"
            >
              Send Message
            </button>
            {status && (
              <p className="text-center mt-4 text-gray-300">{status}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
