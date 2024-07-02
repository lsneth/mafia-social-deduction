import { supabase } from '@/lib/supabase'
import { Phase } from '@/types/game-types'

export async function getHostId(gameId: string) {
  return supabase.from('games').select('host_id').eq('id', gameId).single()
}

export async function deleteGame(hostId: string) {
  return supabase.from('games').delete().eq('host_id', hostId)
}

export async function leaveGame(playerId: string) {
  return supabase.from('players').delete().eq('profile_id', playerId)
}

export async function joinGame(gameId: string, playerId: string, playerName: string | null) {
  return supabase.from('players').insert({ profile_id: playerId, game_id: gameId, name: playerName })
}

export async function assignRoles(gameId: string, playerCount: number) {
  try {
    const { error } = await supabase.functions.invoke('assign-roles', {
      body: { gameId, playerCount },
    })

    if (error) throw error

    return { error: null }
  } catch (error: any) {
    const errorObj = await error.context.json() // https://github.com/supabase/functions-js/issues/45#issuecomment-2068191215
    return { error: { message: errorObj.error } }
  }
}

export async function hostGame(profileId: string, playerName: string) {
  // TODO: move to edge function
  try {
    // create row in 'games' table
    const { error: createGameError } = await supabase.from('games').insert({ host_id: profileId })
    if (createGameError) throw createGameError

    // get game id from 'games' table
    const { data: gameIdData, error: gameIdError } = await supabase
      .from('games')
      .select('id')
      .eq('host_id', profileId)
      .single()
    if (gameIdError) throw gameIdError

    // add player to 'players' table
    const { error: joinGameError } = await joinGame(gameIdData.id, profileId, playerName)
    if (joinGameError) throw joinGameError

    return { error: null, data: { gameId: gameIdData.id } }
  } catch (error: any) {
    console.error(error)
    return { error: { message: error.message }, data: { gameId: null } }
  }
}

export async function updateGamePhase(gameId: string, phase: Phase) {
  return supabase.from('games').update({ phase }).eq('id', gameId)
}

export async function readyPlayer(playerId: string) {
  return supabase.from('players').update({ ready: true }).eq('profile_id', playerId)
}

export async function unreadyPlayers(playerIds: string[]) {
  let response = { error: '' }

  playerIds.forEach(async (playerId) => {
    const { error } = await supabase.from('players').update({ ready: false }).eq('profile_id', playerId)
    if (error) response = { error: error.message }
  })

  return response
}

export async function selectPlayer(playerId: string, selectedPlayerId: string) {
  return supabase.from('players').update({ selected_player_id: selectedPlayerId }).eq('profile_id', playerId)
}

export async function markPlayerKilled(playerId: string) {
  return supabase.from('players').update({ has_been_killed: true }).eq('profile_id', playerId)
}
