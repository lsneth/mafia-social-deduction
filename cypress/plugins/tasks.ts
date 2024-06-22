// https://github.com/orgs/supabase/discussions/6177

import { createClient } from '@supabase/supabase-js'
require('dotenv').config()

// for some reason, when running tests in github actions, if the env var only had digit characters in it it was being sent as a number and which caused requests to fail. These toString() functions ensure that won't happen.
const TEST_USER_EMAIL = process.env.EXPO_PUBLIC_TEST_USER_EMAIL?.toString() ?? ''
const TEST_USER_PASSWORD = process.env.EXPO_PUBLIC_TEST_USER_PASSWORD?.toString() ?? ''
const TEST_USER_ID = process.env.EXPO_PUBLIC_TEST_USER_ID?.toString() ?? ''
const TEST_HOST_GAME_ID = process.env.EXPO_PUBLIC_TEST_HOST_GAME_ID?.toString() ?? ''
const TEST_USER_NAME = 'test name'
const SUPABASE_URL = 'https://krsvqfsdxblshgkwnwnb.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3ZxZnNkeGJsc2hna3dud25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3Njc4NTgsImV4cCI6MjAzMzM0Mzg1OH0.-GlDIfDvVrauGuuvmZDReVVBN7BIy-SBCvRDGeUf9NI'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const sessions: Record<string, any> = {} // cache session data for each email

export async function signIn() {
  if (!sessions[TEST_USER_EMAIL]) {
    const { data } = await supabase.auth.signInWithPassword({
      email: TEST_USER_EMAIL,
      password: TEST_USER_PASSWORD,
    })

    sessions[TEST_USER_EMAIL] = data.session
  }

  return sessions[TEST_USER_EMAIL]
}

export async function signOut() {
  return supabase.auth.signOut()
}

export async function addPlayerToGame(gameId: string) {
  try {
    const { error } = await supabase.functions.invoke('join-game', {
      body: { gameId, playerId: TEST_USER_ID, playerName: TEST_USER_NAME },
    })

    if (error) throw error

    return { error: null }
  } catch (error: any) {
    const errorObj = await error.context.json() // https://github.com/supabase/functions-js/issues/45#issuecomment-2068191215
    return { error: { message: errorObj.error } }
  }
}

export async function removePlayerFromGame() {
  return supabase.from('players').delete().eq('profile_id', TEST_USER_ID)
}

export async function deleteUserGame() {
  return supabase.from('games').delete().eq('host_id', TEST_USER_ID)
}

export async function hostGame() {
  // create row in 'games' table
  const { error: createGameError } = await supabase
    .from('games')
    .insert({ id: TEST_HOST_GAME_ID, host_id: TEST_USER_ID })
  if (createGameError) throw createGameError

  // add player to 'players' table as host
  const { error: addPlayerError } = await supabase.from('players').insert({
    profile_id: TEST_USER_ID,
    game_id: TEST_HOST_GAME_ID,
    name: 'test name',
  })
  if (addPlayerError) throw addPlayerError

  return null
}

export async function addUserName() {
  return supabase.from('profiles').update({ name: TEST_USER_NAME }).eq('id', TEST_USER_ID)
}

export async function deleteUserName() {
  return supabase.from('profiles').update({ name: '' }).eq('id', TEST_USER_ID)
}
