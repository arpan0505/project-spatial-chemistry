// ============================================================
// Hero — Landing page hero section with animated 3D preview
// ============================================================

'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Mini node for hero scene
function HeroNode({ position, color, size, shape }: {
  position: [number, number, number];
  color: string;
  size: number;
  shape: 'sphere' | 'octahedron' | 'icosahedron' | 'torus' | 'cone';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const col = useMemo(() => new THREE.Color(color), [color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.003;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.15;
  });

  const Geo = () => {
    switch (shape) {
      case 'sphere': return <sphereGeometry args={[size, 32, 32]} />;
      case 'octahedron': return <octahedronGeometry args={[size, 0]} />;
      case 'icosahedron': return <icosahedronGeometry args={[size, 0]} />;
      case 'torus': return <torusGeometry args={[size * 0.8, size * 0.3, 16, 32]} />;
      case 'cone': return <coneGeometry args={[size * 0.7, size * 1.4, 6]} />;
    }
  };

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <Geo />
        <meshStandardMaterial
          color={col}
          emissive={col}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glow */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={col}
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

// Curved edge line
function HeroEdge({ from, to, color }: { from: [number, number, number]; to: [number, number, number]; color: string }) {
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    mid.y += 0.5;
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [from, to]);

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(curve.getPoints(30));
  }, [curve]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </line>
  );
}

function HeroScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={2} />
      <pointLight position={[-5, 3, -5]} color="#ec4899" intensity={1.5} />
      <Stars radius={30} depth={30} count={2000} factor={3} saturation={0.5} fade speed={0.5} />

      <group ref={groupRef}>
        <HeroNode position={[0, 0.5, 0]} color="#6366f1" size={0.6} shape="sphere" />
        <HeroNode position={[-2, 1.5, -1]} color="#f59e0b" size={0.5} shape="octahedron" />
        <HeroNode position={[1.8, 2, 0.5]} color="#10b981" size={0.45} shape="cone" />
        <HeroNode position={[-1, -0.5, 1.5]} color="#ec4899" size={0.4} shape="torus" />
        <HeroNode position={[0.8, -1, -1.5]} color="#8b5cf6" size={0.55} shape="icosahedron" />
        <HeroNode position={[2.5, 0.3, -0.8]} color="#6366f1" size={0.35} shape="sphere" />

        <HeroEdge from={[0, 0.5, 0]} to={[-2, 1.5, -1]} color="#a78bfa" />
        <HeroEdge from={[0, 0.5, 0]} to={[1.8, 2, 0.5]} color="#34d399" />
        <HeroEdge from={[-2, 1.5, -1]} to={[-1, -0.5, 1.5]} color="#f59e0b" />
        <HeroEdge from={[0.8, -1, -1.5]} to={[0, 0.5, 0]} color="#8b5cf6" />
        <HeroEdge from={[1.8, 2, 0.5]} to={[2.5, 0.3, -0.8]} color="#6366f1" />
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} mipmapBlur />
      </EffectComposer>
    </>
  );
}

export default function Hero() {
  return (
    <section className="hero-section">
      {/* 3D Background */}
      <div className="hero-canvas">
        <Canvas
          camera={{ fov: 45, position: [5, 3, 5] }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          dpr={[1, 2]}
        >
          <HeroScene />
        </Canvas>
      </div>

      {/* Overlay content */}
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          ✦ A new dimension of connection
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: 'spring', damping: 20 }}
        >
          Your personality
          <br />
          <span className="hero-title-gradient">is a space.</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Explore minds as 3D constellations. Connect through the geometry
          of shared ideas, not swipes.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/onboard" className="hero-cta-primary">
            Create Your Space
            <span className="hero-cta-glow" />
          </Link>
          <Link href="/space/user-1" className="hero-cta-secondary">
            Explore Demo ↗
          </Link>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          className="hero-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { icon: '◉', label: 'Thought Objects' },
            { icon: '✦', label: '3D Spaces' },
            { icon: '◎', label: 'Graph Matching' },
            { icon: '⬟', label: 'Spatial Chemistry' },
          ].map((f, i) => (
            <motion.span
              key={f.label}
              className="hero-feature-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1 }}
            >
              <span className="hero-feature-icon">{f.icon}</span>
              {f.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
