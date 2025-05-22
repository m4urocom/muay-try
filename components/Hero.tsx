'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { X, Instagram, Facebook, Youtube } from "lucide-react"
import { usePathname } from "next/navigation"

export function Hero() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const pathname = usePathname();

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
      setShowModal(true)
    } catch (error) {
      console.error('Failed to join waitlist:', error)
      toast.error('Failed to join the waitlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full text-center">
      <style>{`
        @keyframes fade-blur-in {
          from { opacity: 0; filter: blur(16px); }
          to { opacity: 1; filter: blur(0); }
        }
        .animate-fade-blur-in { animation: fade-blur-in 1.7s cubic-bezier(.4,2,.6,1) forwards; }
      `}</style>
      <h1
        key={pathname + '-hero-title'}
        className="text-4xl font-bold tracking-tight sm:text-6xl leading-tight max-w-3xl mx-auto animate-fade-blur-in"
        style={{
          background: 'linear-gradient(100deg, #B09864, #CCBA92)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Top AI-Powered Muay Thai Experiences
      </h1>
      <p
        key={pathname + '-hero-paragraph'}
        className="mt-6 text-lg leading-8 text-white w-full text-center animate-fade-blur-in"
        style={{animationDelay: '0.1s'}}
      >
        Join the waitlist to discover the best gyms and training Muay Thai classes in Thailand.
      </p>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-background rounded-xl shadow-lg p-8 max-w-md w-full text-center relative">
            <button
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X size={24} />
            </button>
            <div className="flex items-center justify-center mb-4">
              <span
                className="inline-flex items-center justify-center rounded-full w-16 h-16"
                style={{
                  background: 'linear-gradient(100deg, #B09864, #CCBA92)',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 10.8 17 4 11.2" /></svg>
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2" style={{background: 'linear-gradient(100deg, #B09864, #CCBA92)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
              Welcome aboard!
            </h2>
            <p className="text-base text-white mb-4">
              You&apos;ve successfully joined the waitlist. Stay tuned for updates and exclusive offers.
            </p>
            <button
              className="mt-2 px-6 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {!showModal && (
        <form
          key={pathname + '-hero-form'}
          onSubmit={handleSubmit}
          className="mt-10 flex justify-center max-w-md mx-auto animate-fade-blur-in"
          style={{animationDelay: '0.2s'}}
        >
          <div className="flex w-[90vw] sm:w-[80%] min-w-[200px] max-w-full items-center bg-[rgba(0,0,0,0.11)] border border-sky-900 rounded-md px-2 py-2 focus-within:border-sky-400 hover:border-sky-400 transition-colors">
            <Input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus:ring-0 focus-visible:ring-0 px-2 py-1.5 rounded-md text-base"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="default"
              className="ml-2 px-4 py-1.5 rounded-md font-normal text-base shadow-none border-none h-auto flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
} 