import { Link, useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function LobbyScreen() {
  const { gameId } = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Lobby</Text>
      <Text>Game ID: {gameId} </Text>
      <Link href={`/${gameId}/day`} replace asChild>
        <Pressable>
          <Text>Start Game</Text>
        </Pressable>
      </Link>
    </View>
  )
}
