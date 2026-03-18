import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserSupabaseClient: SupabaseClient | null = null

export async function getBrowserSupabaseClient(): Promise<SupabaseClient | null> {
  if (typeof window === 'undefined') {
    return null
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  if (browserSupabaseClient) {
    return browserSupabaseClient
  }

  browserSupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })

  return browserSupabaseClient
}
