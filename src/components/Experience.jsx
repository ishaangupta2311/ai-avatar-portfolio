"use client";

import {
  Box,
  CameraControls,
  Environment,
  Gltf,
  OrbitControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Person } from "./Person";
import { degToRad } from "three/src/math/MathUtils";



export const Experience = () => {
  return (
    <Canvas camera={{ position: [0, 0, 0, 0.001] }}>
      <CameraManager />
      <Environment preset="sunset" />
      <ambientLight intensity={1} color="pink" />
      <Gltf src="/models/sci-fi_lab.glb" position={[0.2, -1.7, -2]} />
      <Gltf
        src="/models/tony_starkadi.glb"
        position={[-1, -1.6, -3]}
        scale={1.2}
        rotation-y={degToRad(20)}
      />
      {/* <Person
        person={"TonyStark"}
        position={[-1, -1.6, -3]}
        scale={1.3}
        rotation-y={degToRad(-20)}
      /> */}
    </Canvas>
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
