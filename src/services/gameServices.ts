import { supabase } from '../lib/supabase'
import { Alert } from 'react-native'
import { Change, GameContext, Player, User } from '../types/types'

export async function updatePlayer({
  gameId,
  playerId,
  change,
}: {
  gameId: GameContext['gameId']
  playerId: Player['playerId']
  change: Partial<Player>
}): Promise<void> {
  await supabase
    .schema('game_sessions')
    .from(gameId)
    .update({
      ...change,
    })
    .eq('playerId', playerId)
}

export async function updateGame({
  gameId,
  hostId,
  change,
}: {
  gameId: GameContext['gameId']
  hostId: Player['playerId']
  change: Record<string, string>
}): Promise<void> {
  await supabase
    .schema('game_sessions')
    .from(gameId)
    .update({
      ...change,
    })
    .eq('playerId', hostId)
}

// creates a new game_session table in supabase and returns it's table name (gameId)
export async function createGame(): Promise<string> {
  const { data: gameId, error } = await supabase.schema('public').rpc('create_gs_table')

  // TODO: error message
  if (error) {
    Alert.alert('createGame', error.message)
    console.log('createGame', error.message)
    return 'error creating game session'
  }

  return gameId
}

// adds a row to the game table
export async function addUserToGame({
  gameId,
  userId,
  isHost,
}: {
  gameId: GameContext['gameId']
  userId: User['id']
  isHost: boolean
}): Promise<void> {
  // TODO: do not add to game if gamePhase is set
  const { data: users } = await supabase.schema('public').from('profiles').select('*').eq('id', userId)
  const user = users?.[0] ?? {}
  // TODO: replace row in game table if it already exists

  await supabase.schema('game_sessions').from(gameId).insert({
    playerId: userId,
    firstName: user.first_name,
    lastName: user.last_name,
    isHost: isHost,
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
      },
    )
    .subscribe()
}

// assigns roles proportionately according to player count and sets gamePhase to 'role'
export async function startGame(gameId: string): Promise<void> {
  const { error } = await supabase.schema('public').rpc('start_game', { table_name: gameId })

  // TODO: error message
  if (error) {
    Alert.alert('startGame', error.message)
    console.log('startGame', error.message)
  }
}

// removes a player from a game table
export async function leaveGame(gameId: string, playerId: string): Promise<void> {
  const { error } = await supabase.schema('game_sessions').from(gameId).delete().eq('playerId', playerId)

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
