import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import { useGameContext } from '../providers/GameProvider'

export default function Join({
  route,
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Join'>
  route: RouteProp<RootStackParamList, 'Join'>
}) {
  const [gameId, setGameId] = useState('')
  const { joinGame } = useGameContext()

  return (
    <ParentView>
      <TextInput
        label="Game ID"
        placeholder="XXXXXX"
        value={gameId}
        onChangeText={(text) => {
          setGameId(text.toUpperCase())
        }}
      />
      <Button
        onPress={() => {
          joinGame(`gs_${gameId.toLowerCase()}`)
          navigation.navigate('Lobby')
        }}
      >
        Join
      </Button>
    </ParentView>
  )
}
