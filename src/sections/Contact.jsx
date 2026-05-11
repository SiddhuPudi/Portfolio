import { useState } from "react";
import { motion } from "framer-motion";
import { Code, User, Mail, Terminal, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("submitting");
    
    try {
      // TODO: Replace YOUR_FORM_ID with your Formspree endpoint
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
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
    <div className="w-full h-full flex flex-col items-center justify-center px-4 pointer-events-auto">
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
        <div className="p-8 font-mono text-sm max-h-[80vh] overflow-y-auto">
          <div className="text-sys-cyan mb-6">
            $ init connection protocol...<br/>
            $ locating developer nodes...<br/>
            $ <span className="text-green-400">nodes found. ready for connection.</span>
          </div>

          <div className="space-y-6 mb-8">
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

          <div className="border-t border-white/5 pt-6">
            {status === "success" ? (
              <div className="text-green-400">
                $ message transmitted successfully ✓
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sys-cyan mb-4">$ open direct channel...</div>
                
                <input 
                  type="text" 
                  placeholder="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-md font-mono text-sm text-gray-300 px-4 py-2 focus:outline-none focus:border-sys-cyan/50 focus:ring-1 focus:ring-sys-cyan/20 placeholder:text-gray-600"
                />
                
                <input 
                  type="email" 
                  placeholder="email@address.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-md font-mono text-sm text-gray-300 px-4 py-2 focus:outline-none focus:border-sys-cyan/50 focus:ring-1 focus:ring-sys-cyan/20 placeholder:text-gray-600"
                />
                
                <textarea 
                  rows={4}
                  placeholder="enter message payload..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-md font-mono text-sm text-gray-300 px-4 py-2 focus:outline-none focus:border-sys-cyan/50 focus:ring-1 focus:ring-sys-cyan/20 placeholder:text-gray-600 resize-none"
                />
                
                <button 
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                  className="mt-2 flex items-center gap-2 border border-sys-cyan/30 text-sys-cyan hover:bg-sys-cyan/10 px-6 py-2 rounded-md transition-colors w-full sm:w-auto"
                >
                  <Send size={16} />
                  {status === "submitting" ? "Transmitting..." : "Transmit Message"}
                </button>
                {status === "error" && (
                  <div className="text-red-400 mt-2 text-xs">
                    $ error: transmission failed. please try again.
                  </div>
                )}
              </div>
            )}
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
