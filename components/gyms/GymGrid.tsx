'use client'

import { GymCard } from "./GymCard"

export function GymGrid() {
  // TODO: Replace with real data fetching
  const gyms = [
    {
      id: '1',
      name: 'Fight Lab',
      city: 'Bangkok',
      imageUrl: '/images/gym1.jpg',
    },
    {
      id: '2',
      name: 'Elite Muay Thai',
      city: 'Chiang Mai',
      imageUrl: '/images/gym2.jpg',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gyms.map((gym) => (
        <GymCard key={gym.id} {...gym} />
      ))}
    </div>
  )
} 