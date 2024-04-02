import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'
import { BackendUser, User } from '../types/types'

// gets user data
export async function getUserProfile(userId: string): Promise<BackendUser> {
  const { data, error } = await supabase.schema('public').from('profiles').select('*').eq('id', userId)

  // TODO: error message
  if (error) {
    Alert.alert('getGameData', error.message)
    console.log('getGameData', error.message)
  }

  const [user] = data ?? []

  return user
}

// updates a user profile
export async function updateUserProfile({
  id,
  firstName: first_name,
  lastName: last_name,
  sex,
  email,
}: Partial<User>): Promise<void> {
  try {
    // we only want to update the fields that are passed in as props
    const update = Object.entries({ id, first_name, last_name, sex, email })
      .filter(([, value]) => value !== undefined)
      .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})

    const { error } = await supabase.schema('public').from('profiles').upsert(update)

    if (error) {
      throw error
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
    }
  }
}

// signs the user out
export function signOut() {
  supabase.auth.signOut()
}
