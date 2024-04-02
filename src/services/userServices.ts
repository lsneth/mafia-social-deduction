import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'
import { User } from '../types/types'

// gets user data
export async function getUserProfile(userId: string): Promise<User | null> {
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
  firstName,
  lastName,
  sex,
}: {
  id: string
  firstName: string
  lastName: string
  sex: 'male' | 'female'
}) {
  try {
    const updates = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      updatedAt: new Date(),
      sex,
    }

    const { error } = await supabase.schema('public').from('profiles').upsert(updates)

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
