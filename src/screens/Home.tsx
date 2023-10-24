import React, { useState } from 'react'
import { useAuthContext } from '../providers/AuthProvider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { RouteProp } from '@react-navigation/native'
import Text from '../components/Text'
import Button from '../components/Button'
import Separator from '../components/Separator'
import ParentView from '../components/ParentView'
import BottomView from '../components/BottomView'
import { createGameSession, deleteGameSession } from '../services/supabaseServices'
import { Alert } from 'react-native'

export default function Home({
  route,
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}) {
  const { signedIn } = useAuthContext()
  const [gameSessionCode, setGameSessionCode] = useState<string>('')

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
            <Button onPress={() => {}}>JOIN GAME</Button>
            <Button
              onPress={async () => {
                createGameSession().then((gsCode) => gsCode && setGameSessionCode(gsCode))
                navigation.navigate('Lobby', { gameSessionCode: gameSessionCode })
              }}
            >
              HOST GAME
            </Button>
            <Separator size={20} />
            <Button onPress={() => navigation.navigate('Account')}>ACCOUNT</Button>
          </>
        ) : (
          <>
            <Button onPress={() => navigation.navigate('Auth', { hasAccount: false })}>CREATE ACCOUNT</Button>
            <Button onPress={() => navigation.navigate('Auth', { hasAccount: true })}>LOG IN</Button>
          </>
        )}
      </BottomView>
    </ParentView>
  )
}