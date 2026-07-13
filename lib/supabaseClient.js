import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and ' +
    'NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment (.env.local locally, ' +
    'or the Vercel project settings for deployments).'
  )
}

// Fall back to a syntactically valid placeholder so the build/prerender does not
// crash with "supabaseUrl is required" when env vars are absent. Auth calls will
// still fail at runtime until real credentials are provided, but the app builds.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
