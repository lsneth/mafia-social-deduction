import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGame } from '../providers/GameProvider'
import { useUser } from '../providers/UserProvider'
import en from '../locales/en.json'
import { updateGame } from '../services/gameServices'

export default function Role() {
  const { player, gameId } = useGame()
  const {
    user: { sex },
  } = useUser()
  const [seconds, setSeconds] = useState<number>(10)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => (prev - 1 >= 0 ? prev - 1 : 0))
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  if (seconds <= 0 && player.isHost) {
    updateGame({
      gameId,
      hostId: player.playerId,
      change: { gamePhase: 'commonfolk' },
    })
  }

  let role
  switch (player?.role) {
    case 'commonfolk':
      role = {
        image:
          sex === 'male'
            ? require('../../assets/images/commonfolkM.png')
            : require('../../assets/images/commonfolkF.png'),
        winCondition: en['role.commonfolk-win-condition.description'],
      }
      break
    case 'mafia':
      role = {
        image: sex === 'male' ? require('../../assets/images/mafiaM.png') : require('../../assets/images/mafiaF.png'),
        winCondition: en['role.mafia-win-condition.description'],
        detail: en['role.mafia-detail.description'],
      }
      break
    case 'detective':
      role = {
        image:
          sex === 'male'
            ? require('../../assets/images/detectiveM.png')
            : require('../../assets/images/detectiveF.png'),
        winCondition: en['role.detective-win-condition.description'],
        detail: en['role.detective-detail.description'],
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
        {/* TODO: get the player role in the strings file */}
        <Text size="lg">{player?.role?.toUpperCase()}</Text>
        <Text size="md">{role?.winCondition}</Text>
        {role?.detail ? <Text size="md">{role.detail}</Text> : <></>}
      </BottomView>
    </ParentView>
  )
}
