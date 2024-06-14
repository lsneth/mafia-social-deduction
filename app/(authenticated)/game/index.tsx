import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'

export default function LobbyScreen() {
  const { gameId, loading } = useGame()

  if (loading) return <ThemedActivityIndicator />

  return (
    <ThemedView>
      <ThemedText>Lobby</ThemedText>
      <ThemedText>Game ID: {gameId} </ThemedText>
      <ThemedPressable>
        <ThemedText>Start Game</ThemedText>
      </ThemedPressable>
    </ThemedView>
  )
}
