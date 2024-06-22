import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useProfile } from './ProfileProvider'
import { Change, Event, Player } from '@/types/game-types'

type PlayersReducerAction =
  | {
      type: Event
      new: Player
      old: Player
    }
  | { type: 'REFRESH'; players: Player[] }

function playersReducer(players: Player[], action: PlayersReducerAction): Player[] {
  switch (action.type) {
    case 'UPDATE':
      return players.map((player) => {
        if (player.profile_id === action.new.profile_id) {
          return action.new
        } else {
          return player
        }
      })

    case 'INSERT':
      return [...players, action.new]

    case 'DELETE':
      return players.filter((player) => player.profile_id !== action.old.profile_id)

    case 'REFRESH':
      return [...action.players]

    default:
      return players
  }
}

const GameContext = createContext<{
  gameId: string
  loading: boolean
  unsubscribeFromGame: () => Promise<'ok' | 'timed out' | 'error' | 'no channel'>
  notFound: boolean
  players: Player[]
  player: Player | undefined
}>({
  gameId: '',
  loading: false,
  unsubscribeFromGame: async () => 'no channel',
  notFound: false,
  players: [],
  player: undefined,
})

export function useGame() {
  const value = useContext(GameContext)
  if (value === undefined) {
    throw new Error('useGame must be wrapped in a <GameProvider />')
  }

  return value
}

export function GameProvider(props: PropsWithChildren) {
  const [gameId, setGameId] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [notFound, setNotFound] = useState<boolean>(false)
  const [players, dispatch] = useReducer(playersReducer, [])
  const [supabaseChannel, setSupabaseChannel] = useState<RealtimeChannel>()
  const { id: profileId } = useProfile()
  const player = players.find((player) => player.profile_id === profileId)
  const { id: gameIdFromQueryParam } = useGlobalSearchParams<{ id?: string }>()

  const onGameUpdate = (change: Change) => {
    dispatch({
      type: change.eventType,
      new: change.new,
      old: change.old,
    })
  }

  const refreshGame = useCallback(async () => {
    try {
      const { data, error } = await supabase.from('players').select('*').eq('game_id', gameId)
      if (error) throw error

      dispatch({
        type: 'REFRESH',
        players: data as Player[],
      })
    } catch (error) {
      console.error(error)
    }
  }, [gameId])

  const subscribeToGame = useCallback(async () => {
    if (supabaseChannel) {
      setLoading(true)
      try {
        // check to see if the user is already in a game
        const { data, error } = await supabase
          .from('players')
          .select('profile_id, game_id')
          .eq('profile_id', profileId)
          .single()

        if (error) {
          setNotFound(true)
          throw error
        }

        if (!data.profile_id) {
          setNotFound(true)
          throw new Error('user has not joined a game')
        }

        if (data.game_id !== gameId) {
          setNotFound(true)
          throw new Error('user is already in a different game')
        }

        // subscribe to game changes
        supabaseChannel
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'players',
              filter: `game_id=eq.${gameId}`,
            },
            (change) => {
              onGameUpdate(change as Change)
            },
          )
          .subscribe()

        await refreshGame()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }, [gameId, profileId, refreshGame, supabaseChannel])

  async function unsubscribeFromGame() {
    if (supabaseChannel) {
      setLoading(true)
      const res = await supabase.removeChannel(supabaseChannel)
      setLoading(false)
      return res
    }
    return 'no channel'
  }

  useEffect(() => {
    if (gameIdFromQueryParam) {
      setGameId(gameIdFromQueryParam)
      setSupabaseChannel(supabase.channel(gameIdFromQueryParam))
    }
  }, [gameIdFromQueryParam])

  useEffect(() => {
    async function subscribe() {
      if (!profileId || !gameId) return
      await subscribeToGame()
    }

    subscribe()
  }, [gameId, profileId, subscribeToGame])

  return (
    <GameContext.Provider
      value={{
        gameId,
        loading,
        unsubscribeFromGame,
        notFound,
        players,
        player,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}
