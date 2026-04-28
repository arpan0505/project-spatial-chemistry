import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userId = (await params).userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        space: true,
        nodes: {
          include: {
            edgesFrom: true,
            edgesTo: true,
          }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Extract edges, removing duplicates
    const edgesMap = new Map();
    user.nodes.forEach(node => {
      node.edgesFrom.forEach(edge => edgesMap.set(edge.id, edge));
      node.edgesTo.forEach(edge => edgesMap.set(edge.id, edge));
    });

    // Formatting response to match frontend types
    const formattedNodes = user.nodes.map(node => ({
      id: node.id,
      userId: node.userId,
      type: node.type,
      label: node.label,
      content: node.content,
      mediaUrl: node.mediaUrl,
      position: { x: node.posX, y: node.posY, z: node.posZ },
      size: node.size,
      color: node.color,
      importance: node.importance,
      metadata: node.metadata,
      createdAt: node.createdAt,
    }));

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        metadata: user.metadata,
      },
      space: user.space,
      nodes: formattedNodes,
      edges: Array.from(edgesMap.values()),
    });

  } catch (error) {
    console.error("Error fetching space:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
