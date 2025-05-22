'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.refresh() // Refresh the page to update auth state
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container relative flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex gap-6 items-center">
          <Link href="/" className="text-xl font-bold" style={{ color: '#B09864' }}>
            MuayTry
          </Link>
        </div>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <Button variant="ghost" onClick={handleSignOut} className="text-white hover:text-white hover:bg-white/10">
                Sign Out
              </Button>
              <Button asChild>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                asChild 
                className="border-white text-white hover:text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/login">
                  Log In
                </Link>
              </Button>
              <Button asChild variant="default">
                <Link href="/signup">
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
} 