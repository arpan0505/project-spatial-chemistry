// ============================================================
// EdgeLine — Curved connection between two thought nodes
// Animated particles flow along the edge
// ============================================================

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Edge, ThoughtNode } from '@/types';
import { useSpaceStore } from '@/stores/spaceStore';

interface EdgeLineProps {
  edge: Edge;
}

const EDGE_COLORS: Record<string, string> = {
  strong: '#a78bfa',
  related: '#6366f1',
  causal: '#34d399',
  contrast: '#f87171',
  weak: '#64748b',
};

export default function EdgeLine({ edge }: EdgeLineProps) {
  const lineRef = useRef<THREE.Line>(null);
  const particleRef = useRef<THREE.Points>(null);
  const { nodes, selectedNodeId, hoveredNodeId } = useSpaceStore();

  const fromNode = nodes.find((n: ThoughtNode) => n.id === edge.fromNode);
  const toNode = nodes.find((n: ThoughtNode) => n.id === edge.toNode);

  const isHighlighted =
    selectedNodeId === edge.fromNode ||
    selectedNodeId === edge.toNode ||
    hoveredNodeId === edge.fromNode ||
    hoveredNodeId === edge.toNode;

  const curve = useMemo(() => {
    if (!fromNode || !toNode) return null;

    const start = new THREE.Vector3(fromNode.position.x, fromNode.position.y, fromNode.position.z);
    const end = new THREE.Vector3(toNode.position.x, toNode.position.y, toNode.position.z);
    const mid = start.clone().add(end).multiplyScalar(0.5);

    // Curve upward for visual clarity
    mid.y += 0.8;

    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [fromNode, toNode]);

  const lineGeometry = useMemo(() => {
    if (!curve) return null;
    const points = curve.getPoints(40);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [curve]);

  const particleGeometry = useMemo(() => {
    if (!curve) return null;
    const count = 8;
    const positions = new Float32Array(count * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [curve]);

  const edgeColor = useMemo(() => new THREE.Color(EDGE_COLORS[edge.type] || EDGE_COLORS.related), [edge.type]);

  // Animate particles along curve
  useFrame((state) => {
    if (!curve || !particleRef.current) return;
    const positions = particleRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const count = positions.count;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const progress = ((t * 0.15 + i / count) % 1);
      const point = curve.getPoint(progress);
      positions.setXYZ(i, point.x, point.y, point.z);
    }
    positions.needsUpdate = true;
  });

  if (!curve || !lineGeometry) return null;

  return (
    <group>
      {/* Edge line */}
      <line ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial
          color={edgeColor}
          transparent
          opacity={isHighlighted ? 0.8 : 0.25}
          linewidth={1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>

      {/* Flowing particles */}
      {isHighlighted && particleGeometry && (
        <points ref={particleRef} geometry={particleGeometry}>
          <pointsMaterial
            color={edgeColor}
            size={0.06}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}
