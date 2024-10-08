import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import PlayerGrid from '../PlayerGrid'
import { useGame } from '@/providers/GameProvider'
import Spacer from '../Spacer'
import DeleteGamePressable from '../DeleteGamePressable'
import LeaveGamePressable from '../LeaveGamePressable'

export default function GameEnd() {
  const { game, player, players } = useGame()
  const result = game!.result
  const isHost = game!.host_id === player!.profile_id
  const investigatorPhaseWasSkipped = players!.every((player) =>
    player.role === 'investigator' ? !player.is_alive : true,
  )

  return (
    <ThemedView
      bgImageSrc={
        result === 'mafia'
          ? require('../../assets/images/night.png')
          : result === 'innocent'
            ? require('../../assets/images/day.png')
            : null
      }
      fadeIn
      preFadeInAudio={
        result === 'mafia'
          ? investigatorPhaseWasSkipped
            ? require('../../assets/audio/sleepMafia.mp3')
            : require('../../assets/audio/sleepInvestigator.mp3')
          : null
      }
      fadeInAudio={result === 'mafia' ? require('../../assets/audio/wakeAll.mp3') : null}
    >
      <ThemedText type="title-sm">
        {result === 'mafia' ? 'The Mafia wins!' : result === 'innocent' ? 'The innocent win!' : 'error'}
      </ThemedText>

      <Spacer />
      <PlayerGrid />
      <Spacer />

      {isHost ? <DeleteGamePressable /> : <LeaveGamePressable />}
    </ThemedView>
  )
}
