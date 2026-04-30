import FloatingPanel from "./objects/FloatingPanel";
import CameraRig from "./CameraRig";

const Scene = () => {
    return(
        <>
            <CameraRig />

            {/* 🌑 Ambient Light (soft global light) */}
            <ambientLight intensity={0.5} />
            
            {/* 🔦 Key Light */}
            <directionalLight position={[2, 4, 2]} intensity={1} />

            {/* 💡 Neon Accent Light */}
            <pointLight position={[0, 2, 2]} intensity={2} color="#00ffff" />

            {/* 🧱 Floor */}
            <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#0a0a0a" />
            </mesh>

            {/* Panels */}
            <FloatingPanel position={[-2, 0, 0]} />
            <FloatingPanel position={[2, 0, 0]} />
        </>
    );
};

export default Scene;