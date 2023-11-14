import React from 'react'
import ParentView from '../components/ParentView'
import Separator from '../components/Separator'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'

const roleImages = {
  commonfolk: require('../../assets/images/commonfolkM.png'),
  mafia: require('../../assets/images/mafiaM.png'),
  detective: require('../../assets/images/detectiveM.png'),
}

export default function Role() {
  const { player } = useGameContext()

  return (
    <ParentView
      backgroundImage={player?.role && roleImages[player.role]}
      gradientValues={['transparent', 'transparent', '#000000']}
    >
      <BottomView>
        <Text size="lg">{player?.role.toUpperCase()}</Text>
        <Text size="md">You win when all the mafia are dead.</Text>
        <Separator size={40} />
      </BottomView>
    </ParentView>
  )
}
