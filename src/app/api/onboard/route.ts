import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateEmbeddingsBatch } from '@/lib/embedding';
import { v4 as uuidv4 } from 'uuid';
import { NODE_VISUAL_MAP, NodeType } from '@/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, answers } = body;

    if (!name || !answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Generate embeddings for all answers
    const texts = answers.map((a: any) => a.answer);
    const embeddings = await generateEmbeddingsBatch(texts);

    // 2. Create the User
    const user = await prisma.user.create({
      data: {
        name,
        email: email || `${uuidv4()}@temp.com`,
        metadata: { source: 'onboarding' },
      },
    });

    // 3. Generate spatial layout positions (basic 3D cluster around origin)
    const angleStep = (Math.PI * 2) / answers.length;
    
    // We will build the DB operations to insert nodes
    const nodePromises = answers.map(async (answer: any, i: number) => {
      const visual = NODE_VISUAL_MAP[answer.category as NodeType];
      const radius = 2.5 + Math.random() * 1.5;
      const angle = angleStep * i;
      const height = (Math.random() - 0.5) * 3;

      // Extract raw embedding
      const emb = embeddings[i];

      // Insert node. Note: We use raw SQL to insert the pgvector embedding correctly,
      // but to keep it simple with Prisma we insert without vector first, then update it.
      // Or we can just insert with Prisma if the type is mapped (Unsupported).
      // A common pattern is inserting the row, then updating the vector using Prisma raw query.
      
      const nodeId = uuidv4();
      
      const label = answer.answer.split(' ').slice(0, 4).join(' ') + (answer.answer.split(' ').length > 4 ? '...' : '');

      const node = await prisma.thoughtNode.create({
        data: {
          id: nodeId,
          userId: user.id,
          type: answer.category,
          label: label,
          content: answer.answer,
          posX: Math.cos(angle) * radius,
          posY: 1 + height,
          posZ: Math.sin(angle) * radius,
          size: 0.8 + Math.random() * 0.4,
          color: visual.defaultColor,
          importance: 0.5 + Math.random() * 0.5,
          embedding: emb,
        }
      });

      return {
        id: node.id,
        category: node.type,
      };
    });

    const createdNodes = await Promise.all(nodePromises);

    // 4. Generate some random edges based on categories
    const edgePromises = [];
    for (let i = 0; i < createdNodes.length; i++) {
      for (let j = i + 1; j < createdNodes.length; j++) {
        if (createdNodes[i].category === createdNodes[j].category) {
          edgePromises.push(
            prisma.edge.create({
              data: {
                fromNode: createdNodes[i].id,
                toNode: createdNodes[j].id,
                type: 'strong',
                weight: 0.8,
              }
            })
          );
        } else if (Math.random() > 0.6) {
          edgePromises.push(
            prisma.edge.create({
              data: {
                fromNode: createdNodes[i].id,
                toNode: createdNodes[j].id,
                type: 'related',
                weight: 0.5,
              }
            })
          );
        }
      }
    }

    await Promise.all(edgePromises);

    // 5. Create default space configuration
    const space = await prisma.space.create({
      data: {
        userId: user.id,
        layoutType: 'constellation',
        theme: {
          primaryColor: '#6366f1',
          secondaryColor: '#ec4899',
          backgroundColor: '#050510',
          ambientIntensity: 0.4,
          particleDensity: 200,
          bloomIntensity: 1.2,
        },
        cameraDefaults: {
          position: [8, 5, 8],
          target: [0, 1, 0],
          fov: 55,
        },
      }
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      spaceId: space.id,
    });

  } catch (error: any) {
    console.error("ONBOARD ERROR:", error);
    return NextResponse.json({ error: error.message || 'Failed to process onboarding' }, { status: 500 });
  }
}
