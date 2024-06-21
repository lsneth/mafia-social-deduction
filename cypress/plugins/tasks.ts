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
      // for some reason, when running tests in github actions, if the password only had digit characters in it it was being sent as a number and the supabase sign in request was failing. These toString() functions ensure that won't happen.
      email: email.toString(),
      password: password.toString(),
    })

    sessions[email] = data.session
  }

  return sessions[email]
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function removePlayerFromGame() {
  const res = await supabase.auth.getSession()
  if (res.error) return res

  const { id } = res.data.session?.user ?? { id: '' }

  return supabase.from('players').delete().eq('profile_id', id)
}

export async function addPlayerToGame(gameId: string) {
  try {
    const { data, error: authError } = await supabase.auth.getSession()
    if (authError) throw authError
    const { id } = data.session?.user ?? { id: '' }

    const { error } = await supabase.functions.invoke('join-game', {
      body: { gameId, playerId: id, playerName: 'test name' },
    })

    if (error) throw error

    return { error: null }
  } catch (error: any) {
    const errorObj = await error.context.json() // https://github.com/supabase/functions-js/issues/45#issuecomment-2068191215
    return { error: { message: errorObj.error } }
  }
}

export async function deleteGame() {
  const { data } = await supabase.auth.getSession()
  const { id } = data.session?.user ?? { id: '' }

  return supabase.from('games').delete().eq('host_id', id)
}
