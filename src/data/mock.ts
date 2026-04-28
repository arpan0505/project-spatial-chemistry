// ============================================================
// Mock Data — Spatial Chemistry
// Pre-built user spaces for demo / development
// ============================================================

import { ThoughtNode, Edge, Space, User, Match } from '@/types';

// ---- Users ----

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Aria Chen',
    email: 'aria@example.com',
    avatarUrl: '',
    metadata: { bio: 'AI researcher & philosophy nerd' },
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-04-20T10:00:00Z',
  },
  {
    id: 'user-2',
    name: 'Marcus Rivera',
    email: 'marcus@example.com',
    avatarUrl: '',
    metadata: { bio: 'Music producer & visual artist' },
    createdAt: '2026-02-01T10:00:00Z',
    updatedAt: '2026-04-18T10:00:00Z',
  },
  {
    id: 'user-3',
    name: 'Luna Patel',
    email: 'luna@example.com',
    avatarUrl: '',
    metadata: { bio: 'Environmental scientist & poet' },
    createdAt: '2026-03-10T10:00:00Z',
    updatedAt: '2026-04-22T10:00:00Z',
  },
];

// ---- Nodes for User 1 (Aria) ----

export const ariaNodes: ThoughtNode[] = [
  {
    id: 'n1-1',
    userId: 'user-1',
    type: 'interest',
    label: 'Artificial Intelligence',
    content: 'Fascinated by how neural networks mirror human cognition. Currently exploring transformer architectures and their emergent properties.',
    position: { x: 0, y: 1, z: 0 },
    size: 1.2,
    color: '#6366f1',
    importance: 0.95,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'n1-2',
    userId: 'user-1',
    type: 'belief',
    label: 'Consciousness is Computation',
    content: 'I believe consciousness might emerge from sufficient computational complexity. The hard problem is fascinating.',
    position: { x: -3, y: 2.5, z: -1 },
    size: 1.0,
    color: '#f59e0b',
    importance: 0.85,
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'n1-3',
    userId: 'user-1',
    type: 'goal',
    label: 'Publish AGI Research',
    content: 'Working toward publishing a paper on emergent reasoning capabilities in large language models.',
    position: { x: 2, y: 3, z: 1 },
    size: 0.9,
    color: '#10b981',
    importance: 0.9,
    createdAt: '2026-02-05T10:00:00Z',
  },
  {
    id: 'n1-4',
    userId: 'user-1',
    type: 'memory',
    label: 'First Neural Net',
    content: 'Built my first neural network at 16 — a simple digit classifier. The moment it worked felt like magic.',
    position: { x: -1.5, y: 0, z: 2.5 },
    size: 0.8,
    color: '#ec4899',
    importance: 0.7,
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'n1-5',
    userId: 'user-1',
    type: 'value',
    label: 'Open Knowledge',
    content: 'Knowledge should be freely accessible. Open source, open research, open education.',
    position: { x: 1, y: -1, z: -2 },
    size: 1.1,
    color: '#8b5cf6',
    importance: 0.92,
    createdAt: '2026-02-15T10:00:00Z',
  },
  {
    id: 'n1-6',
    userId: 'user-1',
    type: 'interest',
    label: 'Philosophy of Mind',
    content: 'Deeply interested in qualia, phenomenal consciousness, and the explanatory gap between physical processes and subjective experience.',
    position: { x: -2.5, y: 1.5, z: -2.5 },
    size: 0.95,
    color: '#6366f1',
    importance: 0.8,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'n1-7',
    userId: 'user-1',
    type: 'interest',
    label: 'Generative Art',
    content: 'Creating art with code — using p5.js, shaders, and AI models to produce visual pieces that bridge technology and aesthetics.',
    position: { x: 3.5, y: 0.5, z: 0.5 },
    size: 0.85,
    color: '#6366f1',
    importance: 0.65,
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'n1-8',
    userId: 'user-1',
    type: 'goal',
    label: 'Learn Mandarin',
    content: 'Want to become conversational in Mandarin to access Chinese AI research directly.',
    position: { x: 0.5, y: -2, z: 1.5 },
    size: 0.7,
    color: '#10b981',
    importance: 0.5,
    createdAt: '2026-03-15T10:00:00Z',
  },
];

// ---- Nodes for User 2 (Marcus) ----

export const marcusNodes: ThoughtNode[] = [
  {
    id: 'n2-1',
    userId: 'user-2',
    type: 'interest',
    label: 'Electronic Music Production',
    content: 'Been producing music for 8 years. Love blending ambient textures with glitchy beats.',
    position: { x: 0, y: 1.5, z: 0 },
    size: 1.3,
    color: '#6366f1',
    importance: 0.95,
    createdAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'n2-2',
    userId: 'user-2',
    type: 'interest',
    label: 'Visual Art & Shaders',
    content: 'Creating real-time visual art with GLSL shaders. Love the intersection of math and beauty.',
    position: { x: 3, y: 0.5, z: -1 },
    size: 1.1,
    color: '#6366f1',
    importance: 0.88,
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'n2-3',
    userId: 'user-2',
    type: 'belief',
    label: 'Art is Communication',
    content: 'Art is the most honest form of communication — it bypasses rational filters and speaks to something deeper.',
    position: { x: -2, y: 2, z: 1 },
    size: 1.0,
    color: '#f59e0b',
    importance: 0.82,
    createdAt: '2026-02-15T10:00:00Z',
  },
  {
    id: 'n2-4',
    userId: 'user-2',
    type: 'memory',
    label: 'First Live Performance',
    content: 'Performed my first live set at a warehouse in Brooklyn. 200 people, all moving together. Pure electricity.',
    position: { x: -1, y: -0.5, z: 2 },
    size: 0.9,
    color: '#ec4899',
    importance: 0.75,
    createdAt: '2026-03-01T10:00:00Z',
  },
  {
    id: 'n2-5',
    userId: 'user-2',
    type: 'goal',
    label: 'Album Release',
    content: 'Finishing an 8-track album blending field recordings with synthesizers. Target: this summer.',
    position: { x: 2, y: 3, z: 0.5 },
    size: 0.95,
    color: '#10b981',
    importance: 0.9,
    createdAt: '2026-03-05T10:00:00Z',
  },
  {
    id: 'n2-6',
    userId: 'user-2',
    type: 'value',
    label: 'Authenticity',
    content: 'Being real is everything. No pretense, no performance of who you think people want you to be.',
    position: { x: -3, y: 1, z: -1.5 },
    size: 1.05,
    color: '#8b5cf6',
    importance: 0.88,
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'n2-7',
    userId: 'user-2',
    type: 'interest',
    label: 'AI in Creative Tools',
    content: 'Exploring how AI can augment creative workflows — not replace artists, but unlock new possibilities.',
    position: { x: 1.5, y: -1, z: -2 },
    size: 0.85,
    color: '#6366f1',
    importance: 0.72,
    createdAt: '2026-03-15T10:00:00Z',
  },
];

// ---- Nodes for User 3 (Luna) ----

export const lunaNodes: ThoughtNode[] = [
  {
    id: 'n3-1',
    userId: 'user-3',
    type: 'interest',
    label: 'Climate Science',
    content: 'Studying atmospheric chemistry and its impact on ecosystems. Currently focused on ocean acidification.',
    position: { x: 0, y: 1, z: 0 },
    size: 1.2,
    color: '#6366f1',
    importance: 0.93,
    createdAt: '2026-03-10T10:00:00Z',
  },
  {
    id: 'n3-2',
    userId: 'user-3',
    type: 'interest',
    label: 'Poetry & Writing',
    content: 'Writing is how I process the world. Published a chapbook on the intersection of science and wonder.',
    position: { x: -2.5, y: 2, z: 1 },
    size: 1.0,
    color: '#6366f1',
    importance: 0.85,
    createdAt: '2026-03-12T10:00:00Z',
  },
  {
    id: 'n3-3',
    userId: 'user-3',
    type: 'belief',
    label: 'Systems Thinking',
    content: 'Everything is interconnected. You cannot solve environmental problems without understanding social, economic, and political systems.',
    position: { x: 2, y: 1.5, z: -1.5 },
    size: 1.05,
    color: '#f59e0b',
    importance: 0.88,
    createdAt: '2026-03-15T10:00:00Z',
  },
  {
    id: 'n3-4',
    userId: 'user-3',
    type: 'value',
    label: 'Stewardship',
    content: 'We are temporary custodians of this planet. Every action should consider its impact on future generations.',
    position: { x: -1, y: -1, z: -2 },
    size: 1.15,
    color: '#8b5cf6',
    importance: 0.95,
    createdAt: '2026-03-18T10:00:00Z',
  },
  {
    id: 'n3-5',
    userId: 'user-3',
    type: 'goal',
    label: 'Carbon Sequestration Research',
    content: 'Developing a novel approach to algae-based carbon capture for coastal regions.',
    position: { x: 1.5, y: 3, z: 1 },
    size: 0.95,
    color: '#10b981',
    importance: 0.9,
    createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'n3-6',
    userId: 'user-3',
    type: 'memory',
    label: 'Great Barrier Reef',
    content: 'Snorkeling the reef at dawn — the colors, the silence, the fragility. Changed how I see everything.',
    position: { x: 3, y: 0, z: 0.5 },
    size: 0.85,
    color: '#ec4899',
    importance: 0.78,
    createdAt: '2026-03-22T10:00:00Z',
  },
];

// ---- Edges ----

export const ariaEdges: Edge[] = [
  { id: 'e1-1', fromNode: 'n1-1', toNode: 'n1-2', type: 'strong', weight: 0.9, createdAt: '2026-01-20T10:00:00Z' },
  { id: 'e1-2', fromNode: 'n1-1', toNode: 'n1-3', type: 'causal', weight: 0.85, createdAt: '2026-02-05T10:00:00Z' },
  { id: 'e1-3', fromNode: 'n1-2', toNode: 'n1-6', type: 'strong', weight: 0.92, createdAt: '2026-03-01T10:00:00Z' },
  { id: 'e1-4', fromNode: 'n1-1', toNode: 'n1-7', type: 'related', weight: 0.6, createdAt: '2026-03-10T10:00:00Z' },
  { id: 'e1-5', fromNode: 'n1-5', toNode: 'n1-3', type: 'causal', weight: 0.7, createdAt: '2026-02-15T10:00:00Z' },
  { id: 'e1-6', fromNode: 'n1-4', toNode: 'n1-1', type: 'causal', weight: 0.8, createdAt: '2026-02-10T10:00:00Z' },
  { id: 'e1-7', fromNode: 'n1-7', toNode: 'n1-5', type: 'related', weight: 0.5, createdAt: '2026-03-10T10:00:00Z' },
];

export const marcusEdges: Edge[] = [
  { id: 'e2-1', fromNode: 'n2-1', toNode: 'n2-2', type: 'strong', weight: 0.88, createdAt: '2026-02-10T10:00:00Z' },
  { id: 'e2-2', fromNode: 'n2-1', toNode: 'n2-5', type: 'causal', weight: 0.82, createdAt: '2026-03-05T10:00:00Z' },
  { id: 'e2-3', fromNode: 'n2-3', toNode: 'n2-6', type: 'strong', weight: 0.9, createdAt: '2026-03-10T10:00:00Z' },
  { id: 'e2-4', fromNode: 'n2-2', toNode: 'n2-7', type: 'related', weight: 0.75, createdAt: '2026-03-15T10:00:00Z' },
  { id: 'e2-5', fromNode: 'n2-4', toNode: 'n2-1', type: 'causal', weight: 0.7, createdAt: '2026-03-01T10:00:00Z' },
];

export const lunaEdges: Edge[] = [
  { id: 'e3-1', fromNode: 'n3-1', toNode: 'n3-3', type: 'strong', weight: 0.9, createdAt: '2026-03-15T10:00:00Z' },
  { id: 'e3-2', fromNode: 'n3-1', toNode: 'n3-5', type: 'causal', weight: 0.88, createdAt: '2026-03-20T10:00:00Z' },
  { id: 'e3-3', fromNode: 'n3-4', toNode: 'n3-3', type: 'strong', weight: 0.85, createdAt: '2026-03-18T10:00:00Z' },
  { id: 'e3-4', fromNode: 'n3-2', toNode: 'n3-6', type: 'related', weight: 0.65, createdAt: '2026-03-22T10:00:00Z' },
  { id: 'e3-5', fromNode: 'n3-6', toNode: 'n3-1', type: 'causal', weight: 0.7, createdAt: '2026-03-22T10:00:00Z' },
];

// ---- Spaces ----

export const mockSpaces: Space[] = [
  {
    id: 'space-1',
    userId: 'user-1',
    layoutType: 'constellation',
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#818cf8',
      backgroundColor: '#0a0a1a',
      ambientIntensity: 0.4,
      particleDensity: 200,
      bloomIntensity: 1.2,
    },
    cameraDefaults: {
      position: [8, 5, 8],
      target: [0, 1, 0],
      fov: 55,
    },
    lastUpdated: '2026-04-20T10:00:00Z',
  },
  {
    id: 'space-2',
    userId: 'user-2',
    layoutType: 'cluster',
    theme: {
      primaryColor: '#f59e0b',
      secondaryColor: '#fbbf24',
      backgroundColor: '#0d0a1a',
      ambientIntensity: 0.35,
      particleDensity: 150,
      bloomIntensity: 1.0,
    },
    cameraDefaults: {
      position: [7, 4, 7],
      target: [0, 1, 0],
      fov: 55,
    },
    lastUpdated: '2026-04-18T10:00:00Z',
  },
  {
    id: 'space-3',
    userId: 'user-3',
    layoutType: 'radial',
    theme: {
      primaryColor: '#10b981',
      secondaryColor: '#34d399',
      backgroundColor: '#0a1a0f',
      ambientIntensity: 0.45,
      particleDensity: 180,
      bloomIntensity: 1.1,
    },
    cameraDefaults: {
      position: [8, 5, 8],
      target: [0, 1, 0],
      fov: 55,
    },
    lastUpdated: '2026-04-22T10:00:00Z',
  },
];

// ---- Matches ----

export const mockMatches: Match[] = [
  {
    id: 'match-1',
    userA: 'user-1',
    userB: 'user-2',
    similarityScore: 0.72,
    alignmentClusters: [
      {
        theme: 'Creative Technology',
        nodesA: ['n1-7', 'n1-1'],
        nodesB: ['n2-2', 'n2-7'],
        score: 0.85,
      },
      {
        theme: 'Open Expression',
        nodesA: ['n1-5'],
        nodesB: ['n2-6'],
        score: 0.68,
      },
    ],
    conflictZones: [],
    graphOverlap: {
      sharedEdgePatterns: 3,
      structuralSimilarity: 0.65,
    },
    computedAt: '2026-04-25T10:00:00Z',
  },
  {
    id: 'match-2',
    userA: 'user-1',
    userB: 'user-3',
    similarityScore: 0.64,
    alignmentClusters: [
      {
        theme: 'Science & Research',
        nodesA: ['n1-1', 'n1-3'],
        nodesB: ['n3-1', 'n3-5'],
        score: 0.78,
      },
      {
        theme: 'Systems & Knowledge',
        nodesA: ['n1-2', 'n1-5'],
        nodesB: ['n3-3', 'n3-4'],
        score: 0.6,
      },
    ],
    conflictZones: [],
    graphOverlap: {
      sharedEdgePatterns: 2,
      structuralSimilarity: 0.58,
    },
    computedAt: '2026-04-25T10:00:00Z',
  },
];

// ---- Lookup Helpers ----

export function getNodesForUser(userId: string): ThoughtNode[] {
  switch (userId) {
    case 'user-1': return ariaNodes;
    case 'user-2': return marcusNodes;
    case 'user-3': return lunaNodes;
    default: return [];
  }
}

export function getEdgesForUser(userId: string): Edge[] {
  switch (userId) {
    case 'user-1': return ariaEdges;
    case 'user-2': return marcusEdges;
    case 'user-3': return lunaEdges;
    default: return [];
  }
}

export function getSpaceForUser(userId: string): Space | undefined {
  return mockSpaces.find(s => s.userId === userId);
}

export function getUserById(userId: string): User | undefined {
  return mockUsers.find(u => u.id === userId);
}

export function getMatchBetween(a: string, b: string): Match | undefined {
  return mockMatches.find(
    m => (m.userA === a && m.userB === b) || (m.userA === b && m.userB === a)
  );
}
