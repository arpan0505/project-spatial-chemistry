// ============================================================
// NodeMesh — Individual thought node rendered as a 3D object
// Shape determined by node type, with glow, label, and interactions
// ============================================================

'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ThoughtNode, NODE_VISUAL_MAP } from '@/types';
import { useSpaceStore } from '@/stores/spaceStore';
import { useUIStore } from '@/stores/uiStore';

interface NodeMeshProps {
  node: ThoughtNode;
  isExploring?: boolean;
}

export default function NodeMesh({ node, isExploring = false }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [isHoveredLocal, setIsHoveredLocal] = useState(false);

  const { selectedNodeId, hoveredNodeId, selectNode, hoverNode } = useSpaceStore();
  const { openNodePanel, setCameraTarget } = useUIStore();

  const visual = NODE_VISUAL_MAP[node.type];
  const isSelected = selectedNodeId === node.id;
  const isHovered = hoveredNodeId === node.id || isHoveredLocal;

  const scale = useMemo(() => {
    const base = node.size * 0.5;
    if (isSelected) return base * 1.3;
    if (isHovered) return base * 1.15;
    return base;
  }, [node.size, isSelected, isHovered]);

  const color = useMemo(() => new THREE.Color(node.color || visual.defaultColor), [node.color, visual.defaultColor]);
  const glowColor = useMemo(() => new THREE.Color(visual.glowColor), [visual.glowColor]);

  // Animate
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle float
    meshRef.current.position.y = node.position.y + Math.sin(t * 0.5 + node.position.x) * 0.08;

    // Slow rotation
    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x += 0.001;

    // Glow pulse
    if (glowRef.current) {
      const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
      const pulse = 0.15 + Math.sin(t * 2 + node.position.z) * 0.08;
      glowMat.opacity = isHovered ? pulse + 0.15 : pulse;
      glowRef.current.scale.setScalar(isSelected ? 1.8 : isHovered ? 1.5 : 1.3);
    }
  });

  const handleClick = (e: THREE.Event) => {
    e.stopPropagation();
    selectNode(node.id);
    openNodePanel();
    setCameraTarget([node.position.x, node.position.y, node.position.z]);
  };

  const handlePointerOver = (e: THREE.Event) => {
    e.stopPropagation();
    setIsHoveredLocal(true);
    hoverNode(node.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHoveredLocal(false);
    hoverNode(null);
    document.body.style.cursor = 'auto';
  };

  const Geometry = useMemo(() => {
    switch (visual.shape) {
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'cone':
        return <coneGeometry args={[0.8, 1.6, 6]} />;
      case 'torus':
        return <torusGeometry args={[0.8, 0.3, 16, 32]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      default:
        return <sphereGeometry args={[1, 32, 32]} />;
    }
  }, [visual.shape]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
      <group position={[node.position.x, node.position.y, node.position.z]}>
        {/* Glow sphere */}
        <mesh ref={glowRef} scale={1.3}>
          <sphereGeometry args={[scale * 1.2, 16, 16]} />
          <meshBasicMaterial
            color={glowColor}
            transparent
            opacity={0.15}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Main mesh */}
        <mesh
          ref={meshRef}
          scale={scale}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
        >
          {Geometry}
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 0.8 : isHovered ? 0.5 : visual.emissiveIntensity}
            roughness={0.3}
            metalness={0.6}
            transparent
            opacity={0.92}
          />
        </mesh>

        {/* Label */}
        {(isHovered || isSelected) && (
          <Html
            position={[0, scale + 0.6, 0]}
            center
            distanceFactor={8}
            style={{ pointerEvents: 'none' }}
          >
            <div className="node-label">
              <span className="node-label-type">{node.type}</span>
              <span className="node-label-text">{node.label}</span>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
