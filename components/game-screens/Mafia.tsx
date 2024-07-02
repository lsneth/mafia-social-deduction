import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import PlayerGrid from '../PlayerGrid'
import { useGame } from '@/providers/GameProvider'
import Spacer from '../Spacer'
import Group from '../Group'
import ThemedPressable from '../ThemedPressable'
import { markPlayer, readyPlayer, clearPlayerState, updateGamePhase } from '@/services/game-services'
import { useEffect, useState } from 'react'
import getVotedPlayerId from '@/helpers/getVotedPlayerId'

export default function Mafia() {
  const { game, players, player } = useGame()
  const selectedPlayerId = player!.selected_player_id
  const playerId = player!.profile_id
  const playerRole = player!.role
  const ready = player!.ready
  const mafiaPlayers = players!.filter((player) => player.role === 'mafia')
  const isHost = game!.host_id === player!.profile_id
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function endMafiaPhase() {
      // from the host's device, mark player that mafia killed and transition to investigator phase when all mafia players are "ready"
      if (isHost) {
        if (mafiaPlayers.every((player) => player.ready === true)) {
          const votedPlayerId = getVotedPlayerId(mafiaPlayers)
          if (votedPlayerId) {
            try {
              const { error: markPlayerKilledError } = await markPlayer('killed', votedPlayerId)
              if (markPlayerKilledError) throw markPlayerKilledError

              const { error: updateGamePhaseError } = await updateGamePhase(game!.id, 'investigator')
              if (updateGamePhaseError) throw updateGamePhaseError
            } catch (error) {
              console.error(error)
            }
          } else {
            try {
              setErrorMessage('The tie must be resolved.')
              const { error } = await clearPlayerState(game!.id)
              if (error) throw error
            } catch (error) {
              console.error(error)
            }
          }
        }
      }
    }
    endMafiaPhase()
  }, [game, isHost, mafiaPlayers])

  return (
    <ThemedView
      fadeIn
      preFadeInAudio={require('../../assets/audio/sleep.mp3')}
      fadeInAudio={require('../../assets/audio/mafia.mp3')}
      bgImageSrc={require('../../assets/images/night.png')}
      className="justify-between"
    >
      <Group>
        <ThemedText type="title-sm">MAFIA PHASE</ThemedText>
        <>
          <Spacer />
          <ThemedText>
            {playerRole === 'mafia'
              ? 'Tap on the name of the player you would like to kill.'
              : 'Close your eyes and go to sleep.'}
          </ThemedText>
        </>
      </Group>
      {playerRole === 'mafia' ? (
        <>
          <PlayerGrid />
          <Group>
            <ThemedText>{errorMessage ? errorMessage : null}</ThemedText>
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
              testID="ready-button"
            >
              <ThemedText>{ready ? 'Waiting for other mafia...' : 'Ready'}</ThemedText>
            </ThemedPressable>
          </Group>
        </>
      ) : null}
    </ThemedView>
  )
}
