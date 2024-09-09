"use client";

import {
  Box,
  CameraControls,
  Environment,
  Gltf,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Person } from "./Person";
import { degToRad } from "three/src/math/MathUtils";
import { TypingBox } from "./TypingBox";

function CameraHelper(){
  const  camera = new PerspectiveCamera(60,1,1,3);
}


export const Experience = () => {
  return (
    <>
      <div className="z-10 md:justify-center fixed bottom-4 left-4 right-4 flex gap-3 flex-wrap justify-stretch">
        <TypingBox />
      </div>
      <Canvas camera={{ position: [-15.0, -0.50, 15, 0.001], fov:10}}>
        <CameraManager />
        <Environment preset="sunset" />
        <ambientLight intensity={1} color="pink" />
        <Gltf src="/models/sci-fi_lab.glb" position={[0.2, -1.7, -2]} rotation-y={degToRad(-40)} />
        <Gltf
          src="/models/tony_starkadi.glb"
          position={[4.5, -0.1, -3]}
          scale={1.2}
          rotation-y={degToRad(-40)}
        />
        {/* <Person
      person={"TonyStark"}
      position={[-1, -1.6, -3]}
      scale={1.3}
      rotation-y={degToRad(-20)}
    /> */}
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
