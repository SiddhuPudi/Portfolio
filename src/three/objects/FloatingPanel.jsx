import { Float } from "@react-three/drei";
import { useState } from "react";
import { useCursor } from "@react-three/drei";

const FloatingPanel = ({ position }) => {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    return (
        <Float speed = {2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh
                position={position}
                scale={hovered ? 1.1 : 1}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => alert("Panel Clicked")}
            >
                <boxGeometry args={[1.5, 1, 0.1]} />
                <meshStandardMaterial
                    color="#111111"
                    emissive="#00ffff"
                    emissiveIntensity={hovered ? 1 : 0.5}
                />
            </mesh>
        </Float>
    );
};

export default FloatingPanel;