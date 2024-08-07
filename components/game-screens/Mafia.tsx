import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import PlayerGrid from '../PlayerGrid'
import { useGame } from '@/providers/GameProvider'
import Group from '../Group'
import ThemedPressable from '../ThemedPressable'
import { readyPlayer } from '@/services/game-services'
import useVote from '@/hooks/useVote'

export default function Mafia() {
  const { player } = useGame()
  const { voting, errorMessage } = useVote('mafia') // this is the magic here, it handles the voting and phase update

  const selectedPlayerId = player!.selected_player_id
  const playerId = player!.profile_id
  const playerRole = player!.role
  const ready = player!.ready

  return (
    <ThemedView
      fadeIn
      preFadeInAudio={require('../../assets/audio/sleepAll.mp3')}
      fadeInAudio={require('../../assets/audio/wakeMafia.mp3')}
      bgImageSrc={require('../../assets/images/night.png')}
      className="justify-between"
    >
      <ThemedText type="title-sm">MAFIA PHASE</ThemedText>
      {playerRole === 'mafia' ? (
        <>
          <ThemedText>Vote for the person you would like to murder.</ThemedText>

          <PlayerGrid voting={voting} />

          <Group style={{ opacity: selectedPlayerId ? 1 : 0 }} testID="ready-button">
            <ThemedText>{errorMessage}</ThemedText>
            <ThemedPressable
              disabled={!selectedPlayerId || ready}
              onPress={async () => {
                try {
                  const { error } = await readyPlayer(playerId)
                  if (error) throw error
                } catch (error) {
                  console.error(error)
                }
              }}
            >
              <ThemedText>{ready ? 'Waiting for other mafia...' : 'Ready'}</ThemedText>
            </ThemedPressable>
          </Group>
        </>
      ) : (
        <ThemedText>Close your eyes and go to sleep.</ThemedText>
      )}
    </ThemedView>
  )
}
