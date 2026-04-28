// ============================================================
// SpaceCanvas — Main 3D canvas wrapper
// Composes all scene elements together
// ============================================================

'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Stars, Preload } from '@react-three/drei';
import * as THREE from 'three';
import NodeMesh from './NodeMesh';
import EdgeLine from './EdgeLine';
import ParticleField from './ParticleField';
import SceneLighting from './SceneLighting';
import CameraController from './CameraController';
import { useSpaceStore } from '@/stores/spaceStore';

interface SpaceCanvasProps {
  isExploring?: boolean;
}

function SceneContent({ isExploring = false }: SpaceCanvasProps) {
  const { nodes, edges, space } = useSpaceStore();
  const selectNode = useSpaceStore((s) => s.selectNode);

  return (
    <>
      {/* Camera & Controls */}
      <CameraController
        defaultPosition={space?.cameraDefaults?.position || [8, 5, 8]}
        defaultTarget={space?.cameraDefaults?.target || [0, 1, 0]}
      />

      {/* Lighting */}
      <SceneLighting
        ambientIntensity={space?.theme?.ambientIntensity || 0.4}
        primaryColor={space?.theme?.primaryColor || '#6366f1'}
        secondaryColor={space?.theme?.secondaryColor || '#ec4899'}
      />

      {/* Background stars */}
      <Stars
        radius={50}
        depth={50}
        count={3000}
        factor={3}
        saturation={0.5}
        fade
        speed={0.5}
      />

      {/* Ambient particles */}
      <ParticleField
        count={space?.theme?.particleDensity || 200}
        color={space?.theme?.primaryColor || '#6366f1'}
      />

      {/* Ground reference grid (subtle) */}
      <gridHelper
        args={[30, 30, '#1e1b4b', '#1e1b4b']}
        position={[0, -3, 0]}
        // @ts-expect-error - opacity prop
        material-transparent
        material-opacity={0.08}
      />

      {/* Edges (render first, behind nodes) */}
      {edges.map((edge) => (
        <EdgeLine key={edge.id} edge={edge} />
      ))}

      {/* Nodes */}
      {nodes.map((node) => (
        <NodeMesh key={node.id} node={node} isExploring={isExploring} />
      ))}

      {/* Click on empty space to deselect */}
      <mesh
        position={[0, 0, 0]}
        visible={false}
        onClick={() => selectNode(null)}
      >
        <sphereGeometry args={[50, 8, 8]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={space?.theme?.bloomIntensity || 1.2}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>

      <Preload all />
    </>
  );
}

export default function SpaceCanvas({ isExploring = false }: SpaceCanvasProps) {
  return (
    <div className="space-canvas-wrapper">
      <Canvas
        camera={{ fov: 55, near: 0.1, far: 200, position: [8, 5, 8] }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ background: '#050510' }}
      >
        <Suspense fallback={null}>
          <SceneContent isExploring={isExploring} />
        </Suspense>
      </Canvas>
    </div>
  );
}
