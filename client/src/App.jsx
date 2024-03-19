import './App.css'
import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from '@react-three/drei'
import Earth from "../public/Earth";
import Nav from "./components/Nav/Nav";

function App() {

  return (
    <>
      <Nav />
      <Canvas>
        <ambientLight intensity={1.5}/>
        <OrbitControls enableZoom={false}/>
        <Environment preset='city' />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>

      </Canvas>
    </>
  )
}

export default App
