import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from './src/screens/Auth'
import Account from './src/screens/Account'
import Home from './src/screens/Home'
import AuthProvider from './src/providers/AuthProvider'
import Stats from './src/screens/Stats'
import colors from './src/styles/colors'
import Lobby from './src/screens/Lobby'
import Join from './src/screens/Join'
import GameDataProvider from './src/providers/GameProvider'

export type RootStackParamList = {
  Home: undefined
  Auth: { hasAccount: boolean }
  Account: undefined
  Stats: undefined
  Lobby: undefined
  Join: undefined
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <AuthProvider>
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
            <Stack.Screen name="Auth" component={Auth} initialParams={{ hasAccount: true }} />
            <Stack.Screen name="Account" component={Account} />
            <Stack.Screen name="Stats" component={Stats} />
            <Stack.Screen name="Lobby" component={Lobby} />
            <Stack.Screen name="Join" component={Join} />
          </Stack.Navigator>
        </GameDataProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}
