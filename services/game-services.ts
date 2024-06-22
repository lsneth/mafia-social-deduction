import { supabase } from '@/lib/supabase'

export async function createGame(hostId: string) {
  return supabase.from('games').insert({ host_id: hostId })
}

export async function getGameId(hostId: string) {
  return supabase.from('games').select('id').eq('host_id', hostId).single()
}

export async function getHostId(gameId: string) {
  return supabase.from('games').select('host_id').eq('id', gameId).single()
}

export async function deleteGame(hostId: string) {
  return supabase.from('games').delete().eq('host_id', hostId)
}

export async function leaveGame(playerId: string) {
  return supabase.from('players').delete().eq('profile_id', playerId)
}

export async function joinGame(gameId: string, playerId: string, playerName: string | null, isHost: boolean = false) {
  try {
    const { error } = await supabase.functions.invoke('join-game', {
      body: { gameId, playerId, playerName, isHost },
    })

    if (error) throw error

    return { error: null }
  } catch (error: any) {
    const errorObj = await error.context.json() // https://github.com/supabase/functions-js/issues/45#issuecomment-2068191215
    return { error: { message: errorObj.error } }
  }
}
