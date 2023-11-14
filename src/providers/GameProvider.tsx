import { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useAuthContext } from './AuthProvider'
import {
  addPlayerToGame,
  getGameData,
  subscribeToGame,
  deleteGame as sDeleteGame,
  createGame as sCreateGame,
} from '../services/mafiaServices'
import { Player, PlayersReducerAction, GameContext as GameContextType, Change, RoleCount } from '../types/types'

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

function getRoleCounts(playerCount: number): RoleCount {
  switch (playerCount) {
    // not enough players
    case 0:
      return { mafia: 0, detective: 0, commonfolk: 0, total: 0 }
    case 1:
      return { mafia: 0, detective: 0, commonfolk: 1, total: 1 }
    case 2:
      return { mafia: 0, detective: 0, commonfolk: 2, total: 2 }
    case 3:
      return { mafia: 0, detective: 0, commonfolk: 3, total: 3 }
    case 4:
      return { mafia: 0, detective: 0, commonfolk: 4, total: 4 }

    // 1 mafia, 1 detective
    case 5:
      return { mafia: 1, detective: 1, commonfolk: 3, total: 5 }
    case 6:
      return { mafia: 1, detective: 1, commonfolk: 4, total: 6 }

    // 2 mafia, 1 detective
    case 7:
      return { mafia: 2, detective: 1, commonfolk: 4, total: 7 }
    case 8:
      return { mafia: 2, detective: 1, commonfolk: 5, total: 8 }
    case 9:
      return { mafia: 2, detective: 1, commonfolk: 6, total: 9 }
    case 10:
      return { mafia: 2, detective: 1, commonfolk: 7, total: 10 }
    case 11:
      return { mafia: 2, detective: 1, commonfolk: 8, total: 11 }

    // 3 mafia, 2 detectives
    case 12:
      return { mafia: 3, detective: 2, commonfolk: 7, total: 12 }
    case 13:
      return { mafia: 3, detective: 2, commonfolk: 8, total: 13 }
    case 14:
      return { mafia: 3, detective: 2, commonfolk: 9, total: 14 }
    case 15:
      return { mafia: 3, detective: 2, commonfolk: 10, total: 15 }

    default:
      return { mafia: 0, detective: 0, commonfolk: 0, total: 0 }
  }
}

const GameContext = createContext<GameContextType>({
  gameId: '',
  player: {
    player_id: '',
    first_name: '',
    last_name: '',
    join_time: '',
    is_alive: true,
    votes_for: {},
    votes_against: {},
    investigated: false,
    role: 'commonfolk',
    cause_of_death: null,
  },
  players: [],
  joinGame: () => {},
  mutatePlayers: () => {},
  deleteGame: () => {},
  createGame: async () => '',
  roleCounts: { mafia: 0, detective: 0, commonfolk: 0, total: 0 },
  loading: false,
})

export const useGameContext = () => {
  return useContext(GameContext)
}

export default function GameProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [gameId, setGameId] = useState<string>('258530')
  const [players, dispatch] = useReducer(playersReducer, [])
  const { userProfile } = useAuthContext()
  const player: Player = players.find((player) => player.player_id === userProfile.id)
  const { session } = useAuthContext()
  const roleCounts = getRoleCounts(players.length)
  const [loading, setLoading] = useState<boolean>(false)

  function handleChange(change: Change): void {
    dispatch({
      type: change.eventType,
      new: change.new,
      old: change.old,
    })
  }

  async function mutatePlayers(gameId: string): Promise<void> {
    setLoading(true)
    dispatch({
      type: MUTATE,
      mutation: await getGameData(gameId),
    })
    setLoading(false)
  }

  async function deleteGame(gameId: string): Promise<void> {
    await sDeleteGame(gameId)
  }

  async function createGame(): Promise<string> {
    return sCreateGame()
  }

  async function joinGame(gameId: string): Promise<void> {
    setLoading(true)

    // add player to game
    await addPlayerToGame(gameId, session?.user.id || '')

    // get up to date with current game state
    await mutatePlayers(gameId)

    // subscribe to further changes in game
    await subscribeToGame(gameId, handleChange)

    // save game id to state
    setGameId(gameId)

    setLoading(false)
  }

  return (
    <GameContext.Provider
      value={{ gameId, player, players, joinGame, mutatePlayers, deleteGame, createGame, roleCounts, loading }}
    >
      {children}
    </GameContext.Provider>
  )
}
