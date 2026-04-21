import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, Environment, Stars } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import HouseModel from './HouseModel';
import { useHomeStore } from '../store';

function CameraController() {
  const { cameraView } = useHomeStore();
  const controlsRef = useRef<any>(null);

  const views = {
    home: { pos: [15, 10, 15], target: [0, 0, 0] },
    living: { pos: [-5, 4, 8], target: [-2, 1.5, 0] },
    bedroom: { pos: [-8, 3, -2], target: [-4, 1.5, -1] },
    security: { pos: [0, 12, 18], target: [0, 0, 0] },
  };

  useFrame((state) => {
    if (!controlsRef.current) return;
    
    const target = views[cameraView] || views.home;
    const targetPos = new THREE.Vector3(...target.pos);
    const targetLookAt = new THREE.Vector3(...target.target);

    // Smoothly interpolate camera position
    state.camera.position.lerp(targetPos, 0.05);
    
    // Smoothly interpolate controls target
    controlsRef.current.target.lerp(targetLookAt, 0.05);
    controlsRef.current.update();
  });

  return (
    <OrbitControls 
      ref={controlsRef}
      enablePan={false} 
      minDistance={2} 
      maxDistance={40}
      maxPolarAngle={Math.PI / 2.1}
    />
  );
}

export default function Scene() {
  const { mode } = useHomeStore();

  return (
    <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,_#111116_0%,_#050507_100%)] overflow-hidden">
      {/* Decorative Grid Overlay from theme */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <Canvas shadows dpr={[1, 2]}>

        <PerspectiveCamera makeDefault position={[15, 10, 15]} fov={50} />
        <CameraController />
        
        <Suspense fallback={null}>
          <HouseModel />
          
          <ambientLight intensity={mode === 'day' ? 0.7 : 0.05} />
          <directionalLight 
            position={[10, 15, 10]} 
            intensity={mode === 'day' ? 1.5 : 0.1} 
            castShadow 
            shadow-mapSize={[1024, 1024]}
          />

          {mode === 'night' && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
          
          <Environment preset={mode === 'day' ? 'apartment' : 'night'} />
          <ContactShadows 
            position={[0, -0.01, 0]}
            resolution={1024} 
            scale={20} 
            blur={2} 
            opacity={0.4} 
            far={10} 
            color={mode === 'day' ? '#000000' : '#4444ff'} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

