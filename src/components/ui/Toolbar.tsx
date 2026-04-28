// ============================================================
// Toolbar — Bottom toolbar for space controls
// ============================================================

'use client';

import { motion } from 'framer-motion';
import { useSpaceStore } from '@/stores/spaceStore';
import { useUIStore } from '@/stores/uiStore';
import { LayoutType } from '@/types';

interface ToolbarProps {
  showLayoutControls?: boolean;
  onExploreUsers?: () => void;
}

export default function Toolbar({ showLayoutControls = true, onExploreUsers }: ToolbarProps) {
  const { space, nodes, setLayoutType } = useSpaceStore();
  const { toggleMiniMap, isMiniMapOpen } = useUIStore();

  const layouts: { type: LayoutType; icon: string; label: string }[] = [
    { type: 'constellation', icon: '✦', label: 'Constellation' },
    { type: 'cluster', icon: '◎', label: 'Cluster' },
    { type: 'radial', icon: '◉', label: 'Radial' },
    { type: 'free', icon: '◇', label: 'Free' },
  ];

  return (
    <motion.div
      className="toolbar"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', damping: 20 }}
    >
      <div className="toolbar-inner">
        {/* Node count */}
        <div className="toolbar-section">
          <div className="toolbar-stat">
            <span className="toolbar-stat-value">{nodes.length}</span>
            <span className="toolbar-stat-label">Thoughts</span>
          </div>
        </div>

        {/* Layout controls */}
        {showLayoutControls && (
          <div className="toolbar-section toolbar-layouts">
            {layouts.map((l) => (
              <button
                key={l.type}
                className={`toolbar-layout-btn ${space?.layoutType === l.type ? 'active' : ''}`}
                onClick={() => setLayoutType(l.type)}
                title={l.label}
              >
                <span className="toolbar-layout-icon">{l.icon}</span>
                <span className="toolbar-layout-label">{l.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="toolbar-section toolbar-actions">
          <button
            className={`toolbar-action-btn ${isMiniMapOpen ? 'active' : ''}`}
            onClick={toggleMiniMap}
            title="Toggle minimap"
          >
            ⊞
          </button>
          {onExploreUsers && (
            <button
              className="toolbar-action-btn toolbar-explore-btn"
              onClick={onExploreUsers}
              title="Explore other spaces"
            >
              🔭 Explore
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
