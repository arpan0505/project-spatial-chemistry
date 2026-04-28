'use client';

import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/components/landing/Hero'), { ssr: false });
const Features = dynamic(() => import('@/components/landing/Features'), { ssr: false });

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
    </main>
  );
}
