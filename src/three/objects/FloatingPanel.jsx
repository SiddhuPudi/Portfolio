import { Float } from "@react-three/drei";
import { useState } from "react";
import { useCursor } from "@react-three/drei";

const FloatingPanel = ({ position, isActive }) => {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    return (
        <Float speed = {2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh
                position={position}
                scale={hovered || isActive ? 1.15 : 1}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => alert("Panel Clicked")}
            >
                <boxGeometry args={[1.5, 1, 0.1]} />
                <meshStandardMaterial
                    color="#0f172a"
                    emissive="#00ffff"
                    emissiveIntensity={isActive ? 0.8 : hovered ? 0.6 : 0.3}
                />
            </mesh>
        </Float>
    );
};

export default FloatingPanel;