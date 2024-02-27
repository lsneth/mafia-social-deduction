import React from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { useGame } from '../providers/GameProvider'
import PlayerGrid from '../components/PlayerGrid'
import Separator from '../components/Separator'
export default function Day() {
  const { loading: gameLoading } = useGame()

  return (
    <ParentView
      backgroundImage={require('../../assets/images/day.png')}
      gradientValues={['#000000da', '#00000061', '#00000061']}
    >
      <Text size="sm">Vote for the player you wish to hang.</Text>
      <Separator size={40} />
      {!gameLoading ? <PlayerGrid onSelect={() => {}} /> : <></>}
    </ParentView>
  )
}
