import React from 'react'
import { useGame } from '../providers/GameProvider'
import Day from './Day'
import Night from './Night'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import navigate from '../helpers/navigate'

export default function GameManager({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'GameManager'>
}): JSX.Element {
  const { gamePhase } = useGame()
  return (
    <>
      {gamePhase === 'commonfolk' ? (
        <Day />
      ) : gamePhase === 'mafia' || gamePhase === 'detective' ? (
        <Night />
      ) : (
        navigate({ navigation, nextRoute: 'Home' })
      )}
    </>
  )
}
