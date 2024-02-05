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
  // TODO: do not add to game if game_state is 'playing' or 'done'
  const { data: users } = await supabase.schema('public').from('profiles').select('*').eq('id', userId)
  const user = users?.[0] ?? {}
  // TODO: replace row in game table if it already exists
  await supabase
    .schema('game_sessions')
    .from(gameId)
    .insert({
      player_id: userId,
      first_name: user?.first_name,
      last_name: user?.last_name,
      is_host: isHost,
      game_state: isHost ? 'waiting' : null,
    })
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

// assigns roles proportionately according to player count and sets game_state to 'playing'
export async function startGame(gameId: string): Promise<void> {
  const { error } = await supabase.schema('public').rpc('start_game', { table_name: gameId })

  // TODO: error message
  if (error) {
    Alert.alert('startGame', error.message)
    console.log('startGame', error.message)
  }
}

// removes a player from a game table
export async function leaveGame(gameId: string, userId: string): Promise<void> {
  const { error } = await supabase.schema('game_sessions').from(gameId).delete().eq('player_id', userId)

  // TODO: error message
  if (error) {
    Alert.alert('leaveGame', error.message)
    console.log('leaveGame', error.message)
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
