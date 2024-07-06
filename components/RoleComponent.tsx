import Group from './Group'
import Spacer from './Spacer'
import SummaryTable from './SummaryTable'
import { ThemedText } from './ThemedText'
import { useGame } from '@/providers/GameProvider'
import innocentFemale from '../assets/images/innocent-female.png'
import innocentMale from '../assets/images/innocent-male.png'
import investigatorFemale from '../assets/images/investigator-female.png'
import investigatorMale from '../assets/images/investigator-male.png'
import mafiaFemale from '../assets/images/mafia-female.png'
import mafiaMale from '../assets/images/mafia-male.png'
import { View } from 'react-native'

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

export default function RoleComponent() {
  const { player } = useGame()

  // we can guarantee player, players and game to be defined here because of the conditional rendering in game.tsx
  const role = player!.role

  const victory = roleDetails[role]['victory']
  const special = roleDetails[role]['special']
  return (
    <View className="flex w-full flex-1 justify-between">
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
      </Group>
    </View>
  )
}
