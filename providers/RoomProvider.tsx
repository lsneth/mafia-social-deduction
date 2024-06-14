import React from 'react'

const RoomContext = React.createContext<{ test: string }>({ test: 'test' })

export function useRoom() {
  const value = React.useContext(RoomContext)
  if (value === undefined) {
    throw new Error('useRoom must be wrapped in a <RoomProvider />')
  }

  return value
}

export function RoomProvider(props: React.PropsWithChildren) {
  return <RoomContext.Provider value={{ test: 'test' }}>{props.children}</RoomContext.Provider>
}
