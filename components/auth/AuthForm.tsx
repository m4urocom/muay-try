'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { useSearchParams, useRouter } from 'next/navigation'
import { AuthError } from '@supabase/supabase-js'

export function AuthForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  )
  
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLoading) return // Prevent multiple submissions

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error

        setSuccess('Check your email for the confirmation link!')
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error

        // If sign in was successful, redirect to dashboard
        if (data.session) {
          router.push('/dashboard')
          router.refresh() // Refresh the page to update auth state
        }
      }
    } catch (err) {
      const error = err as AuthError
      if (error.message.includes('security purposes')) {
        setError('Please wait a moment before trying again.')
      } else if (error.message.includes('Invalid login credentials')) {
        setError('Invalid email or password.')
      } else {
        setError(error.message)
      }
      console.error('Authentication error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          {mode === 'signin' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <button 
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              setError(null)
              setSuccess(null)
            }}
            className="text-primary hover:underline"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        {error && (
          <div className="p-3 text-sm rounded bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 text-sm rounded bg-green-50 text-green-600 border border-green-200">
            {success}
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
} 