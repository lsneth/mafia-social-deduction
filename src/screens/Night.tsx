import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { useGame } from '../providers/GameProvider'
import en from '../locales/en.json'
import PlayerGrid from '../components/PlayerGrid'

export default function Night() {
  const [dotCount, setDotCount] = useState<1 | 2 | 3>(1)
  const { player, gamePhase } = useGame()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotCount((prev) => ((prev % 3) + 1) as 1 | 2 | 3)
    }, 1000)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  return (
    <ParentView
      backgroundImage={require('../../assets/images/night.png')}
      gradientValues={['#000000', 'transparent', 'transparent']}
    >
      <Text size="lg">{en['night.night.heading']}</Text>

      {(player?.role === 'mafia' && gamePhase === 'mafia') ||
      (player?.role === 'detective' && gamePhase === 'detective') ? (
        <PlayerGrid />
      ) : (
        <BottomView>
          {dotCount === 1 ? (
            <Text size="lg">.</Text>
          ) : dotCount === 2 ? (
            <Text size="lg">..</Text>
          ) : (
            <Text size="lg">...</Text>
          )}
        </BottomView>
      )}
    </ParentView>
  )
}
