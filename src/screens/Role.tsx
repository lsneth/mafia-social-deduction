import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'
import { RootStackParamList } from '../../App'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useUserContext } from '../providers/UserProvider'
import Separator from '../components/Separator'

export default function Role({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Role'> }) {
  const { player } = useGameContext()
  const {
    user: { sex },
  } = useUserContext()
  const [seconds, setSeconds] = useState<number>(10)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Night' }],
      })
    }
  })

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
      paddingTop={30}
    >
      <Text size="lg">{seconds.toString()}</Text>
      <BottomView>
        <Text size="lg">{player?.role.toUpperCase()}</Text>
        <Text size="md">{role?.winCondition}</Text>
        {role?.detail ? <Text size="md">{role.detail}</Text> : <></>}
      </BottomView>
    </ParentView>
  )
}
