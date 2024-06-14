import React from 'react'

const GameContext = React.createContext<{ test: string }>({ test: 'test' })

export function useGame() {
  const value = React.useContext(GameContext)
  if (value === undefined) {
    throw new Error('useGame must be wrapped in a <GameProvider />')
  }

  return value
}

export function GameProvider(props: React.PropsWithChildren) {
  return <GameContext.Provider value={{ test: 'test' }}>{props.children}</GameContext.Provider>
}
