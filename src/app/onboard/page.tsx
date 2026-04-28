'use client';

import dynamic from 'next/dynamic';

const OnboardingFlow = dynamic(() => import('@/components/ui/OnboardingFlow'), { ssr: false });

export default function OnboardPage() {
  return <OnboardingFlow />;
}
