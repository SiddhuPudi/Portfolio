import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { siteConfig } from "../data/config";

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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", _gotcha: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    if (formData._gotcha) return false;
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.email || !EMAIL_REGEX.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const response = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section role="region" aria-label="Contact information" className="w-full h-auto min-h-screen overflow-y-auto pb-20 snap-none md:snap-start flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16 items-center justify-center px-4 sm:px-8 md:px-10 lg:px-16 py-16 md:overflow-visible">
      <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center md:h-full md:max-h-none md:overflow-visible max-h-[70vh] overflow-y-auto">
        {/* LEFT COLUMN */}
      <div className="w-full pb-6 md:pb-0 md:w-2/5">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sys-cyan font-mono text-xs tracking-widest mb-6"
          aria-hidden="true"
        >
          05 // CONTACT
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-6xl font-bold text-white leading-tight"
        >
          Let&apos;s Build
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-6xl font-bold text-white leading-tight"
        >
          Something
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="text-2xl sm:text-4xl md:text-6xl font-bold text-sys-cyan leading-tight"
        >
          Together.
        </motion.h1>

        {/* Contact cards grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-3 mt-8">
          {/* Email — large, full width */}
          <a href={`mailto:${siteConfig.email}`} aria-label={`Send email to ${siteConfig.email}`} className="col-span-2 flex items-center gap-4 glass-panel rounded-2xl p-5 border border-white/[0.06] hover:border-[#EA4335]/30 transition-all duration-300 cursor-pointer group">
            <div className="w-14 h-14 rounded-xl bg-[#EA4335]/20 flex items-center justify-center flex-shrink-0">
              <Mail size={28} className="text-[#EA4335]" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase mb-0.5">Email</div>
              <div className="text-white text-[10px] sm:text-sm font-medium">{siteConfig.email}</div>
            </div>
          </a>

          {/* Phone */}
          <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} aria-label={`Call ${siteConfig.phone}`} className="flex items-center gap-3 glass-panel rounded-2xl p-4 border border-white/[0.06] hover:border-sys-cyan/20 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-sys-cyan/10 flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-sys-cyan" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase mb-0.5">Phone</div>
              <div className="text-white text-xs font-medium truncate max-w-[130px]">{siteConfig.phone}</div>
            </div>
          </a>

          {/* Instagram */}
          <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer" aria-label="Visit Instagram profile" className="flex items-center gap-3 glass-panel rounded-2xl p-4 border border-white/[0.06] hover:border-sys-cyan/20 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-[#E1306C]/10 flex items-center justify-center flex-shrink-0">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" className="text-[#E1306C]">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase mb-0.5">Instagram</div>
              <div className="text-white text-xs font-medium truncate max-w-[130px]">@siddhu_pudi</div>
            </div>
          </a>

          {/* GitHub */}
          <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" aria-label="Visit GitHub profile" className="flex items-center gap-3 glass-panel rounded-2xl p-4 border border-white/[0.06] hover:border-sys-cyan/20 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
              <GithubIcon size={18} className="text-white" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase mb-0.5">GitHub</div>
              <div className="text-white text-xs font-medium truncate max-w-[130px]">SiddhuPudi</div>
            </div>
          </a>

          {/* LinkedIn */}
          <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" aria-label="Visit LinkedIn profile" className="flex items-center gap-3 glass-panel rounded-2xl p-4 border border-white/[0.06] hover:border-sys-cyan/20 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-[#0A66C2]/20 flex items-center justify-center flex-shrink-0">
              <LinkedinIcon size={18} className="text-[#0A66C2]" />
            </div>
            <div>
              <div className="font-mono text-[9px] text-gray-500 tracking-[0.2em] uppercase mb-0.5">LinkedIn</div>
              <div className="text-white text-xs font-medium truncate max-w-[130px]">thrivikram-pudi</div>
            </div>
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN – Form */}
      <div className="w-full md:w-3/5">
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
              <div className="text-gray-400 text-sm">Message sent! I&apos;ll get back to you soon.</div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-6 pb-28 sm:p-8 border border-white/5 overflow-visible"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              noValidate
            >
              {/* Error banner */}
              {status === "error" && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email me directly.
                </div>
              )}

              {/* Name */}
              <div className="mb-4 md:mb-0">
                <input
                  type="text"
                  aria-label="Your name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className="w-full bg-transparent border border-white/10 md:border-t-0 md:border-l-0 md:border-r-0 md:border-b p-3 md:py-4 md:px-0 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sys-cyan/50 rounded-lg md:rounded-none transition-colors duration-300"
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mt-0 md:mt-6 mb-4 md:mb-0">
                <input
                  type="email"
                  aria-label="Your email address"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                  }}
                  className="w-full bg-transparent border border-white/10 md:border-t-0 md:border-l-0 md:border-r-0 md:border-b p-3 md:py-4 md:px-0 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sys-cyan/50 rounded-lg md:rounded-none transition-colors duration-300"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="mt-0 md:mt-6 mb-4 md:mb-0">
                <textarea
                  rows={4}
                  aria-label="Your message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  className="w-full bg-transparent border border-white/10 md:border-t-0 md:border-l-0 md:border-r-0 md:border-b p-3 md:py-4 md:px-0 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-sys-cyan/50 rounded-lg md:rounded-none transition-colors duration-300 resize-none min-h-[120px]"
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1 font-mono">{errors.message}</p>
                )}
              </div>

              {/* Honeypot spam prevention */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Submit button */}
              <div className="mb-6 md:mb-0">
                <button
                  aria-label="Send message"
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full mt-6 md:mt-10 py-3 md:py-4 rounded-full bg-white text-black font-mono text-sm font-bold tracking-widest uppercase hover:bg-sys-cyan transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      SENDING...
                    </>
                  ) : (
                    "SEND MESSAGE →"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;
