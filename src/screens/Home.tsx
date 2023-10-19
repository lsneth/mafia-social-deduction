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

export default function Home({
  route,
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}) {
  const { signedIn } = useAuthContext()

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
            <Button title="JOIN GAME" onPress={() => {}} />
            <Button title="HOST GAME" onPress={() => {}} />
            <Separator size={20} />
            <Button title="ACCOUNT" onPress={() => navigation.navigate('Account')} />
          </>
        ) : (
          <>
            <Button title="CREATE ACCOUNT" onPress={() => navigation.navigate('Auth', { hasAccount: false })} />
            <Button title="LOG IN" onPress={() => navigation.navigate('Auth', { hasAccount: true })} />
          </>
        )}
      </BottomView>
    </ParentView>
  )
}
