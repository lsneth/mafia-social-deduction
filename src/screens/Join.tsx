import React from 'react'
import ParentView from '../components/ParentView'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useGame } from '../providers/GameProvider'
import Separator from '../components/Separator'
import Text from '../components/Text'
import en from '../locales/en.json'

export default function Join({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Join'>
}) {
  const { gameId, setGameId, joinGame } = useGame()

  return (
    <ParentView>
      <Separator size={100} />

      <Text>{en['join.enter-id.description']}</Text>
      <Separator size={20} />
      <TextInput
        placeholder="XXXXXX"
        value={gameId}
        onChangeText={(text) => {
          setGameId(text)
        }}
      />
      <Button
        onPress={() => {
          joinGame({ gameId: gameId! })
          navigation.navigate('Lobby')
        }}
      >
        {en['join.join.action']}
      </Button>
    </ParentView>
  )
}
