import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import Scene from "./Scene";
import CanvasErrorBoundary from "../components/CanvasErrorBoundary";
import PropTypes from "prop-types";

const CanvasLayout = ({ section }) => {
  const bgColor = '#050505';
  const [perfDegraded, setPerfDegraded] = useState(false);

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
      <div className="fixed top-0 left-0 w-full h-screen z-0 transition-colors duration-300" style={{ backgroundColor: bgColor }} role="img" aria-label="Decorative 3D background animation" aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} role="img" aria-label="Interactive 3D background scene that responds to scroll position">
          <color attach="background" args={[bgColor]} />
          <PerformanceMonitor
            onDecline={() => setPerfDegraded(true)}
            onIncline={() => setPerfDegraded(false)}
            flipflops={3}
            threshold={0.9}
          >
            <Scene section={section} lowPerf={perfDegraded} bgColor={bgColor} />
          </PerformanceMonitor>
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
};

CanvasLayout.propTypes = {
  section: PropTypes.number.isRequired,
};

export default CanvasLayout;