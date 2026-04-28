'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useSpaceStore } from '@/stores/spaceStore';
import { useUIStore } from '@/stores/uiStore';
import { getNodesForUser, getEdgesForUser, getSpaceForUser, getUserById, getMatchBetween, mockUsers } from '@/data/mock';
import { useUserStore } from '@/stores/userStore';

const SpaceCanvas = dynamic(() => import('@/components/scene/SpaceCanvas'), { ssr: false });
const NodeDetailPanel = dynamic(() => import('@/components/ui/NodeDetailPanel'), { ssr: false });
const Toolbar = dynamic(() => import('@/components/ui/Toolbar'), { ssr: false });
const SpaceHeader = dynamic(() => import('@/components/ui/SpaceHeader'), { ssr: false });
const MatchOverlay = dynamic(() => import('@/components/ui/MatchOverlay'), { ssr: false });

export default function ExploreSpacePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { setSpace } = useSpaceStore();
  const { openMatchOverlay } = useUIStore();
  const { currentUser } = useUserStore();

  const [viewUser, setViewUser] = useState(getUserById(userId));

  useEffect(() => {
    const user = getUserById(userId);
    setViewUser(user);

    const space = getSpaceForUser(userId);
    const nodes = getNodesForUser(userId);
    const edges = getEdgesForUser(userId);

    if (space) {
      setSpace(space, nodes, edges);
    }
  }, [userId, setSpace]);

  const currentId = currentUser?.id || 'user-1';
  const match = getMatchBetween(currentId, userId);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SpaceCanvas isExploring />
      <SpaceHeader
        user={viewUser || null}
        isOwn={false}
        matchScore={match?.similarityScore}
        onViewMatch={() => openMatchOverlay()}
      />
      <NodeDetailPanel />
      <Toolbar showLayoutControls={false} />
      <MatchOverlay
        match={match || null}
        userA={getUserById(currentId) || null}
        userB={viewUser || null}
      />
    </div>
  );
}
