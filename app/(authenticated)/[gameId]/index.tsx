import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { Link, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function LobbyScreen() {
  const { gameId } = useLocalSearchParams()
  const insets = useSafeAreaInsets()

  return (
    <ThemedView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemedText>Lobby</ThemedText>
      <ThemedText>Game ID: {gameId} </ThemedText>
      <Link href={`/${gameId}/day`} replace asChild>
        <ThemedPressable>
          <ThemedText>Start Game</ThemedText>
        </ThemedPressable>
      </Link>
    </ThemedView>
  )
}
