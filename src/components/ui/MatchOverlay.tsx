// ============================================================
// MatchOverlay — Comparison view showing compatibility
// ============================================================

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/uiStore';
import { Match, User } from '@/types';

interface MatchOverlayProps {
  match: Match | null;
  userA: User | null;
  userB: User | null;
}

export default function MatchOverlay({ match, userA, userB }: MatchOverlayProps) {
  const { isMatchOverlayOpen, closeMatchOverlay } = useUIStore();

  if (!match || !userA || !userB) return null;

  const scorePercent = Math.round(match.similarityScore * 100);

  return (
    <AnimatePresence>
      {isMatchOverlayOpen && (
        <motion.div
          className="match-overlay"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25 }}
        >
          <div className="match-overlay-inner">
            {/* Close */}
            <button className="match-close-btn" onClick={closeMatchOverlay}>✕</button>

            {/* Score */}
            <div className="match-score-section">
              <div className="match-users">
                <div className="match-user">
                  <div className="match-user-avatar">{userA.name.charAt(0)}</div>
                  <span className="match-user-name">{userA.name}</span>
                </div>
                <div className="match-score-circle">
                  <svg viewBox="0 0 100 100" className="match-score-ring">
                    <defs>
                      <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="42" className="match-ring-bg" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="42"
                      className="match-ring-fill"
                      strokeDasharray={`${scorePercent * 2.64} ${264 - scorePercent * 2.64}`}
                      strokeDashoffset={66}
                      initial={{ strokeDasharray: '0 264' }}
                      animate={{ strokeDasharray: `${scorePercent * 2.64} ${264 - scorePercent * 2.64}` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                  </svg>
                  <span className="match-score-text">{scorePercent}%</span>
                </div>
                <div className="match-user">
                  <div className="match-user-avatar">{userB.name.charAt(0)}</div>
                  <span className="match-user-name">{userB.name}</span>
                </div>
              </div>
            </div>

            {/* Alignment clusters */}
            <div className="match-clusters">
              <h3 className="match-section-title">Shared Themes</h3>
              {match.alignmentClusters.map((cluster, i) => (
                <motion.div
                  key={i}
                  className="match-cluster-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <div className="match-cluster-header">
                    <span className="match-cluster-theme">{cluster.theme}</span>
                    <span className="match-cluster-score">{Math.round(cluster.score * 100)}%</span>
                  </div>
                  <div className="match-cluster-bar">
                    <motion.div
                      className="match-cluster-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${cluster.score * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Graph overlap */}
            <div className="match-graph-info">
              <div className="match-graph-stat">
                <span className="match-graph-value">{match.graphOverlap.sharedEdgePatterns}</span>
                <span className="match-graph-label">Shared Patterns</span>
              </div>
              <div className="match-graph-stat">
                <span className="match-graph-value">
                  {Math.round(match.graphOverlap.structuralSimilarity * 100)}%
                </span>
                <span className="match-graph-label">Structural Match</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
