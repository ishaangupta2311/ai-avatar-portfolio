import { useFBX, useGLTF } from "@react-three/drei";

export const people=["TonyStark"];
import { useLoader } from "@react-three/fiber";
import { Scene } from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

// initialTexture.wrapS = initialTexture.wrapT = THREE.RepeatWrapping;

// initialTexture.repeat.set(3, 3);


export const Person = ({ person, ...props }) => {
  const { scene } = useGLTF(`/models/person_${person}.glb`);
  // const fbx = useLoader(FBXLoader, `/models/person_${person}.fbx`);
  return <group {...props}>
    <primitive object={scene}/>
  </group>;
};

people.forEach((person)=>{
  useGLTF.preload(`/models/person_${person}.glb`);
});