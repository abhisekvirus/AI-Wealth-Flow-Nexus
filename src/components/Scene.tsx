import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingNodes = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 150;
  
  const dummy = new THREE.Object3D();
  
  React.useEffect(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        dummy.position.set(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40 - 10
        );
        dummy.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.2, 0]} />
      <meshStandardMaterial 
        color="#00f0ff" 
        emissive="#00f0ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
        wireframe
      />
    </instancedMesh>
  );
};

export const Scene: React.FC = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#8a2be2" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00f0ff" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <FloatingNodes />
        </Float>
      </Canvas>
    </div>
  );
};
