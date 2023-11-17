import React from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'
import Button from '../components/Button'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useUserContext } from '../providers/UserProvider'

export default function Role({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Role'> }) {
  const { player, deleteGame, gameId } = useGameContext()
  const {
    user: { sex },
  } = useUserContext()

  let role
  switch (player?.role) {
    case 'commonfolk':
      role = {
        image:
          sex === 'male'
            ? require('../../assets/images/commonfolkM.png')
            : require('../../assets/images/commonfolkF.png'),
        winCondition: 'You win when all the mafia players are dead.',
      }
      break
    case 'mafia':
      role = {
        image: sex === 'male' ? require('../../assets/images/mafiaM.png') : require('../../assets/images/mafiaF.png'),
        winCondition: 'You win when all non-mafia players are dead.',
        detail: 'The mafia team may kill a player every night.',
      }
      break
    case 'detective':
      role = {
        image:
          sex === 'male'
            ? require('../../assets/images/detectiveM.png')
            : require('../../assets/images/detectiveF.png'),
        winCondition: 'You win when all the mafia players are dead.',
        detail: 'The detective team can investigate a player every night.',
      }
      break

    default:
      break
  }

  return (
    <ParentView
      backgroundImage={role?.image}
      gradientValues={['#000000', 'transparent', 'transparent', 'transparent', '#000000']}
      resizeMode="contain"
      paddingTop={50}
    >
      <Text size="md">Your role is</Text>
      <Text size="lg">{player?.role.toUpperCase()}</Text>
      <Text size="md">{role?.winCondition}</Text>
      {role?.detail ? <Text size="md">{role.detail}</Text> : <></>}
      <BottomView>
        <Button
          onPress={() => {
            deleteGame(gameId)
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          }}
        >
          OKAY
        </Button>
      </BottomView>
    </ParentView>
  )
}
