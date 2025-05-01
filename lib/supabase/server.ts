import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        set(name: string, value: string, options: CookieOptions) {
          // The cookie setting will be handled by the middleware
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        remove(name: string, options: CookieOptions) {
          // The cookie removal will be handled by the middleware
        },
      },
    }
  )
} 