import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import Account from './screens/Account'
import Home from './screens/Home'
import UserProvider from './providers/UserProvider'
import Stats from './screens/Stats'
import colors from './styles/colors'
import Lobby from './screens/Lobby'
import Join from './screens/Join'
import GameDataProvider from './providers/GameProvider'
import CreateAccount from './screens/CreateAccount'
import Role from './screens/Role'

export type RootStackParamList = {
  Home: undefined
  Login: { firstLogin: boolean }
  CreateAccount: undefined
  Account: { loadInEditMode: boolean }
  Stats: undefined
  Lobby: undefined
  Join: undefined
  Role: undefined
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <UserProvider>
        <GameDataProvider>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTintColor: colors.white,
              headerTitle: () => <></>,
              headerTransparent: true,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} initialParams={{ firstLogin: false }} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="Account" component={Account} initialParams={{ loadInEditMode: false }} />
            <Stack.Screen name="Stats" component={Stats} />
            <Stack.Screen name="Lobby" component={Lobby} options={{ headerBackVisible: false }} />
            <Stack.Screen name="Join" component={Join} />
            <Stack.Screen name="Role" component={Role} />
          </Stack.Navigator>
        </GameDataProvider>
      </UserProvider>
    </NavigationContainer>
  )
}
