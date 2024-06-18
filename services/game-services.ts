import { supabase } from '@/lib/supabase'

export async function joinGame(
  gameId: string,
  playerId: string,
  playerName: string | null
): Promise<string | undefined> {
  try {
    const { error } = await supabase.functions.invoke('join-game', {
      body: { gameId, playerId, playerName },
    })

    if (error) throw error
  } catch (error: any) {
    const errorObj = await error.context.json()
    return errorObj.error

    // TODO: consider the following
    // import { FunctionsHttpError } from '@supabase/supabase-js'
    // if (error instanceof FunctionsHttpError) {
    //   return error.context.json()
    // }
    // return error
  }
}

export async function leaveGame(gameId: string, playerId: string) {
  try {
    const { error } = await supabase.from(gameId).delete().eq('player_id', playerId)

    if (error) throw error
  } catch (error) {
    console.error(error)
  }
}
