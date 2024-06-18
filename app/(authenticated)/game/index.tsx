import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'
import { useProfile } from '@/providers/ProfileProvider'
import { leaveGame } from '@/services/game-services'
import { router } from 'expo-router'

export default function LobbyScreen() {
  const { gameId, loading } = useGame()
  const { id: playerId } = useProfile()

  if (loading) return <ThemedActivityIndicator />

  return (
    <ThemedView>
      <ThemedText>Lobby</ThemedText>
      <ThemedText>Game ID: {gameId} </ThemedText>
      <ThemedPressable>
        <ThemedText>Start Game</ThemedText>
      </ThemedPressable>
      <ThemedPressable secondary testID="leave-game-button">
        <ThemedText
          onPress={async () => {
            try {
              await leaveGame(gameId, playerId)
              router.replace('/home')
            } catch (error) {
              console.error(error)
            }
          }}
        >
          Leave Game
        </ThemedText>
      </ThemedPressable>
    </ThemedView>
  )
}
