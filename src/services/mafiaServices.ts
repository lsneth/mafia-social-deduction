import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'
import { Change, Player, UserProfile } from '../types/types'

export async function createGame(): Promise<string> {
  const { data, error } = await supabase.schema('public').rpc('create_gs_table')

  if (error) {
    Alert.alert('createGame', error.message)
    console.log('createGame', error.message)
    return 'error creating game session'
  }
  return data
}

export async function getGameData(gameId: string): Promise<Player[]> {
  const { data, error } = await supabase.schema('game_sessions').from(gameId).select()

  if (error) {
    Alert.alert('getGameData', error.message)
    console.log('getGameData', error.message)
  }
  return data as Player[]
}

export async function subscribeToGame(gameId: string, handleChange: (change: Change) => void): Promise<void> {
  await supabase
    .channel(gameId)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'game_sessions',
        table: gameId,
      },
      (change) => {
        handleChange(change as Change)
      }
    )
    .subscribe()
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const { data, error } = await supabase.schema('public').from('profiles').select('*').eq('id', userId)
  if (error) {
    Alert.alert('getGameData', error.message)
    console.log('getGameData', error.message)
  }
  return (data as UserProfile[])[0]
}

export async function addPlayerToGame(gameId: string, userId: string): Promise<void> {
  const { data } = await supabase.schema('public').from('profiles').select('*').eq('id', userId)
  await supabase
    .schema('game_sessions')
    .from(gameId)
    .insert({
      player_id: userId,
      first_name: (data as UserProfile[])[0].first_name,
      last_name: (data as UserProfile[])[0].last_name,
    })
}

export async function deleteGame(gameId: string): Promise<void> {
  const { error } = await supabase.schema('public').rpc('delete_gs_table', { table_name: gameId })
  if (error) {
    Alert.alert('deleteGame', error.message)
    console.log('deleteGame', error.message)
  }
}