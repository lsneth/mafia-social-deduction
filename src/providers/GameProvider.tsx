import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useAuthContext } from './AuthProvider'
import {
  addPlayerToGame,
  getGameData,
  subscribeToGame,
  deleteGame as sDeleteGame,
  createGame as sCreateGame,
} from '../services/mafiaServices'
import { Player, PlayersReducerAction, GameContext as GameContextType, Change } from '../types/types'

const UPDATE = 'UPDATE'
const INSERT = 'INSERT'
const DELETE = 'DELETE'
const MUTATE = 'mutate'

function playersReducer(players: Player[], action: PlayersReducerAction): Player[] {
  switch (action.type) {
    case UPDATE:
      return players.map((player) => {
        if (player.player_id === action.new.player_id) {
          return action.new
        } else {
          return player
        }
      })

    case INSERT:
      return [...players, action.new]

    case DELETE:
      return players.filter((player) => player.player_id !== action.old.player_id)

    case MUTATE:
      return [...action.mutation]

    default:
      return players
  }
}

const GameContext = createContext<GameContextType>({
  gameId: '',
  players: [],
  joinGame: () => {},
  mutatePlayers: () => {},
  deleteGame: () => {},
  createGame: async () => '',
})

export const useGameContext = () => {
  return useContext(GameContext)
}

export default function GameProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [gameId, setGameId] = useState<string>('258530')
  const [players, dispatch] = useReducer(playersReducer, [])
  const { session } = useAuthContext()

  function handleChange(change: Change): void {
    dispatch({
      type: change.eventType,
      new: change.new,
      old: change.old,
    })
  }

  async function mutatePlayers(gameId: string): Promise<void> {
    dispatch({
      type: MUTATE,
      mutation: await getGameData(gameId),
    })
  }

  async function deleteGame(gameId: string): Promise<void> {
    await sDeleteGame(gameId)
  }

  async function createGame(): Promise<string> {
    return sCreateGame()
  }

  async function joinGame(gameId: string): Promise<void> {
    // save game id to state
    setGameId(gameId)

    // get up to date with current game state
    mutatePlayers(gameId)

    // subscribe to further changes in game
    subscribeToGame(gameId, handleChange)

    // add player to game
    addPlayerToGame(gameId, session?.user.id || '')
  }

  return (
    <GameContext.Provider value={{ gameId, players, joinGame, mutatePlayers, deleteGame, createGame }}>
      {children}
    </GameContext.Provider>
  )
}
