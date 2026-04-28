// ============================================================
// SceneLighting — Dynamic lighting setup for the 3D space
// ============================================================

'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SceneLightingProps {
  ambientIntensity?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function SceneLighting({
  ambientIntensity = 0.4,
  primaryColor = '#6366f1',
  secondaryColor = '#ec4899',
}: SceneLightingProps) {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Orbit lights around the scene
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.3) * 8;
      light1Ref.current.position.z = Math.cos(t * 0.3) * 8;
      light1Ref.current.position.y = 4 + Math.sin(t * 0.5) * 2;
    }

    if (light2Ref.current) {
      light2Ref.current.position.x = Math.sin(t * 0.3 + Math.PI) * 6;
      light2Ref.current.position.z = Math.cos(t * 0.3 + Math.PI) * 6;
      light2Ref.current.position.y = 3 + Math.cos(t * 0.5) * 1.5;
    }
  });

  return (
    <>
      <ambientLight intensity={ambientIntensity} color="#e0e7ff" />

      <pointLight
        ref={light1Ref}
        color={primaryColor}
        intensity={2}
        distance={20}
        decay={2}
        position={[8, 4, 0]}
      />

      <pointLight
        ref={light2Ref}
        color={secondaryColor}
        intensity={1.5}
        distance={18}
        decay={2}
        position={[-6, 3, -6]}
      />

      {/* Top fill light */}
      <directionalLight
        color="#f0f4ff"
        intensity={0.3}
        position={[0, 10, 0]}
      />

      {/* Subtle ground bounce */}
      <hemisphereLight
        color="#6366f1"
        groundColor="#1e1b4b"
        intensity={0.2}
      />
    </>
  );
}
