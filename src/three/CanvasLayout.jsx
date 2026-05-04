import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";

const CanvasLayout = ({ section }) => {
    return (
        <div className = "fixed top-0 left-0 w-full h-screen z-0">
            <Canvas camera = {{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={["#0a0a0a", 5, 15]} />
                <Scene section={ section }/>
            </Canvas>
        </div>
    );
};

export default CanvasLayout;