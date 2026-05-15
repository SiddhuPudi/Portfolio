import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import CanvasErrorBoundary from "../components/CanvasErrorBoundary";
import { useTheme } from "../context/ThemeContext";

const CanvasLayout = ({ section }) => {
  const { theme } = useTheme();
  const bgColor = theme === 'dark' ? '#050505' : '#f8f7f4';

  // GPU capability check — bail out on devices without WebGL
  const testCanvas = document.createElement("canvas");
  const gl =
    testCanvas.getContext("webgl") ||
    testCanvas.getContext("experimental-webgl");
  const isLowEnd = !gl;

  // Clean up the test canvas
  testCanvas.width = 0;
  testCanvas.height = 0;

  if (isLowEnd) {
    return (
      <div className={`fixed inset-0 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-950 to-black' : 'bg-[#f8f7f4]'}`} />
    );
  }

  return (
    <CanvasErrorBoundary>
      <div className="fixed top-0 left-0 w-full h-screen z-0 transition-colors duration-300" style={{ backgroundColor: bgColor }} role="img" aria-label="Decorative 3D background animation" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={[bgColor]} />
          {/* Cinematic Fog */}
          <fog attach="fog" args={[bgColor, 5, 20]} />
          <Scene section={section} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};

export default CanvasLayout;