import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Auth from './screens/Auth'
import Account from './screens/Account'
import Home from './screens/Home'
import AuthProvider from './providers/AuthProvider'
import colors from './styles/colors'

export type RootStackParamList = {
  Home: undefined
  Auth: { hasAccount: boolean }
  Account: undefined
}

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>()

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTintColor: colors.white,
            headerTitle: () => <></>,
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Auth" initialParams={{ hasAccount: true }} component={Auth} />
          <Stack.Screen name="Account" component={Account} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}
