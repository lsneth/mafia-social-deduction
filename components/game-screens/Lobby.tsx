import Group from '@/components/Group'
import PlayerGrid from '@/components/PlayerGrid'
import Spacer from '@/components/Spacer'
import ThemedPressable from '@/components/ThemedPressable'
import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import { useGame } from '@/providers/GameProvider'
import { useProfile } from '@/providers/ProfileProvider'
import { assignRoles, updateGamePhase } from '@/services/game-services'
import SummaryTable from '../SummaryTable'
import getRoleCounts from '@/helpers/getRoleCounts'
import LeaveGamePressable from '../LeaveGamePressable'
import DeleteGamePressable from '../DeleteGamePressable'

export default function Lobby() {
  const { game, players } = useGame()
  const gameId = game!.id
  const hostId = game!.host_id
  const { id: profileId } = useProfile()

  const isHost = hostId === profileId
  const playerCount = players!.length
  const { mafiaCount, investigatorCount, innocentCount } = getRoleCounts(playerCount)

  const startButtonDisabled = (players?.length ?? 0) < 5
  const numMorePlayersNeeded = 5 - (players?.length ?? 0)

  return (
    <ThemedView className="justify-between">
      <Group>
        <ThemedText type="title-sm">{gameId}</ThemedText>
        <ThemedText>Invite others with this code</ThemedText>
      </Group>

      <Spacer />
      <PlayerGrid voting={false} />
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
            <DeleteGamePressable secondary />
          </>
        ) : (
          <>
            <ThemedText>
              {startButtonDisabled
                ? `Waiting for ${numMorePlayersNeeded}+ more players...`
                : 'Waiting for host to start...'}
            </ThemedText>
            <Spacer />
            <LeaveGamePressable secondary />
          </>
        )}
      </Group>
    </ThemedView>
  )
}
