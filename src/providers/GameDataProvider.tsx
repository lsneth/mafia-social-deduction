import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Player = {
  player_id: string // 'bab1a7b5-0316-4840-9af8-ce044d687d80'
  is_alive: boolean
  votes_for: any // TODO
  votes_against: any // TODO
  investigated: boolean
  role: 'commonfolk' | 'detective' | 'mafia'
  cause_of_death: 'murder' | 'execution' | null
}

type GameData = {
  game_id: string
  players: Player[]
} | null

type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any // TODO
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Player
  old: Player
  schema: 'game_sessions'
  table: `gs_${string}` & { length: 9 }
} | null

const GameDataContext = createContext(null)
export const useGameDataContext = () => {
  return useContext(GameDataContext)
}

export default function GameDataProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [gameCode, setGameCode] = useState<string>()
  const [gameData, setGameData] = useState<GameData>()

  function joinGame(gameCode: string) {
    setGameCode(gameCode)
    supabase
      .channel(gameCode)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'game_sessions',
          table: gameCode,
        },
        (payload) => console.log(payload)
      )
      .subscribe()
  }

  return <GameDataContext.Provider value={{ gameData, joinGame }}>{children}</GameDataContext.Provider>
}
