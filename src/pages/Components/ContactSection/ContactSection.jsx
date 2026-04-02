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
import { Send, MapPin } from "lucide-react";

const socialLinks = [
  { icon: <FaLinkedin />, href: "https://linkedin.com/in/sifat26", label: "LinkedIn", color: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5" },
  { icon: <FaGithub />, href: "https://github.com/sifat26", label: "GitHub", color: "hover:text-white hover:border-slate-400/30 hover:bg-slate-500/5" },
  { icon: <FaFacebookF />, href: "https://www.facebook.com/sifat.7847/", label: "Facebook", color: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/5" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/tanvir_ahmmed_sifat/", label: "Instagram", color: "hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5" },
  { icon: <FaXTwitter />, href: "https://x.com/tanvirahmmedsi2", label: "X (Twitter)", color: "hover:text-white hover:border-slate-400/30 hover:bg-slate-500/5" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        "✅ Message sent! A confirmation email has been sent to you.",
        {
          position: "top-right",
          autoClose: 4000,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-24 relative overflow-hidden font-fontPrimary"
      style={{ background: "var(--color-bg-secondary)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 grid-dots opacity-25" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-label mx-auto">
            <FaEnvelope className="w-3 h-3" />
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-lg mx-auto text-sm md:text-base">
            Have a project in mind or want to collaborate? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left Info Panel - 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Info Card */}
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-2">Get in Touch</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                I'm excited to hear from you! Whether it's a project idea,
                collaboration, or just a friendly hello — reach out anytime.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:sifatict26@gmail.com"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <FaEnvelope className="text-indigo-400 text-sm" />
                  </div>
                  <span className="text-sm">sifatict26@gmail.com</span>
                </a>

                <a
                  href="tel:+8801521565259"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                    <FaPhoneAlt className="text-cyan-400 text-sm" />
                  </div>
                  <span className="text-sm">+880 1521 565 259</span>
                </a>

                <a
                  href="https://wa.me/8801521565259"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                    <FaWhatsapp className="text-green-400 text-sm" />
                  </div>
                  <span className="text-sm">WhatsApp Available</span>
                </a>

                <div className="flex items-center gap-3 text-slate-400">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <MapPin className="text-purple-400 w-4 h-4" />
                  </div>
                  <span className="text-sm">Bangladesh 🇧🇩</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-5 rounded-2xl border border-white/5">
              <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold mb-4">Find me on</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`w-10 h-10 rounded-xl border border-white/5 text-slate-400 text-base flex items-center justify-center transition-all duration-300 ${link.color}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Notice */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
              <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse shrink-0" />
              <p className="text-green-300 text-sm font-medium">
                Available for freelance & full-time roles
              </p>
            </div>
          </motion.div>

          {/* Right Form - 3 cols */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass-card p-6 md:p-8 rounded-2xl border border-white/8 space-y-5"
          >
            <h3 className="text-lg font-bold text-white">Send a Message</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 font-medium mb-1.5">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-medium mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-medium mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="contact-phone"
                  placeholder="+880 ..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 font-medium mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  placeholder="Project Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 font-medium mb-1.5">Message *</label>
              <textarea
                name="message"
                id="contact-message"
                placeholder="Tell me about your project, idea, or just say hello..."
                value={formData.message}
                onChange={handleChange}
                className="form-input h-36 resize-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              id="contact-submit-btn"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin relative z-10" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 relative z-10" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
