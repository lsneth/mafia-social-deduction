import { useNavigation, router } from 'expo-router'
import { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native'
import { StackActions } from '@react-navigation/native'

export default function JoinScreen() {
  const [gameId, setGameId] = useState<string>('')
  const navigation = useNavigation()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Enter a room code to join a game.</Text>
      <TextInput onChangeText={setGameId} value={gameId} />
      <Pressable
        onPress={() => {
          // this is a bit hacky but seems to currently be the best solution since expo doesn't offer any kind of navigation.reset() function
          navigation.dispatch(StackActions.popToTop())
          router.replace(`/${gameId}`)
        }}
      >
        <Text>Join Game</Text>
      </Pressable>
    </View>
  )
}
