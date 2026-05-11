import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Line, Sphere, Trail } from "@react-three/drei";

// Helper for smooth transitions
const EnvGroup = ({ active, children, position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const group = useRef();
  
  useFrame((state, delta) => {
    const targetScale = active ? 1 : 0.001;
    group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
    if (!active) {
       // Slowly drift away when inactive
       group.current.position.lerp(new THREE.Vector3(position[0], position[1] - 2, position[2]), 0.02);
    } else {
       group.current.position.lerp(new THREE.Vector3(...position), 0.05);
    }
  });

  return (
    <group ref={group} rotation={rotation}>
      {children}
    </group>
  );
};

export const Midground = ({ section }) => {
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
  });

  return (
    <>
      {/* SECTION 0: HERO (System Initialization) */}
      <EnvGroup active={section === 0}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshStandardMaterial 
              color="#050505" 
              wireframe 
              emissive="#7c3aed" 
              emissiveIntensity={0.4}
              transparent
              opacity={0.6}
            />
          </mesh>
          {/* Glowing core */}
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.8} />
          </mesh>
        </Float>
      </EnvGroup>

      {/* SECTION 1: ABOUT (Architectural / Fragmented) */}
      <EnvGroup active={section === 1} position={[2, 0, -2]}>
        <Float speed={1} rotationIntensity={1.5} floatIntensity={2}>
          {/* Asymmetrical rings */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[2, 0.02, 16, 100]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[3, 0.01, 16, 100]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
          </mesh>
          <mesh position={[1, 1, -1]}>
            <boxGeometry args={[0.5, 2, 0.5]} />
            <meshStandardMaterial wireframe color="#7c3aed" transparent opacity={0.4} />
          </mesh>
        </Float>
      </EnvGroup>

      {/* SECTION 2: PROJECTS (Node Clusters / Subsystems) */}
      <EnvGroup active={section === 2} position={[0, -2, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            {/* Holographic grid base */}
            <gridHelper args={[10, 20, "#06b6d4", "#ffffff"]} position={[0, -1, 0]} material-opacity={0.15} material-transparent />
            
            {/* Nodes */}
            <mesh position={[-2, 0.5, -2]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#0a0a0a" emissive="#06b6d4" emissiveIntensity={0.8} wireframe />
            </mesh>
            <mesh position={[2, 1, 1]}>
              <boxGeometry args={[0.8, 2, 0.8]} />
              <meshStandardMaterial color="#0a0a0a" emissive="#8b5cf6" emissiveIntensity={0.8} wireframe />
            </mesh>
            <mesh position={[-1, 0.2, 3]}>
              <boxGeometry args={[1.5, 0.4, 1.5]} />
              <meshStandardMaterial color="#0a0a0a" emissive="#ffffff" emissiveIntensity={0.3} wireframe />
            </mesh>
          </group>
        </Float>
      </EnvGroup>

      {/* SECTION 3: SKILLS (Constellation / Network) */}
      <EnvGroup active={section === 3} position={[-2, 1, -1]}>
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1}>
          {/* Network Lines */}
          <Line points={[[-2, 0, 0], [0, 2, -1], [2, 0, 1], [1, -2, -2], [-2, 0, 0]]} color="#06b6d4" lineWidth={1} transparent opacity={0.6} />
          <Line points={[[0, 2, -1], [-1, -2, -2], [3, 1, -2]]} color="#8b5cf6" lineWidth={1} transparent opacity={0.4} />
          
          {/* Nodes */}
          <Sphere args={[0.1, 16, 16]} position={[-2, 0, 0]}><meshBasicMaterial color="#06b6d4" /></Sphere>
          <Sphere args={[0.15, 16, 16]} position={[0, 2, -1]}><meshBasicMaterial color="#8b5cf6" /></Sphere>
          <Sphere args={[0.1, 16, 16]} position={[2, 0, 1]}><meshBasicMaterial color="#ffffff" /></Sphere>
          <Sphere args={[0.1, 16, 16]} position={[1, -2, -2]}><meshBasicMaterial color="#06b6d4" /></Sphere>
          <Sphere args={[0.08, 16, 16]} position={[3, 1, -2]}><meshBasicMaterial color="#8b5cf6" /></Sphere>
        </Float>
      </EnvGroup>

      {/* SECTION 4: RESUME (Minimalist Blueprint) */}
      <EnvGroup active={section === 4} position={[0, 1, 0]}>
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <ringGeometry args={[1.8, 1.82, 64]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <ringGeometry args={[2.2, 2.21, 64]} />
            <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        </Float>
      </EnvGroup>

      {/* SECTION 5: CONTACT (Dark Terminal, quieter) */}
      <EnvGroup active={section === 5} position={[0, 0, -2]}>
        {/* Very subtle distant blinking box */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[4, 3, 0.1]} />
          <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.05} />
        </mesh>
      </EnvGroup>
    </>
  );
};
