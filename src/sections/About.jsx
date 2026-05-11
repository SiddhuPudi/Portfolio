import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="w-full h-full flex items-center justify-start px-8 md:px-24">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="glass-panel p-10 rounded-2xl max-w-2xl border border-sys-cyan/20"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-sys-purple"></div>
          <span className="text-sys-purple font-mono text-sm tracking-widest uppercase">System Logs</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-white">
          Architecting <span className="text-gradient">Scalable</span> Web Experiences
        </h2>
        
        <div className="space-y-4 text-gray-400 font-light leading-relaxed">
          <p>
            I am a product-focused full stack engineer driven by a passion for interactive 
            UI systems and robust backend architecture. My approach treats every project 
            not just as code, but as a holistic digital system.
          </p>
          <p>
            From engineering real-time applications with Socket.IO and Docker to 
            experimenting with AI and NLP models, I build scalable systems that are 
            both technically powerful and visually immersive.
          </p>
        </div>

        <div className="mt-8 flex gap-4 font-mono text-xs text-sys-cyan">
          <span className="bg-sys-cyan/10 px-3 py-1 rounded-full border border-sys-cyan/20">System Builder</span>
          <span className="bg-sys-cyan/10 px-3 py-1 rounded-full border border-sys-cyan/20">Product Engineer</span>
        </div>
      </motion.div>
    </div>
  );
};

export default About;