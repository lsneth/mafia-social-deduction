import React, { useEffect, useState } from 'react'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import BottomView from '../components/BottomView'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useGameContext } from '../providers/GameProvider'
import Button from '../components/Button'
export default function Night({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Night'> }) {
  const [dotCount, setDotCount] = useState<1 | 2 | 3>(1)
  const { deleteGame, gameId } = useGameContext()

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
      <Text size="lg">Night</Text>
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
          Delete Game
        </Button>
        {dotCount === 1 ? (
          <Text size="lg">.</Text>
        ) : dotCount === 2 ? (
          <Text size="lg">..</Text>
        ) : (
          <Text size="lg">...</Text>
        )}
      </BottomView>
    </ParentView>
  )
}
