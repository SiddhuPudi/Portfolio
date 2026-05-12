import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import CanvasErrorBoundary from "../components/CanvasErrorBoundary";

const CanvasLayout = ({ section }) => {
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
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 to-black" />
    );
  }

  return (
    <CanvasErrorBoundary>
      <div className="fixed top-0 left-0 w-full h-screen z-0 bg-[#050505]" role="img" aria-label="Decorative 3D background animation" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          {/* Cinematic Fog */}
          <fog attach="fog" args={["#050505", 5, 20]} />
          <Scene section={section} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};

export default CanvasLayout;