import { supabase } from '@/lib/supabase'

export async function createGame(hostId: string) {
  return supabase.from('games').insert({ host_id: hostId })
}

export async function getGameId(hostId: string) {
  return supabase.from('games').select('id').eq('host_id', hostId)
}

export async function deleteGame(hostId: string) {
  return supabase.from('games').delete().eq('host_id', hostId)
}

export async function leaveGame(playerId: string) {
  return supabase.from('players').delete().eq('player_id', playerId)
}

export async function joinGame(gameId: string, playerId: string, playerName: string | null) {
  // TODO: move to edge function
  if (!playerName) {
    return { error: { message: 'Please add a name to your account to join a game.' } }
  }

  // get all players in game
  const playersRes = await supabase.from('players').select('player_id').eq('game_id', gameId)
  if (playersRes.error) return playersRes

  // see if game is full
  if (playersRes.data.length >= 15) {
    return { error: { message: 'there are already 15 players' } }
  }

  // see if game has already started
  const gameRes = await supabase.from('games').select('phase').eq('id', gameId).single()
  if (gameRes.error) return gameRes

  const { phase } = gameRes.data
  if (phase !== 'lobby') {
    return { error: { message: 'game has already started' } }
  }

  return supabase.from('players').insert({ player_id: playerId, game_id: gameId, name: playerName })
}
