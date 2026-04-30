import { Float } from "@react-three/drei";

const Scene = () => {
    return(
        <>
            {/* 🌑 Ambient Light (soft global light) */}
            <ambientLight intensity={0.3} />
            
            {/* 🔦 Key Light */}
            <directionalLight position={[2, 4, 2]} intensity={1} />

            {/* 💡 Neon Accent Light */}
            <pointLight position={[0, 2, 2]} intensity={2} color="#00ffff" />

            {/* 🧱 Floor */}
            <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#0a0a0a" />
            </mesh>

            {/* 🧊 Floating Panel 1 */}
            <Float speed = {2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[-2, 0, 0]}>
                    <boxGeometry args={[1.5, 1, 0.1]} />
                    <meshStandardMaterial color="#111111" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
            </Float>

            {/* Floating Panel 2 */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[2, 0, 0]}>
                    <boxGeometry args={[1.5, 1, 0.1]} />
                    <meshStandardMaterial color="#111111" emissive="#00ffff" emissiveIntensity={0.5} />
                </mesh>
            </Float>
        </>
    );
};

export default Scene;