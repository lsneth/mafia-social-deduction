import React, { useState } from 'react'
import ParentView from '../components/ParentView'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { joinGameSession } from '../services/supabaseServices'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'

export default function Join({
  route,
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Join'>
  route: RouteProp<RootStackParamList, 'Join'>
}) {
  const [gameSessionCode, setGameSessionCode] = useState('')
  return (
    <ParentView>
      <TextInput
        label="Game Session Code"
        placeholder="XXXXXX"
        value={gameSessionCode}
        onChangeText={(text) => setGameSessionCode(text)}
      />
      <Button
        onPress={() => {
          joinGameSession(`gs_${gameSessionCode}`)
          navigation.navigate('Lobby', { gameSessionCode: gameSessionCode })
        }}
      >
        Join
      </Button>
    </ParentView>
  )
}
