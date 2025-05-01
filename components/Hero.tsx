'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

export function Hero() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to join waitlist')
      }

      toast.success('Successfully joined the waitlist!')
      setEmail('')
      setSuccess(true)
    } catch (error) {
      toast.error('Failed to join the waitlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Find Your Perfect Muay Thai Gym
      </h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
        Join the waitlist to discover and compare the best Muay Thai gyms worldwide. Be the first to know when we launch!
      </p>
      {success ? (
        <div className="mt-10 text-green-600 font-semibold text-lg">
          Thank you for joining the waitlist! 🎉<br />We'll notify you as soon as we launch.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 flex gap-x-4 justify-center max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Joining...' : 'Join the waitlist'}
          </Button>
        </form>
      )}
    </div>
  )
} 