'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { mockUsers, getNodesForUser, getMatchBetween } from '@/data/mock';

export default function DiscoverPage() {
  return (
    <div className="discover-page">
      <div className="discover-header">
        <Link href="/space/me" className="discover-back">← Back to your space</Link>
        <h1 className="discover-title">Discover Spaces</h1>
        <p className="discover-subtitle">Explore other minds as 3D constellations</p>
      </div>

      <div className="discover-grid">
        {mockUsers.map((user, i) => {
          const nodeCount = getNodesForUser(user.id).length;
          const match = getMatchBetween('user-1', user.id);
          const bio = (user.metadata as Record<string, string>)?.bio || '';

          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/space/${user.id}`} className="discover-card">
                <div className="discover-card-top">
                  <div className="discover-card-avatar">{user.name.charAt(0)}</div>
                  <div>
                    <div className="discover-card-name">{user.name}</div>
                    <div className="discover-card-bio">{bio}</div>
                  </div>
                </div>
                <div className="discover-card-stats">
                  <span className="discover-card-stat"><strong>{nodeCount}</strong> thoughts</span>
                  {match && (
                    <span className="discover-card-stat">
                      <strong>{Math.round(match.similarityScore * 100)}%</strong> match
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
