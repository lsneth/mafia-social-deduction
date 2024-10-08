import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import PlayerGrid from '../PlayerGrid'
import { useGame } from '@/providers/GameProvider'
import Group from '../Group'
import ThemedPressable from '../ThemedPressable'
import { readyPlayer } from '@/services/game-services'
import useVote from '@/hooks/useVote'
import Announcement from '../Announcement'

export default function Investigator() {
  const { players, player } = useGame()
  const { voting, votedPlayer, errorMessage } = useVote('investigator') // this is the magic here, it handles the voting and phase update

  const selectedPlayerId = player!.selected_player_id
  const playerId = player!.profile_id
  const playerRole = player!.role
  const ready = player!.ready
  const votedPlayerName = votedPlayer?.name
  const votedPlayerRole = votedPlayer?.role

  return (
    <ThemedView
      fadeIn
      preFadeInAudio={require('../../assets/audio/sleepMafia.mp3')}
      fadeInAudio={require('../../assets/audio/wakeInvestigator.mp3')}
      bgImageSrc={require('../../assets/images/night.png')}
      className="justify-between"
    >
      <ThemedText type="title-sm">INVESTIGATOR PHASE</ThemedText>
      {playerRole === 'investigator' ? (
        voting ? (
          <>
            <ThemedText>Vote for the person you would like to investigate.</ThemedText>
            <PlayerGrid voting />
            <Group style={{ opacity: selectedPlayerId ? 1 : 0 }} testID="investigate-button">
              <ThemedText>{errorMessage}</ThemedText>
              <ThemedPressable
                disabled={ready || !selectedPlayerId} // if the player is already ready or hasn't selected a player yet during voting stage
                onPress={async () => {
                  try {
                    const { error } = await readyPlayer(playerId)
                    if (error) throw error
                  } catch (error) {
                    console.error(error)
                  }
                }}
              >
                <ThemedText>
                  {ready
                    ? players!.length >= 12 // the number of players necessary before there is more than 1 investigator
                      ? 'Waiting for other investigators...'
                      : 'Loading...'
                    : 'Investigate'}
                </ThemedText>
              </ThemedPressable>
            </Group>
          </>
        ) : (
          <Announcement
            announcementTitle={`${votedPlayerName} is a${votedPlayerRole === 'mafia' ? '' : 'n'} ${votedPlayerRole}!`}
            onActionButtonPress={
              ready
                ? () => {}
                : () => {
                    readyPlayer(player!.profile_id)
                  }
            }
            actionButtonText={ready ? 'Waiting for other players...' : 'Confirm'}
          />
        )
      ) : (
        <ThemedText>Close your eyes and go to sleep.</ThemedText>
      )}
    </ThemedView>
  )
}
