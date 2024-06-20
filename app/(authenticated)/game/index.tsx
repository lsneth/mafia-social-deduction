import Group from '@/components/Group'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'
import { useProfile } from '@/providers/ProfileProvider'
import { deleteGame, leaveGame } from '@/services/game-services'
import { router } from 'expo-router'
import { useState } from 'react'

export default function LobbyScreen() {
  const { gameId } = useGame()
  const { id: playerId } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)

  if (loading) return <ThemedActivityIndicator />

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedText type="title">{gameId}</ThemedText>
        <ThemedText>Invite others with this code</ThemedText>
      </Group>
      <Group>
        <ThemedPressable testID="start-game-button">
          <ThemedText>Start Game</ThemedText>
        </ThemedPressable>
        <ThemedPressable
          secondary
          onPress={async () => {
            setLoading(true)
            try {
              const { error } = await deleteGame(playerId)
              if (error) throw error

              router.replace('/home')

              setLoading(false)
            } catch (error) {
              console.error(error)
              setLoading(false)
            }
          }}
          testID="delete-game-button"
        >
          <ThemedText>Delete Game</ThemedText>
          {/* TODO: only show leave game to non hosts and only show delete game to hosts */}
        </ThemedPressable>
        <ThemedPressable
          secondary
          onPress={async () => {
            setLoading(true)
            try {
              const { error } = await leaveGame(playerId)
              if (error) throw error

              router.replace('/home')

              setLoading(false)
            } catch (error) {
              console.error(error)
              setLoading(false)
            }
          }}
          testID="leave-game-button"
        >
          <ThemedText>Leave Game</ThemedText>
        </ThemedPressable>
      </Group>
    </ThemedView>
  )
}
