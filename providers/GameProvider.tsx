import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import { useProfile } from './ProfileProvider'

const GameContext = createContext<{
  gameId: string
  loading: boolean
}>({
  gameId: '',
  loading: false,
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
  const [loading] = useState<boolean>(false)
  const { id: playerId, name } = useProfile()
  const { id: gameIdFromQueryParam } = useGlobalSearchParams<{ id?: string }>()

  useEffect(() => {
    if (gameIdFromQueryParam) {
      setGameId(gameIdFromQueryParam)
    }
  }, [gameIdFromQueryParam])

  useEffect(() => {
    // async function addPlayerToGame() {
    //   try {
    //     const { error } = await supabase.from(gameId).insert({ player_id: playerId, name })
    //     console.log('error:', error)
    //     if (error) throw error
    //   } catch (error) {
    //     console.error('Error adding player to game:', error)
    //   }
    // }
    // addPlayerToGame()
  }, [gameId, name, playerId])

  return (
    <GameContext.Provider
      value={{
        gameId,
        loading,
      }}
    >
      {props.children}
    </GameContext.Provider>
  )
}