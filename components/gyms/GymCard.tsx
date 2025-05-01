'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HTMLAttributes, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface GymCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string
  name: string
  city: string
  imageUrl: string
  isFavorited?: boolean
  onFavoriteChange?: (id: string, isFavorited: boolean) => void
}

export function GymCard({ 
  id, 
  name, 
  city, 
  imageUrl, 
  isFavorited = false, 
  onFavoriteChange,
  ...props 
}: GymCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(isFavorited)
  const supabase = createClient()

  useEffect(() => {
    setIsFavorite(isFavorited)
  }, [isFavorited])

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
          .eq('user_id', user.id)
          .eq('gym_id', id)
          .select()

        if (error) {
          console.error('Delete error:', error)
          throw new Error(error.message || 'Failed to remove from favorites')
        }
        setIsFavorite(false)
        onFavoriteChange?.(id, false)
        toast.success("Removed from favorites")
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert([{ 
            user_id: user.id, 
            gym_id: id
          }])

        if (error) {
          if (error.code === '23505') { // Unique violation
            toast.error("This gym is already in your favorites")
            return
          }
          console.error('Insert error:', error)
          throw new Error(error.message || 'Failed to add to favorites')
        }
        setIsFavorite(true)
        onFavoriteChange?.(id, true)
        toast.success("Added to favorites")
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error(error instanceof Error ? error.message : "Failed to update favorites")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden p-0" {...props}>
      <div className="relative aspect-[4/3] overflow-hidden group/image">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover/image:scale-110"
          priority
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 hover:bg-transparent group/heart z-10"
          onClick={toggleFavorite}
          disabled={isLoading}
        >
          <Heart 
            className={`
              w-5 h-5 transition-colors
              ${isFavorite 
                ? 'fill-red-500 text-red-500 group-hover/heart:fill-red-600 group-hover/heart:text-red-600' 
                : 'text-white group-hover/heart:text-red-500 group-hover/heart:fill-red-500'
              }
            `}
          />
        </Button>
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-lg leading-none">{name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground mt-1.5">
          <MapPin size={16} />
          <span>{city}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 -mt-2">
        <Button asChild className="w-full">
          <Link href={`/gyms/${id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 