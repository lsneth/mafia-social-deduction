import { supabase } from '@/lib/supabase'

export async function canJoinGame(gameId: string): Promise<true | string> {
  const errorCodeMap = {
    '42P01': 'The game code you entered does not exist.',
    tooManyPlayers: 'There are already 15 players in the game.',
  }

  if (!gameId) return 'Please enter a game code.'

  try {
    const { data, error } = await supabase.from(gameId).select()

    if (error) throw error
    if (data.length >= 15) throw { code: 'tooManyPlayers' }

    const phase = data.find((row) => row.is_host === true).phase
    if (phase === 'lobby') return true
    return 'The game has already started.'
  } catch (error: any) {
    console.error(error)
    return errorCodeMap[error.code as keyof typeof errorCodeMap] ?? 'An error occurred. Please try again later.'
  }
}
