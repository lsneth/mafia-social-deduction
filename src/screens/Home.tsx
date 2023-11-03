import React from 'react'
import { useAuthContext } from '../providers/AuthProvider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import Text from '../components/Text'
import Button from '../components/Button'
import Separator from '../components/Separator'
import ParentView from '../components/ParentView'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'

export default function Home({
  route,
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}) {
  const { signedIn } = useAuthContext()
  const { joinGame, createGame } = useGameContext()

  return (
    <ParentView
      backgroundImage={require('../../assets/images/mafia.png')}
      gradientValues={['#000000', 'transparent', '#000000']}
    >
      <Text size="lg">MAFIA</Text>
      <Text size="md">Social Deduction</Text>
      <BottomView>
        {signedIn ? (
          <>
            <Button onPress={() => navigation.navigate('Join')}>JOIN GAME</Button>
            <Button
              onPress={() => {
                createGame().then((gameId) => {
                  joinGame(gameId)
                  navigation.navigate('Lobby')
                })
              }}
            >
              HOST GAME
            </Button>
            <Separator size={20} />
            <Button onPress={() => navigation.navigate({ name: 'Account', params: { loadInEditMode: false } })}>
              ACCOUNT
            </Button>
          </>
        ) : (
          <>
            <Button onPress={() => navigation.navigate('CreateAccount')}>CREATE ACCOUNT</Button>
            <Button onPress={() => navigation.navigate({ name: 'Login', params: { firstLogin: false } })}>
              LOG IN
            </Button>
          </>
        )}
      </BottomView>
    </ParentView>
  )
}
