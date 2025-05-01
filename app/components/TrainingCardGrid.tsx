'use client'

import { useEffect, useState } from 'react'
import TrainingCard from './TrainingCard'
import { createClient } from '@/lib/supabase/client'
import { getFavorites } from '@/lib/favorites'

const DEFAULT_TRAINING_IMAGE = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'

interface Training {
  id: string
  title: string
  gymName: string
  city: string
  price: number
  duration: string
  imageUrl: string
}

interface TrainingCardGridProps {
  type: string
  level: string
  duration: string
}

export default function TrainingCardGrid({ type, level, duration }: TrainingCardGridProps) {
  const [trainings, setTrainings] = useState<Training[]>([])
  const [favoriteTrainingIds, setFavoriteTrainingIds] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadFavorites() {
      const { trainings } = await getFavorites()
      setFavoriteTrainingIds(trainings)
    }
    loadFavorites()

    // Subscribe to auth changes to update favorites
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadFavorites()
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  useEffect(() => {
    async function fetchTrainings() {
      try {
        let query = supabase
          .from('trainings')
          .select(`
            *,
            gyms (
              name,
              city
            )
          `)

        if (type) {
          query = query.eq('type', type)
        }
        if (level) {
          query = query.eq('level', level)
        }
        if (duration) {
          query = query.eq('duration', duration)
        }

        const { data, error } = await query

        if (error) throw error

        const formattedTrainings = await Promise.all(data.map(async training => {
          let imageUrl = DEFAULT_TRAINING_IMAGE

          if (training.image_url) {
            try {
              // Extract the path from the full URL
              const url = new URL(training.image_url)
              const path = url.pathname.split('/object/sign/')[1]
              
              if (path) {
                const { data } = await supabase
                  .storage
                  .from('gym-images')
                  .createSignedUrl(path, 60 * 60) // 1 hour expiry

                if (data?.signedUrl) {
                  imageUrl = data.signedUrl
                }
              }
            } catch (error) {
              console.error('Error signing URL:', error)
            }
          }

          return {
            id: training.id,
            title: training.title,
            gymName: training.gyms.name,
            city: training.gyms.city,
            price: training.price,
            duration: training.duration,
            imageUrl
          }
        }))

        setTrainings(formattedTrainings)
      } catch (error) {
        console.error('Error fetching trainings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrainings()
  }, [type, level, duration, supabase])

  if (isLoading) {
    return <div className="col-span-3 text-center">Loading...</div>
  }

  if (trainings.length === 0) {
    return (
      <div className="col-span-3 text-center text-muted-foreground">
        No training programs found.
      </div>
    )
  }

  return (
    <>
      {trainings.map((training) => (
        <TrainingCard
          key={training.id}
          {...training}
          isFavorited={favoriteTrainingIds.includes(training.id)}
        />
      ))}
    </>
  )
} 