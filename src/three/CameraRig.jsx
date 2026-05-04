import {useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import useScrollPosition from "./hooks/useScrollPosition";

const CameraRig = () => {
    const { camera, mouse } = useThree();
    const ref = useRef();

    useFrame(() => {
        const scrollFactor = scrollY / window.innerHeight;
        const section = Math.round(scrollFactor);

        let target = { x: 0, y: 0, z: 5};

        if (section === 1) {
            target = { x: -2, y: 0, z: 4 };
        } else if (section === 2) {
            target = { x: 2, y: 0, z: 4};
        } else if(section === 3) {
            target = { x: 0, y: 0, z: 3};
        }

        //Mouse Interaction
        camera.position.x += (target.x - camera.position.x) * 0.05;
        camera.position.y += (target.y - camera.position.y) * 0.05;
        camera.position.z += (target.z - camera.position.z) * 0.05;

        camera.lookAt(0, 0, 0);
    });

    return null;
};

export default CameraRig;