import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: { nodes: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    });

    const discoverUsers = users.map(user => ({
      id: user.id,
      name: user.name,
      metadata: user.metadata,
      nodeCount: user._count.nodes,
      avatarUrl: user.avatarUrl
    }));

    return NextResponse.json({ users: discoverUsers });
  } catch (error) {
    console.error("Discover error:", error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
