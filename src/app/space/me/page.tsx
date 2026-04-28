'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSpaceStore } from '@/stores/spaceStore';
import { useUserStore } from '@/stores/userStore';
import { mockUsers, ariaNodes, ariaEdges, mockSpaces } from '@/data/mock';

const SpaceCanvas = dynamic(() => import('@/components/scene/SpaceCanvas'), { ssr: false });
const NodeDetailPanel = dynamic(() => import('@/components/ui/NodeDetailPanel'), { ssr: false });
const Toolbar = dynamic(() => import('@/components/ui/Toolbar'), { ssr: false });
const SpaceHeader = dynamic(() => import('@/components/ui/SpaceHeader'), { ssr: false });

export default function MySpacePage() {
  const { space, setSpace } = useSpaceStore();
  const { currentUser, isOnboarded } = useUserStore();

  useEffect(() => {
    // If user went through onboarding, space is already set
    if (space && isOnboarded) return;

    // Otherwise load demo data (Aria's space)
    const demoUser = mockUsers[0];
    const demoSpace = mockSpaces[0];
    setSpace(demoSpace, ariaNodes, ariaEdges);
  }, [space, isOnboarded, setSpace]);

  const user = isOnboarded && currentUser ? currentUser : mockUsers[0];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <SpaceCanvas />
      <SpaceHeader user={user} isOwn={true} />
      <NodeDetailPanel />
      <Toolbar showLayoutControls />
    </div>
  );
}
