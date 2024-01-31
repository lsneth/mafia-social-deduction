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
// import { assignRoles } from '../services/mafiaServices'

export default function Lobby({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lobby'>
}): JSX.Element {
  const { gameId, deleteGame, loading, players, player } = useGame()

  const tooManyPlayers = (players?.length ?? 0) > 15
  const notEnoughPlayers = (players?.length ?? 0) < 5
  const validPlayerCount = !notEnoughPlayers && !tooManyPlayers

  // this useEffect is to add functionality to the native OS back functionality: delete the game in supabase
  useEffect(() => {
    const backAction = () => {
      deleteGame(gameId!)
      return undefined // don't override default behavior (going back)
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove() // Clean up the event listener on component unmount
  }, [gameId])

  return (
    <ParentView>
      {!loading && gameId ? <Text size="lg">{gameId.toUpperCase()}</Text> : <ActivityIndicator size="large" />}
      <Separator />
      <Text>Share this game ID for others to join your session.</Text>
      <Separator size={40} />
      {!loading ? <PlayerGrid /> : <></>}

      <BottomView>
        <SummaryTable />
        <Separator size={20} />
        {player?.is_host ? (
          <Button
            disabled={!validPlayerCount}
            onPress={() => {
              // assignRoles(gameId)
              navigation.reset({
                index: 0,
                routes: [{ name: 'Role' }],
              })
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
            if (player?.is_host) await deleteGame(gameId!)
            navigation.goBack()
          }}
          backgroundColor="gray"
        >
          {player?.is_host ? 'Delete Game' : 'Leave Game'}
        </Button>
      </BottomView>
    </ParentView>
  )
}
