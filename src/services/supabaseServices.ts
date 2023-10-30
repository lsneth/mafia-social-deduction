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

export async function deleteGameSession(gameId: string): Promise<void> {
  const { error } = await supabase.rpc('delete_gs_table', { table_name: gameId })
  if (error) {
    Alert.alert(error.message)
    return
  }
}

function subscribeToChanges(gameId: string) {
  let gameData = null
  supabase
    .channel(gameId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'game_sessions',
        table: gameId,
      },
      // (change) => console.log(change)
      (payload) => (gameData = payload)
    )
    .subscribe()

  return { gameData }
}
