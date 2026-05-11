import { motion } from "framer-motion";
import { Code, User, Mail, Terminal } from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel w-full max-w-2xl rounded-xl border border-white/10 overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="bg-black/50 px-4 py-3 border-b border-white/5 flex items-center gap-2">
          <Terminal size={16} className="text-gray-500" />
          <span className="text-xs font-mono text-gray-500">connection_terminal.exe</span>
        </div>

        {/* Terminal Body */}
        <div className="p-8 font-mono text-sm">
          <div className="text-sys-cyan mb-6">
            $ init connection protocol...<br/>
            $ locating developer nodes...<br/>
            $ <span className="text-green-400">nodes found. ready for connection.</span>
          </div>

          <div className="space-y-6">
            <a href="mailto:thrivikrampudi@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-white group">
              <span className="text-sys-purple w-24">Email</span>
              <span className="text-gray-600 group-hover:text-sys-cyan transition-colors">{"->"}</span>
              <span className="flex items-center gap-2 border-b border-transparent group-hover:border-white transition-colors">
                <Mail size={16} /> thrivikrampudi@gmail.com
              </span>
            </a>
            
            <a href="https://github.com/SiddhuPudi" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white group">
              <span className="text-sys-purple w-24">GitHub</span>
              <span className="text-gray-600 group-hover:text-sys-cyan transition-colors">{"->"}</span>
              <span className="flex items-center gap-2 border-b border-transparent group-hover:border-white transition-colors">
                <Code size={16} /> github.com/SiddhuPudi
              </span>
            </a>

            <a href="https://linkedin.com/in/pudithrivikram" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-400 hover:text-white group">
              <span className="text-sys-purple w-24">LinkedIn</span>
              <span className="text-gray-600 group-hover:text-sys-cyan transition-colors">{"->"}</span>
              <span className="flex items-center gap-2 border-b border-transparent group-hover:border-white transition-colors">
                <User size={16} /> linkedin.com/in/pudithrivikram
              </span>
            </a>
          </div>

          <div className="mt-8 flex items-center gap-2 text-gray-500">
            <span>$</span>
            <span className="w-2 h-4 bg-gray-500 animate-pulse"></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
