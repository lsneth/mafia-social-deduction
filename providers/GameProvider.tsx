import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { supabase } from '@/lib/supabase'
import { RealtimeChannel } from '@supabase/supabase-js'
import { useProfile } from './ProfileProvider'

const GameContext = createContext<{
  gameId: string
  loading: boolean
  unsubscribeFromGame: () => Promise<'ok' | 'timed out' | 'error' | 'no channel'>
  notFound: boolean
}>({
  gameId: '',
  loading: false,
  unsubscribeFromGame: async () => 'no channel',
  notFound: false,
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
  const [notFound, setNotFound] = useState<boolean>(false) // this is a hack to get around the fact that the game id is not available on the first render
  const { id: profileId } = useProfile()
  const [supabaseChannel, setSupabaseChannel] = useState<RealtimeChannel>()
  const { id: gameIdFromQueryParam } = useGlobalSearchParams<{ id?: string }>()

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
            { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${gameId}` },
            (payload) => {
              console.log('Change received!', payload)
            }
          )
          .subscribe()
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }, [gameId, profileId, supabaseChannel])

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
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}
