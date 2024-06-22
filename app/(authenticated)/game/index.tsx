import Group from '@/components/Group'
import Spacer from '@/components/Spacer'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'
import { useProfile } from '@/providers/ProfileProvider'
import { deleteGame, leaveGame } from '@/services/game-services'
import { Redirect, router } from 'expo-router'
import { useState } from 'react'

export default function LobbyScreen() {
  const { gameId, unsubscribeFromGame, loading: gameLoading, notFound, players, player } = useGame()
  const { id: profileId } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)

  if (loading || gameLoading) return <ThemedActivityIndicator />
  if (notFound) return <Redirect href="/+not-found" />

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedText type="title">{gameId}</ThemedText>
        <Spacer />
        <ThemedText>Invite others with this code</ThemedText>
      </Group>
      <ThemedText>{JSON.stringify(players)}</ThemedText>
      <Group>
        <ThemedPressable testID="start-game-button">
          <ThemedText>Start Game</ThemedText>
        </ThemedPressable>
        {player?.is_host ? (
          <ThemedPressable
            secondary
            onPress={async () => {
              setLoading(true)
              try {
                const { error } = await deleteGame(profileId)
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
          </ThemedPressable>
        ) : (
          <ThemedPressable
            secondary
            onPress={async () => {
              setLoading(true)
              try {
                const res = await unsubscribeFromGame()
                if (res !== 'ok') throw res

                const { error: leaveError } = await leaveGame(profileId)
                if (leaveError) throw leaveError

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
        )}
      </Group>
    </ThemedView>
  )
}
