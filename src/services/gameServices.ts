import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'
import { Change, Player } from '../types/types'

// creates a new game_session table in supabase and returns it's table name (gameId)
export async function createGame(): Promise<string> {
  const { data: gameId, error } = await supabase.schema('public').rpc('create_gs_table')

  // TODO: error message
  if (error) {
    Alert.alert('createGame', error.message)
    console.log('createGame', error.message)
    return 'error creating game session'
  }

  return gameId ?? ''
}

// adds a row to the game table
export async function addPlayerToGame(gameId: string, userId: string, isHost: boolean): Promise<void> {
  const {
    data: [user],
  } = await supabase.schema('public').from('profiles').select('*').eq('id', userId)

  console.log(gameId)
  console.log(
    await supabase.schema('game_sessions').from(gameId).insert({
      player_id: userId,
      first_name: user.first_name,
      last_name: user.last_name,
      is_host: isHost,
    })
  )
}

// gets all rows (players) from game
export async function getCurrentGameData(gameId: string): Promise<Player[] | null> {
  const { data: players, error } = await supabase.schema('game_sessions').from(gameId).select()

  // TODO: error message
  if (error) {
    Alert.alert('getGameData', error.message)
    console.log('getGameData', error.message)
  }

  return players as Player[]
}

// opens websocket for two way communication between the client and the db
export async function subscribeToGameChanges(gameId: string, handleChange: (change: Change) => void): Promise<void> {
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

// sets is_host to true for the given user
export async function setHost(gameId: string, userId: string): Promise<void> {
  await supabase
    .schema('game_sessions')
    .from(gameId)
    .update({
      is_host: true,
    })
    .eq('player_id', userId)
}

// assigns roles proportionately according to player count
export async function assignRoles(gameId: string): Promise<void> {
  const { error } = await supabase.schema('public').rpc('assign_roles', { table_name: gameId })

  // TODO: error message
  if (error) {
    Alert.alert('assignRoles', error.message)
    console.log('assignRoles', error.message)
  }
}

// deletes a game table from the db
export async function deleteGame(gameId: string): Promise<void> {
  const { error } = await supabase.schema('public').rpc('delete_gs_table', { table_name: gameId })

  // TODO: error message
  if (error) {
    Alert.alert('deleteGame', error.message)
    console.log('deleteGame', error.message)
  }
}
