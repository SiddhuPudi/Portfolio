import GlassPanel from "../components/ui/GlassPanel";

const About = () => {
  return (
    <div className="h-screen flex items-center justify-center text-white">
      <GlassPanel>
        <h1 className="text-3xl mb-4">System Logs</h1>
        <p className="text-gray-300">
          I am a Full Stack Developer focused on building scalable
          and interactive applications using React and Node.js
        </p>
      </GlassPanel>
    </div>
  );
};

export default About;