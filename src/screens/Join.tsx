import React, { useState } from 'react'
import ParentView from '../components/ParentView'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useGameContext } from '../providers/GameProvider'
import Separator from '../components/Separator'
import Text from '../components/Text'

export default function Join({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Join'> }) {
  const [gameId, setGameId] = useState('')
  const { joinGame } = useGameContext()

  return (
    <ParentView>
      <Separator size={100} />

      <Text>Enter a game ID to join a game</Text>
      <Separator size={20} />
      <TextInput
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
        JOIN
      </Button>
    </ParentView>
  )
}
