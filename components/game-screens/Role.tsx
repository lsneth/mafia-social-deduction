import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useProfile } from '@/providers/ProfileProvider'
import { useGame } from '@/providers/GameProvider'
import Group from '../Group'
import ThemedPressable from '../ThemedPressable'
import { readyPlayer, updateGamePhase } from '@/services/game-services'
import RoleComponent from '../RoleComponent'
import { roleImages } from '@/helpers/roleImages'

export default function Role() {
  const { sex } = useProfile()
  const { game, player, players } = useGame()

  // we can guarantee player, players and game to be defined here because of the conditional rendering in game.tsx
  const role = player!.role
  const ready = player!.ready

  const playerId = player!.profile_id
  const isHost = game!.host_id === playerId
  const allPlayersReady = players!.every((player) => player.ready)

  const bgImageSrc = roleImages[role][sex]

  return ready ? (
    <ThemedView className="justify-center">
      {isHost ? (
        <ThemedPressable
          disabled={!allPlayersReady}
          onPress={async () => {
            try {
              const { error } = await updateGamePhase(game!.id, 'mafia')
              if (error) throw error
            } catch (error) {
              console.error(error)
            }
          }}
          testID="start-mafia-phase-button"
        >
          <ThemedText>{allPlayersReady ? 'Start Mafia Phase' : 'Waiting for other players...'}</ThemedText>
        </ThemedPressable>
      ) : (
        <ThemedText>{allPlayersReady ? 'Waiting for host...' : 'Waiting for other players...'}</ThemedText>
      )}
    </ThemedView>
  ) : (
    <ThemedView bgImageSrc={bgImageSrc} className="justify-between">
      <RoleComponent />
      <Group>
        <ThemedPressable
          onPress={async () => {
            try {
              const { error } = await readyPlayer(playerId)
              if (error) throw error
            } catch (error) {
              console.error(error)
            }
          }}
          testID="ready-button"
        >
          <ThemedText>Ready</ThemedText>
        </ThemedPressable>
      </Group>
    </ThemedView>
  )
}
