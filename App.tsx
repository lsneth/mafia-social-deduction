import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './src/screens/Login'
import Account from './src/screens/Account'
import Home from './src/screens/Home'
import UserProvider from './src/providers/UserProvider'
import Stats from './src/screens/Stats'
import colors from './src/styles/colors'
import Lobby from './src/screens/Lobby'
import Join from './src/screens/Join'
import GameProvider from './src/providers/GameProvider'
import CreateAccount from './src/screens/CreateAccount'
import Role from './src/screens/GameManagerScreens/Role'
import GameManager from './src/screens/GameManager'

export type RootStackParamList = {
  Home: undefined
  Login: { firstLogin: boolean }
  CreateAccount: undefined
  Account: { loadInEditMode: boolean }
  Stats: undefined
  Lobby: undefined
  Join: undefined
  Role: undefined
  GameManager: undefined
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <UserProvider>
        <GameProvider>
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
            <Stack.Screen name="GameManager" component={GameManager} />
          </Stack.Navigator>
        </GameProvider>
      </UserProvider>
    </NavigationContainer>
  )
}
