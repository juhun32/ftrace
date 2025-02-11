import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";

const Sf23 = () => {
  const { scene } = useGLTF("/Sf23.gltf");
  return <primitive object={scene} />;
};

const Model = () => {
  return (
    <div style={{ width: "50dvw", height: "40dvh" }}>
      <Canvas
        className="rounded-xl"
        shadows
        camera={{ position: [7, 3, 7], fov: 30 }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[2, 5, 2]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Suspense fallback={null}>
          <Sf23 />
        </Suspense>
        <Environment preset="city" />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, 0, 0]}
          opacity={3}
          width={6}
          height={4}
          blur={0.2}
          far={1}
        />
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.05, 64]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <OrbitControls
          maxPolarAngle={Math.PI / 2 - 0.05}
          autoRotate
          autoRotateSpeed={2}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
    </div>
  );
};

export default Model;
