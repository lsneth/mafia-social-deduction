import React from 'react'
import { useGame } from '../providers/GameProvider'
import Day from './GameManagerScreens/Day'
import Night from './GameManagerScreens/Night'
import Text from '../components/Text'
import Role from './GameManagerScreens/Role'
import GameEnd from './GameManagerScreens/GameEnd'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

export default function GameManager({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GameManager'>
}): JSX.Element {
  const { gamePhase, players } = useGame()

  const livingMafia = players.filter((player) => player.isAlive && player.role === 'mafia')
  const livingNonMafia = players.filter((player) => player.isAlive && player.role !== 'mafia')

  // the game ends when all the mafia are dead or when the mafia equal or outnumber the non-mafia
  const gameResult =
    livingMafia.length === 0 ? 'commonfolk' : livingMafia.length >= livingNonMafia.length ? 'mafia' : undefined

  return (
    <>
      {gameResult ? (
        <GameEnd result={gameResult} navigation={navigation} />
      ) : gamePhase === 'role' ? (
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
