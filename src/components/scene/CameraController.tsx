// ============================================================
// CameraController — Smooth camera transitions and orbit controls
// ============================================================

'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useUIStore } from '@/stores/uiStore';

interface CameraControllerProps {
  defaultPosition?: [number, number, number];
  defaultTarget?: [number, number, number];
}

export default function CameraController({
  defaultPosition = [8, 5, 8],
  defaultTarget = [0, 1, 0],
}: CameraControllerProps) {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const { cameraTarget, setCameraAnimating } = useUIStore();

  const targetPos = useRef(new THREE.Vector3(...defaultTarget));
  const desiredCameraPos = useRef(new THREE.Vector3(...defaultPosition));
  const isAnimating = useRef(false);

  // Handle camera target changes (fly-to-node)
  useEffect(() => {
    if (cameraTarget) {
      const nodePos = new THREE.Vector3(...cameraTarget);
      targetPos.current.copy(nodePos);

      // Position camera to look at node from an angle
      const offset = new THREE.Vector3(3, 2, 3);
      desiredCameraPos.current.copy(nodePos).add(offset);
      isAnimating.current = true;
      setCameraAnimating(true);
    }
  }, [cameraTarget, setCameraAnimating]);

  useFrame(() => {
    if (!controlsRef.current || !isAnimating.current) return;

    // Smooth lerp camera position
    camera.position.lerp(desiredCameraPos.current, 0.03);
    controlsRef.current.target.lerp(targetPos.current, 0.03);
    controlsRef.current.update();

    // Check if close enough
    if (camera.position.distanceTo(desiredCameraPos.current) < 0.05) {
      isAnimating.current = false;
      setCameraAnimating(false);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      target={defaultTarget}
      enableDamping
      dampingFactor={0.05}
      minDistance={3}
      maxDistance={25}
      maxPolarAngle={Math.PI * 0.85}
      enablePan
      panSpeed={0.5}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  );
}
