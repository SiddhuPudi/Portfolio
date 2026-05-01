import {useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import useScrollPosition from "./hooks/useScrollPosition";

const CameraRig = () => {
    const { camera, mouse } = useThree();
    const ref = useRef();

    useFrame(() => {
        const scrollFactor = scrollY / window.innerHeight;
        const t = Math.min(scrollFactor, 1);

        //Move camera based on scroll
        camera.position.z = 5 - t * 2;
        camera.position.y = t * 0.3;

        //Slight cinematic tilt
        camera.rotation.x = -t * 0.05;

        //Mouse Interaction
        camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05;

        camera.lookAt(0, 0, 0);
    });

    return null;
};

export default CameraRig;