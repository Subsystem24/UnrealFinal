import Nav from '../Nav/Nav'
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, Environment, OrbitControls } from '@react-three/drei'
import Soldier from "../../../public/Soldier";
import "./model.css"

function Model() {
  return (
    <>
      <Nav />
      <Canvas >
        <PresentationControls speed={1.5} global polar={[-0.1, Math.PI/4]}>
          <ambientLight intensity={2} />
          <OrbitControls autoRotate={true} enableZoom={true} enableDamping={false} enablePan={false}/>
            {/* <Stage environment={null} intensity={1}> */}
              <Soldier />
            {/* </Stage> */}
        </PresentationControls>
      </Canvas>
    </>
  )
}

export default Model
