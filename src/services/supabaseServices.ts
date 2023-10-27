import { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'

export async function createGameSession(): Promise<string> {
  const { data, error } = await supabase.rpc('create_gs_table')

  if (error) {
    Alert.alert(error.message)
    return 'error creating game session'
  }
  return data
}

export async function deleteGameSession(gameSessionCode: string): Promise<void> {
  const { error } = await supabase.rpc('delete_gs_table', { table_name: gameSessionCode })
  if (error) {
    Alert.alert(error.message)
    return
  }
}

export function joinGameSession(gameSessionCode: string) {
  console.log('join', gameSessionCode)
  supabase
    .channel(gameSessionCode)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'game_sessions',
        table: gameSessionCode,
      },
      (payload) => console.log(payload)
    )
    .subscribe()
}
