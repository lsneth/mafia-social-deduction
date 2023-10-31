import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import Separator from '../components/Separator'
import BottomView from '../components/BottomView'
import Button from '../components/Button'
import Table from '../components/Table'
import { useGameContext } from '../providers/GameProvider'
import PlayerGrid from '../components/PlayerGrid'
import { deleteGameSession } from '../services/supabaseServices'

export default function Lobby({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Lobby'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lobby'>
}): JSX.Element {
  const { gameData } = useGameContext()
  const formattedGameId = gameData.gameId.substring(3).toUpperCase()

  return (
    <ParentView>
      <Text size="lg">{formattedGameId}</Text>
      <Separator />
      <Text>Share this game ID for others to join your session.</Text>
      <Separator size={40} />
      <PlayerGrid />
      <BottomView>
        <Table title="8 Players" />
        <Separator size={20} />
        <Button
          onPress={() => {
            deleteGameSession(gameData.gameId)
            navigation.goBack()
          }}
        >
          DELETE GAME
        </Button>
      </BottomView>
    </ParentView>
  )
}
