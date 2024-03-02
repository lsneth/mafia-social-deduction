import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { RootStackParamList } from '../../App'
import Separator from '../components/Separator'
import BottomView from '../components/BottomView'
import Button from '../components/Button'
import SummaryTable from '../components/SummaryTable'
import { useGame } from '../providers/GameProvider'
import PlayerGrid from '../components/PlayerGrid'
import { ActivityIndicator, BackHandler } from 'react-native'
import { leaveGame, startGame } from '../services/gameServices'
import { useUser } from '../providers/UserProvider'

export default function Lobby({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lobby'>
}): JSX.Element {
  const {
    gameId,
    deleteGame,
    loading: gameLoading,
    players,
    player,
    gameState,
  } = useGame()
  const {
    user: { id: userId },
  } = useUser()

  const tooManyPlayers = (players?.length ?? 0) > 15
  const notEnoughPlayers = (players?.length ?? 0) < 5
  const validPlayerCount = !notEnoughPlayers && !tooManyPlayers

  // this useEffect is to add functionality to the native OS back functionality: delete the game in supabase
  useEffect(() => {
    const backAction = () => {
      deleteGame(gameId!)
      return undefined // don't override default behavior (going back)
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    )

    return () => backHandler.remove() // Clean up the event listener on component unmount
  }, [deleteGame, gameId])

  useEffect(() => {
    if (gameState === 'playing') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Role' }],
      })
    }
  }, [gameState, navigation])

  return (
    <ParentView>
      {!gameLoading && gameId ? (
        <Text size="lg">{gameId}</Text>
      ) : (
        <ActivityIndicator size="large" />
      )}
      <Separator />
      <Text>Share this game ID for others to join your session.</Text>
      <Separator size={40} />
      {!gameLoading ? <PlayerGrid selectable={false} /> : <></>}

      <BottomView>
        <Button onPress={() => navigation.navigate('Day')}>Test</Button>

        <SummaryTable />
        <Separator size={20} />
        {player?.isHost ? (
          <Button
            disabled={!validPlayerCount}
            onPress={() => {
              startGame(gameId!)
            }}
          >
            {notEnoughPlayers ? (
              <Text>5 PLAYERS MINIMUM</Text>
            ) : tooManyPlayers ? (
              <Text>15 PLAYERS MAXIMUM</Text>
            ) : (
              <Text>START GAME</Text>
            )}
          </Button>
        ) : (
          <></>
        )}
        <Button
          onPress={async () => {
            if (player?.isHost) {
              deleteGame(gameId!)
            } else leaveGame(gameId!, userId)
            navigation.goBack()
          }}
          backgroundColor="gray"
        >
          {player?.isHost ? 'Delete Game' : 'Leave Game'}
        </Button>
      </BottomView>
    </ParentView>
  )
}
