import {useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

const CameraRig = () => {
    const { camera, mouse } = useThree();
    const ref = useRef();

    useFrame(() => {
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
};

export default CameraRig;