import type { SupabaseClient } from '@supabase/supabase-js'

let browserSupabaseClient: SupabaseClient | null = null
let browserSupabaseClientPromise: Promise<SupabaseClient | null> | null = null

export async function getBrowserSupabaseClient(): Promise<SupabaseClient | null> {
  if (typeof window === 'undefined') {
    return null
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  if (browserSupabaseClient) {
    return browserSupabaseClient
  }

  if (!browserSupabaseClientPromise) {
    browserSupabaseClientPromise = import('@supabase/supabase-js').then(({ createClient }) => {
      browserSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })

      return browserSupabaseClient
    })
  }

  return browserSupabaseClientPromise
}
