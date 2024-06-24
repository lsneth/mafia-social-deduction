import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { supabase } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'
import { PlayersChange, Event, Player, GameChange, Game } from '@/types/game-types'
import { useGlobalSearchParams } from 'expo-router'
import { useProfile } from './ProfileProvider'

type PlayersReducerAction =
  | {
      type: Event
      new: Player
      old: Player
    }
  | { type: 'REFRESH'; players: Player[] }

function playersReducer(players: Player[] | null, action: PlayersReducerAction): Player[] | null {
  switch (action.type) {
    case 'UPDATE':
      if (players === null) return players // should never happen, but makes TS happy
      return players.map((player) => {
        if (player.profile_id === action.new.profile_id) {
          return action.new
        } else {
          return player
        }
      })

    case 'INSERT':
      if (players === null) return players
      return [...players, action.new]

    case 'DELETE':
      if (players === null) return players
      return players.filter((player) => player.profile_id !== action.old.profile_id)

    case 'REFRESH':
      return [...action.players]

    default:
      return players
  }
}

const GameContext = createContext<{
  players: Player[] | null
  player: Player | null
  game: Game | null
  loading: boolean
  unsubscribeFromGame: () => Promise<'ok' | 'timed out' | 'error' | undefined>
}>({
  players: null,
  player: null,
  game: null,
  loading: false,
  unsubscribeFromGame: async () => undefined,
})

export function useGame() {
  const value = useContext(GameContext)
  if (value === undefined) {
    throw new Error('useGame must be wrapped in a <GameProvider />')
  }

  return value
}

export function GameProvider(props: PropsWithChildren) {
  // These set/dispatch functions should never be used outside of this provider. All updates to game state should be done through the supabase JavaScript Client Library. As subscription changes come in from the supabase real time channel, state updates will be handled here.
  const [players, dispatch] = useReducer(playersReducer, null)
  const [game, setGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { id: gameIdFromQueryParam } = useGlobalSearchParams<{ id: string }>()
  const [rtChannel] = useState<RealtimeChannel>(supabase.channel(gameIdFromQueryParam ?? ''))
  const { id: profileId } = useProfile()

  const onPlayersUpdate = (change: PlayersChange) => {
    dispatch({
      type: change.eventType,
      new: change.new,
      old: change.old,
    })
  }

  const onGameUpdate = (change: GameChange) => {
    setGame(change.new)
  }

  const subscribeToGame = useCallback(async () => {
    if (profileId) {
      try {
        setLoading(true)

        // make sure the user is in the game
        const { data: playerData, error: playerError } = await supabase
          .from('players')
          .select('*')
          .eq('game_id', gameIdFromQueryParam)
          .eq('profile_id', profileId)
        if (playerError) throw playerError
        if (playerData.length <= 0) throw new Error('Player not in game')

        // subscribe to players changes
        rtChannel
          ?.on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${gameIdFromQueryParam}` },
            (change) => {
              onPlayersUpdate(change as PlayersChange)
            },
          )
          ?.on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'games', filter: `id=eq.${gameIdFromQueryParam}` },
            (change) => {
              onGameUpdate(change as GameChange)
            },
          )
          .subscribe()

        // make request to game and player data to get full starting state
        // get players data
        const { data: playersData, error: playersError } = await supabase
          .from('players')
          .select('*')
          .eq('game_id', gameIdFromQueryParam)
        if (playersError) throw playersError

        // update state
        dispatch({
          type: 'REFRESH',
          players: playersData,
        })

        // get game data
        const { data: gameData, error: gameError } = await supabase
          .from('games')
          .select('*')
          .eq('id', gameIdFromQueryParam)
          .single()
        if (gameError) throw gameError

        // update state
        setGame(gameData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }, [gameIdFromQueryParam, profileId, rtChannel])

  async function unsubscribeFromGame() {
    if (!rtChannel) return
    return supabase.removeChannel(rtChannel)
  }

  useEffect(() => {
    // this will only be called in the lobby where the query param is.
    // after that the game id will always be accessed from game.id
    if (gameIdFromQueryParam) {
      async function subscribe() {
        await subscribeToGame()
      }
      subscribe()
    }
  }, [gameIdFromQueryParam, subscribeToGame])

  return (
    <GameContext.Provider
      value={{
        players,
        player: players?.find((player) => player.profile_id === profileId) ?? null,
        game,
        loading,
        unsubscribeFromGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}
