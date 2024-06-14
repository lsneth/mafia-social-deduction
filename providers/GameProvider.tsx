import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

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
  const [gameId, setGameId] = useState('')
  const [loading] = useState(false)
  const { id } = useLocalSearchParams<{ id?: string }>()

  useEffect(() => {
    if (id) {
      setGameId(id)
    }
  }, [id])

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
