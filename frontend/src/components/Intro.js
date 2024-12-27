import React, { Suspense } from "react";
import "../css/Intro.css";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  useGLTF,
  ContactShadows,
} from "@react-three/drei";

const modelPath = "/Sf23.gltf";

const Sf23Model = () => {
  const gltf = useGLTF(modelPath);
  return <primitive object={gltf.scene} />;
};

const Intro = () => {
  return (
    <div className="intro-container">
      <Canvas shadows>
        <ambientLight intensity={3} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Suspense fallback={null}>
          <Sf23Model />
        </Suspense>
        <Environment preset="forest" />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, 0, 0]}
          opacity={0.5}
          width={5}
          height={5}
          // blur={0.5}
          far={1}
        />
        <OrbitControls
          maxPolarAngle={Math.PI / 2 - 0.01}
          autoRotate
          autoRotateSpeed={1}
          enableDamping
          dampingFactor={0.1}
        />
      </Canvas>

      <h1 className="intro-title">Formula 1 Statistics</h1>
      <p>
        This is a simple web application that displays Formula 1 data using
        React and the OpenF1 API.
      </p>
      <p>
        The data is fetched from the OpenF1 API and displayed in a table and
        chart.
      </p>
      <p>
        Enjoy!
      </p>
    </div>
  );
};

export default Intro;
