import React, { Suspense } from "react";
import "../css/Intro.css";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  ContactShadows,
  Shadow,
} from "@react-three/drei";

const modelPath = "/Sf23.gltf";

const Sf23Model = () => {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} />;
};

const Intro = () => {
  return (
    <div className="intro-container">
      <Canvas shadows camera={{ position: [2, 1, 5], fov: 30 }}>
        <ambientLight intensity={1} />
        <directionalLight
          position={[2, 5, 2]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Suspense fallback={null}>
          <Sf23Model />
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

        <mesh position={[0, -0.01, 0]} rotation-x={-Math.PI / 2}>
          {/* <planeGeometry args={[2, 5]} /> */}
          <circleGeometry args={[2.5, 64]} />
          <meshStandardMaterial color="black" />
        </mesh>

        <OrbitControls
          maxPolarAngle={Math.PI / 2 - 0.05}
          autoRotate
          autoRotateSpeed={1}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>
      <h1 className="intro-title">
        Formula 1 <p>Statistics</p>
      </h1>
      <div className="intro-div"></div>

      <div className="intro-description">
        <p>
          This is a simple web application that displays Formula 1 data using
          React and the OpenF1 API.
        </p>
        <p>
          The data is fetched from the OpenF1 API and displayed in table and
          chart format.
        </p>
        <p>The model above is Carlos Sainz Jr.'s SF23. Enjoy!</p>
      </div>
    </div>
  );
};

export default Intro;
