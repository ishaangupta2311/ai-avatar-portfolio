"use client";

import {
  CameraControls,
  Environment,
  Gltf,
  Html,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";


import { degToRad } from "three/src/math/MathUtils";
import { TypingBox } from "./TypingBox";
import { OutputBox } from "./OutputBox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "./Sidebar";

// function CameraHelper() {
//   const camera = new PerspectiveCamera(60, 1, 1, 3);
// }

export const Experience = () => {
  const [response, setResponse] = useState("");

  const handleResponseChange = (newResponse) => {
    setResponse(newResponse);
  };
  return (
    <>
      <aside className="z-10 fixed top-3 left-3 cursor-pointer">
        <Sidebar />
      </aside>

      <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
        <TypingBox onResponseChange={handleResponseChange} />
      </div>
      <Canvas
      // camera={{ position: [-15.0, -0.5, 15], fov: 30, near: 0.1, far: 1000 }}
      >
        <PerspectiveCamera makeDefault fov={30} position={[-15.0, -0.5, 15]} />
        <CameraManager />
        <Html
          position={[0.22, 0.15, -1]}
          transform
          distanceFactor={1}
          rotation-y={degToRad(-30)}
        >
          <OutputBox response={response} />
        </Html>
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} color="pink" />
        <Gltf
          src="/models/sci-fi_lab.glb"
          position={[0.2, -1.7, -2]}
          rotation-y={degToRad(-40)}
        />
        <Gltf
          src="/models/Man.glb"
          position={[3, -1.6, -3]}
          scale={0.6}
          rotation-y={degToRad(-40)}
        />
      </Canvas>
    </>
  );
};
const CameraManager = () => {
  return (
    <CameraControls
      minZoom={1}
      maxZoom={3}
      // polarRotateSpeed={-0.3}
      // azimuthRotateSpeed={-0.3}
      // mouseButtons={{
      //   left: 1, // 1 means action = rotate
      //   wheel: 16, //16 means action = zoom
      // }}
      touches={{
        one: 32,
        two: 512,
      }}
    />
  );
};
