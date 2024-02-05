import { createContext, useContext, useReducer, useState } from 'react'
import { Change, GameContext as GameContextType, Player, PlayersReducerAction, RoleCount } from '../types/types'
import { useUser } from './UserProvider'
import {
  getCurrentGameData,
  deleteGame as deleteGameService,
  createGame,
  addPlayerToGame,
  subscribeToGameChanges,
} from '../services/gameServices'

const defaultGameContextValue: GameContextType = {
  gameId: undefined,
  setGameId: () => {},
  players: undefined,
  player: undefined,
  roleCounts: undefined,
  newGame: async () => {},
  joinGame: async () => {},
  mutatePlayers: () => {},
  deleteGame: () => {},
  loading: true,
}

const GameContext = createContext<GameContextType>(defaultGameContextValue)

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
      return [...action.players]

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

export const useGame = () => {
  return useContext(GameContext)
}

export default function GameProvider({ children }: { children: JSX.Element }): JSX.Element {
  const [gameId, setGameId] = useState<string | undefined>(undefined)
  const [players, dispatch] = useReducer(playersReducer, [])
  const {
    user: { id: userId },
  } = useUser()
  const player: Player | undefined = players.find((player) => player.player_id === userId)
  const roleCounts = getRoleCounts(players.length)
  const [loading, setLoading] = useState<boolean>(false)

  // updates game state
  function handleChange(change: Change) {
    dispatch({
      type: change.eventType,
      new: change.new,
      old: change.old,
    })
  }

  // refreshes game data and updates state
  async function mutatePlayers(gameId: string): Promise<void> {
    setLoading(true)
    dispatch({
      type: MUTATE,
      players: (await getCurrentGameData(gameId)) ?? [],
    })
    setLoading(false)
  }

  // adds the user to the game table and gets state up to date
  async function joinGame({ gameId, isHost = false }: { gameId: string; isHost?: boolean }): Promise<void> {
    setLoading(true)

    // add player to game
    addPlayerToGame(gameId, userId, isHost).then(() =>
      // get up to date with current game state
      mutatePlayers(gameId).then(() =>
        // subscribe to further changes in game
        subscribeToGameChanges(gameId, handleChange)
      )
    )

    setLoading(false)
  }

  // creates a new game and then calls joinGame
  async function newGame(): Promise<void> {
    setLoading(true)
    createGame().then((gameId) => {
      setGameId(gameId)
      joinGame({ gameId, isHost: true })
    })
  }

  async function deleteGame(): Promise<void> {
    await deleteGameService(gameId!)
  }
  return (
    <GameProviderBase
      children={children}
      gameId={gameId}
      setGameId={setGameId}
      players={players}
      player={player}
      roleCounts={roleCounts}
      newGame={newGame}
      joinGame={joinGame}
      mutatePlayers={mutatePlayers}
      deleteGame={deleteGame}
      loading={loading}
    />
  )
}

// TODO: add isNight/isDay
function GameProviderBase({
  children,
  gameId,
  setGameId,
  players,
  player,
  roleCounts,
  newGame,
  joinGame,
  mutatePlayers,
  deleteGame,
  loading,
}: { children: JSX.Element } & GameContextType): JSX.Element {
  const value = {
    // TODO: need useMemo here?
    gameId,
    setGameId,
    players,
    player,
    roleCounts,
    newGame,
    joinGame,
    mutatePlayers,
    deleteGame,
    loading,
  }
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
