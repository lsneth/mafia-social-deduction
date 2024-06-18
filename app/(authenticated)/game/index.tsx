import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'
import { useProfile } from '@/providers/ProfileProvider'
import { deleteGame } from '@/services/game-services'
import { router } from 'expo-router'
import { useState } from 'react'

export default function LobbyScreen() {
  const { gameId } = useGame()
  const { id: playerId } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <ThemedActivityIndicator />

  return (
    <ThemedView>
      <ThemedText>Lobby</ThemedText>
      <ThemedText>Game ID: {gameId} </ThemedText>
      <ThemedPressable>
        <ThemedText>Start Game</ThemedText>
      </ThemedPressable>
      <ThemedPressable
        secondary
        onPress={async () => {
          setLoading(true)
          try {
            const { error: deleteGameError } = await deleteGame(playerId)
            if (deleteGameError) throw deleteGameError

            router.replace('/home')

            setLoading(false)
          } catch (error) {
            console.error(error)
            setLoading(false)
          }
        }}
        testID="leave-game-button"
      >
        <ThemedText>Delete Game</ThemedText>
        {/* TODO: leave game text and functionality for non hosts */}
      </ThemedPressable>
    </ThemedView>
  )
}
