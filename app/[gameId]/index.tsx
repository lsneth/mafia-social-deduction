import { useLocalSearchParams } from 'expo-router'
import { Text, View } from 'react-native'

export default function LobbyScreen() {
  const { gameId } = useLocalSearchParams()

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Lobby</Text>
      <Text>Game ID: {gameId} </Text>
    </View>
  )
}
