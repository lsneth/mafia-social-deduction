import React, { useEffect } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { RootStackParamList } from '../App'
import Separator from '../components/Separator'
import BottomView from '../components/BottomView'
import Button from '../components/Button'
import SummaryTable from '../components/SummaryTable'
import { useGameContext } from '../providers/GameProvider'
import PlayerGrid from '../components/PlayerGrid'
import { BackHandler } from 'react-native'

export default function Lobby({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lobby'>
}): JSX.Element {
  const { gameId, deleteGame, loading } = useGameContext()
  const formattedGameId = gameId?.substring(3).toUpperCase()

  // this useEffect is to add functionality to the native OS back functionality: delete the game in supabase
  useEffect(() => {
    const backAction = () => {
      deleteGame(gameId)
      return undefined // don't override default behavior (going back)
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove() // Clean up the event listener on component unmount
  }, [gameId])

  return (
    <ParentView>
      {!loading ? <Text size="lg">{formattedGameId}</Text> : <></>}
      <Separator />
      <Text>Share this game ID for others to join your session.</Text>
      <Separator size={40} />
      {!loading ? <PlayerGrid /> : <></>}

      <BottomView>
        <SummaryTable />
        <Separator size={20} />
        {/* TODO: remove refresh button. for testing only. */}
        <Button
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Role' }],
            })
          }}
        >
          START GAME
        </Button>
        <Button
          onPress={async () => {
            await deleteGame(gameId)
            navigation.goBack()
          }}
          backgroundColor="gray"
        >
          CANCEL
        </Button>
      </BottomView>
    </ParentView>
  )
}
