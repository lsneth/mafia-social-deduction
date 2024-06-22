import { supabase } from '@/lib/supabase'
import { Phase } from '@/types/game-types'

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

export async function hostGame(profileId: string, playerName: string) {
  // TODO: move to edge function
  try {
    if (!playerName) throw new Error("Player doesn't have a name")

    // make sure player isn't already in a game
    const { data: playerData, error: playerError } = await supabase
      .from('players')
      .select('profile_id')
      .eq('profile_id', profileId)
      .single()
    if (playerError && playerError.message !== 'JSON object requested, multiple (or no) rows returned') {
      // this one error is good in this case, means they aren't in game
      throw playerError
    }
    if (playerData !== null) {
      // we want null in this case, means they aren't in game
      throw new Error('Player is already in a game')
    }

    // create row in 'games' table
    const { error: createGameError } = await createGame(profileId)
    if (createGameError) throw createGameError

    // get game id from 'games' table
    const { data: gameIdData, error: gameIdError } = await getGameId(profileId)
    if (gameIdError) throw gameIdError

    // add player to 'players' table as host
    const { error: addPlayerError } = await joinGame(gameIdData.id, profileId, playerName, true)
    if (addPlayerError) throw addPlayerError

    return { error: null, data: { gameId: gameIdData.id } }
  } catch (error: any) {
    console.error(error)
    return { error: { message: error.message }, data: { gameId: null } }
  }
}

export async function updateGamePhase(gameId: string, phase: Phase) {
  return supabase.from('games').update({ phase }).eq('id', gameId)
}
