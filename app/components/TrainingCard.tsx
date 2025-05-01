'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MapPin } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

const DEFAULT_TRAINING_IMAGE = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80'

type TrainingCardProps = {
  id: string
  title: string
  gymName: string
  city: string
  price: number
  duration: string
  imageUrl: string
  isFavorited?: boolean
}

export default function TrainingCard({
  id,
  title,
  gymName,
  city,
  price,
  duration,
  imageUrl,
  isFavorited = false,
}: TrainingCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(isFavorited)
  const supabase = createClient()

  const toggleFavorite = async () => {
    try {
      setIsLoading(true)
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        toast.error("Please log in to save favorites")
        return
      }

      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .match({ user_id: user.id, training_id: id })

        if (error) {
          console.error('Delete error:', error)
          throw new Error(error.message)
        }
        toast.success("Removed from favorites")
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([{ user_id: user.id, training_id: id }])

        if (error) {
          console.error('Insert error:', error)
          throw new Error(error.message)
        }
        toast.success("Added to favorites")
      }

      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error(error instanceof Error ? error.message : "Failed to update favorites")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden p-0 group">
      <div className="relative aspect-[4/3]">
        <Image
          src={imageUrl || DEFAULT_TRAINING_IMAGE}
          alt={title}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== DEFAULT_TRAINING_IMAGE) {
              target.src = DEFAULT_TRAINING_IMAGE;
            }
          }}
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 hover:bg-transparent"
          onClick={toggleFavorite}
          disabled={isLoading}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-foreground text-foreground' : 'text-white'}`} />
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-lg leading-none">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1.5">{gymName}</p>
        <div className="flex items-center gap-1 text-muted-foreground mt-1">
          <MapPin size={16} />
          <span>{city}</span>
        </div>
        <div className="mt-2 text-lg font-semibold">
          ${price}/{duration}
        </div>
      </CardContent>
      <CardFooter className="p-3 -mt-2">
        <Button asChild className="w-full">
          <Link href={`/training/${id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 