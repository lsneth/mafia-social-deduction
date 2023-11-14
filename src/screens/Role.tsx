import React, { useState } from 'react'
import ParentView from '../components/ParentView'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import Separator from '../components/Separator'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'
import { ImageSourcePropType } from 'react-native'

function getRoleImage(role: string): ImageSourcePropType {
  switch (role) {
    case 'commonfolk':
      return require('../../assets/images/commonfolkM.png')
    case 'mafia':
      return require('../../assets/images/mafiaM.png')
    case 'detective':
      return require('../../assets/images/detectiveM.png')

    default:
      return require('')
  }
}

export default function Role({
  route,
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Role'>
  route: RouteProp<RootStackParamList, 'Role'>
}) {
  const { player } = useGameContext()

  return (
    <ParentView backgroundImage={getRoleImage(player.role)} gradientValues={['transparent', 'transparent', '#000000']}>
      <BottomView>
        <Text size="lg">{player.role.toUpperCase()}</Text>
        <Text size="md">You win when all the mafia are dead.</Text>
        <Separator size={40} />
      </BottomView>
    </ParentView>
  )
}
