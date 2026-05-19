import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, ExternalLink, Download } from "lucide-react";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { siteConfig } from "../data/config";
import GithubIcon from "../components/icons/GithubIcon";

const TABS = [
  { id: "academic",  label: "Academic Journey",  icon: GraduationCap },
  { id: "coding",    label: "Coding Profiles",    icon: ExternalLink   },
  { id: "github",    label: "GitHub",             icon: GithubIcon     },
  { id: "resume",    label: "Resume",             icon: Download       },
];

const panelVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
  animate: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit:    (dir) => ({ opacity: 0, x: dir < 0 ? 40 : -40, transition: { duration: 0.3, ease: "easeIn" } }),
};

const Resume = () => {
  const [active, setActive] = useState("academic");
  const [dir,    setDir]    = useState(1);

  const switchTab = (id) => {
    const oldIdx = TABS.findIndex((t) => t.id === active);
    const newIdx = TABS.findIndex((t) => t.id === id);
    setDir(newIdx > oldIdx ? 1 : -1);
    setActive(id);
  };

  return (
    <div role="region" aria-label="Resume and education" className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 py-10 overflow-y-auto hide-scrollbar">
      {/* ── Panel ── */}
      <div className="w-full max-w-2xl relative">
        <AnimatePresence mode="wait" custom={dir}>

          {/* ACADEMIC JOURNEY */}
          {active === "academic" && (
            <motion.div
              key="academic"
              custom={dir}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-sys-cyan flex-shrink-0" />
                <span className="font-mono text-[10px] text-sys-cyan tracking-[0.25em] uppercase">Background</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                Academic <span className="text-gradient">Journey</span>
              </h3>

              <div className="relative flex flex-col gap-6">
                <div className="absolute left-[22px] top-12 bottom-12 w-px bg-gradient-to-b from-sys-cyan/40 via-sys-purple/20 to-transparent" />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border border-sys-cyan/30 bg-sys-cyan/10 flex items-center justify-center z-10">
                    <GraduationCap size={18} className="text-sys-cyan" />
                  </div>
                  <div className="flex-1 glass-panel rounded-2xl p-5 border border-white/[0.06] hover:border-sys-cyan/20 transition-all duration-300">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <h4 className="text-white font-bold text-sm leading-snug max-w-[220px]">
                        Indian Institute of Information Technology Dharwad
                      </h4>
                      <span className="font-mono text-[10px] text-sys-cyan/70 border border-sys-cyan/20 bg-sys-cyan/5 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        2023 – 2027
                      </span>
                    </div>
                    <p className="text-sys-cyan text-xs font-mono mb-2">B.Tech in Computer Science and Engineering</p>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Core CS curriculum: algorithms, data structures, system design, databases, web development, and software engineering.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.22 }}
                  className="flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full border border-sys-purple/30 bg-sys-purple/10 flex items-center justify-center z-10">
                    <BookOpen size={18} className="text-sys-purple" />
                  </div>
                  <div className="flex-1 glass-panel rounded-2xl p-5 border border-white/[0.06] hover:border-sys-purple/20 transition-all duration-300">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <h4 className="text-white font-bold text-sm leading-snug">
                        Narayana Junior College, Visakhapatnam
                      </h4>
                      <span className="font-mono text-[10px] text-sys-purple/70 border border-sys-purple/20 bg-sys-purple/5 px-3 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        2020 – 2022
                      </span>
                    </div>
                    <p className="text-sys-purple text-xs font-mono mb-2">Intermediate — Mathematics, Physics, Chemistry</p>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Completed MPC stream with a strong foundation in mathematics and analytical thinking.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* CODING PROFILES */}
          {active === "coding" && (
            <motion.div
              key="coding"
              custom={dir}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-sys-cyan flex-shrink-0" />
                <span className="font-mono text-[10px] text-sys-cyan tracking-[0.25em] uppercase">Competitive Programming</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                Coding <span className="text-gradient">Profiles</span>
              </h3>

              <div className="flex flex-col gap-4">
                <motion.a
                  href="https://leetcode.com/u/siddhu_pudi/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit LeetCode profile"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="group flex items-start gap-4 glass-panel rounded-2xl p-5 border border-white/[0.06] hover:border-[#FFA116]/30 hover:bg-[#FFA116]/[0.03] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/20 flex items-center justify-center group-hover:bg-[#FFA116]/20 transition-all duration-300">
                    <SiLeetcode size={22} color="#FFA116" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <div>
                        <h4 className="text-white font-bold text-sm">LeetCode</h4>
                        <p className="font-mono text-xs text-[#FFA116]/70">@siddhu_pudi</p>
                      </div>
                      <div className="flex gap-3 flex-wrap ml-auto mr-4">
                        {[
                          { label: "Contest Rating", value: "1491" },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-[#FFA116]/5 border border-[#FFA116]/15 rounded-lg px-3 py-1.5 text-center">
                            <div className="font-mono text-sm font-bold text-[#FFA116]">{value}</div>
                            <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{label}</div>
                          </div>
                        ))}
                      </div>
                      <ExternalLink size={12} className="text-gray-600 group-hover:text-[#FFA116] transition-colors duration-300" />
                    </div>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Algorithmic problem solving — DSA, dynamic programming, and competitive challenges.
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://www.codechef.com/users/siddhu_pudi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit CodeChef profile"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="group flex items-start gap-4 glass-panel rounded-2xl p-5 border border-white/[0.06] hover:border-[#5B4638]/60 hover:bg-[#5B4638]/[0.05] transition-all duration-300 cursor-pointer"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#CE5C2B]/10 border border-[#CE5C2B]/20 flex items-center justify-center group-hover:bg-[#CE5C2B]/20 transition-all duration-300">
                    {SiCodechef
                      ? <SiCodechef size={22} color="#CE5C2B" />
                      : <span className="text-[#CE5C2B] font-bold text-sm">CC</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2">
                      <div>
                        <h4 className="text-white font-bold text-sm">CodeChef</h4>
                        <p className="font-mono text-xs text-[#CE5C2B]/70">@siddhu_pudi</p>
                      </div>
                      <div className="flex gap-3 flex-wrap ml-auto mr-4">
                        {[
                          { label: "Contest Rating", value: "1424" },
                        ].map(({ label, value }) => (
                          <div key={label} className="bg-[#CE5C2B]/5 border border-[#CE5C2B]/15 rounded-lg px-3 py-1.5 text-center">
                            <div className="font-mono text-sm font-bold text-[#CE5C2B]">{value}</div>
                            <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{label}</div>
                          </div>
                        ))}
                      </div>
                      <ExternalLink size={12} className="text-gray-600 group-hover:text-[#CE5C2B] transition-colors duration-300" />
                    </div>
                    <p className="text-gray-500 text-xs font-light leading-relaxed">
                      Competitive programming contests and rating improvement.
                    </p>
                  </div>
                </motion.a>
              </div>
            </motion.div>
          )}

          {/* GITHUB CONTRIBUTIONS */}
          {active === "github" && (
            <motion.div
              key="github"
              custom={dir}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-emerald-400 flex-shrink-0" />
                <span className="font-mono text-[10px] text-emerald-400 tracking-[0.25em] uppercase">Open Source</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
                GitHub <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Activity</span>
              </h3>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-panel rounded-2xl p-6 border border-white/[0.06] hover:border-emerald-400/20 transition-all duration-300"
              >
                {/* Contribution Graph with scroll hint */}
                <div className="relative w-full rounded-xl">
                  <div className="w-full overflow-x-auto hide-scrollbar rounded-xl">
                    <img
                      src={`https://ghchart.rshah.org/40c463/${siteConfig.githubUsername}?d=${new Date().toISOString().slice(0, 10)}`}
                      alt={`GitHub contribution graph for ${siteConfig.githubUsername} showing daily commit activity over the past year`}
                      className="w-full min-w-[680px] h-auto rounded-xl bg-white/[0.02]"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling && (e.target.nextElementSibling.style.display = 'flex');
                      }}
                    />
                    {/* Fallback shown on error */}
                    <div className="hidden items-center justify-center h-24 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                      <p className="font-mono text-xs text-gray-600">Contribution graph unavailable — visit GitHub directly</p>
                    </div>
                  </div>
                  {/* Mobile scroll hint — right-edge gradient fade */}
                  <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent rounded-r-xl pointer-events-none md:hidden" />
                </div>

                {/* Quick stats row */}
                <div className="flex gap-3 mt-5 flex-wrap">
                  {[
                    { label: "Repositories", value: "10+" },
                    { label: "This Year", value: "200+" , sub: "contributions" },
                    { label: "Top Language", value: "JavaScript" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex-1 min-w-[100px] bg-emerald-400/5 border border-emerald-400/10 rounded-lg px-3 py-2.5 text-center">
                      <div className="font-mono text-sm font-bold text-emerald-400">{value}</div>
                      <div className="font-mono text-[9px] text-gray-600 uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Caption row */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                  <div>
                    <p className="text-white font-bold text-sm">{siteConfig.githubUsername}</p>
                    <p className="font-mono text-xs text-gray-500 mt-0.5">Contribution activity over the past year</p>
                  </div>
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${siteConfig.githubUsername}'s GitHub profile`}
                    className="flex items-center gap-2 font-mono text-xs text-gray-500 hover:text-emerald-400 border border-white/10 hover:border-emerald-400/30 bg-white/[0.03] hover:bg-emerald-400/5 px-4 py-2 rounded-full transition-all duration-300"
                  >
                    <GithubIcon size={14} />
                    <span className="hidden sm:inline">View Profile</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* RESUME DOWNLOAD */}
          {active === "resume" && (
            <motion.div
              key="resume"
              custom={dir}
              variants={panelVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex justify-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="glass-panel p-12 rounded-3xl max-w-xl w-full text-center border border-sys-purple/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-sys-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="text-sys-purple font-mono text-xs tracking-[0.3em] uppercase mb-8 relative z-10">
                  System Blueprint
                </div>
                <h2 className="text-3xl font-light text-white mb-6 relative z-10">
                  Download Engineering Profile
                </h2>
                <p className="text-gray-400 font-light mb-10 text-sm relative z-10">
                  Acquire the complete technical specifications, work history, and educational background.
                </p>
                <motion.a
                  href={siteConfig.resumeUrl}
                  download={siteConfig.resumeDownloadName}
                  aria-label="Download resume PDF"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-sys-purple/10 border border-sys-purple/30 rounded-full text-sys-purple hover:bg-sys-purple/20 hover:border-sys-purple/50 transition-colors"
                >
                  <span className="font-mono text-sm tracking-widest uppercase">Initialize Download</span>
                  <Download size={18} />
                </motion.a>
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Tab Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-1 p-1 glass-panel rounded-2xl border border-white/[0.08] mt-10"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => switchTab(id)}
              aria-label={`Switch to ${label} tab`}
              className={`
                relative flex items-center gap-2 px-5 py-2.5 rounded-xl
                font-mono text-xs tracking-widest uppercase
                transition-all duration-300 cursor-pointer
                ${isActive ? "text-white" : "text-gray-500 hover:text-gray-300"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-xl bg-white/[0.07] border border-sys-cyan/20"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <Icon size={13} className={`relative z-10 ${isActive ? "text-sys-cyan" : ""}`} />
              <span className="relative z-10 hidden sm:inline">{label}</span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Resume;