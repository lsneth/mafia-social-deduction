// https://github.com/orgs/supabase/discussions/6177

import { createClient } from '@supabase/supabase-js'
require('dotenv').config()

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? ''
)

// cache session data for each user name
const sessions: Record<string, any> = {}
export async function signIn({ email, password }: { email: string; password: string }) {
  // Create a session for the user if it doesn't exist already.
  if (!sessions[email]) {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    sessions[email] = data.session
  }

  return sessions[email]
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error: any) {
    console.error(error.message)
  }
}
