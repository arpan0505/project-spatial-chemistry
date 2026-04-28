// ============================================================
// Space Store — Zustand state for the active 3D space
// ============================================================

import { create } from 'zustand';
import { ThoughtNode, Edge, Space, SpaceTheme, LayoutType } from '@/types';

interface SpaceState {
  // Data
  nodes: ThoughtNode[];
  edges: Edge[];
  space: Space | null;
  ownerId: string | null;

  // Selections
  selectedNodeId: string | null;
  hoveredNodeId: string | null;

  // Actions
  setSpace: (space: Space, nodes: ThoughtNode[], edges: Edge[]) => void;
  setNodes: (nodes: ThoughtNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: ThoughtNode) => void;
  removeNode: (nodeId: string) => void;
  updateNodePosition: (nodeId: string, position: { x: number; y: number; z: number }) => void;
  selectNode: (nodeId: string | null) => void;
  hoverNode: (nodeId: string | null) => void;
  setLayoutType: (layout: LayoutType) => void;
  setTheme: (theme: Partial<SpaceTheme>) => void;
  reset: () => void;
}

export const useSpaceStore = create<SpaceState>((set) => ({
  nodes: [],
  edges: [],
  space: null,
  ownerId: null,
  selectedNodeId: null,
  hoveredNodeId: null,

  setSpace: (space, nodes, edges) =>
    set({ space, nodes, edges, ownerId: space.userId, selectedNodeId: null, hoveredNodeId: null }),

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  addNode: (node) => set((s) => ({ nodes: [...s.nodes, node] })),

  removeNode: (nodeId) =>
    set((s) => ({
      nodes: s.nodes.filter((n) => n.id !== nodeId),
      edges: s.edges.filter((e) => e.fromNode !== nodeId && e.toNode !== nodeId),
      selectedNodeId: s.selectedNodeId === nodeId ? null : s.selectedNodeId,
    })),

  updateNodePosition: (nodeId, position) =>
    set((s) => ({
      nodes: s.nodes.map((n) => (n.id === nodeId ? { ...n, position } : n)),
    })),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),
  hoverNode: (nodeId) => set({ hoveredNodeId: nodeId }),

  setLayoutType: (layout) =>
    set((s) => ({
      space: s.space ? { ...s.space, layoutType: layout } : null,
    })),

  setTheme: (theme) =>
    set((s) => ({
      space: s.space ? { ...s.space, theme: { ...s.space.theme, ...theme } } : null,
    })),

  reset: () =>
    set({ nodes: [], edges: [], space: null, ownerId: null, selectedNodeId: null, hoveredNodeId: null }),
}));
