import Group from '@/components/Group'
import PlayerGrid from '@/components/PlayerGrid'
import Spacer from '@/components/Spacer'
import ThemedActivityIndicator from '@/components/ThemedActivityIndicator'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'
import { useProfile } from '@/providers/ProfileProvider'
import { assignRoles, deleteGame, leaveGame, updateGamePhase } from '@/services/game-services'
import { router } from 'expo-router'
import { useState } from 'react'
import SummaryTable from '../SummaryTable'
import getRoleCounts from '@/helpers/getRoleCounts'

export default function Lobby() {
  const { game, unsubscribeFromGame, players } = useGame()
  const gameId = game!.id
  const hostId = game!.host_id
  const { id: profileId } = useProfile()
  const [loading, setLoading] = useState<boolean>(false)

  const isHost = hostId === profileId
  const playerCount = players!.length
  const { mafiaCount, investigatorCount, innocentCount } = getRoleCounts(playerCount)

  const startButtonDisabled = (players?.length ?? 0) < 5
  const numMorePlayersNeeded = 5 - (players?.length ?? 0)

  if (loading) return <ThemedActivityIndicator />

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedText type="title-sm">{gameId}</ThemedText>
        <ThemedText>Invite others with this code</ThemedText>
      </Group>

      <Spacer />
      <PlayerGrid selectable={false} />
      <Spacer />

      <SummaryTable
        title={`${playerCount} Player${playerCount !== 1 ? 's' : ''}`}
        sections={[
          {
            component: (
              <>
                <ThemedText>{mafiaCount}</ThemedText>
                <ThemedText>Mafia</ThemedText>
              </>
            ),
            bgColor: 'bg-mafiaRed',
          },
          {
            component: (
              <>
                <ThemedText>{investigatorCount}</ThemedText>
                <ThemedText>{`Investigator${investigatorCount !== 1 ? 's' : ''}`}</ThemedText>
              </>
            ),
            bgColor: 'bg-mafiaBlue',
          },
          {
            component: (
              <>
                <ThemedText>{innocentCount}</ThemedText>
                <ThemedText>{`Innocent${innocentCount !== 1 ? 's' : ''}`}</ThemedText>
              </>
            ),
            bgColor: 'bg-mafiaYellow',
          },
        ]}
      />
      <Spacer size={5} />

      <Group>
        {isHost ? (
          <>
            <ThemedPressable
              disabled={startButtonDisabled}
              onPress={async () => {
                try {
                  const { error: assignRolesError } = await assignRoles(gameId, players?.length ?? 0)
                  if (assignRolesError) throw assignRolesError

                  const { error: updatePhaseError } = await updateGamePhase(gameId, 'role')
                  if (updatePhaseError) throw updatePhaseError
                } catch (error) {
                  console.error(error)
                }
              }}
              testID="start-game-button"
            >
              <ThemedText>
                {startButtonDisabled ? `Need ${numMorePlayersNeeded}+ More Players` : 'Start Game'}
              </ThemedText>
            </ThemedPressable>
            <Spacer />
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
          </>
        ) : (
          <>
            <ThemedText>
              {startButtonDisabled
                ? `Waiting for ${numMorePlayersNeeded}+ more players...`
                : 'Waiting for host to start...'}
            </ThemedText>
            <Spacer />
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
          </>
        )}
      </Group>
    </ThemedView>
  )
}
