import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

/* Inline SVG icons — lucide-react v1.x removed brand icons */
const GithubIcon = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("submitting");
    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus("success");
      else setStatus("error");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row gap-16 items-center justify-center px-8 md:px-20 py-16">
      {/* LEFT COLUMN */}
      <div className="w-full md:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sys-cyan font-mono text-xs tracking-widest mb-6"
        >
          05 // CONTACT
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white leading-tight"
        >
          Let&apos;s Build
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-white leading-tight"
        >
          Something
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-sys-cyan leading-tight"
        >
          Together.
        </motion.h1>

        <div className="mt-10">
          <div className="font-mono text-xs text-gray-500 tracking-widest mb-3">DROP A LINE</div>
          <a href="mailto:work.with.thrivikram@gmail.com" className="text-white text-lg hover:text-sys-cyan transition-colors">
            work.with.thrivikram@gmail.com
          </a>
        </div>

        <div className="mt-8 flex gap-4">
          <a href="https://github.com/SiddhuPudi" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-sys-cyan/50 hover:text-sys-cyan transition-all">
            <GithubIcon size={20} />
          </a>
          <a href="https://linkedin.com/in/pudithrivikram" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:border-sys-cyan/50 hover:text-sys-cyan transition-all">
            <LinkedinIcon size={20} />
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN – Form */}
      <div className="w-full md:w-1/2">
        <AnimatePresence>
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center gap-4 glass-panel rounded-2xl p-8 border border-white/5"
            >
              <CheckCircle2 className="w-12 h-12 text-sys-cyan" />
              <div className="font-mono text-sm text-sys-cyan tracking-widest">MESSAGE TRANSMITTED</div>
              <div className="text-gray-400 text-sm">I&apos;ll get back to you soon.</div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-8 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sys-cyan/50 transition-colors duration-300"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sys-cyan/50 transition-colors duration-300 mt-6"
                required
              />
              <textarea
                rows={4}
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sys-cyan/50 transition-colors duration-300 mt-6 resize-none"
                required
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full mt-10 py-4 rounded-full bg-white text-black font-mono text-sm font-bold tracking-widest uppercase hover:bg-sys-cyan transition-colors duration-300"
              >
                SEND MESSAGE →
              </button>
              {status === "error" && (
                <div className="text-red-400 mt-2 text-sm text-center">Error sending message. Please try again.</div>
              )}
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Contact;
