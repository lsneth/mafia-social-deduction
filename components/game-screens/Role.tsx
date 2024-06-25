import { ThemedText } from '@/components/ThemedText'
import ThemedView from '@/components/ThemedView'
import innocentFemale from '../../assets/images/innocent-female.png'
import innocentMale from '../../assets/images/innocent-male.png'
import investigatorFemale from '../../assets/images/investigator-female.png'
import investigatorMale from '../../assets/images/investigator-male.png'
import mafiaFemale from '../../assets/images/mafia-female.png'
import mafiaMale from '../../assets/images/mafia-male.png'
import { useProfile } from '@/providers/ProfileProvider'
import { useGame } from '@/providers/GameProvider'
import Spacer from '../Spacer'
import SummaryTable from '../SummaryTable'
import Group from '../Group'
import ThemedPressable from '../ThemedPressable'
import { readyPlayer, updateGamePhase } from '@/services/game-services'

const roleDetails = {
  innocent: {
    male: innocentMale,
    female: innocentFemale,
    victory: 'You win when all the mafia players are dead.',
    special: null,
  },
  investigator: {
    male: investigatorMale,
    female: investigatorFemale,
    victory: 'You win when all the mafia players are dead.',
    special: 'The investigator team investigates a player every night.',
  },
  mafia: {
    male: mafiaMale,
    female: mafiaFemale,
    victory: 'You win when all non-mafia players are dead.',
    special: 'The mafia team kills a player every night.',
  },
}

export default function Role() {
  const { sex } = useProfile()
  const { game, player, players } = useGame()

  // we can guarantee player, players and game to be defined here because of the conditional rendering in game.tsx
  const role = player!.role
  const ready = player!.ready

  const playerId = player!.profile_id
  const isHost = game!.host_id === playerId
  const allPlayersReady = players!.every((player) => player.ready)

  const bgImageSrc = roleDetails[role][sex]
  const victory = roleDetails[role]['victory']
  const special = roleDetails[role]['special']

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
          <ThemedText>{allPlayersReady ? 'Start Mafia Phase' : 'Waiting for other players.'}</ThemedText>
        </ThemedPressable>
      ) : (
        <ThemedText>{allPlayersReady ? 'Waiting for host.' : 'Waiting for other players.'}</ThemedText>
      )}
    </ThemedView>
  ) : (
    <ThemedView bgImageSrc={bgImageSrc} className="justify-between">
      <Group>
        <ThemedText>{`You're a${role !== 'mafia' ? 'n' : ''}`}</ThemedText>
        <ThemedText type="title-sm">{role.toUpperCase()}</ThemedText>
      </Group>
      <Group>
        <SummaryTable
          title="Victory"
          sections={[{ component: <ThemedText>{victory}</ThemedText>, bgColor: 'bg-mafiaDarkGray' }]}
        />
        {special ? (
          <>
            <Spacer />
            <SummaryTable
              title="Special"
              sections={[
                {
                  component: <ThemedText>{special}</ThemedText>,
                  bgColor:
                    role === 'investigator' ? 'bg-mafiaBlue' : role === 'mafia' ? 'bg-mafiaRed' : 'bg-mafiaYellow',
                },
              ]}
            />
          </>
        ) : null}
        <Spacer size={5} />
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
