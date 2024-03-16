import React from 'react'
import { useUser } from '../providers/UserProvider'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import Text from '../components/Text'
import Button from '../components/Button'
import Separator from '../components/Separator'
import ParentView from '../components/ParentView'
import BottomView from '../components/BottomView'
import { useGame } from '../providers/GameProvider'
import { ActivityIndicator, Alert } from 'react-native'
import en from '../locales/en.json'

export default function Home({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) {
  const {
    user: { id: userId, firstName, lastName },
    loading: userLoading,
  } = useUser()
  const { newGame } = useGame()

  return (
    <ParentView
      backgroundImage={require('../../assets/images/mafiaM.png')}
      gradientValues={['#000000', 'transparent', '#000000']}
    >
      <Text size="lg">{en['home.mafia.heading']}</Text>
      <Text size="md">{en['home.social-deduction.heading']}</Text>
      {userLoading ? (
        <BottomView>
          <ActivityIndicator size="large" />
          <Separator size={60} />
        </BottomView>
      ) : (
        <BottomView>
          {userId ? (
            <>
              <Button
                onPress={
                  firstName && lastName
                    ? () => navigation.navigate('Join')
                    : () => {
                        navigation.navigate({
                          name: 'Account',
                          params: { loadInEditMode: false },
                        })
                        Alert.alert(en['home.need-name.error'])
                      }
                }
              >
                {en['home.join-game.action']}
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
                        navigation.navigate({
                          name: 'Account',
                          params: { loadInEditMode: false },
                        })
                        Alert.alert(en['home.need-name.error'])
                      }
                }
              >
                {en['home.host-game.action']}
              </Button>
              <Separator size={20} />
              <Button
                onPress={() =>
                  navigation.navigate({
                    name: 'Account',
                    params: { loadInEditMode: false },
                  })
                }
                backgroundColor="gray"
              >
                {en['home.account.action']}
              </Button>
            </>
          ) : (
            <>
              <Button onPress={() => navigation.navigate('CreateAccount')}>
                {en['create-account.create-account.action']}
              </Button>
              <Button
                onPress={() =>
                  navigation.navigate({
                    name: 'Login',
                    params: { firstLogin: false },
                  })
                }
              >
                {en['home.log-in.action']}
              </Button>
            </>
          )}
        </BottomView>
      )}
    </ParentView>
  )
}
