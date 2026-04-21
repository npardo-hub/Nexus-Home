import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Cylinder, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useHomeStore } from '../store';

export default function HouseModel() {
  const { lights, mode } = useHomeStore();
  
  // Materials
  const wallMaterial = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: mode === 'day' ? '#ffffff' : '#1a1a1a',
    roughness: 0.5 
  }), [mode]);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#88ccff',
    transparent: true,
    opacity: 0.3,
    roughness: 0,
    metalness: 0.5,
    transmission: 0.5,
  }), []);

  return (
    <group>
      {/* Foundation */}
      <Box args={[10, 0.2, 10]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#333" />
      </Box>

      {/* Main Structure - Living Room Area */}
      <Box args={[6, 3, 5]} position={[-2, 1.5, 0]} material={wallMaterial} />
      
      {/* Kitchen Area */}
      <Box args={[4, 2.5, 4]} position={[3, 1.25, -0.5]} material={wallMaterial} />

      {/* Roof */}
      <Box args={[6.5, 0.2, 5.5]} position={[-2, 3.1, 0]}>
        <meshStandardMaterial color="#444" />
      </Box>
      <Box args={[4.5, 0.2, 4.5]} position={[3, 2.6, -0.5]}>
        <meshStandardMaterial color="#444" />
      </Box>

      {/* Windows with Glow based on Light State */}
      <Window position={[-2, 1.5, 2.51]} active={lights.livingRoom} />
      <Window position={[3, 1.5, 1.51]} active={lights.kitchen} args={[1, 1]} />
      <Window position={[-5.01, 1.5, 0]} rotation={[0, -Math.PI/2, 0]} active={lights.bedroom} />

      {/* Interior PointLights */}
      {lights.livingRoom && <pointLight position={[-2, 2, 0]} intensity={15} color="#ffd700" distance={8} />}
      {lights.kitchen && <pointLight position={[3, 2, -0.5]} intensity={12} color="#ffffff" distance={6} />}
      {lights.bedroom && <pointLight position={[-4, 2, -1]} intensity={10} color="#ff88cc" distance={6} />}

      {/* Exterior Security Light */}
      {lights.security && (
        <group position={[0, 3, 3]}>
          <pointLight intensity={20} color="#00ff00" distance={15} />
          <Sphere args={[0.1]}>
            <meshBasicMaterial color="#00ff00" />
          </Sphere>
        </group>
      )}

      {/* Environment Elements */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[0.5]} position={[6, 4, -4]}>
          <MeshDistortMaterial color={mode === 'day' ? "#fdb813" : "#f6f1d5"} speed={2} factor={0.4} />
        </Sphere>
      </Float>
    </group>
  );
}

function Window({ position, rotation = [0, 0, 0], active, args = [2, 1.5] }: any) {
  return (
    <Box args={[args[0], args[1], 0.05]} position={position} rotation={rotation}>
      <meshPhysicalMaterial 
        color={active ? "#fff7aa" : "#88ccff"} 
        emissive={active ? "#ffd700" : "#000000"}
        emissiveIntensity={active ? 2 : 0}
        transparent 
        opacity={0.6} 
      />
    </Box>
  );
}
