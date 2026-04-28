// ============================================================
// NodeDetailPanel — Sliding panel showing full node details
// ============================================================

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSpaceStore } from '@/stores/spaceStore';
import { useUIStore } from '@/stores/uiStore';
import { NODE_VISUAL_MAP } from '@/types';

export default function NodeDetailPanel() {
  const { nodes, selectedNodeId, selectNode } = useSpaceStore();
  const { isNodePanelOpen, closeNodePanel } = useUIStore();

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const handleClose = () => {
    closeNodePanel();
    selectNode(null);
  };

  return (
    <AnimatePresence>
      {isNodePanelOpen && selectedNode && (
        <motion.div
          className="node-detail-panel"
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          {/* Header */}
          <div className="ndp-header">
            <div className="ndp-type-badge" style={{ backgroundColor: selectedNode.color + '30', color: selectedNode.color }}>
              <span className="ndp-type-icon">
                {selectedNode.type === 'interest' && '◉'}
                {selectedNode.type === 'belief' && '◆'}
                {selectedNode.type === 'goal' && '▲'}
                {selectedNode.type === 'memory' && '○'}
                {selectedNode.type === 'value' && '⬟'}
              </span>
              {selectedNode.type}
            </div>
            <button className="ndp-close-btn" onClick={handleClose} aria-label="Close panel">
              ✕
            </button>
          </div>

          {/* Title */}
          <h2 className="ndp-title">{selectedNode.label}</h2>

          {/* Content */}
          <p className="ndp-content">{selectedNode.content}</p>

          {/* Meta */}
          <div className="ndp-meta">
            <div className="ndp-meta-item">
              <span className="ndp-meta-label">Importance</span>
              <div className="ndp-importance-bar">
                <motion.div
                  className="ndp-importance-fill"
                  style={{ backgroundColor: selectedNode.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedNode.importance * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <span className="ndp-meta-value">{Math.round(selectedNode.importance * 100)}%</span>
            </div>

            <div className="ndp-meta-item">
              <span className="ndp-meta-label">Position</span>
              <span className="ndp-meta-value ndp-mono">
                ({selectedNode.position.x.toFixed(1)}, {selectedNode.position.y.toFixed(1)}, {selectedNode.position.z.toFixed(1)})
              </span>
            </div>

            <div className="ndp-meta-item">
              <span className="ndp-meta-label">Created</span>
              <span className="ndp-meta-value">
                {new Date(selectedNode.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Connected nodes */}
          <div className="ndp-connections">
            <h3 className="ndp-section-title">Connections</h3>
            <ConnectedNodes nodeId={selectedNode.id} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConnectedNodes({ nodeId }: { nodeId: string }) {
  const { nodes, edges, selectNode } = useSpaceStore();
  const { setCameraTarget } = useUIStore();

  const connectedEdges = edges.filter(
    (e) => e.fromNode === nodeId || e.toNode === nodeId
  );

  const connectedNodes = connectedEdges.map((edge) => {
    const otherId = edge.fromNode === nodeId ? edge.toNode : edge.fromNode;
    const otherNode = nodes.find((n) => n.id === otherId);
    return { edge, node: otherNode };
  }).filter((c) => c.node);

  if (connectedNodes.length === 0) {
    return <p className="ndp-empty">No connections yet</p>;
  }

  return (
    <div className="ndp-connection-list">
      {connectedNodes.map(({ edge, node }) => (
        <button
          key={edge.id}
          className="ndp-connection-item"
          onClick={() => {
            if (node) {
              selectNode(node.id);
              setCameraTarget([node.position.x, node.position.y, node.position.z]);
            }
          }}
        >
          <span
            className="ndp-conn-dot"
            style={{ backgroundColor: node!.color }}
          />
          <span className="ndp-conn-label">{node!.label}</span>
          <span className="ndp-conn-type">{edge.type}</span>
        </button>
      ))}
    </div>
  );
}
