import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookieStore = cookies()
          return cookieStore.get(name)?.value ?? ''
        },
        set(name: string, value: string, options: CookieOptions) {
          // Cookie setting is handled by middleware
        },
        remove(name: string, options: CookieOptions) {
          // Cookie removal is handled by middleware
        },
      },
    }
  )
} 