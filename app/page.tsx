'use client'

import { Hero } from "@/components/Hero"
import ParticlesBackground from "./components/ui/ParticlesBackground";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] container max-w-7xl mx-auto px-4">
      <ParticlesBackground />
      <Hero />
    </main>
  )
}
