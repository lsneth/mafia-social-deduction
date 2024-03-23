import React from 'react'
import { useGame } from '../providers/GameProvider'
import Day from './GameManagerScreens/Day'
import Night from './GameManagerScreens/Night'
import Text from '../components/Text'
import Role from './GameManagerScreens/Role'

export default function GameManager(): JSX.Element {
  const { gamePhase } = useGame()
  return (
    <>
      {gamePhase === 'role' ? (
        <Role />
      ) : gamePhase === 'commonfolk' ? (
        <Day />
      ) : gamePhase === 'mafia' || gamePhase === 'detective' ? (
        <Night />
      ) : (
        <Text>error: invalid game phase</Text>
      )}
    </>
  )
}
