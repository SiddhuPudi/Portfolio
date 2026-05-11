import { Sparkles, Stars, Float } from "@react-three/drei";

export const ForegroundDepth = ({ section }) => {
  return (
    <group position={[0, 0, 4]}>
      {/* Core Atmospheric Particles */}
      <Stars 
        radius={20} 
        depth={10} 
        count={section === 5 ? 1000 : 3000} // Reduce for Contact terminal
        factor={3} 
        saturation={0} 
        fade 
        speed={1} 
      />
      
      {/* Volumetric Dust (soft large particles) */}
      <Sparkles 
        count={section === 5 ? 30 : 80} 
        scale={10} 
        size={3} 
        speed={0.2} 
        opacity={0.15} 
        color="#8b5cf6" 
      />
      
      <Sparkles 
        count={50} 
        scale={8} 
        size={1.5} 
        speed={0.5} 
        opacity={0.3} 
        color="#06b6d4" 
      />

      {/* Occasional Cinematic Flare (Subtle glowing orbs close to camera) */}
      <Float speed={1} floatIntensity={2} rotationIntensity={0.5}>
        <mesh position={[-3, 2, 2]}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.03} 
            blending={2} // Additive blending
            depthWrite={false}
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} floatIntensity={1.5} rotationIntensity={0.2}>
        <mesh position={[4, -2, 1]}>
          <planeGeometry args={[3, 3]} />
          <meshBasicMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.02} 
            blending={2} 
            depthWrite={false}
          />
        </mesh>
      </Float>
    </group>
  );
};
