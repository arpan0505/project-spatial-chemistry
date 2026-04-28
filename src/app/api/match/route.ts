import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { cosineSimilarity } from '@/lib/embedding';

export async function POST(req: Request) {
  try {
    const { userAId, userBId } = await req.json();

    if (!userAId || !userBId) {
      return NextResponse.json({ error: 'Missing user IDs' }, { status: 400 });
    }

    // 1. Fetch users and their nodes
    const [userA, userB] = await Promise.all([
      prisma.user.findUnique({ where: { id: userAId }, include: { nodes: true } }),
      prisma.user.findUnique({ where: { id: userBId }, include: { nodes: true } })
    ]);

    if (!userA || !userB) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 2. Compute similarity matrix between all nodes
    let totalSimilarity = 0;
    let pairsCount = 0;
    const alignments = [];

    // Simple brute force comparison for MVP
    for (const nodeA of userA.nodes) {
      for (const nodeB of userB.nodes) {
        // If both have embeddings, calculate cosine similarity
        if (nodeA.embedding && nodeB.embedding && nodeA.embedding.length > 0 && nodeB.embedding.length > 0) {
          const sim = cosineSimilarity(nodeA.embedding, nodeB.embedding);
          totalSimilarity += sim;
          pairsCount++;

          // If highly similar, log it as an alignment
          if (sim > 0.75) {
            alignments.push({
              nodeA: nodeA,
              nodeB: nodeB,
              score: sim
            });
          }
        }
      }
    }

    const averageSimilarity = pairsCount > 0 ? (totalSimilarity / pairsCount) : 0;
    
    // Scale up score slightly for visual impact in demo
    const finalScore = Math.min(1.0, averageSimilarity + 0.3 + (alignments.length * 0.05));

    // Group alignments by type
    const clusters: Record<string, any> = {};
    alignments.forEach(align => {
      const theme = align.nodeA.type.charAt(0).toUpperCase() + align.nodeA.type.slice(1);
      if (!clusters[theme]) {
        clusters[theme] = { theme, nodesA: [], nodesB: [], score: 0, count: 0 };
      }
      clusters[theme].nodesA.push(align.nodeA.id);
      clusters[theme].nodesB.push(align.nodeB.id);
      clusters[theme].score += align.score;
      clusters[theme].count += 1;
    });

    const alignmentClusters = Object.values(clusters).map(c => ({
      theme: c.theme + ' Alignment',
      nodesA: c.nodesA,
      nodesB: c.nodesB,
      score: c.score / c.count
    }));

    // 3. Save Match Result
    const match = await prisma.match.create({
      data: {
        userAId: userA.id,
        userBId: userB.id,
        similarityScore: finalScore,
        alignmentClusters: alignmentClusters,
        conflictZones: [],
        graphOverlap: { sharedEdgePatterns: alignments.length, structuralSimilarity: finalScore - 0.1 }
      }
    });

    return NextResponse.json({ match });

  } catch (error) {
    console.error("Match error:", error);
    return NextResponse.json({ error: 'Failed to compute match' }, { status: 500 });
  }
}
