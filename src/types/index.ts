// ============================================================
// Spatial Chemistry — Core Type Definitions
// ============================================================

export type NodeType = 'interest' | 'belief' | 'goal' | 'memory' | 'value';
export type EdgeType = 'related' | 'causal' | 'contrast' | 'strong' | 'weak';
export type LayoutType = 'cluster' | 'radial' | 'free' | 'constellation';
export type InteractionType = 'view' | 'connect' | 'react' | 'bookmark';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface ThoughtNode {
  id: string;
  userId: string;
  type: NodeType;
  label: string;
  content: string;
  mediaUrl?: string;
  embedding?: number[];
  position: { x: number; y: number; z: number };
  size: number;
  color: string;
  importance: number; // 0–1
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Edge {
  id: string;
  fromNode: string;
  toNode: string;
  type: EdgeType;
  weight: number; // 0–1
  createdAt: string;
}

export interface Space {
  id: string;
  userId: string;
  layoutType: LayoutType;
  theme: SpaceTheme;
  cameraDefaults: CameraConfig;
  lastUpdated: string;
}

export interface SpaceTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  ambientIntensity: number;
  particleDensity: number;
  bloomIntensity: number;
}

export interface CameraConfig {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

export interface Match {
  id: string;
  userA: string;
  userB: string;
  similarityScore: number;
  alignmentClusters: AlignmentCluster[];
  conflictZones: ConflictZone[];
  graphOverlap: GraphOverlapData;
  computedAt: string;
}

export interface AlignmentCluster {
  theme: string;
  nodesA: string[];
  nodesB: string[];
  score: number;
}

export interface ConflictZone {
  theme: string;
  nodeA: string;
  nodeB: string;
  divergenceScore: number;
}

export interface GraphOverlapData {
  sharedEdgePatterns: number;
  structuralSimilarity: number;
}

export interface Interaction {
  id: string;
  fromUser: string;
  toNode: string;
  type: InteractionType;
  data?: Record<string, unknown>;
  createdAt: string;
}

// --- Visual Mapping ---

export interface NodeVisualConfig {
  shape: 'sphere' | 'octahedron' | 'cone' | 'torus' | 'icosahedron';
  defaultColor: string;
  glowColor: string;
  glowIntensity: number;
  emissiveIntensity: number;
}

export const NODE_VISUAL_MAP: Record<NodeType, NodeVisualConfig> = {
  interest: {
    shape: 'sphere',
    defaultColor: '#6366f1',
    glowColor: '#818cf8',
    glowIntensity: 0.4,
    emissiveIntensity: 0.3,
  },
  belief: {
    shape: 'octahedron',
    defaultColor: '#f59e0b',
    glowColor: '#fbbf24',
    glowIntensity: 0.5,
    emissiveIntensity: 0.4,
  },
  goal: {
    shape: 'cone',
    defaultColor: '#10b981',
    glowColor: '#34d399',
    glowIntensity: 0.6,
    emissiveIntensity: 0.5,
  },
  memory: {
    shape: 'torus',
    defaultColor: '#ec4899',
    glowColor: '#f472b6',
    glowIntensity: 0.3,
    emissiveIntensity: 0.3,
  },
  value: {
    shape: 'icosahedron',
    defaultColor: '#8b5cf6',
    glowColor: '#a78bfa',
    glowIntensity: 0.7,
    emissiveIntensity: 0.6,
  },
};

// --- Onboarding ---

export interface OnboardingAnswer {
  question: string;
  answer: string;
  category: NodeType;
}

export interface OnboardingPayload {
  name: string;
  answers: OnboardingAnswer[];
}
