// https://github.com/orgs/supabase/discussions/6177

import { Phase, Role } from '@/types/game-types'
import { createClient } from '@supabase/supabase-js'
require('dotenv').config()

// for some reason, when running tests in github actions, if the env var only had digit characters in it it was being sent as a number and which caused requests to fail. These toString() functions ensure that won't happen.
const TEST_USER_EMAIL = process.env.CYPRESS_TEST_USER_EMAIL?.toString() ?? ''
const TEST_USER_PASSWORD = process.env.CYPRESS_TEST_USER_PASSWORD?.toString() ?? ''
const TEST_USER_ID = process.env.CYPRESS_TEST_USER_ID?.toString() ?? ''
const TEST_USER_NAME = process.env.CYPRESS_TEST_USER_NAME?.toString() ?? ''
const SUPABASE_URL = 'https://krsvqfsdxblshgkwnwnb.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyc3ZxZnNkeGJsc2hna3dud25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc3Njc4NTgsImV4cCI6MjAzMzM0Mzg1OH0.-GlDIfDvVrauGuuvmZDReVVBN7BIy-SBCvRDGeUf9NI'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const sessions: Record<string, any> = {} // cache session data for each email

export async function signIn() {
  try {
    if (!sessions[TEST_USER_EMAIL]) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: TEST_USER_EMAIL,
        password: TEST_USER_PASSWORD,
      })
      if (error) throw error

      sessions[TEST_USER_EMAIL] = data.session
    }
    return sessions[TEST_USER_EMAIL]
  } catch (error) {
    console.error(error)
    return null
  }
}

// deletes old test game and/or any game the test user is hosting
export async function deleteGames() {
  try {
    const { error } = await supabase.functions.invoke('cypress-delete-game')
    if (error) throw error
  } catch (error) {
    console.error(error)
  } finally {
    return null
  }
}

// deletes old test game
export async function addUserName() {
  try {
    const { error } = await supabase.from('profiles').update({ name: TEST_USER_NAME }).eq('id', TEST_USER_ID)
    if (error) throw error
  } catch (error) {
    console.error(error)
  } finally {
    return null
  }
}

// deletes old test game and sets up a new one
export async function setUpGame({
  hostedByMe,
  addMe,
  numOtherPlayers,
  phase,
  myRole,
}: {
  hostedByMe: boolean
  addMe: boolean
  numOtherPlayers: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
  phase: Phase
  myRole: Role
}) {
  try {
    const { error } = await supabase.functions.invoke('cypress-set-up-game', {
      body: { hostedByMe, addMe, numOtherPlayers, phase, myRole },
    })
    if (error) throw error
  } catch (error) {
    console.error(error)
  } finally {
    return null
  }
}
