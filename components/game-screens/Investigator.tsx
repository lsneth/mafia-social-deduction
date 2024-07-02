import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import PlayerGrid from '../PlayerGrid'
import { useGame } from '@/providers/GameProvider'
import Spacer from '../Spacer'
import Group from '../Group'
import ThemedPressable from '../ThemedPressable'
import { markPlayer, readyPlayer, clearPlayerState, updateGamePhase, selectPlayer } from '@/services/game-services'
import { useEffect, useState } from 'react'
import getVotedPlayerId from '@/helpers/getVotedPlayerId'

export default function Investigator() {
  const { game, players, player } = useGame()
  const selectedPlayerId = player!.selected_player_id
  const playerId = player!.profile_id
  const playerRole = player!.role
  const ready = player!.ready
  const investigatorPlayers = players!.filter((player) => player.role === 'investigator')
  const isHost = game!.host_id === player!.profile_id
  const [errorMessage, setErrorMessage] = useState('')
  const [investigating, setInvestigating] = useState(true)
  const [investigatedPlayerId, setInvestigatedPlayerId] = useState<string | null>(null)
  const investigatedPlayer = players!.find((player) => player.profile_id === investigatedPlayerId)

  useEffect(() => {
    async function endInvestigatorPhase() {
      // from the host's device, mark player that the investigators guessed. When all are ready, display a yes or no and mark them not ready. Once they are ready again, transition to innocent phase
      if (isHost) {
        // we only want to make game changes from the host's device, even if they aren't an investigator
        if (investigatorPlayers.every((player) => player.ready === true)) {
          // if all investigators are ready
          if (investigating) {
            // if they're ready to see the results of their investigation
            const votedPlayerId = getVotedPlayerId(investigatorPlayers)
            if (votedPlayerId) {
              // if it isn't a tie
              try {
                const { error: markPlayerInvestigatedError } = await markPlayer('investigated', votedPlayerId)
                if (markPlayerInvestigatedError) throw markPlayerInvestigatedError

                const { error } = await clearPlayerState(game!.id)
                if (error) throw error

                setInvestigating(false)
                setInvestigatedPlayerId(votedPlayerId)
              } catch (error) {
                console.error(error)
              }
            } else {
              // if it is a tie
              try {
                setErrorMessage('The tie must be resolved.')
                const { error } = await clearPlayerState(game!.id)
                if (error) throw error
              } catch (error) {
                console.error(error)
              }
            }
          } else {
            // if they are confirming that they saw the results
            if (player!.selected_player_id === playerId) {
              // this seems a bit hacky but a good enough solution for now
              try {
                const { error } = await updateGamePhase(game!.id, 'innocent')
                if (error) throw error
              } catch (error) {
                console.error(error)
              }
            }
          }
        }
      }
    }
    endInvestigatorPhase()
  }, [game, isHost, investigatorPlayers, investigating, player, playerId])

  return (
    <ThemedView
      fadeIn
      preFadeInAudio={require('../../assets/audio/sleep.mp3')}
      fadeInAudio={require('../../assets/audio/investigator.mp3')}
      bgImageSrc={require('../../assets/images/night.png')}
      className="justify-between"
    >
      <Group>
        <ThemedText type="title-sm">INVESTIGATOR PHASE</ThemedText>
        <>
          <Spacer />
          <ThemedText>
            {playerRole === 'investigator'
              ? investigating
                ? 'Tap on the name of the player you would like to investigate.'
                : `${investigatedPlayer?.name} is a${investigatedPlayer?.role === 'mafia' ? '' : 'n'} ${investigatedPlayer?.role}`
              : 'Close your eyes and go to sleep.'}
          </ThemedText>
        </>
      </Group>
      {playerRole === 'investigator' ? (
        investigating ? (
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
                <ThemedText>{ready ? 'Waiting for other investigators...' : 'Ready'}</ThemedText>
              </ThemedPressable>
            </Group>
          </>
        ) : (
          <>
            <PlayerGrid selectable={false} />
            <ThemedPressable
              disabled={ready}
              onPress={async () => {
                try {
                  const { error: readyError } = await readyPlayer(playerId)
                  if (readyError) throw readyError

                  const { error: selectPlayerError } = await selectPlayer(playerId, playerId)
                  if (selectPlayerError) throw selectPlayerError
                } catch (error) {
                  console.error(error)
                }
              }}
              testID="ready-button"
            >
              <ThemedText>{ready ? 'Waiting for other investigators...' : 'Ready'}</ThemedText>
            </ThemedPressable>
          </>
        )
      ) : null}
    </ThemedView>
  )
}
