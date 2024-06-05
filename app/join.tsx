import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, View, TextInput, Pressable } from 'react-native'

export default function JoinScreen() {
  const [gameId, setGameId] = useState<string>('')
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
      <Link
        href={{
          pathname: '/[gameId]',
          params: { gameId: gameId },
        }}
        asChild
      >
        <Pressable>
          <Text>Join Game</Text>
        </Pressable>
      </Link>
    </View>
  )
}
