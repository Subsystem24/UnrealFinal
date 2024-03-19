import "./ModelViewer.css";
import Nav from "../Nav/Nav";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls, Stage, PresentationControls } from "@react-three/drei";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

function Model({ url }, props) {
  const { scene } = useGLTF(url);
  useFrame((state, delta) => {
    scene.rotation.y += delta * 0.5;
  });
  return <primitive object={scene}  scale={2} {...props}/>;
}

function ModelViewer() {
  const [model, setModel] = useState(null);
  const { fileId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/api/stream/${fileId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setModel(data))
      .catch(error => {
        console.error("There was an error fetching the model:", error);
      });
  }, [fileId]);

  if (!model) {
    return (
      <>
        <Nav />
        <div className='loaderContainer'>
          <ThreeCircles visible={true} height="200" width="200" color="#ffffff" ariaLabel="loading" />
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
        <div className="canvas">
          <Canvas camera={{fov:70, position:[0, 0, 65]}}>
            <PresentationControls speed={1.5} global polar={[-0.1, Math.PI/4]}>
              <ambientLight intensity={2} />
              <OrbitControls />
                <Stage environment={null} intensity={1}>
                  <Model url={model.file} scale={0.01} />
                </Stage>
            </PresentationControls>
          </Canvas>
        </div>
    </>
  );
}

export default ModelViewer;
