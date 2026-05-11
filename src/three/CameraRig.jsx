import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

const CameraRig = ({ section }) => {
  const currentTarget = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const currentPos = useMemo(() => new THREE.Vector3(0, 0, 8), []);
  
  // Cinematic states for each section [CameraPosition, LookAtTarget]
  const sectionStates = useMemo(() => [
    // 0: Hero - calm, dead center, immersive
    [new THREE.Vector3(0, 0, 8), new THREE.Vector3(0, 0, 0)],
    // 1: About - shifted left, looking slightly right at geometry
    [new THREE.Vector3(-4, 1, 5), new THREE.Vector3(2, 0, -2)],
    // 2: Projects - pulled back, looking down at activated nodes
    [new THREE.Vector3(0, 3, 7), new THREE.Vector3(0, -1, 0)],
    // 3: Skills - shifted right, wide angle view
    [new THREE.Vector3(5, -1, 5), new THREE.Vector3(-1, 0, 0)],
    // 4: Resume - focused, minimalist
    [new THREE.Vector3(0, -2, 6), new THREE.Vector3(0, 1, 0)],
    // 5: Contact - very close, intimate terminal feel
    [new THREE.Vector3(0, 0, 4), new THREE.Vector3(0, 0, 0)],
  ], []);

  useFrame((state) => {
    // 1. Get target states based on section
    const targetPos = sectionStates[section]?.[0] || sectionStates[0][0];
    const targetLookAt = sectionStates[section]?.[1] || sectionStates[0][1];

    // 2. Smoothly interpolate position and lookAt target (cinematic easing)
    // Faster transition initially, then slow settle
    currentPos.lerp(targetPos, 0.04);
    currentTarget.lerp(targetLookAt, 0.04);

    // 3. Add environmental breathing (slow sine wave)
    const time = state.clock.getElapsedTime();
    const breatheX = Math.sin(time * 0.5) * 0.1;
    const breatheY = Math.cos(time * 0.4) * 0.1;
    const breatheZ = Math.sin(time * 0.3) * 0.1;

    // 4. Subtle mouse parallax (offsetting the breathing)
    const mouseX = (state.mouse.x * window.innerWidth) / 2;
    const mouseY = (state.mouse.y * window.innerHeight) / 2;
    
    // 5. Apply final camera position
    state.camera.position.x = currentPos.x + breatheX + (mouseX * 0.0005);
    state.camera.position.y = currentPos.y + breatheY - (mouseY * 0.0005);
    state.camera.position.z = currentPos.z + breatheZ;

    // 6. Look at the interpolated target
    state.camera.lookAt(currentTarget);
  });

  return null;
};

export default CameraRig;