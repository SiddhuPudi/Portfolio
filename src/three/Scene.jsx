import CameraRig from "./CameraRig";
import { Midground } from "./environments/Midground";
import { BackgroundDepth } from "./environments/BackgroundDepth";
import { ForegroundDepth } from "./environments/ForegroundDepth";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";
import PropTypes from "prop-types";

const Scene = ({ section, lowPerf = false, bgColor = '#050505' }) => {
  const dirLightRef = useRef();
  const pointLightRef = useRef();
  const ambientRef = useRef();

  // Dynamic Lighting based on section
  useFrame(() => {
    let targetDirIntensity = 0.5;
    let targetPointIntensity = 0.5;
    let targetAmbientIntensity = 0.2;
    let pointColor = new THREE.Color("#06b6d4");

    switch (section) {
      case 0: // Hero - calm, slightly glowing
        targetPointIntensity = 0.8;
        break;
      case 1: // About - brighter architectural
        targetDirIntensity = 0.7;
        targetAmbientIntensity = 0.3;
        pointColor.set("#8b5cf6");
        break;
      case 2: // Projects - high contrast, intense cyan
        targetPointIntensity = 1.0;
        targetAmbientIntensity = 0.1;
        break;
      case 3: // Skills - balanced, slightly purple
        pointColor.set("#8b5cf6");
        targetPointIntensity = 0.6;
        break;
      case 4: // Resume - clean, minimal
        targetAmbientIntensity = 0.4;
        targetDirIntensity = 0.3;
        break;
      case 5: // Contact - dark terminal
        targetAmbientIntensity = 0.05;
        targetDirIntensity = 0.1;
        targetPointIntensity = 0.2;
        break;
      default:
        break;
    }

    // Smooth lighting transitions
    if (dirLightRef.current) dirLightRef.current.intensity = THREE.MathUtils.lerp(dirLightRef.current.intensity, targetDirIntensity, 0.05);
    if (pointLightRef.current) {
      pointLightRef.current.intensity = THREE.MathUtils.lerp(pointLightRef.current.intensity, targetPointIntensity, 0.05);
      pointLightRef.current.color.lerp(pointColor, 0.05);
    }
    if (ambientRef.current) ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbientIntensity, 0.05);
  });

  return (
    <>
      {/* Cinematic Fog — disabled in low-perf mode */}
      {!lowPerf && <fog attach="fog" args={[bgColor, 5, 20]} />}

      <CameraRig section={section} />

      {/* Dynamic Lighting System */}
      <ambientLight ref={ambientRef} color="#ffffff" />
      <directionalLight ref={dirLightRef} position={[5, 5, 5]} color="#8b5cf6" />
      <pointLight ref={pointLightRef} position={[-5, -5, -5]} color="#06b6d4" />
      
      {/* LAYER 3: BACKGROUND (Massive, distant, atmospheric) */}
      <BackgroundDepth />

      {/* LAYER 2: MIDGROUND (Active geometry reacting to sections) */}
      <Midground section={section} />

      {/* LAYER 1: FOREGROUND (Dust, particles, immediate depth) — disabled in low-perf mode */}
      {!lowPerf && <ForegroundDepth section={section} />}
    </>
  );
};

Scene.propTypes = {
  section: PropTypes.number.isRequired,
  lowPerf: PropTypes.bool,
  bgColor: PropTypes.string,
};

Scene.defaultProps = {
  lowPerf: false,
  bgColor: '#050505',
};

export default Scene;