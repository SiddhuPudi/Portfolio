import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CanvasLayout = () => {
    return (
        <div className = "w-full h-screen">
            <Canvas camera = {{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={["#0a0a0a", 5, 15]} />
                <Scene />
            </Canvas>
        </div>
    );
};

export default CanvasLayout;