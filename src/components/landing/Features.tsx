// ============================================================
// Features — Landing page features section
// ============================================================

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
  {
    icon: '◉',
    title: 'Thought Objects',
    description:
      'Your interests, beliefs, goals, memories, and values become interactive 3D objects — each with its own shape, color, and energy.',
    color: '#6366f1',
  },
  {
    icon: '✦',
    title: 'Personal Spaces',
    description:
      'Your personality is a room. A constellation of your mind that others can walk through, explore, and understand.',
    color: '#ec4899',
  },
  {
    icon: '◎',
    title: 'Graph Matching',
    description:
      'No more swipe fatigue. Compatibility is computed through semantic alignment and structural graph overlap — meaningful and explainable.',
    color: '#10b981',
  },
  {
    icon: '⬟',
    title: 'Spatial Chemistry',
    description:
      'When two spaces resonate, you feel it. Shared themes glow. Aligned clusters pulse. Connection becomes visible.',
    color: '#f59e0b',
  },
  {
    icon: '◇',
    title: 'Navigate, Don\'t Scroll',
    description:
      'Orbit, zoom, fly between thoughts. This isn\'t a feed — it\'s an environment you inhabit and explore.',
    color: '#8b5cf6',
  },
  {
    icon: '○',
    title: 'Living Profiles',
    description:
      'Add new thoughts anytime. Your space evolves as you do — a living, growing representation of who you are.',
    color: '#06b6d4',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
    >
      <div className="feature-icon-wrapper" style={{ color: feature.color, borderColor: feature.color + '30' }}>
        <span className="feature-icon">{feature.icon}</span>
        <div className="feature-icon-glow" style={{ backgroundColor: feature.color }} />
      </div>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section className="features-section" ref={ref}>
      <motion.div
        className="features-header"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      >
        <span className="features-badge">How it works</span>
        <h2 className="features-title">
          Personalities as <span className="gradient-text">geometry</span>
        </h2>
        <p className="features-subtitle">
          Every mind has a shape. We give it form, dimension, and meaning.
        </p>
      </motion.div>

      <div className="features-grid">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
