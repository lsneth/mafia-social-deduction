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
}

type Change = {
  commit_timestamp: string // '2023-10-27T14:02:37.898Z'
  errors: any // TODO
  eventType: 'INSERT' | 'UPDATE' | 'DELETE'
  new: Player
  old: Player
  schema: 'game_sessions'
  table: `gs_${string}` & { length: 9 }
}

type GameContext = {
  gameData: GameData
  joinGame: (gameId: string) => void
}

const GameContext = createContext<GameContext>({ gameData: { game_id: '', players: [] }, joinGame: () => {} })
export const useGameContext = () => {
  return useContext(GameContext)
}

export default function GameProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [gameData, setGameData] = useState<GameData>({ game_id: '', players: [] })

  useEffect(() => {
    console.log(gameData)
  }, [gameData])

  function handleChange(change: Change) {
    if (change.eventType === 'UPDATE') {
      const updatedPlayers = gameData.players.map((player) => {
        if (player.player_id === change.new.player_id) {
          return change.new // Update the player with the new data
        }
        return player // Keep other players as they are
      })
      setGameData((prev) => ({ ...prev, players: updatedPlayers }))
    } else if (change.eventType === 'INSERT') {
      setGameData((prev) => ({ ...prev, players: [...prev.players, change.new] }))
    }
  }

  function joinGame(gameId: string): void {
    setGameData({ ...gameData, game_id: gameId })
    supabase
      .channel(gameId)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'game_sessions',
          table: gameId,
        },
        (payload) => handleChange(payload as Change)
      )
      .subscribe()
  }

  return <GameContext.Provider value={{ gameData: gameData, joinGame: joinGame }}>{children}</GameContext.Provider>
}
