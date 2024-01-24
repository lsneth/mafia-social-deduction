import React from 'react'
import { useUserContext } from '../providers/UserProvider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import Text from '../components/Text'
import Button from '../components/Button'
import Separator from '../components/Separator'
import ParentView from '../components/ParentView'
import BottomView from '../components/BottomView'
import { useGameContext } from '../providers/GameProvider'
import { ActivityIndicator, Alert } from 'react-native'

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  const {
    user: { id, firstName, lastName },
    loading: userLoading,
  } = useUserContext()
  const { joinGame, newGame } = useGameContext()

  return (
    <ParentView
      backgroundImage={require('../../assets/images/mafiaM.png')}
      gradientValues={['#000000', 'transparent', '#000000']}
    >
      <Text size="lg">MAFIA</Text>
      <Text size="md">Social Deduction</Text>
      {userLoading ? (
        <BottomView>
          <ActivityIndicator size="large" />
          <Separator size={60} />
        </BottomView>
      ) : (
        <BottomView>
          {id ? (
            <>
              <Button
                onPress={
                  firstName && lastName
                    ? () => navigation.navigate('Join')
                    : () => {
                        navigation.navigate({ name: 'Account', params: { loadInEditMode: false } })
                        Alert.alert('You must add a first and last name before joining a game.')
                      }
                }
              >
                JOIN GAME
              </Button>
              <Button
                onPress={
                  firstName && lastName
                    ? () => {
                        newGame().then(() => {
                          navigation.navigate('Lobby')
                        })
                      }
                    : () => {
                        navigation.navigate({ name: 'Account', params: { loadInEditMode: false } })
                        Alert.alert('You must add a first and last name before joining a game.')
                      }
                }
              >
                HOST GAME
              </Button>
              <Separator size={20} />
              <Button
                onPress={() => navigation.navigate({ name: 'Account', params: { loadInEditMode: false } })}
                backgroundColor="gray"
              >
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
      )}
    </ParentView>
  )
}
