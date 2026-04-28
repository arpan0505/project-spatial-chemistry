import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spatial Chemistry — Explore Personalities as 3D Spaces",
  description: "Where personalities become spaces, thoughts become objects, and compatibility becomes geometry. Explore minds as interactive 3D constellations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
