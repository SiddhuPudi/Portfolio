import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CanvasLayout = ({ section }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-0 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Cinematic Fog */}
        <fog attach="fog" args={["#050505", 5, 20]} />
        <Scene section={section} />
      </Canvas>
    </div>
  );
};

export default CanvasLayout;