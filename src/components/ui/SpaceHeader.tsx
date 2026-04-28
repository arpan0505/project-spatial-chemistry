// ============================================================
// SpaceHeader — Top overlay showing whose space you're viewing
// ============================================================

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User } from '@/types';

interface SpaceHeaderProps {
  user: User | null;
  isOwn?: boolean;
  matchScore?: number;
  onViewMatch?: () => void;
}

export default function SpaceHeader({ user, isOwn = false, matchScore, onViewMatch }: SpaceHeaderProps) {
  if (!user) return null;

  return (
    <motion.div
      className="space-header"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', damping: 20 }}
    >
      <div className="space-header-left">
        <Link href="/" className="space-header-back">
          ← 
        </Link>
        <div className="space-header-user">
          <div className="space-header-avatar">
            {user.name.charAt(0)}
          </div>
          <div className="space-header-info">
            <h1 className="space-header-name">
              {isOwn ? 'Your Space' : `${user.name}'s Space`}
            </h1>
            <p className="space-header-bio">
              {(user.metadata as Record<string, string>)?.bio || ''}
            </p>
          </div>
        </div>
      </div>

      <div className="space-header-right">
        {!isOwn && matchScore !== undefined && (
          <button className="space-header-match-btn" onClick={onViewMatch}>
            <span className="match-spark">✦</span>
            <span className="match-score-badge">{Math.round(matchScore * 100)}%</span>
            <span className="match-label">Match</span>
          </button>
        )}
        {isOwn && (
          <Link href="/discover" className="space-header-discover-btn">
            🔭 Discover
          </Link>
        )}
      </div>
    </motion.div>
  );
}
