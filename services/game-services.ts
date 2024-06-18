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

export async function joinGame(gameId: string, playerId: string) {
  return supabase.from('players').insert({ player_id: playerId, game_id: gameId })
}
