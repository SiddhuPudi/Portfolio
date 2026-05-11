import { Float } from "@react-three/drei";
import * as THREE from "three";

export const BackgroundDepth = () => {
  return (
    <group position={[0, 0, -20]}>
      {/* Massive Distant Ring */}
      <Float speed={0.2} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh position={[-15, 5, -10]} rotation={[0.4, -0.2, 0]}>
          <torusGeometry args={[15, 0.05, 16, 100]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.08} fog={true} />
        </mesh>
      </Float>

      {/* Massive Monolith Silhouettes */}
      <Float speed={0.1} rotationIntensity={0.05} floatIntensity={0.2}>
        <mesh position={[10, -5, -15]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[4, 30, 4]} />
          <meshBasicMaterial color="#050505" transparent opacity={0.8} fog={true} />
        </mesh>
      </Float>
      
      <Float speed={0.15} rotationIntensity={0.02} floatIntensity={0.3}>
        <mesh position={[-12, -10, -5]} rotation={[0, -0.2, 0]}>
          <boxGeometry args={[6, 40, 2]} />
          <meshBasicMaterial color="#050505" transparent opacity={0.6} fog={true} />
        </mesh>
      </Float>

      {/* Deep Atmospheric Grid */}
      <mesh position={[0, -15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 20, 20]} />
        <meshBasicMaterial 
          color="#06b6d4" 
          wireframe 
          transparent 
          opacity={0.03} 
          side={THREE.DoubleSide} 
          fog={true}
        />
      </mesh>
    </group>
  );
};
