import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookieStore = cookies()
          const cookie = cookieStore.get(name)
          return cookie?.value ?? ''
        },
        set() {
          // Cookie setting is handled by middleware
        },
        remove() {
          // Cookie removal is handled by middleware
        },
      },
    }
  )
} 