import React from 'react'
import Text from '../../components/Text'
import ParentView from '../../components/ParentView'
import { Role } from '../../types/types'
import BottomView from '../../components/BottomView'
import en from '../../locales/en.json'
import Button from '../../components/Button'
import { useGame } from '../../providers/GameProvider'
import { deleteGame } from '../../services/gameServices'
import navigate from '../../helpers/navigate'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../App'

export default function GameEnd({
  result,
  navigation,
}: {
  result: Role
  navigation: NativeStackNavigationProp<RootStackParamList, 'GameManager'>
}): JSX.Element {
  const { player, gameId } = useGame()
  return (
    <ParentView
      backgroundImage={
        result === 'mafia' ? require('../../../assets/images/night.png') : require('../../../assets/images/day.png')
      }
      gradientValues={['#000000da', '#00000061', '#00000061']}
    >
      <Text size="md">
        {result === 'mafia' ? en['game-end.mafia-win.action'] : en['game-end.commonfolk-win.action']}
      </Text>
      <BottomView>
        {player.isHost ? (
          <Button
            onPress={() => {
              deleteGame(gameId)
              navigate({ navigation, nextRoute: 'Home' })
            }}
          >
            {en['game-end.end-game.action']}
          </Button>
        ) : (
          <Button onPress={() => navigate({ navigation, nextRoute: 'Home' })}>{en['lobby.leave-game.action']}</Button>
        )}
      </BottomView>
    </ParentView>
  )
}
