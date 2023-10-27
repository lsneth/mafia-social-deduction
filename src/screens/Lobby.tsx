import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ParentView from '../components/ParentView'
import Text from '../components/Text'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import Separator from '../components/Separator'
import BottomView from '../components/BottomView'
import Button from '../components/Button'
import Table from '../components/Table'
import { joinGameSession } from '../services/supabaseServices'

export default function Lobby({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'Lobby'>
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lobby'>
}): JSX.Element {
  const formattedGsCode = route.params.gameSessionCode.toUpperCase().substring(3)
  return (
    <ParentView>
      <Text size="lg">{formattedGsCode}</Text>
      <Separator />
      <Text>Share this code for others to join your session.</Text>
      <BottomView>
        <Table title="8 Players" />
        <Button
          onPress={() => {
            joinGameSession(route.params.gameSessionCode)
          }}
        >
          START GAME
        </Button>
      </BottomView>
    </ParentView>
  )
}
