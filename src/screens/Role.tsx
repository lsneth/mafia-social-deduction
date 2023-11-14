import React from 'react'
import ParentView from '../components/ParentView'
import Separator from '../components/Separator'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'
import Button from '../components/Button'

export default function Role() {
  const { player } = useGameContext()

  let role
  switch (player?.role) {
    case 'commonfolk':
      role = {
        image: require('../../assets/images/commonfolkM.png'),
        winCondition: 'You win when all the mafia players are dead.',
      }
      break
    case 'mafia':
      role = {
        image: require('../../assets/images/mafiaM.png'),
        winCondition: 'You win when all non-mafia players are dead.',
        detail: 'The mafia team may kill a player every night.',
      }
      break
    case 'detective':
      role = {
        image: require('../../assets/images/detectiveM.png'),
        winCondition: 'You win when all the mafia players are dead.',
        detail: 'The detective team can investigate a player every night.',
      }
      break

    default:
      break
  }

  return (
    <ParentView backgroundImage={role?.image} gradientValues={['transparent', 'transparent', '#000000']}>
      <Text size="md">Your role is</Text>
      <Text size="lg">{player?.role.toUpperCase()}</Text>
      <Text size="md">{role?.winCondition}</Text>
      {role?.detail ? <Text size="md">{role.detail}</Text> : <></>}
      <BottomView>
        <Button onPress={() => {}}>OKAY</Button>
      </BottomView>
    </ParentView>
  )
}
